import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Building,
  Calendar,
  Check,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validatePasswordStrength } from '../../lib/security';

export const StudentProfile: React.FC = () => {
  const { currentUser, currentStudent, changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!currentUser || !currentStudent) return null;

  const strength = validatePasswordStrength(newPassword);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await changePassword(currentPassword, newPassword, confirmPassword);
    setLoading(false);
    if (ok) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <h1 className="text-2xl font-bold text-stone-900 font-serif">
          Scholar Profile &amp; Security
        </h1>
        <p className="text-xs text-stone-600 mt-0.5">
          Review academic registration data and manage credential encryption.
        </p>
      </div>

      {currentUser.isDefaultPassword && (
        <div className="p-4 bg-amber-500/15 border border-amber-500/40 rounded-2xl text-xs text-stone-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Security Notice:</span> You are currently using the default seeded student password (<code className="font-mono bg-white px-1.5 py-0.5 rounded text-amber-900">student123</code>). Please set a strong custom password below.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#701A1E] text-amber-400 flex items-center justify-center font-bold text-lg font-serif shadow-xs">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">{currentUser.fullName}</h2>
              <span className="text-xs font-mono text-[#701A1E] font-bold">
                {currentStudent.studentIdNumber}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3 text-stone-700">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{currentUser.email}</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <Building className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{currentStudent.department}</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <Phone className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{currentStudent.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Registered on: {currentStudent.registeredAt}</span>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-stone-500 font-medium">Active Book Checkouts:</span>
              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {currentStudent.activeBorrowsCount} of 3 maximum
              </span>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <KeyRound className="w-5 h-5 text-[#701A1E]" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Change Account Password
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>

              {/* Password meter */}
              {newPassword.length > 0 && (
                <div className="mt-2 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[11px] space-y-1">
                  <div className="flex justify-between font-semibold text-stone-700">
                    <span>OWASP Strength:</span>
                    <span className={strength.valid ? 'text-emerald-700' : 'text-amber-700'}>
                      {strength.score}/5 Satisfied
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <span className={strength.criteria.minLength ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 8+ Characters
                    </span>
                    <span className={strength.criteria.hasUpper ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 1 Uppercase
                    </span>
                    <span className={strength.criteria.hasLower ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 1 Lowercase
                    </span>
                    <span className={strength.criteria.hasDigit ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 1 Digit
                    </span>
                    <span className={`col-span-2 ${strength.criteria.hasSpecial ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                      ✓ 1 Special Character (!@#$%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !strength.valid || newPassword !== confirmPassword}
              className="w-full py-2.5 px-4 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Encrypting & Saving...' : 'Update Password with bcrypt'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
