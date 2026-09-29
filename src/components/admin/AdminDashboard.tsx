import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  BookCheck,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { db } from '../../lib/database';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);

  const refresh = () => setTick(t => t + 1);

  const books = db.getBooks();
  const totalBooks = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableBooks = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const students = db.getStudents();
  const borrows = db.getBorrows();
  const activeBorrows = borrows.filter(b => b.status === 'borrowed');
  const requests = db.getRequests();
  const pendingRequests = requests.filter(r => r.status === 'pending');

  const handleApprove = (reqId: string) => {
    if (!currentUser) return;
    try {
      db.approveRequest(currentUser.id, reqId);
      flash.success('Student borrow/return request approved successfully.');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to approve request.';
      flash.error(msg);
    }
  };

  const handleDecline = (reqId: string) => {
    if (!currentUser) return;
    const reason = window.prompt('Reason for declining this request:', 'Book in reserve or duplicate request');
    if (reason === null) return;
    try {
      db.declineRequest(currentUser.id, reqId, reason);
      flash.info('Request marked as declined.');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to decline request.';
      flash.error(msg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#701A1E] text-white rounded-md">
              Administration
            </span>
            <span className="text-xs text-stone-500 font-medium">· Central Library Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif mt-1">
            Librarian Console Overview
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Monitor real-time book circulation, process student requests, and manage catalogue assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('admin_issue_return')}
            className="px-3.5 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <BookCheck className="w-4 h-4 text-amber-400" />
            <span>Issue / Return Desk</span>
          </button>

          <button
            onClick={() => onNavigate('admin_books')}
            className="px-3.5 py-2 text-xs font-bold bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Tabular Numerals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Catalog
            </span>
            <div className="p-2 rounded-lg bg-stone-100 text-[#701A1E]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#701A1E] font-mono tabular-nums">
              {totalBooks}
            </span>
            <span className="text-xs text-stone-500">volumes</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">{books.length} distinct titles</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Available Copies
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {availableBooks}
            </span>
            <span className="text-xs text-stone-500">ready</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">On physical shelving</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Loans
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
              {activeBorrows.length}
            </span>
            <span className="text-xs text-stone-500">checked out</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">Under standard return terms</p>
        </div>

        <div
          onClick={() => onNavigate('admin_requests')}
          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-[#701A1E]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Pending Requests
            </span>
            <div
              className={`p-2 rounded-lg ${
                pendingRequests.length > 0
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold font-mono tabular-nums ${
                pendingRequests.length > 0 ? 'text-rose-700' : 'text-stone-800'
              }`}
            >
              {pendingRequests.length}
            </span>
            <span className="text-xs text-stone-500">awaiting</span>
          </div>
          <p className="mt-1 text-xs text-[#701A1E] font-medium flex items-center gap-1">
            Review request queue <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Pending Requests Queue Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Student Request Queue
            </h2>
            <p className="text-xs text-stone-500">Online borrow and return submissions awaiting approval</p>
          </div>
          <button
            onClick={() => onNavigate('admin_requests')}
            className="text-xs font-bold text-[#701A1E] hover:underline"
          >
            View All Requests ({requests.length}) →
          </button>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">All student requests resolved</p>
            <p className="text-xs text-stone-500 mt-0.5">
              No pending borrow or return submissions in queue.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Date Submitted</th>
                  <th className="py-3 px-4">Student Note</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {pendingRequests.slice(0, 5).map(req => (
                  <tr key={req.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{req.studentName}</div>
                      <div className="text-[11px] font-mono text-stone-500">{req.studentIdNumber}</div>
                    </td>
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
                    <td className="py-3 px-4 font-medium text-stone-800 max-w-xs truncate">
                      {req.bookTitle}
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-stone-600 italic max-w-xs truncate">
                      {req.studentNotes || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          title="Approve Request"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="px-2.5 py-1 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                          title="Decline Request"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Borrows Table Preview */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Currently Circulating Loans
            </h2>
            <p className="text-xs text-stone-500">Active student book checkouts and return deadlines</p>
          </div>
          <button
            onClick={() => onNavigate('admin_issue_return')}
            className="text-xs font-bold text-[#701A1E] hover:underline"
          >
            Manage Circulation →
          </button>
        </div>

        {activeBorrows.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No books currently on loan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Borrower Student</th>
                  <th className="py-3 px-4">Issued On</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {activeBorrows.slice(0, 5).map(loan => (
                  <tr key={loan.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-900 max-w-sm truncate">
                      {loan.bookTitle}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-800">{loan.studentName}</div>
                      <div className="text-[11px] font-mono text-stone-500">{loan.studentIdNumber}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">{loan.issueDate}</td>
                    <td className="py-3 px-4 text-stone-800 font-mono text-[11px] font-bold">
                      {loan.dueDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider bg-amber-100 text-amber-800">
                        Active Loan
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
