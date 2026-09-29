import React, { useState } from 'react';
import { X, Lock, Check, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validatePasswordStrength } from '../lib/security';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const strength = validatePasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await changePassword(currentPassword, newPassword, confirmPassword);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-tight">Update Account Password</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter strong new password"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            {/* Password requirements meter */}
            {newPassword.length > 0 && (
              <div className="mt-2.5 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-600 mb-1 font-semibold">
                  <span>OWASP Security Score:</span>
                  <span
                    className={
                      strength.score >= 5
                        ? 'text-emerald-700 font-bold'
                        : strength.score >= 3
                        ? 'text-amber-600 font-bold'
                        : 'text-rose-600 font-bold'
                    }
                  >
                    {strength.score} / 5
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <span className={`flex items-center gap-1 ${strength.criteria.minLength ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${strength.criteria.hasUpper ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${strength.criteria.hasLower ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${strength.criteria.hasDigit ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Number
                  </span>
                  <span className={`flex items-center gap-1 col-span-2 ${strength.criteria.hasSpecial ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Special Character (!@#$%)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-rose-600 mt-1 font-medium">Passwords do not match.</p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !strength.valid || newPassword !== confirmPassword}
              className="px-4 py-2 text-xs font-semibold bg-[#701A1E] text-white hover:bg-[#8C242A] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
            >
              {loading ? 'Encrypting & Saving...' : 'Save New Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
