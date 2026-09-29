import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FlashProvider, useFlash } from './context/FlashContext';
import { Navbar } from './components/Navbar';
import { DefaultPasswordBanner } from './components/DefaultPasswordBanner';
import { BookSearchModal } from './components/BookSearchModal';
import { HomeView } from './components/HomeView';
import { AuthView } from './components/AuthView';
import { ErrorPage } from './components/ErrorPages';
import { BooksExplorerView } from './components/BooksExplorerView';
import { LibraryAIChatbot } from './components/LibraryAIChatbot';
import { DownloadCodeModal } from './components/DownloadCodeModal';
import { Book } from './types';
import { Sparkles, MessageSquare, X, Download } from 'lucide-react';

// Admin Views
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminBooks } from './components/admin/AdminBooks';
import { AdminStudents } from './components/admin/AdminStudents';
import { AdminIssueReturn } from './components/admin/AdminIssueReturn';
import { AdminRequests } from './components/admin/AdminRequests';
import { AdminReports } from './components/admin/AdminReports';

// Student Views
import { StudentHome } from './components/student/StudentHome';
import { StudentCatalogue } from './components/student/StudentCatalogue';
import { StudentRequests } from './components/student/StudentRequests';
import { StudentHistory } from './components/student/StudentHistory';
import { StudentProfile } from './components/student/StudentProfile';

const MainLayout: React.FC = () => {
  const { currentUser, role } = useAuth();
  const flash = useFlash();

  const [activeTab, setActiveTab] = useState<string>('home');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRoleTab, setAuthRoleTab] = useState<'admin' | 'student' | 'register'>('student');
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [floatingChatOpen, setFloatingChatOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  // Synchronize navigation on auth changes
  const handleSelectTab = (tab: string) => {
    // RBAC Deny-by-default guard
    if (tab.startsWith('admin_') && role !== 'admin') {
      setActiveTab('403');
      return;
    }
    if (tab.startsWith('student_') && role !== 'student') {
      setActiveTab('403');
      return;
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (roleTab: 'admin' | 'student' | 'register' = 'student') => {
    setAuthRoleTab(roleTab);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    setTimeout(() => {
      const stored = sessionStorage.getItem('chapchap_auth_session_user');
      if (stored) {
        const u = JSON.parse(stored);
        if (u.role === 'admin') {
          setActiveTab('admin_dashboard');
        } else {
          setActiveTab('student_home');
        }
      }
    }, 100);
  };

  const handleSelectBookFromSearch = (book: Book) => {
    setActiveTab('books_explorer');
    flash.info(`Located "${book.title}" in ${book.rackLocation}.`, 'Book Stacks Explorer');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100/70 text-stone-900 font-sans selection:bg-amber-400 selection:text-stone-950">
      {/* Top 3-Zone Navigation Bar with Integrated Search */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenAuthModal={() => handleOpenAuth('student')}
        onOpenSearchModal={() => setSearchModalOpen(true)}
      />

      {/* Default Password Security Alert Banner */}
      <DefaultPasswordBanner />

      {/* Main Viewport Content */}
      <main className="flex-1 w-full">
        {/* Full-width Homepage with Edge-to-Edge Hero Image */}
        {activeTab === 'home' && (
          <HomeView
            onOpenAuth={roleTab => handleOpenAuth(roleTab || 'student')}
            onBrowseCatalogue={() => handleSelectTab('books_explorer')}
            onSelectBook={handleSelectBookFromSearch}
            onOpenBooksExplorer={() => handleSelectTab('books_explorer')}
          />
        )}

        {/* Dedicated Books Display & AI Module with Hunt Library Interior Background */}
        {activeTab === 'books_explorer' && (
          <BooksExplorerView
            onOpenAuth={roleTab => handleOpenAuth(roleTab || 'student')}
            onNavigateTab={handleSelectTab}
          />
        )}

        {/* Constrained Container Views */}
        {activeTab !== 'home' && activeTab !== 'books_explorer' && (
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {activeTab === 'catalogue' && (
              <StudentCatalogue onPromptAuth={() => handleOpenAuth('student')} />
            )}

            {/* Admin RBAC Views */}
            {activeTab === 'admin_dashboard' && role === 'admin' && (
              <AdminDashboard onNavigate={handleSelectTab} />
            )}

            {activeTab === 'admin_books' && role === 'admin' && <AdminBooks />}

            {activeTab === 'admin_students' && role === 'admin' && <AdminStudents />}

            {activeTab === 'admin_issue_return' && role === 'admin' && <AdminIssueReturn />}

            {activeTab === 'admin_requests' && role === 'admin' && <AdminRequests />}

            {activeTab === 'admin_reports' && role === 'admin' && <AdminReports />}

            {/* Student RBAC Views */}
            {activeTab === 'student_home' && role === 'student' && (
              <StudentHome onNavigate={handleSelectTab} />
            )}

            {activeTab === 'student_catalogue' && role === 'student' && (
              <StudentCatalogue />
            )}

            {activeTab === 'student_requests' && role === 'student' && <StudentRequests />}

            {activeTab === 'student_history' && role === 'student' && <StudentHistory />}

            {activeTab === 'student_profile' && role === 'student' && <StudentProfile />}

            {/* 403 Forbidden Screen */}
            {activeTab === '403' && (
              <ErrorPage
                code={403}
                onGoHome={() => handleSelectTab(currentUser ? (role === 'admin' ? 'admin_dashboard' : 'student_home') : 'home')}
              />
            )}
          </div>
        )}
      </main>

      {/* Production-Grade Institutional Footer */}
      <footer className="mt-auto bg-[#3B0D10] text-stone-300 border-t border-[#5B1015] py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-white font-serif text-sm tracking-tight">
              Library Chap Chap
            </span>
            <span className="text-stone-500">·</span>
            <span>University Circulation &amp; Academic Digital Commons</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-stone-400">
            <button
              onClick={() => handleSelectTab('books_explorer')}
              className="hover:text-amber-300 transition-colors cursor-pointer"
            >
              Explore All Books &amp; AI
            </button>
            <span>·</span>
            <button
              onClick={() => setDownloadModalOpen(true)}
              className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1 text-stone-300"
              title="Download all project code in a single file"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Codebase (.md / .zip)</span>
            </button>
            <span>·</span>
            <span>Circulation Hours: 08:00 – 22:00</span>
            <span>·</span>
            <span className="font-mono text-[11px] text-stone-400">
              © {new Date().getFullYear()} Central University Library. All rights reserved.
            </span>
          </div>
        </div>
      </footer>

      {/* Floating AI Companion Launcher (Active on other tabs when not on books_explorer) */}
      {activeTab !== 'books_explorer' && (
        <div className="fixed bottom-6 right-6 z-40">
          {floatingChatOpen ? (
            <div className="w-[360px] sm:w-[420px] shadow-2xl rounded-3xl overflow-hidden animate-in fade-in slide-in-from-bottom-5">
              <div className="relative">
                <LibraryAIChatbot
                  onNavigateTab={handleSelectTab}
                  embedded={false}
                />
                <button
                  onClick={() => setFloatingChatOpen(false)}
                  className="absolute top-4 right-12 text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
                  title="Minimize chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setFloatingChatOpen(true)}
              className="px-4 py-3 bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-2xl shadow-xl border border-amber-400/40 flex items-center gap-2.5 transition-all hover:scale-105 cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-400 text-stone-950 flex items-center justify-center font-bold">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold font-serif">Ask Library AI</span>
            </button>
          )}
        </div>
      )}

      {/* Global Book Search Modal (Accessible for Students & Librarians) */}
      {searchModalOpen && (
        <BookSearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          onSelectBook={handleSelectBookFromSearch}
        />
      )}

      {/* Auth Modal (Role Selection & Login / Register) */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl my-8">
            <AuthView
              initialTab={authRoleTab}
              onSuccess={handleAuthSuccess}
            />
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-stone-300 hover:text-white p-2 rounded-xl bg-black/40 hover:bg-black/60 transition-colors text-xs font-bold cursor-pointer"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* Download Codebase Modal */}
      {downloadModalOpen && (
        <DownloadCodeModal
          isOpen={downloadModalOpen}
          onClose={() => setDownloadModalOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <FlashProvider>
      <AuthProvider>
        <MainLayout />
      </AuthProvider>
    </FlashProvider>
  );
}
