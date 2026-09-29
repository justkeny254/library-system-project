export type UserRole = 'admin' | 'student';

export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  department?: string;
  studentIdNumber?: string;
  phone?: string;
  passwordHash: string;
  isDefaultPassword: boolean;
  createdAt: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  totalCopies: number;
  availableCopies: number;
  rackLocation: string;
  publicationYear: number;
  summary?: string;
  coverColor?: string;
}

export interface Student {
  id: string;
  studentIdNumber: string;
  fullName: string;
  username: string;
  email: string;
  department: string;
  phone: string;
  activeBorrowsCount: number;
  registeredAt: string;
}

export type BorrowStatus = 'borrowed' | 'returned' | 'overdue';

export interface BorrowRecord {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  studentIdNumber: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: BorrowStatus;
  issuedByAdminId: string;
  remarks?: string;
}

export type RequestType = 'borrow' | 'return';
export type RequestStatus = 'pending' | 'approved' | 'declined';

export interface BorrowRequest {
  id: string;
  bookId: string;
  bookTitle: string;
  studentId: string;
  studentName: string;
  studentIdNumber: string;
  type: RequestType;
  borrowRecordId?: string;
  status: RequestStatus;
  requestDate: string;
  resolvedDate?: string;
  resolvedByAdminId?: string;
  adminNotes?: string;
  studentNotes?: string;
}

export interface LoginAttemptRecord {
  username: string;
  attempts: number;
  lastAttemptAt: number;
  lockedUntil: number | null;
}

export type FlashType = 'success' | 'error' | 'warning' | 'info' | 'security';

export interface FlashMessage {
  id: string;
  type: FlashType;
  title?: string;
  message: string;
  timestamp: number;
  duration?: number;
}
