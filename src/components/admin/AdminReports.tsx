import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  BookCheck,
  CheckCircle,
  History,
  AlertTriangle,
} from 'lucide-react';
import { db } from '../../lib/database';

export const AdminReports: React.FC = () => {
  const [activeReportTab, setActiveReportTab] = useState<'borrowed' | 'available' | 'history'>('borrowed');

  const books = db.getBooks();
  const borrows = db.getBorrows();
  const activeBorrows = borrows.filter(b => b.status === 'borrowed');
  const availableBooks = books.filter(b => b.availableCopies > 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (activeReportTab === 'borrowed') {
      csvContent += 'Book Title,Borrower Name,Student ID,Issue Date,Due Date,Status,Remarks\n';
      activeBorrows.forEach(b => {
        csvContent += `"${b.bookTitle}","${b.studentName}","${b.studentIdNumber}","${b.issueDate}","${b.dueDate}","${b.status}","${b.remarks || ''}"\n`;
      });
    } else if (activeReportTab === 'available') {
      csvContent += 'Book Title,Author,ISBN,Genre,Shelf Location,Available,Total\n';
      availableBooks.forEach(b => {
        csvContent += `"${b.title}","${b.author}","${b.isbn}","${b.genre}","${b.rackLocation}",${b.availableCopies},${b.totalCopies}\n`;
      });
    } else {
      csvContent += 'Book Title,Borrower Name,Student ID,Issue Date,Due Date,Return Date,Status\n';
      borrows.forEach(b => {
        csvContent += `"${b.bookTitle}","${b.studentName}","${b.studentIdNumber}","${b.issueDate}","${b.dueDate}","${b.returnDate || 'N/A'}","${b.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chapchap_${activeReportTab}_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Circulation Reports &amp; Audit Logs
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Exportable administrative inventory lists and loan audits for university compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#701A1E]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 bg-white p-2 rounded-2xl border border-stone-200/90 shadow-2xs">
        <button
          onClick={() => setActiveReportTab('borrowed')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'borrowed'
              ? 'bg-[#701A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookCheck className="w-4 h-4 text-amber-400" />
          <span>Currently Borrowed Books ({activeBorrows.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('available')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'available'
              ? 'bg-[#701A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-amber-400" />
          <span>Available Inventory ({availableBooks.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('history')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'history'
              ? 'bg-[#701A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          <span>Circulation History ({borrows.length})</span>
        </button>
      </div>

      {/* Report Table 1: Currently Borrowed */}
      {activeReportTab === 'borrowed' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Active Loans Ledger
            </span>
            <span className="text-stone-500 font-mono">
              Generated: {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Borrower Student</th>
                  <th className="py-3 px-4">Reg Number</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Standing</th>
                  <th className="py-3 px-4">Circulation Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {activeBorrows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-500">
                      No active loans currently recorded.
                    </td>
                  </tr>
                ) : (
                  activeBorrows.map(b => {
                    const isOverdue = new Date(b.dueDate) < new Date();
                    return (
                      <tr key={b.id} className="hover:bg-stone-50/70">
                        <td className="py-3 px-4 font-bold text-stone-900 max-w-xs">{b.bookTitle}</td>
                        <td className="py-3 px-4 font-medium text-stone-800">{b.studentName}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.studentIdNumber}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.issueDate}</td>
                        <td className="py-3 px-4 font-mono text-[11px] font-bold text-stone-800">
                          {b.dueDate}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                              isOverdue
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isOverdue ? 'Overdue' : 'Active'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-500 italic max-w-xs truncate">
                          {b.remarks || '—'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report Table 2: Available Inventory */}
      {activeReportTab === 'available' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Shelf Stock Summary
            </span>
            <span className="text-stone-500 font-mono">
              Total Titles Available: {availableBooks.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Author(s)</th>
                  <th className="py-3 px-4">ISBN</th>
                  <th className="py-3 px-4">Genre</th>
                  <th className="py-3 px-4">Shelf Location</th>
                  <th className="py-3 px-4 text-center">Available / Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {availableBooks.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-bold text-stone-900 max-w-sm">{b.title}</td>
                    <td className="py-3 px-4 text-stone-600">{b.author}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.isbn}</td>
                    <td className="py-3 px-4 text-stone-700">{b.genre}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.rackLocation}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-stone-900 tabular-nums">
                      <span className="text-emerald-700">{b.availableCopies}</span> / {b.totalCopies}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report Table 3: History */}
      {activeReportTab === 'history' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Circulation History &amp; Audit Trail
            </span>
            <span className="text-stone-500 font-mono">Total Transactions: {borrows.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Return Date</th>
                  <th className="py-3 px-4">Final Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {borrows.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-bold text-stone-900 max-w-sm truncate">{b.bookTitle}</td>
                    <td className="py-3 px-4 text-stone-700">
                      {b.studentName} ({b.studentIdNumber})
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.issueDate}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.dueDate}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">
                      {b.returnDate || <span className="text-amber-700 italic">Not Returned</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          b.status === 'returned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
