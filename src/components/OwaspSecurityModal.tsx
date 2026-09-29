import React from 'react';
import { X, ShieldCheck, KeyRound, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';

interface OwaspSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwaspSecurityModal: React.FC<OwaspSecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const securityMeasures = [
    {
      category: 'A01: Broken Access Control',
      badge: 'RBAC & Strict Isolation',
      icon: <UserCheck className="w-5 h-5 text-emerald-500" />,
      description:
        'Deny-by-default role guards (@admin_required, @student_required). Students cannot approve requests or delete records. Student borrow history and profile records are strictly isolated by session user ID.',
    },
    {
      category: 'A02: Cryptographic Failures',
      badge: 'bcrypt & Salted Hashes',
      icon: <KeyRound className="w-5 h-5 text-amber-500" />,
      description:
        'All passwords hashed using salted bcrypt (cost factor 10). No plaintext or vulnerable legacy SHA-256 passwords allowed. Default credentials generate persistent security alerts on first login.',
    },
    {
      category: 'A03: Injection & XSS',
      badge: 'Parameterized & Sanitized',
      icon: <Database className="w-5 h-5 text-sky-500" />,
      description:
        'All database queries use parameterized access patterns preventing SQL injection. User inputs are sanitized to strip malicious script tags and prevent cross-site scripting (XSS).',
    },
    {
      category: 'A04: Insecure Design',
      badge: 'Business Logic Guards',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      description:
        'Server-side concurrency and availability verification prevents double-issuing or borrowing out-of-stock titles. Duplicate pending requests for the same book are strictly rejected at the service level.',
    },
    {
      category: 'A05: Security Misconfiguration',
      badge: 'Hardened Defaults',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      description:
        'Warning banner displayed when default seeded accounts (admin123 / student123) are active. Generic error boundaries without sensitive stack trace leakage.',
    },
    {
      category: 'A07: Identification & Auth Failures',
      badge: 'Rate Limiting & Lockout',
      icon: <Lock className="w-5 h-5 text-rose-500" />,
      description:
        'Account lockout defense: 5 consecutive failed login attempts trigger an immediate 15-minute lockout timer. Enforces OWASP password complexity (8+ chars, uppercase, digit, special character).',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base tracking-tight">OWASP Security Architecture</h3>
              <p className="text-xs text-stone-300">Library Chap Chap Defense & Hardening Matrix</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Library Chap Chap has been engineered with defense-in-depth, incorporating the OWASP Top 10 security controls across identity, access control, cryptography, and business logic verification:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {securityMeasures.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-2xs shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 mb-1">
                      {item.badge}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-950">
            <span className="font-bold">Automated Penetration Self-Test:</span> Attempting 6 wrong password inputs on the login portal activates the automated 15-minute brute-force lockout. Trying to borrow unavailable books or approve already borrowed titles triggers instant transaction rejection.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors"
          >
            Close Security Specifications
          </button>
        </div>
      </div>
    </div>
  );
};
