import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Student, User, UserRole } from '../types';
import { db } from '../lib/database';
import {
  checkLoginAttempts,
  checkPassword,
  hashPassword,
  recordFailedAttempt,
  resetLoginAttempts,
  sanitizeInput,
  validatePasswordStrength,
} from '../lib/security';
import { useFlash } from './FlashContext';

interface AuthContextType {
  currentUser: User | null;
  currentStudent: Student | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  showDefaultPasswordBanner: boolean;
  login: (username: string, password: string, requiredRole: UserRole) => Promise<boolean>;
  logout: () => void;
  registerStudent: (formData: {
    fullName: string;
    studentIdNumber: string;
    username: string;
    email: string;
    department: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string, confirmPass: string) => Promise<boolean>;
  dismissDefaultWarning: () => void;
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const SESSION_STORAGE_KEY = 'chapchap_auth_session_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dismissedWarning, setDismissedWarning] = useState<boolean>(false);
  const flash = useFlash();

  const refreshUserData = useCallback(() => {
    if (!currentUser) return;
    const fresh = db.getUserById(currentUser.id);
    if (fresh) {
      setCurrentUser(fresh);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(fresh));
    }
  }, [currentUser]);

  // Load session on init
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const parsed: User = JSON.parse(stored);
        const validUser = db.getUserById(parsed.id);
        if (validUser) {
          setCurrentUser(validUser);
        } else {
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, []);

  const currentStudent = currentUser && currentUser.role === 'student'
    ? db.getStudentByUsername(currentUser.username) || null
    : null;

  const login = async (usernameInput: string, passwordInput: string, requiredRole: UserRole): Promise<boolean> => {
    const username = sanitizeInput(usernameInput);
    const password = passwordInput;

    if (!username || !password) {
      flash.error('Username and password are required.');
      return false;
    }

    // 1. Check account lockout state (OWASP brute-force defense)
    const lockoutState = checkLoginAttempts(username);
    if (lockoutState.isLocked) {
      const mins = Math.ceil(lockoutState.remainingSeconds / 60);
      flash.security(
        `Account Temporarily Locked: Exceeded 5 failed login attempts. Please wait ${mins} minute(s) before retrying.`,
        'Brute Force Protection'
      );
      return false;
    }

    // 2. Query user record
    const user = db.getUserByUsername(username);

    // Timing-safe simulation / check
    if (!user) {
      const record = recordFailedAttempt(username);
      if (record.isLocked) {
        flash.security(
          'Maximum login attempts exceeded. Account locked for 15 minutes.',
          'Account Locked'
        );
      } else {
        flash.error(
          `Invalid credentials. ${record.attemptsRemaining} attempt(s) remaining before lockout.`,
          'Authentication Failed'
        );
      }
      return false;
    }

    // 3. Enforce Role Separation (Deny by default)
    if (user.role !== requiredRole) {
      const record = recordFailedAttempt(username);
      flash.error(
        `Access Denied: Account "${username}" is registered as a ${user.role.toUpperCase()}, not ${requiredRole.toUpperCase()}. Please switch to the ${user.role} login portal.`,
        'Role Mismatch'
      );
      return false;
    }

    // 4. Verify password with bcrypt
    const passwordMatches = checkPassword(password, user.passwordHash);
    if (!passwordMatches) {
      const record = recordFailedAttempt(username);
      if (record.isLocked) {
        flash.security(
          'Maximum login attempts exceeded (5 failed tries). Account locked for 15 minutes.',
          'Account Locked'
        );
      } else {
        flash.error(
          `Invalid credentials. ${record.attemptsRemaining} attempt(s) remaining before account lockout.`,
          'Authentication Failed'
        );
      }
      return false;
    }

    // 5. Success: Reset brute-force counter
    resetLoginAttempts(username);

    setCurrentUser(user);
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
    setDismissedWarning(false);

    flash.success(`Welcome back, ${user.fullName}!`, `Signed in as ${user.role.toUpperCase()}`);

    if (user.isDefaultPassword) {
      flash.warning(
        'Security Notice: You are using the default password. Please update your password immediately in your profile.',
        'Default Password Detected'
      );
    }

    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(SESSION_STORAGE_KEY);
    flash.info('You have safely signed out of Library Chap Chap.', 'Logged Out');
  };

  const registerStudent = async (formData: {
    fullName: string;
    studentIdNumber: string;
    username: string;
    email: string;
    department: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }): Promise<boolean> => {
    // Validation
    if (formData.password !== formData.confirmPassword) {
      flash.error('Passwords do not match. Please re-type your chosen password.');
      return false;
    }

    // Password strength verification
    const strength = validatePasswordStrength(formData.password);
    if (!strength.valid) {
      flash.error(
        `Password does not meet OWASP criteria: ${strength.errors.join(', ')}.`,
        'Weak Password'
      );
      return false;
    }

    try {
      const passHash = hashPassword(formData.password);
      const { user } = db.registerStudentUser(
        formData.fullName,
        formData.studentIdNumber,
        formData.username,
        formData.email,
        formData.department,
        formData.phone,
        passHash
      );

      // Auto sign-in
      setCurrentUser(user);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(user));
      flash.success(
        `Welcome to Library Chap Chap, ${user.fullName}! Your student library card and account are active.`,
        'Registration Complete'
      );
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please verify your details.';
      flash.error(msg, 'Registration Error');
      return false;
    }
  };

  const changePassword = async (
    oldPass: string,
    newPass: string,
    confirmPass: string
  ): Promise<boolean> => {
    if (!currentUser) {
      flash.error('You must be signed in to change your password.');
      return false;
    }

    if (newPass !== confirmPass) {
      flash.error('The new password and confirmation password do not match.');
      return false;
    }

    // Verify current password
    if (!checkPassword(oldPass, currentUser.passwordHash)) {
      flash.error('The current password entered is incorrect.', 'Password Mismatch');
      return false;
    }

    // Enforce OWASP strength policy on new password
    const strength = validatePasswordStrength(newPass);
    if (!strength.valid) {
      flash.error(
        `New password must satisfy OWASP standards: ${strength.errors.join(', ')}.`,
        'Password Strength Requirement'
      );
      return false;
    }

    if (oldPass === newPass) {
      flash.warning('New password cannot be identical to your existing password.');
      return false;
    }

    const newHash = hashPassword(newPass);
    const success = db.updateUserPassword(currentUser.id, newHash);

    if (success) {
      const updatedUser = { ...currentUser, passwordHash: newHash, isDefaultPassword: false };
      setCurrentUser(updatedUser);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updatedUser));
      flash.success('Your password has been securely updated and encrypted.', 'Security Updated');
      return true;
    } else {
      flash.error('Failed to update password. Please try again.');
      return false;
    }
  };

  const dismissDefaultWarning = () => {
    setDismissedWarning(true);
  };

  const showDefaultPasswordBanner = Boolean(
    currentUser && currentUser.isDefaultPassword && !dismissedWarning
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentStudent,
        role: currentUser?.role || null,
        isAuthenticated: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        isStudent: currentUser?.role === 'student',
        showDefaultPasswordBanner,
        login,
        logout,
        registerStudent,
        changePassword,
        dismissDefaultWarning,
        refreshUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
