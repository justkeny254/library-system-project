import React from 'react';
import {
  BookOpen,
  Clock,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/database';

interface StudentHomeProps {
  onNavigate: (tab: string) => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({ onNavigate }) => {
  const { currentUser, currentStudent } = useAuth();

  if (!currentUser || !currentStudent) return null;

  const myBorrows = db.getStudentHistory(currentStudent.id);
  const activeBorrows = myBorrows.filter(b => b.status === 'borrowed');
  const myRequests = db.getStudentRequests(currentStudent.id);
  const pendingRequests = myRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-[#701A1E] to-[#8C242A] text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Circulation Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif mt-2">
              Jambo, {currentUser.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-stone-200">
              Registration: <span className="font-mono font-semibold text-amber-300">{currentStudent.studentIdNumber}</span> · Department: <span className="font-semibold text-white">{currentStudent.department}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('student_catalogue')}
              className="px-4 py-2.5 text-xs font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-stone-950" />
              <span>Browse Catalogue</span>
            </button>
            <button
              onClick={() => onNavigate('student_requests')}
              className="px-4 py-2.5 text-xs font-bold bg-black/25 hover:bg-black/40 text-stone-100 rounded-xl transition-all border border-white/20 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Request Return</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards (Tabular Numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Currently Checked Out
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
              {activeBorrows.length}
            </span>
            <span className="text-xs text-stone-500">of 3 allowed loans</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">Books currently in your possession</p>
        </div>

        <div
          onClick={() => onNavigate('student_requests')}
          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-[#701A1E]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Pending Submissions
            </span>
            <div className="p-2 rounded-lg bg-stone-100 text-[#701A1E]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#701A1E] font-mono tabular-nums">
              {pendingRequests.length}
            </span>
            <span className="text-xs text-stone-500">in review</span>
          </div>
          <p className="mt-1 text-xs text-[#701A1E] font-medium flex items-center gap-1">
            Track approvals <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        <div
          onClick={() => onNavigate('student_history')}
          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-[#701A1E]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Lifetime Loans
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {myBorrows.length}
            </span>
            <span className="text-xs text-stone-500">total records</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">Isolated borrowing history</p>
        </div>
      </div>

      {/* Active Borrowed Books List */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              My Active Library Checkouts ({activeBorrows.length})
            </h2>
            <p className="text-xs text-stone-500">Keep track of due dates to avoid academic loan holds.</p>
          </div>
          <button
            onClick={() => onNavigate('student_catalogue')}
            className="text-xs font-bold text-[#701A1E] hover:underline"
          >
            Borrow Another Title →
          </button>
        </div>

        {activeBorrows.length === 0 ? (
          <div className="p-10 text-center">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">You have no books currently on loan.</p>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Browse the library catalogue to request textbooks, novels, and research literature.
            </p>
            <button
              onClick={() => onNavigate('student_catalogue')}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs"
            >
              Browse Stacks Now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-200">
            {activeBorrows.map(loan => {
              const dueDateObj = new Date(loan.dueDate);
              const now = new Date();
              const diffDays = Math.ceil((dueDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isOverdue = diffDays < 0;
              const isDueSoon = diffDays >= 0 && diffDays <= 3;

              return (
                <div
                  key={loan.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                      {loan.bookTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-mono">
                      <span>Issued: {loan.issueDate}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        Due: <strong className="text-stone-800">{loan.dueDate}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {isOverdue && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        Overdue by {Math.abs(diffDays)} day(s)
                      </span>
                    )}

                    {!isOverdue && isDueSoon && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Due in {diffDays} day(s)
                      </span>
                    )}

                    {!isOverdue && !isDueSoon && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        {diffDays} days remaining
                      </span>
                    )}

                    <button
                      onClick={() => onNavigate('student_requests')}
                      className="px-3 py-1.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      <span>Return</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
