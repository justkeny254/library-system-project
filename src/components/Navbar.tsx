import React from 'react';
import { LogOut, BookOpen, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { db } from '../lib/database';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuthModal: () => void;
  onOpenSearchModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  onOpenAuthModal,
  onOpenSearchModal,
}) => {
  const { currentUser, role, logout } = useAuth();

  // Pending requests count for admin badge
  const pendingRequestsCount = role === 'admin'
    ? db.getRequests().filter(r => r.status === 'pending').length
    : 0;

  return (
    <header className="sticky top-0 z-40 bg-[#701A1E] text-stone-100 border-b border-[#5B1015] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-4">
          {/* Zone 1: Brand Wordmark (Single text element with icon) */}
          <button
            onClick={() => onSelectTab(currentUser ? (currentUser.role === 'admin' ? 'admin_dashboard' : 'student_home') : 'home')}
            className="flex items-center gap-2.5 text-left focus:outline-none group shrink-0"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#701A1E] flex items-center justify-center font-black shadow-xs group-hover:scale-105 transition-transform">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-serif">
              Library Chap Chap
            </span>
          </button>

          {/* Integrated Search Affordance for Students & Librarians */}
          <button
            onClick={onOpenSearchModal}
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 bg-black/25 hover:bg-black/35 text-stone-300 hover:text-white rounded-xl text-xs border border-white/10 transition-colors max-w-xs w-full cursor-pointer"
          >
            <Search className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">Search catalog, ISBN, or author...</span>
            <kbd className="ml-auto hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 rounded text-stone-300">
              Find
            </kbd>
          </button>

          {/* Zone 2: Navigation Links (single-line links) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {!currentUser && (
              <>
                <button
                  onClick={() => onSelectTab('home')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'home'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => onSelectTab('catalogue')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'catalogue'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Catalogue
                </button>
                <button
                  onClick={() => onSelectTab('books_explorer')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'books_explorer'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Explore Books &amp; AI</span>
                </button>
              </>
            )}

            {role === 'admin' && (
              <>
                <button
                  onClick={() => onSelectTab('admin_dashboard')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin_dashboard'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => onSelectTab('admin_books')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin_books'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Books Inventory
                </button>
                <button
                  onClick={() => onSelectTab('admin_students')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin_students'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Student Records
                </button>
                <button
                  onClick={() => onSelectTab('admin_issue_return')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin_issue_return'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Issue &amp; Return
                </button>
                <button
                  onClick={() => onSelectTab('admin_requests')}
                  className={`relative px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'admin_requests'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Requests
                  {pendingRequestsCount > 0 && (
                    <span className="px-1.5 py-0.2 text-[10px] font-black rounded-full bg-amber-400 text-stone-950">
                      {pendingRequestsCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => onSelectTab('admin_reports')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'admin_reports'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Reports
                </button>
              </>
            )}

            {role === 'student' && (
              <>
                <button
                  onClick={() => onSelectTab('student_home')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'student_home'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Student Desk
                </button>
                <button
                  onClick={() => onSelectTab('student_catalogue')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'student_catalogue'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Catalogue
                </button>
                <button
                  onClick={() => onSelectTab('books_explorer')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'books_explorer'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Explore Books &amp; AI</span>
                </button>
                <button
                  onClick={() => onSelectTab('student_requests')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'student_requests'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Borrow &amp; Returns
                </button>
                <button
                  onClick={() => onSelectTab('student_history')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'student_history'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  My Loan History
                </button>
                <button
                  onClick={() => onSelectTab('student_profile')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    activeTab === 'student_profile'
                      ? 'bg-amber-400 text-stone-950 shadow-xs'
                      : 'text-stone-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Profile
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Mobile search button */}
            <button
              onClick={onOpenSearchModal}
              className="sm:hidden p-2 text-stone-200 hover:text-white hover:bg-white/10 rounded-lg"
              title="Search Books"
            >
              <Search className="w-4 h-4" />
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2.5">
                <div className="hidden sm:flex flex-col text-right">
                  <span className="text-xs font-bold text-white truncate max-w-[130px]">
                    {currentUser.fullName}
                  </span>
                  <span className="text-[10px] text-amber-300 uppercase tracking-wider font-semibold">
                    {currentUser.role === 'admin' ? 'Chief Librarian' : 'Student Reader'}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-200 bg-black/20 hover:bg-black/35 hover:text-white rounded-lg transition-colors border border-white/10"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-4 py-2 text-xs font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
