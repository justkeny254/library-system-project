import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Trash2,
  Edit2,
  X,
  History,
  BookOpen,
} from 'lucide-react';
import { BorrowRecord, Student } from '../../types';
import { db } from '../../lib/database';
import { useFlash } from '../../context/FlashContext';

export const AdminStudents: React.FC = () => {
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const students = db.getStudents();
  const [search, setSearch] = useState('');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [historyStudent, setHistoryStudent] = useState<Student | null>(null);
  const [studentHistoryRecords, setStudentHistoryRecords] = useState<BorrowRecord[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    studentIdNumber: '',
    username: '',
    email: '',
    department: 'Computer Science',
    phone: '',
  });

  const filteredStudents = students.filter(s =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.studentIdNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      fullName: '',
      studentIdNumber: '',
      username: '',
      email: '',
      department: 'Computer Science',
      phone: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (s: Student) => {
    setEditingStudent(s);
    setFormData({
      fullName: s.fullName,
      studentIdNumber: s.studentIdNumber,
      username: s.username,
      email: s.email,
      department: s.department,
      phone: s.phone,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenHistory = (s: Student) => {
    setHistoryStudent(s);
    setStudentHistoryRecords(db.getStudentHistory(s.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        db.updateStudent(editingStudent.id, {
          fullName: formData.fullName,
          studentIdNumber: formData.studentIdNumber,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
        });
        flash.success(`Student ${formData.fullName} record updated.`);
      } else {
        db.addStudent({
          fullName: formData.fullName,
          studentIdNumber: formData.studentIdNumber,
          username: formData.username,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
        });
        flash.success(`Student ${formData.fullName} registered.`);
      }
      setIsAddModalOpen(false);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed.';
      flash.error(msg);
    }
  };

  const handleDelete = (s: Student) => {
    const confirm = window.confirm(
      `Are you sure you want to delete student record for ${s.fullName} (${s.studentIdNumber})?`
    );
    if (!confirm) return;

    try {
      db.deleteStudent(s.id);
      flash.success(`Student record for ${s.fullName} removed.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot delete student.';
      flash.error(msg, 'Active Loan Violation');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Student Membership Records
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Registered scholars, academic department credentials, and borrowing standing.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Register Student</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs">
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by student name, reg number, department, or email..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Reg Number</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-center">Active Loans</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-stone-500">
                    No student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      {s.fullName}
                      <span className="block text-[11px] font-mono text-stone-400 font-normal">
                        @{s.username}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-700 font-bold whitespace-nowrap">
                      {s.studentIdNumber}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700 font-medium">
                      {s.department}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-stone-700">{s.email}</div>
                      <div className="text-[11px] text-stone-500">{s.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                          s.activeBorrowsCount > 0
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {s.activeBorrowsCount} books
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px] whitespace-nowrap">
                      {s.registeredAt}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenHistory(s)}
                          className="p-1.5 text-stone-600 hover:text-[#701A1E] hover:bg-stone-100 rounded-lg transition-colors"
                          title="View Borrowing History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Edit Student Info"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s)}
                          className="p-1.5 text-rose-600 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base tracking-tight">
                  {editingStudent ? 'Edit Student Details' : 'Register New Student'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentIdNumber}
                  onChange={e => setFormData({ ...formData, studentIdNumber: e.target.value })}
                  placeholder="e.g. SCC/00500/2024"
                  className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              {!editingStudent && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    placeholder="e.g. jdoe"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  University Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jdoe@chapchap.edu"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Mechanical Engineering"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254 700 000 000"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg shadow-sm"
                >
                  {editingStudent ? 'Save Changes' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Loan History Modal */}
      {historyStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base tracking-tight">
                  Borrowing History: {historyStudent.fullName}
                </h3>
                <p className="text-xs text-stone-300 font-mono">
                  {historyStudent.studentIdNumber} · {historyStudent.department}
                </p>
              </div>
              <button
                onClick={() => setHistoryStudent(null)}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {studentHistoryRecords.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500">
                  No past or current borrowing records for this student.
                </div>
              ) : (
                <div className="space-y-3">
                  {studentHistoryRecords.map(rec => (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                          {rec.bookTitle}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 font-mono">
                          <span>Issued: {rec.issueDate}</span>
                          <span>Due: {rec.dueDate}</span>
                          {rec.returnDate && (
                            <span className="text-emerald-700 font-semibold">
                              Returned: {rec.returnDate}
                            </span>
                          )}
                        </div>
                        {rec.remarks && (
                          <p className="text-xs text-stone-600 mt-1 italic">{rec.remarks}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider shrink-0 ${
                          rec.status === 'returned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setHistoryStudent(null)}
                className="px-4 py-2 text-xs font-bold bg-[#701A1E] text-white rounded-lg hover:bg-[#8C242A]"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
