import React, { useState } from 'react';
import { BookCheck, RotateCcw, Check, Calendar, AlertCircle } from 'lucide-react';
import { db } from '../../lib/database';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

export const AdminIssueReturn: React.FC = () => {
  const { currentUser } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [activeTab, setActiveTab] = useState<'issue' | 'return'>('issue');

  const students = db.getStudents();
  const books = db.getBooks();
  const availableBooks = books.filter(b => b.availableCopies > 0);
  const borrows = db.getBorrows();
  const activeBorrows = borrows.filter(b => b.status === 'borrowed');

  // Issue Form states
  const defaultDueDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  };

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedBookId, setSelectedBookId] = useState(availableBooks[0]?.id || '');
  const [dueDate, setDueDate] = useState(defaultDueDate());
  const [issueRemarks, setIssueRemarks] = useState('Standard 14-day academic loan');

  // Return Form states
  const [returnRemarks, setReturnRemarks] = useState('');

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!selectedStudentId || !selectedBookId) {
      flash.error('Please select both a valid student and available book.');
      return;
    }

    try {
      db.issueBook(currentUser.id, selectedStudentId, selectedBookId, dueDate, issueRemarks);
      const student = students.find(s => s.id === selectedStudentId);
      const book = books.find(b => b.id === selectedBookId);
      flash.success(`"${book?.title}" issued to ${student?.fullName}. Due on ${dueDate}.`);
      setIssueRemarks('Standard 14-day academic loan');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to issue book.';
      flash.error(msg, 'Issue Denied');
    }
  };

  const handleProcessReturn = (borrowRecordId: string, bookTitle: string, studentName: string) => {
    if (!currentUser) return;
    try {
      db.returnBook(currentUser.id, borrowRecordId, returnRemarks || 'Returned in good condition');
      flash.success(`Book "${bookTitle}" returned by ${studentName}. Stock restored.`);
      setReturnRemarks('');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to return book.';
      flash.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Circulation Desk: Issue &amp; Return
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Physical book checkouts, loan duration tracking, and inventory reconciliation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('issue')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'issue'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookCheck className="w-4 h-4 text-amber-400" />
            <span>Issue Book</span>
          </button>
          <button
            onClick={() => setActiveTab('return')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'return'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Process Return ({activeBorrows.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Issue Book Form */}
      {activeTab === 'issue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
              Direct Book Issuance Form
            </h2>

            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Select Borrower Student
                </label>
                <select
                  required
                  value={selectedStudentId}
                  onChange={e => setSelectedStudentId(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                >
                  <option value="">-- Choose registered student --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.studentIdNumber}) — {s.department} [{s.activeBorrowsCount} currently borrowed]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Select Available Book from Catalogue
                </label>
                <select
                  required
                  value={selectedBookId}
                  onChange={e => setSelectedBookId(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                >
                  <option value="">-- Choose book with available stock --</option>
                  {availableBooks.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} by {b.author} [{b.availableCopies} available / {b.rackLocation}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    disabled
                    value={new Date().toISOString().split('T')[0]}
                    className="w-full py-2.5 px-3.5 text-xs font-mono bg-stone-100 border border-stone-300 rounded-xl text-stone-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Expected Due Date (Default 14 Days)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full py-2.5 px-3.5 text-xs font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                    />
                    <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Librarian Remarks / Condition Note
                </label>
                <input
                  type="text"
                  value={issueRemarks}
                  onChange={e => setIssueRemarks(e.target.value)}
                  placeholder="e.g. Standard 14-day academic loan, mint copy"
                  className="w-full py-2.5 px-3.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={availableBooks.length === 0 || students.length === 0}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Confirm Book Issue</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Rules & Inventory Status */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
              <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Circulation Guidelines</span>
              </h3>
              <p className="text-amber-900 leading-relaxed">
                • Undergraduate scholars can hold up to 3 simultaneous book loans.
              </p>
              <p className="text-amber-900 leading-relaxed">
                • The system prevents issuing copies if available inventory is zero.
              </p>
              <p className="text-amber-900 leading-relaxed">
                • Duplicate loan attempts for the same title by the same student will be denied.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Shelves Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Available Titles:</span>
                  <span className="font-mono font-bold text-emerald-700">{availableBooks.length}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Currently Loaned:</span>
                  <span className="font-mono font-bold text-amber-700">{activeBorrows.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Return Desk */}
      {activeTab === 'return' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 bg-stone-50">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Active Loans Awaiting Return ({activeBorrows.length})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Click &quot;Process Return&quot; to restore inventory copies and mark the student loan record returned.
            </p>
          </div>

          {activeBorrows.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-stone-800 text-sm">No active loans outstanding!</p>
              <p className="mt-1">All borrowed books have been returned to the shelves.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Book Title</th>
                    <th className="py-3 px-4">Student Borrower</th>
                    <th className="py-3 px-4">Issued Date</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Loan Remarks</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {activeBorrows.map(loan => {
                    const isOverdue = new Date(loan.dueDate) < new Date();
                    return (
                      <tr key={loan.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-xs">
                          {loan.bookTitle}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-800">{loan.studentName}</div>
                          <div className="text-[11px] font-mono text-stone-500">{loan.studentIdNumber}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-600">{loan.issueDate}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`font-mono font-bold ${
                              isOverdue ? 'text-rose-600' : 'text-stone-800'
                            }`}
                          >
                            {loan.dueDate}
                          </span>
                          {isOverdue && (
                            <span className="block text-[10px] font-bold uppercase text-rose-700">
                              Overdue
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 italic max-w-xs truncate">
                          {loan.remarks || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleProcessReturn(loan.id, loan.bookTitle, loan.studentName)}
                            className="px-3 py-1.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors flex items-center gap-1 shadow-2xs ml-auto"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                            <span>Process Return</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
