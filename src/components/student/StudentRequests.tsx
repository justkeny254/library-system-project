import React, { useState } from 'react';
import {
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Send,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/database';
import { useFlash } from '../../context/FlashContext';

export const StudentRequests: React.FC = () => {
  const { currentStudent } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [activeTab, setActiveTab] = useState<'return_form' | 'requests_history'>('return_form');
  const [returnNote, setReturnNote] = useState('');
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  if (!currentStudent) return null;

  const myBorrows = db.getStudentHistory(currentStudent.id);
  const activeBorrows = myBorrows.filter(b => b.status === 'borrowed');
  const myRequests = db.getStudentRequests(currentStudent.id);

  const pendingReturnBorrowRecordIds = new Set(
    myRequests.filter(r => r.status === 'pending' && r.type === 'return').map(r => r.borrowRecordId)
  );

  const handleSubmitReturnRequest = (borrowRecordId: string, bookTitle: string) => {
    setSubmittingId(borrowRecordId);
    try {
      db.createReturnRequest(currentStudent.id, borrowRecordId, returnNote || 'Book returned to drop-box');
      flash.success(
        `Return request for "${bookTitle}" has been logged for librarian confirmation.`,
        'Return Request Submitted'
      );
      setReturnNote('');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit return request.';
      flash.error(msg);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Borrow &amp; Return Requests
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Submit returns or monitor librarian approvals on all your active requests.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('return_form')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'return_form'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Submit Return ({activeBorrows.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('requests_history')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'requests_history'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Request Log ({myRequests.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Submit Return */}
      {activeTab === 'return_form' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 bg-stone-50">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Books Currently Checked Out to You
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select any borrowed book below to initiate a return request for the librarian to inspect and approve.
            </p>
          </div>

          {activeBorrows.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-800">No active books to return</p>
              <p className="mt-1">You have returned all borrowed library materials.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {activeBorrows.map(loan => {
                const isPendingReturn = pendingReturnBorrowRecordIds.has(loan.id);

                return (
                  <div
                    key={loan.id}
                    className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-stone-900 text-base">
                        {loan.bookTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono">
                        <span>Issued On: {loan.issueDate}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          Due Date: <strong className="text-stone-800">{loan.dueDate}</strong>
                        </span>
                      </div>
                      {loan.remarks && (
                        <p className="text-xs text-stone-500 italic">Note: {loan.remarks}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      {isPendingReturn ? (
                        <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Return Pending Librarian Review</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSubmitReturnRequest(loan.id, loan.bookTitle)}
                          disabled={submittingId === loan.id}
                          className="px-4 py-2 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5 text-amber-400" />
                          <span>Submit Return Request</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Requests History */}
      {activeTab === 'requests_history' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Status of Your Circulation Requests
            </span>
            <span className="text-stone-500 font-mono">
              Total Submissions: {myRequests.length}
            </span>
          </div>

          {myRequests.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              No borrow or return requests submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Request Type</th>
                    <th className="py-3 px-4">Book Title</th>
                    <th className="py-3 px-4">Date Submitted</th>
                    <th className="py-3 px-4">Your Note</th>
                    <th className="py-3 px-4">Librarian Response</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {myRequests.map(req => (
                    <tr key={req.id} className="hover:bg-stone-50/70">
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                            req.type === 'borrow'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-sky-100 text-sky-900'
                          }`}
                        >
                          {req.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900 max-w-xs truncate">
                        {req.bookTitle}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                        {new Date(req.requestDate).toLocaleString([], {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="py-3 px-4 text-stone-600 italic max-w-xs truncate">
                        {req.studentNotes || '—'}
                      </td>
                      <td className="py-3 px-4 text-stone-700 max-w-xs truncate">
                        {req.adminNotes || '—'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider ${
                            req.status === 'pending'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : req.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}
                        >
                          {req.status === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                          {req.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {req.status === 'declined' && <XCircle className="w-3 h-3 text-rose-600" />}
                          <span>{req.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
