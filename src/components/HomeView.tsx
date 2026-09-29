import React, { useState } from 'react';
import {
  BookOpen,
  ArrowRight,
  Clock,
  MapPin,
  CheckCircle2,
  Search,
  BookCheck,
  GraduationCap,
  Shield,
  Layers,
  Sparkles,
} from 'lucide-react';
import libraryLobbyImage from '../assets/images/library_lobby_hero_1790693306452.jpg';
import { db } from '../lib/database';
import { Book } from '../types';
import { BookCover } from './BookCover';

interface HomeViewProps {
  onOpenAuth: (roleTab?: 'admin' | 'student') => void;
  onBrowseCatalogue: () => void;
  onSelectBook: (book: Book) => void;
  onOpenBooksExplorer?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onOpenAuth,
  onBrowseCatalogue,
  onSelectBook,
}) => {
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const books = db.getBooks();
  const totalBooks = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableBooks = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const studentsCount = db.getStudents().length;
  const activeBorrowsCount = db.getBorrows().filter(b => b.status === 'borrowed').length;

  const handleSearchChange = (q: string) => {
    setHeroSearchQuery(q);
    if (!q.trim()) {
      setSearchResults([]);
      return;
    }
    const lower = q.toLowerCase().trim();
    const matches = books.filter(
      b =>
        b.title.toLowerCase().includes(lower) ||
        b.author.toLowerCase().includes(lower) ||
        b.genre.toLowerCase().includes(lower) ||
        b.isbn.toLowerCase().includes(lower)
    );
    setSearchResults(matches.slice(0, 5));
  };

  const handleCategoryClick = (category: string) => {
    handleSearchChange(category);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* Full-Screen Immersive Hero Section with Uploaded Lobby Picture */}
      <section className="relative w-full h-[calc(100vh-4rem)] min-h-[580px] max-h-[820px] overflow-hidden bg-stone-950 flex flex-col justify-end">
        {/* Full-bleed background photograph */}
        <img
          src={libraryLobbyImage}
          alt="Library Chap Chap Modern Public Library Lobby with Self-Checkout Kiosks"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.82] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Scrim Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/40 pointer-events-none" />

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 pt-20">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xs">
              <BookOpen className="w-3.5 h-3.5" />
              <span>University Circulation &amp; Self-Checkout Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-serif leading-[1.12]">
              Knowledge within reach, anytime.
            </h1>

            <p className="text-base sm:text-lg text-stone-200 font-normal leading-relaxed max-w-2xl">
              Access the central university library catalog, checkout course reserves, submit digital borrow requests, and track returns from any device.
            </p>

            {/* Prominent Live Book Search Bar */}
            <div className="relative max-w-2xl mt-4">
              <div className="relative flex items-center bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-2 sm:p-2.5 transition-all focus-within:ring-2 focus-within:ring-amber-400 focus-within:bg-white">
                <Search className="w-5 h-5 text-stone-400 ml-2.5 shrink-0" />
                <input
                  type="text"
                  value={heroSearchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  placeholder="Search books by title, author, department, or ISBN..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-transparent border-none outline-none text-stone-900 placeholder-stone-500"
                />
                <button
                  onClick={onBrowseCatalogue}
                  className="px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-md shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Search Catalog</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

              {/* Instant Search Results Dropdown */}
              {isSearchFocused && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-30 divide-y divide-stone-100">
                  <div className="p-2.5 bg-stone-50 text-[11px] font-bold text-stone-500 uppercase tracking-wider flex justify-between">
                    <span>Matching Catalog Titles ({searchResults.length})</span>
                    <button
                      onClick={() => setIsSearchFocused(false)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      Close
                    </button>
                  </div>
                  {searchResults.map(book => (
                    <div
                      key={book.id}
                      onClick={() => {
                        onSelectBook(book);
                        setIsSearchFocused(false);
                      }}
                      className="p-3.5 hover:bg-stone-50 flex items-center justify-between gap-3 cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#701A1E]">
                          {book.genre}
                        </span>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm truncate">
                          {book.title}
                        </h4>
                        <p className="text-xs text-stone-500 truncate">
                          {book.author} · {book.rackLocation}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold font-mono shrink-0 ${
                          book.availableCopies > 0
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {book.availableCopies} Available
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Academic Category Chips */}
              <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-stone-300">
                <span className="text-stone-400 font-medium">Trending Disciplines:</span>
                {(['Computer Science', 'African Literature', 'Software Engineering', 'Medicine & Health', 'Economics'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-colors border border-white/10 text-[11px] cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Access Portals */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('student')}
                className="px-5 py-3 text-xs sm:text-sm font-bold bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-xl transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4 text-stone-950" />
                <span>Student Reader Portal</span>
              </button>

              <button
                onClick={() => onOpenAuth('admin')}
                className="px-5 py-3 text-xs sm:text-sm font-bold bg-white/15 hover:bg-white/25 text-white rounded-xl transition-all border border-white/20 shadow-md backdrop-blur-xs flex items-center gap-2 cursor-pointer"
              >
                <Shield className="w-4 h-4 text-amber-400" />
                <span>Librarian Admin Console</span>
              </button>

              <button
                onClick={onBrowseCatalogue}
                className="px-5 py-3 text-xs sm:text-sm font-semibold text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Explore Full Stacks ({books.length})</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Metrics Row (Tabular Figures) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Total Books Catalog
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#701A1E] font-mono tabular-nums">
                {totalBooks}
              </span>
              <span className="text-xs text-stone-500 font-medium">volumes</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">Across 7 university faculties</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Available on Shelves
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-emerald-700 font-mono tabular-nums">
                {availableBooks}
              </span>
              <span className="text-xs text-stone-500 font-medium">in stock</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">Ready for instant checkout</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Active Loans
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-amber-700 font-mono tabular-nums">
                {activeBorrowsCount}
              </span>
              <span className="text-xs text-stone-500 font-medium">circulating</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">Tracked digital loans</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">
              Registered Scholars
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-extrabold text-stone-800 font-mono tabular-nums">
                {studentsCount}
              </span>
              <span className="text-xs text-stone-500 font-medium">members</span>
            </div>
            <p className="mt-1 text-xs text-stone-500">Verified campus library cards</p>
          </div>
        </div>
      </section>

      {/* Featured Books in Stacks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-stone-900 font-serif">Featured Academic Stacks</h2>
            <p className="text-xs text-stone-500 mt-0.5">High-demand course texts and foundational research literature</p>
          </div>
          <button
            onClick={onBrowseCatalogue}
            className="text-xs font-bold text-[#701A1E] hover:text-[#8C242A] flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({books.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {books.slice(0, 6).map(book => (
            <div
              key={book.id}
              className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:border-[#701A1E]/40 transition-all flex flex-col justify-between"
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
                    <p className="text-xs text-stone-600 mt-1 font-medium">By {book.author}</p>
                    <p className="text-[11px] font-mono text-stone-500 mt-1.5">{book.rackLocation}</p>
                  </div>
                </div>

                <p className="text-xs text-stone-500 mt-3 line-clamp-2 leading-relaxed">
                  {book.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-500 font-mono text-[11px]">ISBN: {book.isbn}</span>
                <button
                  onClick={() => onSelectBook(book)}
                  className="font-bold text-[#701A1E] hover:underline cursor-pointer"
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Library Facility Info Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-stone-900 text-stone-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-lg font-serif">
              Central University Library &amp; Self-Checkout Hub
            </h3>
            <p className="text-xs text-stone-400">
              Modern digital terminals, quiet study carrels, and multi-deck reserve stacks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Mon – Fri: 08:00 – 22:00 | Sat: 09:00 – 18:00</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Main Campus, Learning Commons Lobby</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Self-Check Terminals Active</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
