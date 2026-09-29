import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  ShieldCheck,
  GraduationCap,
  KeyRound,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { checkLoginAttempts, validatePasswordStrength } from '../lib/security';

interface AuthViewProps {
  initialTab?: 'admin' | 'student' | 'register';
  onSuccess?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialTab = 'student',
  onSuccess,
}) => {
  const { login, registerStudent } = useAuth();
  const [activeTab, setActiveTab] = useState<'admin' | 'student' | 'register'>(initialTab);

  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Lockout inspection
  const [lockoutStatus, setLockoutStatus] = useState(checkLoginAttempts(username));

  // Registration states
  const [regFullName, setRegFullName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDepartment, setRegDepartment] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const regStrength = validatePasswordStrength(regPassword);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (username) {
      setLockoutStatus(checkLoginAttempts(username));
    }
  }, [username]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const targetRole = activeTab === 'admin' ? 'admin' : 'student';
    const ok = await login(username, password, targetRole);
    setLoading(false);
    if (ok) {
      onSuccess?.();
    } else {
      setLockoutStatus(checkLoginAttempts(username));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await registerStudent({
      fullName: regFullName,
      studentIdNumber: regStudentId,
      username: regUsername,
      email: regEmail,
      department: regDepartment,
      phone: regPhone,
      password: regPassword,
      confirmPassword: regConfirmPassword,
    });
    setLoading(false);
    if (ok) {
      onSuccess?.();
    }
  };

  const fillCredentials = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Header Branding */}
        <div className="bg-[#701A1E] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
          <div className="inline-flex p-3 bg-amber-400 text-[#701A1E] rounded-2xl mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight font-serif">
            Library Chap Chap Portal
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-sm mx-auto">
            Authorized university circulation and catalog account authentication.
          </p>
        </div>

        {/* Role Segmented Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 p-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('student');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Student Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Admin / Librarian</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Register</span>
          </button>
        </div>

        {/* Tab 1 & 2: Login Forms */}
        {activeTab !== 'register' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Account Lockout Notice */}
            {lockoutStatus.isLocked && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Account Temporarily Locked</span>
                </div>
                <p>
                  Exceeded 5 failed attempts. Locked for security compliance. Remaining duration:{' '}
                  <span className="font-mono font-bold">
                    {Math.ceil(lockoutStatus.remainingSeconds / 60)} minute(s)
                  </span>.
                </p>
              </div>
            )}

            {!lockoutStatus.isLocked && lockoutStatus.attemptsUsed > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Failed attempts: <strong className="font-mono">{lockoutStatus.attemptsUsed}/5</strong>.
                  5 failed tries locks account for 15 minutes.
                </span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  {activeTab === 'admin' ? 'Librarian Username' : 'Student Username'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={activeTab === 'admin' ? 'e.g. admin' : 'e.g. brian or amina'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
                  />
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || lockoutStatus.isLocked}
                className="w-full py-3 px-4 text-sm font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating with bcrypt...' : `Sign In as ${activeTab === 'admin' ? 'Admin' : 'Student'}`}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-stone-500">
              {activeTab === 'admin' ? (
                <span>Need to access your student account? Switch to Student tab above.</span>
              ) : (
                <span>
                  Don&apos;t have a student library card?{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="font-bold text-[#701A1E] hover:underline"
                  >
                    Register here
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Student Registration Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={e => setRegFullName(e.target.value)}
                  placeholder="e.g. Grace Wanjiku"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Student Reg Number
                </label>
                <input
                  type="text"
                  required
                  value={regStudentId}
                  onChange={e => setRegStudentId(e.target.value)}
                  placeholder="e.g. SCC/00234/2024"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={e => setRegUsername(e.target.value)}
                    placeholder="e.g. grace"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  University Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="grace@chapchap.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Department / Course
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regDepartment}
                    onChange={e => setRegDepartment(e.target.value)}
                    placeholder="e.g. Information Technology"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Password (OWASP Strong Policy)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="Create secure password (8+ chars, upper, digit, symbol)"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>

              {/* Password strength real-time indicator */}
              <div className="mt-2 p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between text-stone-600 font-semibold mb-1">
                  <span>OWASP Complexity Requirements:</span>
                  <span
                    className={
                      regStrength.score >= 5
                        ? 'text-emerald-700 font-bold'
                        : regStrength.score >= 3
                        ? 'text-amber-600 font-bold'
                        : 'text-rose-600 font-bold'
                    }
                  >
                    {regStrength.score}/5 Satisfied
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <span className={`flex items-center gap-1 ${regStrength.criteria.minLength ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${regStrength.criteria.hasUpper ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${regStrength.criteria.hasLower ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${regStrength.criteria.hasDigit ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Number
                  </span>
                  <span className={`flex items-center gap-1 col-span-2 ${regStrength.criteria.hasSpecial ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Special Character (!@#$%)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={e => setRegConfirmPassword(e.target.value)}
                  placeholder="Re-enter chosen password"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
              {regConfirmPassword && regPassword !== regConfirmPassword && (
                <p className="text-xs text-rose-600 mt-1 font-medium">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !regStrength.valid || regPassword !== regConfirmPassword}
              className="w-full py-3 px-4 text-sm font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Student Profile...' : 'Complete Student Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
