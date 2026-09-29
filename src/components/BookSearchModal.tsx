import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, MapPin, CheckCircle, ArrowRight, BookmarkPlus } from 'lucide-react';
import { db } from '../lib/database';
import { Book } from '../types';

interface BookSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBook: (book: Book) => void;
}

export const BookSearchModal: React.FC<BookSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectBook,
}) => {
  const [query, setQuery] = useState('');
  const books = db.getBooks();

  const results = useMemo(() => {
    if (!query.trim()) return books.slice(0, 6);
    const q = query.toLowerCase().trim();
    return books.filter(
      b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.isbn.toLowerCase().includes(q) ||
        b.genre.toLowerCase().includes(q) ||
        b.rackLocation.toLowerCase().includes(q)
    );
  }, [query, books]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-14 sm:pt-20 p-4 bg-stone-950/70 backdrop-blur-sm">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3 bg-stone-50">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by book title, author, faculty, ISBN, or shelf..."
            className="flex-1 text-sm sm:text-base bg-transparent border-none outline-none text-stone-900 placeholder-stone-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-md text-stone-400 hover:text-stone-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-stone-500 hover:text-stone-800 bg-stone-200/60 rounded-lg"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 sm:p-4 overflow-y-auto divide-y divide-stone-100 flex-1">
          <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-400 flex justify-between">
            <span>{query ? `Search Results (${results.length})` : 'Popular Catalog Titles'}</span>
            <span>Shelf Availability</span>
          </div>

          {results.length === 0 ? (
            <div className="p-8 text-center text-xs text-stone-500 space-y-1">
              <BookOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="font-semibold text-stone-700">No matching books found</p>
              <p>Try searching for author name, faculty keywords, or ISBN digits.</p>
            </div>
          ) : (
            results.map(book => (
              <div
                key={book.id}
                onClick={() => {
                  onSelectBook(book);
                  onClose();
                }}
                className="p-3 rounded-2xl hover:bg-stone-50 flex items-center justify-between gap-4 cursor-pointer transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] font-bold text-[#701A1E] uppercase tracking-wider">
                      {book.genre}
                    </span>
                    <span className="text-stone-300">·</span>
                    <span className="text-[11px] text-stone-500 font-mono">ISBN: {book.isbn}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm leading-snug group-hover:text-[#701A1E] transition-colors truncate">
                    {book.title}
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5 truncate">
                    By {book.author} ({book.publicationYear})
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-1 font-mono">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    <span>{book.rackLocation}</span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono ${
                      book.availableCopies > 0
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-50 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {book.availableCopies} / {book.totalCopies} Available
                  </span>
                  <span className="text-[11px] text-[#701A1E] font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Stacks</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 text-xs text-stone-500 flex justify-between items-center px-5">
          <span>Click any book to open in the active stacks catalog</span>
          <button
            onClick={onClose}
            className="font-bold text-[#701A1E] hover:underline"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
