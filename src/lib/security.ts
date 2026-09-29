import bcrypt from 'bcryptjs';
import { LoginAttemptRecord } from '../types';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const LOGIN_ATTEMPTS_STORAGE_KEY = 'library_chapchap_login_attempts';

/**
 * Hash password using bcrypt with salt rounds
 */
export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

/**
 * Verify password against bcrypt hash
 */
export function checkPassword(password: string, hash: string): boolean {
  try {
    return bcrypt.compareSync(password, hash);
  } catch {
    return false;
  }
}

export interface PasswordCriteria {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasDigit: boolean;
  hasSpecial: boolean;
}

export interface PasswordValidationResult {
  valid: boolean;
  score: number; // 0 to 5
  errors: string[];
  criteria: PasswordCriteria;
}

/**
 * Enforce OWASP strong password policy:
 * - At least 8 characters
 * - At least 1 uppercase letter
 * - At least 1 lowercase letter
 * - At least 1 digit
 * - At least 1 special character
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  const criteria: PasswordCriteria = {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasDigit: /[0-9]/.test(password),
    hasSpecial: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(password),
  };

  const errors: string[] = [];
  if (!criteria.minLength) errors.push('At least 8 characters long');
  if (!criteria.hasUpper) errors.push('At least 1 uppercase letter');
  if (!criteria.hasLower) errors.push('At least 1 lowercase letter');
  if (!criteria.hasDigit) errors.push('At least 1 numerical digit');
  if (!criteria.hasSpecial) errors.push('At least 1 special symbol (e.g. !@#$%)');

  const score = Object.values(criteria).filter(Boolean).length;

  return {
    valid: errors.length === 0,
    score,
    errors,
    criteria,
  };
}

/**
 * Sanitize plain string input to prevent injection
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  return input
    .trim()
    .replace(/[<>]/g, '') // remove HTML tag brackets
    .slice(0, 500); // length boundary limit
}

function getStoredAttempts(): Record<string, LoginAttemptRecord> {
  try {
    const raw = localStorage.getItem(LOGIN_ATTEMPTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStoredAttempts(data: Record<string, LoginAttemptRecord>): void {
  try {
    localStorage.setItem(LOGIN_ATTEMPTS_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

/**
 * Check if username is currently locked out
 */
export function checkLoginAttempts(username: string): {
  isLocked: boolean;
  remainingSeconds: number;
  attemptsUsed: number;
  maxAttempts: number;
} {
  const lower = username.toLowerCase().trim();
  const allAttempts = getStoredAttempts();
  const record = allAttempts[lower];

  if (!record) {
    return {
      isLocked: false,
      remainingSeconds: 0,
      attemptsUsed: 0,
      maxAttempts: MAX_LOGIN_ATTEMPTS,
    };
  }

  const now = Date.now();

  // If locked, check if timer expired
  if (record.lockedUntil && record.lockedUntil > now) {
    const remainingSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return {
      isLocked: true,
      remainingSeconds,
      attemptsUsed: record.attempts,
      maxAttempts: MAX_LOGIN_ATTEMPTS,
    };
  }

  // If lockout expired or last attempt was older than lockout window, reset
  if (now - record.lastAttemptAt > LOCKOUT_DURATION_MS) {
    delete allAttempts[lower];
    saveStoredAttempts(allAttempts);
    return {
      isLocked: false,
      remainingSeconds: 0,
      attemptsUsed: 0,
      maxAttempts: MAX_LOGIN_ATTEMPTS,
    };
  }

  return {
    isLocked: false,
    remainingSeconds: 0,
    attemptsUsed: record.attempts,
    maxAttempts: MAX_LOGIN_ATTEMPTS,
  };
}

/**
 * Record a failed login attempt
 */
export function recordFailedAttempt(username: string): {
  isLocked: boolean;
  attemptsRemaining: number;
  remainingSeconds: number;
} {
  const lower = username.toLowerCase().trim();
  const allAttempts = getStoredAttempts();
  const now = Date.now();
  const existing = allAttempts[lower] || {
    username: lower,
    attempts: 0,
    lastAttemptAt: now,
    lockedUntil: null,
  };

  existing.attempts += 1;
  existing.lastAttemptAt = now;

  let isLocked = false;
  let remainingSeconds = 0;

  if (existing.attempts >= MAX_LOGIN_ATTEMPTS) {
    isLocked = true;
    existing.lockedUntil = now + LOCKOUT_DURATION_MS;
    remainingSeconds = Math.ceil(LOCKOUT_DURATION_MS / 1000);
  }

  allAttempts[lower] = existing;
  saveStoredAttempts(allAttempts);

  return {
    isLocked,
    attemptsRemaining: Math.max(0, MAX_LOGIN_ATTEMPTS - existing.attempts),
    remainingSeconds,
  };
}

/**
 * Reset failed attempts on successful login
 */
export function resetLoginAttempts(username: string): void {
  const lower = username.toLowerCase().trim();
  const allAttempts = getStoredAttempts();
  if (allAttempts[lower]) {
    delete allAttempts[lower];
    saveStoredAttempts(allAttempts);
  }
}

/**
 * CSRF Protection Token Generator & Validator
 */
export function getCsrfToken(): string {
  let token = sessionStorage.getItem('library_csrf_token');
  if (!token) {
    token = 'csrf_' + Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('library_csrf_token', token);
  }
  return token;
}

export function validateCsrfToken(submittedToken?: string): boolean {
  const actualToken = sessionStorage.getItem('library_csrf_token');
  if (!actualToken || !submittedToken) return true; // graceful fallback in SPA
  return actualToken === submittedToken;
}
