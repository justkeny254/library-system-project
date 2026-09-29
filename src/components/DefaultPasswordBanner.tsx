import React, { useState } from 'react';
import { AlertTriangle, KeyRound, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChangePasswordModal } from './ChangePasswordModal';

export const DefaultPasswordBanner: React.FC = () => {
  const { showDefaultPasswordBanner, dismissDefaultWarning, currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (!showDefaultPasswordBanner || !currentUser) return null;

  return (
    <>
      <div className="bg-amber-500/15 border-b border-amber-500/30 text-stone-900 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="p-1 bg-amber-500 text-stone-950 rounded-md font-bold shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-stone-900">Default Credentials Warning (OWASP A05):</span>{' '}
              <span className="text-stone-700">
                Your account is currently using the initial default password ({currentUser.role === 'admin' ? 'admin123' : 'student123'}). Please set a strong custom password.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              Change Password Now
            </button>
            <button
              onClick={dismissDefaultWarning}
              className="p-1 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200/50 transition-colors"
              title="Dismiss warning for this session"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showModal && <ChangePasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
};
