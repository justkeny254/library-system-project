import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  Sparkles,
  MapPin,
  Calendar,
  Check,
  Send,
  BookmarkPlus,
  ArrowRight,
  Filter,
} from 'lucide-react';
import huntLibraryBg from '../assets/images/hunt_library_interior_1790695754900.jpg';
import { Book } from '../types';
import { db } from '../lib/database';
import { BookCover } from './BookCover';
import { LibraryAIChatbot } from './LibraryAIChatbot';
import { useAuth } from '../context/AuthContext';
import { useFlash } from '../context/FlashContext';

interface BooksExplorerViewProps {
  onOpenAuth: (roleTab?: 'admin' | 'student') => void;
  onNavigateTab: (tab: string) => void;
}

export const BooksExplorerView: React.FC<BooksExplorerViewProps> = ({
  onOpenAuth,
  onNavigateTab,
}) => {
  const { isAuthenticated, isStudent, currentStudent } = useAuth();
  const flash = useFlash();

  const books = db.getBooks();
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [focusedBook, setFocusedBook] = useState<Book | null>(books[0] || null);

  // Borrow Modal state
  const [borrowModalBook, setBorrowModalBook] = useState<Book | null>(null);
  const [studentNote, setStudentNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const genres = Array.from(new Set(books.map(b => b.genre)));

  const filteredBooks = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase()) ||
      b.genre.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || b.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleOpenBorrow = (book: Book) => {
    if (!isAuthenticated || !isStudent || !currentStudent) {
      flash.info('Please log in with your student account to submit borrow requests.');
      onOpenAuth('student');
      return;
    }
    setBorrowModalBook(book);
    setStudentNote('');
  };

  const handleConfirmBorrow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentStudent || !borrowModalBook) return;

    setSubmitting(true);
    try {
      db.createBorrowRequest(currentStudent.id, borrowModalBook.id, studentNote);
      flash.success(
        `Borrow request for "${borrowModalBook.title}" submitted to the librarian!`,
        'Request Placed'
      );
      setBorrowModalBook(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not submit request.';
      flash.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* Background Image: Uploaded James B. Hunt Jr. Library Interior */}
      <div className="fixed inset-0 top-16 z-0 pointer-events-none">
        <img
          src={huntLibraryBg}
          alt="Hunt Library Modern Interior Reading Lounge"
          className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Soft frosted gradient overlay */}
        <div className="absolute inset-0 bg-stone-950/65 backdrop-blur-xs" />
      </div>

      {/* Main Content Viewport */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Hero Title */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 text-white">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md mb-2 shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Stacks Collection &amp; AI Analysis</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-serif drop-shadow-md">
              Explore All Books &amp; Academic Explanations
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mt-1">
              Browse every textbook, novel, and journal volume in the system. Select any book to inspect its front cover, syllabus explanation, and receive in-depth AI insights from our assistant on the side.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300">
              {books.length} Total Volumes
            </span>
          </div>
        </div>

        {/* 2-Column Layout: Books Display on Left (60%), AI Chatbot on Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: All Books Display with Front Covers */}
          <div className="lg:col-span-7 space-y-5">
            {/* Filter and Search Bar */}
            <div className="p-4 rounded-2xl bg-stone-900/85 backdrop-blur-md border border-white/15 shadow-xl flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Filter books by title, author, or keyword..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-stone-800/80 border border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-stone-100 placeholder-stone-400"
                />
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>

              <select
                value={selectedGenre}
                onChange={e => setSelectedGenre(e.target.value)}
                className="py-2 px-3 text-xs bg-stone-800/80 border border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-400 text-stone-200 w-full sm:w-auto"
              >
                <option value="all">All Academic Disciplines</option>
                {genres.map(g => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* List of Books with Front Page Cover Images and Detailed Explanations */}
            <div className="space-y-4">
              {filteredBooks.length === 0 ? (
                <div className="p-12 rounded-3xl bg-stone-900/80 backdrop-blur-md border border-white/10 text-center text-xs text-stone-400">
                  No titles match your search criteria.
                </div>
              ) : (
                filteredBooks.map(book => {
                  const isSelected = focusedBook?.id === book.id;

                  return (
                    <div
                      key={book.id}
                      className={`relative rounded-3xl p-5 sm:p-6 transition-all border ${
                        isSelected
                          ? 'bg-stone-900/95 border-amber-400 shadow-2xl ring-1 ring-amber-400/30'
                          : 'bg-stone-900/85 hover:bg-stone-900/92 border-white/15 hover:border-white/30 shadow-lg'
                      } backdrop-blur-md text-stone-100 flex flex-col sm:flex-row gap-5 items-start`}
                    >
                      {/* Book Front Page Cover Image */}
                      <div className="shrink-0 mx-auto sm:mx-0">
                        <BookCover book={book} size="lg" />
                      </div>

                      {/* Book Explanation & Details */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                            {book.genre}
                          </span>
                          <span
                            className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                              book.availableCopies > 0
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            }`}
                          >
                            {book.availableCopies} / {book.totalCopies} Available
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white font-serif leading-snug">
                          {book.title}
                        </h3>

                        <p className="text-xs text-stone-300 font-medium">
                          Author: <span className="text-white">{book.author}</span> · Published in <span className="text-stone-300">{book.publicationYear}</span>
                        </p>

                        {/* Detailed Explanation of the Book */}
                        <div className="p-3 rounded-xl bg-black/35 border border-white/10 text-xs text-stone-300 leading-relaxed space-y-1">
                          <div className="font-semibold text-stone-200 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                            <span>Book Overview &amp; Curriculum Role:</span>
                          </div>
                          <p>{book.summary || 'A foundational volume recommended across academic syllabi.'}</p>
                        </div>

                        {/* Metadata row */}
                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-stone-400 pt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-amber-400" />
                            Shelf: <strong className="text-stone-200">{book.rackLocation}</strong>
                          </span>
                          <span>·</span>
                          <span>ISBN: <strong className="text-stone-200">{book.isbn}</strong></span>
                        </div>

                        {/* Action Buttons */}
                        <div className="pt-3 flex flex-wrap items-center gap-2.5">
                          <button
                            onClick={() => setFocusedBook(book)}
                            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-400 text-stone-950 shadow-md'
                                : 'bg-white/10 hover:bg-white/20 text-stone-200 border border-white/15'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isSelected ? 'Focused in Assistant' : 'Explain with AI Assistant'}</span>
                          </button>

                          <button
                            onClick={() => handleOpenBorrow(book)}
                            disabled={book.availableCopies <= 0}
                            className="px-3.5 py-2 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
                          >
                            <BookmarkPlus className="w-3.5 h-3.5 text-amber-400" />
                            <span>Borrow Volume</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Right Column: AI Chatbot Companion Docked on Side */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/20 text-xs text-amber-200 backdrop-blur-md flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Interactive AI Guide:</span> Click &ldquo;Explain with AI Assistant&rdquo; on any book to automatically focus the companion on that title, or ask questions on how to navigate loans and returns!
                </div>
              </div>

              <div className="h-[620px]">
                <LibraryAIChatbot
                  selectedBook={focusedBook}
                  onClearSelectedBook={() => setFocusedBook(null)}
                  onNavigateTab={onNavigateTab}
                  embedded={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Request Modal */}
      {borrowModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-base tracking-tight font-serif">
                Request Book Loan
              </h3>
              <button
                onClick={() => setBorrowModalBook(null)}
                className="text-stone-300 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmBorrow} className="p-6 space-y-4">
              <div className="flex gap-4 items-center p-3 bg-stone-50 rounded-2xl border border-stone-200">
                <BookCover book={borrowModalBook} size="sm" />
                <div className="min-w-0 text-xs">
                  <h4 className="font-bold text-stone-900 truncate">{borrowModalBook.title}</h4>
                  <p className="text-stone-500">By {borrowModalBook.author}</p>
                  <p className="text-stone-500 font-mono text-[11px] mt-0.5">{borrowModalBook.rackLocation}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Reason for Loan / Coursework Note
                </label>
                <textarea
                  rows={3}
                  value={studentNote}
                  onChange={e => setStudentNote(e.target.value)}
                  placeholder="e.g. Needed for research paper / coursework assignment..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setBorrowModalBook(null)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl shadow-xs"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
