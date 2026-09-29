import React, { useState } from 'react';
import {
  RotateCcw,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from 'lucide-react';
import { db } from '../../lib/database';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

export const AdminRequests: React.FC = () => {
  const { currentUser } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('pending');
  const [typeFilter, setTypeFilter] = useState<'all' | 'borrow' | 'return'>('all');
  const [search, setSearch] = useState('');

  const requests = db.getRequests();

  const filteredRequests = requests.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    const matchesSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentIdNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.bookTitle.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleApprove = (reqId: string, title: string, student: string) => {
    if (!currentUser) return;
    try {
      db.approveRequest(currentUser.id, reqId);
      flash.success(`Request for "${title}" by ${student} has been approved.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot approve request.';
      flash.error(msg, 'Approval Blocked');
    }
  };

  const handleDecline = (reqId: string, title: string) => {
    if (!currentUser) return;
    const reason = window.prompt(
      `Provide reason for declining request for "${title}":`,
      'Exceeded student loan quota or book reserved for reference.'
    );
    if (reason === null) return;

    try {
      db.declineRequest(currentUser.id, reqId, reason);
      flash.info(`Request for "${title}" was declined.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot decline request.';
      flash.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Student Circulation Requests
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Review online student book reservations and return submissions.
          </p>
        </div>

        {/* Status Counts */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
            {requests.filter(r => r.status === 'pending').length} Pending
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs">
            {requests.filter(r => r.status === 'approved').length} Approved
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by student name, reg number, or book..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs">
            {(['all', 'pending', 'approved', 'declined'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as any)}
            className="py-1.5 px-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-800"
          >
            <option value="all">All Types</option>
            <option value="borrow">Borrow Only</option>
            <option value="return">Return Only</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No requests matching filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4">Notes / Reason</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Librarian Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{req.studentName}</div>
                      <div className="text-[11px] font-mono text-stone-500">{req.studentIdNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
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
                    <td className="py-3.5 px-4 font-bold text-stone-800 max-w-xs truncate">
                      {req.bookTitle}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px] whitespace-nowrap">
                      {new Date(req.requestDate).toLocaleString([], {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 italic max-w-xs truncate">
                      {req.studentNotes || req.adminNotes || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
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
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {req.status === 'pending' ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleApprove(req.id, req.bookTitle, req.studentName)}
                            className="px-2.5 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleDecline(req.id, req.bookTitle)}
                            className="px-2.5 py-1 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-stone-500 font-mono italic">
                          Resolved on {req.resolvedDate ? new Date(req.resolvedDate).toLocaleDateString() : '—'}
                        </span>
                      )}
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
