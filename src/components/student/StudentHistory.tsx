import React from 'react';
import { History, ShieldCheck, BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/database';

export const StudentHistory: React.FC = () => {
  const { currentStudent } = useAuth();

  if (!currentStudent) return null;

  // OWASP Broken Access Control defense:
  // Data access is strictly bounded to the active session student ID.
  const myRecords = db.getStudentHistory(currentStudent.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            My Personal Borrowing History
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Complete transcript of your academic library loans, returns, and research borrowings.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tenant Isolated (OWASP A01)</span>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {myRecords.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">No borrowing history yet</p>
            <p className="mt-1">When you check out books, your loan history will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Date Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Date Returned</th>
                  <th className="py-3 px-4">Remarks</th>
                  <th className="py-3 px-4 text-center">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {myRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                      {rec.bookTitle}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                      {rec.issueDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-stone-800">
                      {rec.dueDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                      {rec.returnDate || <span className="text-amber-700 italic">Not Returned</span>}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 italic max-w-xs truncate">
                      {rec.remarks || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          rec.status === 'returned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.status}
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
