import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Check,
  X,
  Clock,
  Send,
  AlertCircle,
  BookmarkPlus,
} from 'lucide-react';
import { Book } from '../../types';
import { db } from '../../lib/database';
import { BookCover } from '../BookCover';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

interface StudentCatalogueProps {
  onPromptAuth?: () => void;
}

export const StudentCatalogue: React.FC<StudentCatalogueProps> = ({ onPromptAuth }) => {
  const { currentStudent, isAuthenticated, isStudent } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'available' | 'borrowed'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Request Borrow Modal
  const [borrowModalBook, setBorrowModalBook] = useState<Book | null>(null);
  const [studentNote, setStudentNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const books = db.getBooks();
  const genres = Array.from(new Set(books.map(b => b.genre)));

  // If student is logged in, find active loans and pending requests
  const myBorrows = currentStudent ? db.getStudentHistory(currentStudent.id) : [];
  const myActiveBorrowBookIds = new Set(
    myBorrows.filter(b => b.status === 'borrowed').map(b => b.bookId)
  );

  const myRequests = currentStudent ? db.getStudentRequests(currentStudent.id) : [];
  const myPendingRequestBookIds = new Set(
    myRequests.filter(r => r.status === 'pending' && r.type === 'borrow').map(r => r.bookId)
  );

  const filteredBooks = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase()) ||
      b.genre.toLowerCase().includes(search.toLowerCase());

    const matchesGenre = selectedGenre === 'all' || b.genre === selectedGenre;

    let matchesFilter = true;
    if (filterMode === 'available') {
      matchesFilter = b.availableCopies > 0;
    } else if (filterMode === 'borrowed') {
      matchesFilter = b.availableCopies < b.totalCopies;
    }

    return matchesSearch && matchesGenre && matchesFilter;
  });

  const handleOpenBorrowModal = (book: Book) => {
    if (!isAuthenticated || !isStudent || !currentStudent) {
      flash.info('Please sign in with your student account to request books.');
      onPromptAuth?.();
      return;
    }

    // Check duplicate conditions
    if (myActiveBorrowBookIds.has(book.id)) {
      flash.warning(`You currently have an active borrowed copy of "${book.title}".`);
      return;
    }

    if (myPendingRequestBookIds.has(book.id)) {
      flash.warning(`You already have a pending borrow request for "${book.title}".`);
      return;
    }

    if (book.availableCopies <= 0) {
      flash.error(`"${book.title}" is out of stock. Please check back when a copy is returned.`);
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
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Could not submit request.';
      flash.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Library Book Stacks &amp; Catalogue
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Search physical university collection and submit digital borrow requests.
          </p>
        </div>

        {/* Filter Segmented Control (Allowed functional button tabs) */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs w-full sm:w-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              filterMode === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Titles ({books.length})
          </button>
          <button
            onClick={() => setFilterMode('available')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              filterMode === 'available'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Available Now
          </button>
          <button
            onClick={() => setFilterMode('borrowed')}
            className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg font-bold transition-all ${
              filterMode === 'borrowed'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            In Circulation
          </button>
        </div>
      </div>

      {/* Search and Genre Row */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, author, keyword, or ISBN..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <label className="text-xs font-semibold text-stone-500 whitespace-nowrap">Faculty / Genre:</label>
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            className="py-2 px-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-800"
          >
            <option value="all">All Academic Faculties</option>
            {genres.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Catalogue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBooks.length === 0 ? (
          <div className="col-span-full p-12 bg-white rounded-2xl border border-stone-200 text-center text-xs text-stone-500">
            No matching books found. Try adjusting your search query or faculty filter.
          </div>
        ) : (
          filteredBooks.map(book => {
            const isCurrentlyHolding = myActiveBorrowBookIds.has(book.id);
            const isPendingRequest = myPendingRequestBookIds.has(book.id);
            const isOutOfStock = book.availableCopies <= 0;

            return (
              <div
                key={book.id}
                className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#701A1E]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-[#701A1E] uppercase tracking-wider">
                      {book.genre}
                    </span>
                    <span
                      className={`text-xs font-bold font-mono px-2 py-0.5 rounded-md ${
                        book.availableCopies > 0
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {book.availableCopies} / {book.totalCopies} Available
                    </span>
                  </div>

                  <div className="flex gap-4 items-start">
                    <BookCover book={book} size="md" />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-stone-900 text-base leading-snug line-clamp-2">
                        {book.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 font-medium">
                        By {book.author} ({book.publicationYear})
                      </p>

                      <div className="mt-2 text-[11px] font-mono text-stone-500 space-y-0.5">
                        <div>Location: <span className="text-stone-700">{book.rackLocation}</span></div>
                        <div>ISBN: <span className="text-stone-700">{book.isbn}</span></div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 mt-3 line-clamp-2 leading-relaxed">
                    {book.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                  {isCurrentlyHolding ? (
                    <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Currently on loan to you
                    </span>
                  ) : isPendingRequest ? (
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Request Pending Approval
                    </span>
                  ) : (
                    <button
                      onClick={() => handleOpenBorrowModal(book)}
                      disabled={isOutOfStock}
                      className="w-full py-2 px-3 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-2xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                    >
                      <BookmarkPlus className="w-4 h-4 text-amber-400" />
                      <span>{isOutOfStock ? 'Currently Unavailable' : 'Request to Borrow'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Borrow Request Modal */}
      {borrowModalBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base tracking-tight">Confirm Borrow Request</h3>
              </div>
              <button
                onClick={() => setBorrowModalBook(null)}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmBorrow} className="p-6 space-y-4">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs space-y-1">
                <div className="font-bold text-stone-900 text-sm">{borrowModalBook.title}</div>
                <div className="text-stone-600">By {borrowModalBook.author}</div>
                <div className="text-stone-500 font-mono text-[11px] pt-1">
                  Shelf Location: {borrowModalBook.rackLocation} · Available: {borrowModalBook.availableCopies} copies
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Academic Note / Reason for Loan
                </label>
                <textarea
                  rows={3}
                  value={studentNote}
                  onChange={e => setStudentNote(e.target.value)}
                  placeholder="e.g. Needed for final year thesis research / coursework..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-950 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  Borrow requests are reviewed and approved by the Chief Librarian. Once approved, you can pick up your physical book at the Self-Checkout desk.
                </span>
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
                  className="px-5 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-amber-400" />
                  <span>{submitting ? 'Submitting...' : 'Submit Request'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
