import { Book, BorrowRecord, BorrowRequest, Student, User } from '../types';
import { hashPassword } from './security';

const STORAGE_KEY_USERS = 'chapchap_db_users_v2';
const STORAGE_KEY_STUDENTS = 'chapchap_db_students_v2';
const STORAGE_KEY_BOOKS = 'chapchap_db_books_v2';
const STORAGE_KEY_BORROWS = 'chapchap_db_borrows_v2';
const STORAGE_KEY_REQUESTS = 'chapchap_db_requests_v2';

// Initial Seeds
const DEFAULT_ADMIN_HASH = hashPassword('admin123');
const DEFAULT_STUDENT_HASH = hashPassword('student123');

const INITIAL_USERS: User[] = [
  {
    id: 'user_admin_1',
    username: 'admin',
    fullName: 'Margaret Mwangi',
    email: 'admin@chapchap.edu',
    role: 'admin',
    department: 'University Library Services',
    phone: '+254 700 111 222',
    passwordHash: DEFAULT_ADMIN_HASH,
    isDefaultPassword: true,
    createdAt: '2026-01-10T08:00:00.000Z',
  },
  {
    id: 'user_student_brian',
    username: 'brian',
    fullName: 'Brian Otieno',
    email: 'brian@chapchap.edu',
    role: 'student',
    studentIdNumber: 'SCC/00142/2023',
    department: 'Computer Science',
    phone: '+254 712 345 678',
    passwordHash: DEFAULT_STUDENT_HASH,
    isDefaultPassword: true,
    createdAt: '2026-01-15T09:30:00.000Z',
  },
  {
    id: 'user_student_amina',
    username: 'amina',
    fullName: 'Amina Hassan',
    email: 'amina@chapchap.edu',
    role: 'student',
    studentIdNumber: 'SED/00089/2023',
    department: 'Literature & Languages',
    phone: '+254 723 456 789',
    passwordHash: DEFAULT_STUDENT_HASH,
    isDefaultPassword: true,
    createdAt: '2026-01-16T11:15:00.000Z',
  },
];

const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stud_brian',
    studentIdNumber: 'SCC/00142/2023',
    fullName: 'Brian Otieno',
    username: 'brian',
    email: 'brian@chapchap.edu',
    department: 'Computer Science',
    phone: '+254 712 345 678',
    activeBorrowsCount: 1,
    registeredAt: '2026-01-15',
  },
  {
    id: 'stud_amina',
    studentIdNumber: 'SED/00089/2023',
    fullName: 'Amina Hassan',
    username: 'amina',
    email: 'amina@chapchap.edu',
    department: 'Literature & Languages',
    phone: '+254 723 456 789',
    activeBorrowsCount: 1,
    registeredAt: '2026-01-16',
  },
  {
    id: 'stud_kevin',
    studentIdNumber: 'SEN/00210/2024',
    fullName: 'Kevin Kiprop',
    username: 'kevin',
    email: 'kevin@chapchap.edu',
    department: 'Civil Engineering',
    phone: '+254 734 567 890',
    activeBorrowsCount: 0,
    registeredAt: '2026-02-01',
  },
];

const INITIAL_BOOKS: Book[] = [
  {
    id: 'bk_1',
    title: 'Introduction to Algorithms (4th Edition)',
    author: 'Thomas H. Cormen, Charles E. Leiserson',
    isbn: '978-0262046305',
    genre: 'Computer Science',
    totalCopies: 5,
    availableCopies: 4,
    rackLocation: 'Section B, Shelf 04',
    publicationYear: 2022,
    summary: 'The standard comprehensive textbook on data structures and algorithms.',
    coverColor: '#701A1E',
  },
  {
    id: 'bk_2',
    title: 'Clean Architecture: A Craftsman’s Guide',
    author: 'Robert C. Martin',
    isbn: '978-0134494166',
    genre: 'Software Engineering',
    totalCopies: 4,
    availableCopies: 3,
    rackLocation: 'Section B, Shelf 07',
    publicationYear: 2018,
    summary: 'Universal rules of software architecture for web, database, and embedded systems.',
    coverColor: '#8C242A',
  },
  {
    id: 'bk_3',
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    isbn: '978-0385474542',
    genre: 'African Literature',
    totalCopies: 6,
    availableCopies: 5,
    rackLocation: 'Section L, Shelf 02',
    publicationYear: 1958,
    summary: 'Classic masterpiece depicting pre-colonial life in Nigeria and European colonization.',
    coverColor: '#92400E',
  },
  {
    id: 'bk_4',
    title: 'Petals of Blood',
    author: 'Ngũgĩ wa Thiong’o',
    isbn: '978-0143105749',
    genre: 'African Literature',
    totalCopies: 4,
    availableCopies: 4,
    rackLocation: 'Section L, Shelf 03',
    publicationYear: 1977,
    summary: 'Definitive Kenyan social drama tracking the investigation of a suspicious tragedy in Ilmorog.',
    coverColor: '#B45309',
  },
  {
    id: 'bk_5',
    title: 'Modern Operating Systems (5th Edition)',
    author: 'Andrew S. Tanenbaum, Herbert Bos',
    isbn: '978-0137618880',
    genre: 'Computer Science',
    totalCopies: 3,
    availableCopies: 3,
    rackLocation: 'Section B, Shelf 09',
    publicationYear: 2023,
    summary: 'Comprehensive coverage of OS fundamentals, concurrency, virtual memory, and security.',
    coverColor: '#450A0A',
  },
  {
    id: 'bk_6',
    title: 'Principles of Neural Science',
    author: 'Eric R. Kandel et al.',
    isbn: '978-1259642234',
    genre: 'Medicine & Health',
    totalCopies: 2,
    availableCopies: 2,
    rackLocation: 'Section M, Shelf 11',
    publicationYear: 2021,
    summary: 'The leading foundational text in cellular neurobiology and brain function.',
    coverColor: '#78350F',
  },
  {
    id: 'bk_7',
    title: 'Microeconomics: Theory and Applications',
    author: 'Dominick Salvatore',
    isbn: '978-0199337033',
    genre: 'Economics',
    totalCopies: 5,
    availableCopies: 5,
    rackLocation: 'Section E, Shelf 05',
    publicationYear: 2020,
    summary: 'Applied analytical approach to consumer theory, markets, and microeconomic behavior.',
    coverColor: '#713F12',
  },
];

const INITIAL_BORROWS: BorrowRecord[] = [
  {
    id: 'borrow_1',
    bookId: 'bk_1',
    bookTitle: 'Introduction to Algorithms (4th Edition)',
    studentId: 'stud_brian',
    studentName: 'Brian Otieno',
    studentIdNumber: 'SCC/00142/2023',
    issueDate: '2026-09-18',
    dueDate: '2026-10-02',
    returnDate: null,
    status: 'borrowed',
    issuedByAdminId: 'user_admin_1',
    remarks: 'Standard 14-day checkout for academic research project.',
  },
  {
    id: 'borrow_2',
    bookId: 'bk_3',
    bookTitle: 'Things Fall Apart',
    studentId: 'stud_amina',
    studentName: 'Amina Hassan',
    studentIdNumber: 'SED/00089/2023',
    issueDate: '2026-09-20',
    dueDate: '2026-10-04',
    returnDate: null,
    status: 'borrowed',
    issuedByAdminId: 'user_admin_1',
    remarks: 'Coursework loan for Literature Seminar 301.',
  },
];

const INITIAL_REQUESTS: BorrowRequest[] = [
  {
    id: 'req_1',
    bookId: 'bk_2',
    bookTitle: 'Clean Architecture: A Craftsman’s Guide',
    studentId: 'stud_brian',
    studentName: 'Brian Otieno',
    studentIdNumber: 'SCC/00142/2023',
    type: 'borrow',
    status: 'pending',
    requestDate: '2026-09-28T14:30:00.000Z',
    studentNotes: 'Needed for software design pattern semester assignment.',
  },
];

class LibraryDatabase {
  private get<T>(key: string, defaultVal: T): T {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) {
        localStorage.setItem(key, JSON.stringify(defaultVal));
        return defaultVal;
      }
      return JSON.parse(raw);
    } catch {
      return defaultVal;
    }
  }

  private set<T>(key: string, val: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Storage write error:', e);
    }
  }

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(STORAGE_KEY_USERS)) {
      this.set(STORAGE_KEY_USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(STORAGE_KEY_STUDENTS)) {
      this.set(STORAGE_KEY_STUDENTS, INITIAL_STUDENTS);
    }
    if (!localStorage.getItem(STORAGE_KEY_BOOKS)) {
      this.set(STORAGE_KEY_BOOKS, INITIAL_BOOKS);
    }
    if (!localStorage.getItem(STORAGE_KEY_BORROWS)) {
      this.set(STORAGE_KEY_BORROWS, INITIAL_BORROWS);
    }
    if (!localStorage.getItem(STORAGE_KEY_REQUESTS)) {
      this.set(STORAGE_KEY_REQUESTS, INITIAL_REQUESTS);
    }
  }

  // --- Users & Auth ---
  public getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEY_USERS, INITIAL_USERS);
  }

  public getUserByUsername(username: string): User | undefined {
    const users = this.getUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
  }

  public getUserById(id: string): User | undefined {
    return this.getUsers().find(u => u.id === id);
  }

  public updateUserPassword(userId: string, newHash: string): boolean {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === userId);
    if (idx === -1) return false;
    users[idx].passwordHash = newHash;
    users[idx].isDefaultPassword = false;
    this.set(STORAGE_KEY_USERS, users);
    return true;
  }

  public registerStudentUser(
    fullName: string,
    studentIdNumber: string,
    username: string,
    email: string,
    department: string,
    phone: string,
    passwordHash: string
  ): { user: User; student: Student } {
    const users = this.getUsers();
    const students = this.getStudents();

    // Check unique username
    if (users.some(u => u.username.toLowerCase() === username.toLowerCase().trim())) {
      throw new Error(`Username "${username}" is already taken. Please choose another.`);
    }

    // Check unique student ID
    if (students.some(s => s.studentIdNumber.toUpperCase() === studentIdNumber.toUpperCase().trim())) {
      throw new Error(`Student Registration Number "${studentIdNumber}" already exists.`);
    }

    const userId = 'user_stud_' + Date.now();
    const studentDbId = 'stud_' + Date.now();

    const newUser: User = {
      id: userId,
      username: username.toLowerCase().trim(),
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      role: 'student',
      studentIdNumber: studentIdNumber.toUpperCase().trim(),
      department: department.trim(),
      phone: phone.trim(),
      passwordHash,
      isDefaultPassword: false,
      createdAt: new Date().toISOString(),
    };

    const newStudent: Student = {
      id: studentDbId,
      studentIdNumber: studentIdNumber.toUpperCase().trim(),
      fullName: fullName.trim(),
      username: username.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      department: department.trim(),
      phone: phone.trim(),
      activeBorrowsCount: 0,
      registeredAt: new Date().toISOString().split('T')[0],
    };

    users.push(newUser);
    students.push(newStudent);

    this.set(STORAGE_KEY_USERS, users);
    this.set(STORAGE_KEY_STUDENTS, students);

    return { user: newUser, student: newStudent };
  }

  // --- Students ---
  public getStudents(): Student[] {
    return this.get<Student[]>(STORAGE_KEY_STUDENTS, INITIAL_STUDENTS);
  }

  public getStudentByUsername(username: string): Student | undefined {
    return this.getStudents().find(s => s.username.toLowerCase() === username.toLowerCase().trim());
  }

  public getStudentById(id: string): Student | undefined {
    return this.getStudents().find(s => s.id === id);
  }

  public addStudent(studentData: Omit<Student, 'id' | 'activeBorrowsCount' | 'registeredAt'>): Student {
    const students = this.getStudents();
    if (students.some(s => s.studentIdNumber.toUpperCase() === studentData.studentIdNumber.toUpperCase().trim())) {
      throw new Error(`Registration Number "${studentData.studentIdNumber}" is already registered.`);
    }

    const newStudent: Student = {
      id: 'stud_' + Date.now(),
      studentIdNumber: studentData.studentIdNumber.toUpperCase().trim(),
      fullName: studentData.fullName.trim(),
      username: studentData.username.toLowerCase().trim(),
      email: studentData.email.toLowerCase().trim(),
      department: studentData.department.trim(),
      phone: studentData.phone.trim(),
      activeBorrowsCount: 0,
      registeredAt: new Date().toISOString().split('T')[0],
    };

    students.push(newStudent);
    this.set(STORAGE_KEY_STUDENTS, students);
    return newStudent;
  }

  public updateStudent(studentId: string, updates: Partial<Student>): Student {
    const students = this.getStudents();
    const idx = students.findIndex(s => s.id === studentId);
    if (idx === -1) throw new Error('Student record not found.');

    students[idx] = { ...students[idx], ...updates };
    this.set(STORAGE_KEY_STUDENTS, students);
    return students[idx];
  }

  public deleteStudent(studentId: string): void {
    const students = this.getStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) throw new Error('Student record not found.');

    // Security check: cannot delete student with unreturned books!
    const borrows = this.getBorrows();
    const hasActiveLoans = borrows.some(b => b.studentId === studentId && b.status === 'borrowed');
    if (hasActiveLoans || student.activeBorrowsCount > 0) {
      throw new Error(`Cannot delete student ${student.fullName}. They currently have active unreturned library books.`);
    }

    const filtered = students.filter(s => s.id !== studentId);
    this.set(STORAGE_KEY_STUDENTS, filtered);

    // Also remove linked user account
    const users = this.getUsers().filter(u => u.username.toLowerCase() !== student.username.toLowerCase());
    this.set(STORAGE_KEY_USERS, users);
  }

  // --- Books ---
  public getBooks(): Book[] {
    return this.get<Book[]>(STORAGE_KEY_BOOKS, INITIAL_BOOKS);
  }

  public getBookById(id: string): Book | undefined {
    return this.getBooks().find(b => b.id === id);
  }

  public addBook(bookData: Omit<Book, 'id' | 'availableCopies'> & { availableCopies?: number }): Book {
    const books = this.getBooks();
    const cleanIsbn = bookData.isbn.trim();

    if (books.some(b => b.isbn.replace(/-/g, '') === cleanIsbn.replace(/-/g, ''))) {
      throw new Error(`A book with ISBN "${cleanIsbn}" already exists in the catalog.`);
    }

    const newBook: Book = {
      id: 'bk_' + Date.now(),
      title: bookData.title.trim(),
      author: bookData.author.trim(),
      isbn: cleanIsbn,
      genre: bookData.genre.trim(),
      totalCopies: Number(bookData.totalCopies),
      availableCopies: bookData.availableCopies !== undefined ? Number(bookData.availableCopies) : Number(bookData.totalCopies),
      rackLocation: bookData.rackLocation.trim(),
      publicationYear: Number(bookData.publicationYear),
      summary: bookData.summary?.trim() || '',
      coverColor: bookData.coverColor || '#701A1E',
    };

    books.push(newBook);
    this.set(STORAGE_KEY_BOOKS, books);
    return newBook;
  }

  public updateBook(bookId: string, updates: Partial<Book>): Book {
    const books = this.getBooks();
    const idx = books.findIndex(b => b.id === bookId);
    if (idx === -1) throw new Error('Book record not found.');

    const current = books[idx];
    const totalCopies = updates.totalCopies !== undefined ? Number(updates.totalCopies) : current.totalCopies;
    const borrowedCopies = current.totalCopies - current.availableCopies;

    if (totalCopies < borrowedCopies) {
      throw new Error(`Cannot reduce total copies below currently borrowed count (${borrowedCopies} copies currently on loan).`);
    }

    const newAvailable = totalCopies - borrowedCopies;

    books[idx] = {
      ...current,
      ...updates,
      totalCopies,
      availableCopies: newAvailable,
    };

    this.set(STORAGE_KEY_BOOKS, books);
    return books[idx];
  }

  public deleteBook(bookId: string): void {
    const books = this.getBooks();
    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error('Book not found in catalogue.');

    // Security check: cannot delete if currently borrowed
    const borrows = this.getBorrows();
    const activeBorrows = borrows.filter(b => b.bookId === bookId && b.status === 'borrowed');
    if (activeBorrows.length > 0) {
      throw new Error(`Integrity Violation: Cannot delete "${book.title}". There are currently ${activeBorrows.length} active copy(ies) checked out to students.`);
    }

    const filtered = books.filter(b => b.id !== bookId);
    this.set(STORAGE_KEY_BOOKS, filtered);
  }

  // --- Borrow & Return Operations ---
  public getBorrows(): BorrowRecord[] {
    return this.get<BorrowRecord[]>(STORAGE_KEY_BORROWS, INITIAL_BORROWS);
  }

  public getBorrowRecordById(id: string): BorrowRecord | undefined {
    return this.getBorrows().find(b => b.id === id);
  }

  public issueBook(
    adminId: string,
    studentId: string,
    bookId: string,
    dueDate: string,
    remarks?: string
  ): BorrowRecord {
    const books = this.getBooks();
    const book = books.find(b => b.id === bookId);
    if (!book) throw new Error('Selected book not found.');

    if (book.availableCopies <= 0) {
      throw new Error(`Insufficient Inventory: No copies of "${book.title}" are currently available for issue.`);
    }

    const students = this.getStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) throw new Error('Student record not found.');

    const borrows = this.getBorrows();

    // Check if student already has this exact book currently borrowed
    const alreadyBorrowed = borrows.some(
      b => b.bookId === bookId && b.studentId === studentId && b.status === 'borrowed'
    );
    if (alreadyBorrowed) {
      throw new Error(`Student ${student.fullName} already has an active loan of "${book.title}".`);
    }

    // Decrement available copies
    book.availableCopies -= 1;
    this.set(STORAGE_KEY_BOOKS, books);

    // Increment student active borrows count
    student.activeBorrowsCount = (student.activeBorrowsCount || 0) + 1;
    this.set(STORAGE_KEY_STUDENTS, students);

    const now = new Date().toISOString().split('T')[0];
    const newBorrow: BorrowRecord = {
      id: 'borrow_' + Date.now(),
      bookId,
      bookTitle: book.title,
      studentId: student.id,
      studentName: student.fullName,
      studentIdNumber: student.studentIdNumber,
      issueDate: now,
      dueDate,
      returnDate: null,
      status: 'borrowed',
      issuedByAdminId: adminId,
      remarks: remarks?.trim() || 'Direct administrative issue.',
    };

    borrows.unshift(newBorrow);
    this.set(STORAGE_KEY_BORROWS, borrows);

    return newBorrow;
  }

  public returnBook(
    _adminId: string,
    borrowRecordId: string,
    remarks?: string
  ): BorrowRecord {
    const borrows = this.getBorrows();
    const borrow = borrows.find(b => b.id === borrowRecordId);
    if (!borrow) throw new Error('Borrow record not found.');

    if (borrow.status === 'returned') {
      throw new Error('This record has already been marked as returned.');
    }

    // Increment book available copies
    const books = this.getBooks();
    const book = books.find(b => b.id === borrow.bookId);
    if (book) {
      book.availableCopies = Math.min(book.totalCopies, book.availableCopies + 1);
      this.set(STORAGE_KEY_BOOKS, books);
    }

    // Decrement student active borrows
    const students = this.getStudents();
    const student = students.find(s => s.id === borrow.studentId);
    if (student) {
      student.activeBorrowsCount = Math.max(0, (student.activeBorrowsCount || 1) - 1);
      this.set(STORAGE_KEY_STUDENTS, students);
    }

    borrow.status = 'returned';
    borrow.returnDate = new Date().toISOString().split('T')[0];
    if (remarks) {
      borrow.remarks = (borrow.remarks ? borrow.remarks + ' | ' : '') + 'Return Note: ' + remarks;
    }

    this.set(STORAGE_KEY_BORROWS, borrows);
    return borrow;
  }

  // --- Requests Management ---
  public getRequests(): BorrowRequest[] {
    return this.get<BorrowRequest[]>(STORAGE_KEY_REQUESTS, INITIAL_REQUESTS);
  }

  public getStudentRequests(studentId: string): BorrowRequest[] {
    // Isolated tenant access
    return this.getRequests().filter(r => r.studentId === studentId);
  }

  public getStudentHistory(studentId: string): BorrowRecord[] {
    // Isolated tenant access
    return this.getBorrows().filter(b => b.studentId === studentId);
  }

  public createBorrowRequest(studentId: string, bookId: string, notes?: string): BorrowRequest {
    const students = this.getStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) throw new Error('Student record not recognized.');

    const book = this.getBookById(bookId);
    if (!book) throw new Error('Book not found in library catalogue.');

    if (book.availableCopies <= 0) {
      throw new Error(`"${book.title}" is currently out of stock. Please check back when a copy is returned.`);
    }

    // Concurrency / Duplicate prevention: check if student has a pending request for this book
    const requests = this.getRequests();
    const hasPending = requests.some(
      r => r.studentId === studentId && r.bookId === bookId && r.status === 'pending' && r.type === 'borrow'
    );
    if (hasPending) {
      throw new Error(`You already have a pending borrow request for "${book.title}". Please await librarian approval.`);
    }

    // Check if student already has this book borrowed
    const borrows = this.getBorrows();
    const alreadyHolding = borrows.some(
      b => b.studentId === studentId && b.bookId === bookId && b.status === 'borrowed'
    );
    if (alreadyHolding) {
      throw new Error(`You currently have an active borrowed copy of "${book.title}".`);
    }

    const newRequest: BorrowRequest = {
      id: 'req_' + Date.now(),
      bookId,
      bookTitle: book.title,
      studentId: student.id,
      studentName: student.fullName,
      studentIdNumber: student.studentIdNumber,
      type: 'borrow',
      status: 'pending',
      requestDate: new Date().toISOString(),
      studentNotes: notes?.trim() || '',
    };

    requests.unshift(newRequest);
    this.set(STORAGE_KEY_REQUESTS, requests);
    return newRequest;
  }

  public createReturnRequest(studentId: string, borrowRecordId: string, notes?: string): BorrowRequest {
    const students = this.getStudents();
    const student = students.find(s => s.id === studentId);
    if (!student) throw new Error('Student not found.');

    const borrows = this.getBorrows();
    const borrow = borrows.find(b => b.id === borrowRecordId);
    if (!borrow) throw new Error('Active loan record not found.');

    // Security check: student must own this borrow record!
    if (borrow.studentId !== studentId) {
      throw new Error('Access Denied: You cannot submit a return request for a loan that does not belong to your account.');
    }

    if (borrow.status !== 'borrowed') {
      throw new Error('This book is already recorded as returned.');
    }

    const requests = this.getRequests();
    const existingPending = requests.some(
      r => r.borrowRecordId === borrowRecordId && r.status === 'pending'
    );
    if (existingPending) {
      throw new Error('A return request for this checked-out book is already pending librarian confirmation.');
    }

    const newRequest: BorrowRequest = {
      id: 'req_ret_' + Date.now(),
      bookId: borrow.bookId,
      bookTitle: borrow.bookTitle,
      studentId: student.id,
      studentName: student.fullName,
      studentIdNumber: student.studentIdNumber,
      type: 'return',
      borrowRecordId,
      status: 'pending',
      requestDate: new Date().toISOString(),
      studentNotes: notes?.trim() || '',
    };

    requests.unshift(newRequest);
    this.set(STORAGE_KEY_REQUESTS, requests);
    return newRequest;
  }

  public approveRequest(adminId: string, requestId: string, adminNotes?: string): void {
    const requests = this.getRequests();
    const req = requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request record not found.');

    if (req.status !== 'pending') {
      throw new Error(`This request has already been ${req.status}.`);
    }

    if (req.type === 'borrow') {
      const book = this.getBookById(req.bookId);
      if (!book) throw new Error('Requested book no longer exists in catalog.');
      if (book.availableCopies <= 0) {
        throw new Error(`Cannot approve: All copies of "${book.title}" have been checked out.`);
      }

      // Calculate 14-day default due date
      const dueDateObj = new Date();
      dueDateObj.setDate(dueDateObj.getDate() + 14);
      const dueDate = dueDateObj.toISOString().split('T')[0];

      // Issue book
      this.issueBook(adminId, req.studentId, req.bookId, dueDate, 'Approved from student online request');
    } else if (req.type === 'return') {
      if (!req.borrowRecordId) throw new Error('Missing associated borrow record for return request.');
      this.returnBook(adminId, req.borrowRecordId, 'Approved from online return request');
    }

    req.status = 'approved';
    req.resolvedDate = new Date().toISOString();
    req.resolvedByAdminId = adminId;
    req.adminNotes = adminNotes?.trim() || 'Approved by librarian';

    this.set(STORAGE_KEY_REQUESTS, requests);
  }

  public declineRequest(adminId: string, requestId: string, reason: string): void {
    const requests = this.getRequests();
    const req = requests.find(r => r.id === requestId);
    if (!req) throw new Error('Request record not found.');

    if (req.status !== 'pending') {
      throw new Error(`This request has already been ${req.status}.`);
    }

    req.status = 'declined';
    req.resolvedDate = new Date().toISOString();
    req.resolvedByAdminId = adminId;
    req.adminNotes = reason?.trim() || 'Request declined by librarian';

    this.set(STORAGE_KEY_REQUESTS, requests);
  }

  public resetAllToDefaults(): void {
    localStorage.removeItem(STORAGE_KEY_USERS);
    localStorage.removeItem(STORAGE_KEY_STUDENTS);
    localStorage.removeItem(STORAGE_KEY_BOOKS);
    localStorage.removeItem(STORAGE_KEY_BORROWS);
    localStorage.removeItem(STORAGE_KEY_REQUESTS);
    this.init();
  }
}

export const db = new LibraryDatabase();
