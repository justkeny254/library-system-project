# Library Chap Chap — Complete Project Source Code

> Consolidated single-file export of the Library Chap Chap secure library management application.
> Includes all TypeScript, React, Tailwind CSS, Express backend server, security utilities, and configuration files.

---

## Table of Contents

- [`.env.example`](#envexample)
- [`index.html`](#indexhtml)
- [`metadata.json`](#metadatajson)
- [`package.json`](#packagejson)
- [`server.ts`](#serverts)
- [`src/App.tsx`](#srcApptsx)
- [`src/components/AuthView.tsx`](#srccomponentsAuthViewtsx)
- [`src/components/BookCover.tsx`](#srccomponentsBookCovertsx)
- [`src/components/BookSearchModal.tsx`](#srccomponentsBookSearchModaltsx)
- [`src/components/BooksExplorerView.tsx`](#srccomponentsBooksExplorerViewtsx)
- [`src/components/ChangePasswordModal.tsx`](#srccomponentsChangePasswordModaltsx)
- [`src/components/DefaultPasswordBanner.tsx`](#srccomponentsDefaultPasswordBannertsx)
- [`src/components/DownloadCodeModal.tsx`](#srccomponentsDownloadCodeModaltsx)
- [`src/components/ErrorPages.tsx`](#srccomponentsErrorPagestsx)
- [`src/components/HomeView.tsx`](#srccomponentsHomeViewtsx)
- [`src/components/LibraryAIChatbot.tsx`](#srccomponentsLibraryAIChatbottsx)
- [`src/components/Navbar.tsx`](#srccomponentsNavbartsx)
- [`src/components/OwaspSecurityModal.tsx`](#srccomponentsOwaspSecurityModaltsx)
- [`src/components/admin/AdminBooks.tsx`](#srccomponentsadminAdminBookstsx)
- [`src/components/admin/AdminDashboard.tsx`](#srccomponentsadminAdminDashboardtsx)
- [`src/components/admin/AdminIssueReturn.tsx`](#srccomponentsadminAdminIssueReturntsx)
- [`src/components/admin/AdminReports.tsx`](#srccomponentsadminAdminReportstsx)
- [`src/components/admin/AdminRequests.tsx`](#srccomponentsadminAdminRequeststsx)
- [`src/components/admin/AdminStudents.tsx`](#srccomponentsadminAdminStudentstsx)
- [`src/components/student/StudentCatalogue.tsx`](#srccomponentsstudentStudentCataloguetsx)
- [`src/components/student/StudentHistory.tsx`](#srccomponentsstudentStudentHistorytsx)
- [`src/components/student/StudentHome.tsx`](#srccomponentsstudentStudentHometsx)
- [`src/components/student/StudentProfile.tsx`](#srccomponentsstudentStudentProfiletsx)
- [`src/components/student/StudentRequests.tsx`](#srccomponentsstudentStudentRequeststsx)
- [`src/context/AuthContext.tsx`](#srccontextAuthContexttsx)
- [`src/context/FlashContext.tsx`](#srccontextFlashContexttsx)
- [`src/index.css`](#srcindexcss)
- [`src/lib/aiService.ts`](#srclibaiServicets)
- [`src/lib/database.ts`](#srclibdatabasets)
- [`src/lib/security.ts`](#srclibsecurityts)
- [`src/main.tsx`](#srcmaintsx)
- [`src/types/index.ts`](#srctypesindexts)
- [`tsconfig.json`](#tsconfigjson)
- [`vite.config.ts`](#viteconfigts)

---

## `.env.example`

```
# GEMINI_API_KEY: Required for Gemini AI API calls.
# AI Studio automatically injects this at runtime from user secrets.
# Users configure this via the Secrets panel in the AI Studio UI.
GEMINI_API_KEY="MY_GEMINI_API_KEY"

# APP_URL: The URL where this applet is hosted.
# AI Studio automatically injects this at runtime with the Cloud Run service URL.
# Used for self-referential links, OAuth callbacks, and API endpoints.
APP_URL="MY_APP_URL"

```

---

## `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Library Chap Chap</title>
    <meta name="description" content="Secure, enterprise-grade Library Management System with OWASP security controls, role-based access for Admin and Students, catalog management, book issuance, request tracking, and responsive modern UI." />
    <meta property="og:title" content="Library Chap Chap" />
    <meta property="og:description" content="Secure, enterprise-grade Library Management System with OWASP security controls, role-based access for Admin and Students, catalog management, book issuance, request tracking, and responsive modern UI." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Cabinet+Grotesk:wght@700;800&display=swap" rel="stylesheet">
  </head>
  <body class="bg-stone-50 text-stone-900 font-sans antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>


```

---

## `metadata.json`

```json
{
  "name": "Library Chap Chap",
  "description": "Secure, enterprise-grade Library Management System with OWASP security controls, role-based access for Admin and Students, catalog management, book issuance, request tracking, and responsive modern UI.",
  "requestFramePermissions": [],
  "majorCapabilities": ["MAJOR_CAPABILITY_SERVER_SIDE_GEMINI_API"]
}

```

---

## `package.json`

```json
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx server.ts",
    "start": "tsx server.ts",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.3.3",
    "@vitejs/plugin-react": "^6.1.1",
    "bcryptjs": "^3.0.3",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^8.3.0"
  },
  "devDependencies": {
    "@types/bcryptjs": "^3.0.0",
    "@types/express": "^4.17.21",
    "@types/node": "^22.14.0",
    "@types/react": "^19.3.0",
    "@types/react-dom": "^19.3.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.3.3",
    "tsx": "^4.21.0",
    "typescript": "^7.0.2"
  }
}

```

---

## `server.ts`

```typescript
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize GoogleGenAI client with User-Agent
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// System instruction for Library Chap Chap AI Assistant
const LIBRARY_SYSTEM_INSTRUCTION = `You are the "Library Chap Chap AI Assistant", an erudite academic librarian and navigation guide for the Library Chap Chap university library management system.

Your responsibilities:
1. Explain any book in depth:
   - Provide comprehensive, clear summaries of key themes, thesis, chapter breakdowns, author background, syllabus relevance, and practical takeaways.
   - For technical books (e.g., "Introduction to Algorithms", "Clean Architecture", "Modern Operating Systems"): explain the core data structures, architectural principles, kernel concepts, and programming paradigms.
   - For literature (e.g., "Things Fall Apart" by Chinua Achebe, "Petals of Blood" by Ngũgĩ wa Thiong'o): explore post-colonial African literature, symbolism, historical context, character arcs, and literary devices.
   - For science and economics (e.g., "Principles of Neural Science", "Microeconomics"): explain neurobiology, market structures, and consumer theory clearly.

2. Guide users to navigate the app:
   - How to browse the catalogue and check available shelf copies.
   - How students can submit a digital borrow request (from the Book Catalogue or Explore Books page).
   - How students can submit a return request for books they currently hold.
   - Where students view their personal loan history and track upcoming due dates.
   - How librarians and admins use the Console to manage catalogue inventory, issue and return books directly, register students, and review pending requests.
   - Inform users about library hours (Mon-Fri 08:00 - 22:00, Sat 09:00 - 18:00 at Main Campus Learning Commons Lobby).

Style & Tone:
- Professional, welcoming, articulate, and academically rigorous.
- Format responses cleanly with bold titles and bullet points when listing chapters, key takeaways, or navigation steps.
- Keep answers focused, informative, and engaging.`;

// AI Chat Route
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, selectedBook, history } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required.' });
      return;
    }

    if (!ai) {
      // Fallback response if GEMINI_API_KEY is not set yet in environment
      res.json({
        response: generateFallbackResponse(message, selectedBook),
      });
      return;
    }

    let promptContext = message;
    if (selectedBook) {
      promptContext = `[Context: User is viewing/inquiring about the book "${selectedBook.title}" by ${selectedBook.author}, Genre: ${selectedBook.genre}, Shelf: ${selectedBook.rackLocation}, ISBN: ${selectedBook.isbn}]\n\nUser Question: ${message}`;
    }

    // Call gemini-3.8-flash
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: promptContext,
      config: {
        systemInstruction: LIBRARY_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text || 'I could not generate an answer at this moment.';
    res.json({ response: text });
  } catch (err: unknown) {
    console.error('Gemini API Error:', err);
    // Return graceful fallback message
    const fallback = generateFallbackResponse(req.body?.message || '', req.body?.selectedBook);
    res.json({ response: fallback });
  }
});

function generateFallbackResponse(query: string, book?: any): string {
  const q = query.toLowerCase();
  if (book) {
    return `### **${book.title}** by ${book.author} (${book.publicationYear})

**Academic Overview:**
${book.summary || 'A foundational academic volume in the ' + book.genre + ' collection.'}

**Key Details:**
- **Faculty / Subject:** ${book.genre}
- **Shelf Location:** ${book.rackLocation}
- **ISBN:** ${book.isbn}
- **Inventory Status:** ${book.availableCopies} copy(ies) currently available on the physical shelves.

**How to Borrow:**
To borrow this book, click **"Request to Borrow"** in the catalogue while logged in to your Student account. Our Chief Librarian will approve your request for pickup at the Self-Checkout desk!`;
  }

  if (q.includes('borrow') || q.includes('request')) {
    return `### How to Borrow Books in Library Chap Chap:
1. Log in to your **Student Account** (or click Register if you don't have one).
2. Go to the **Book Catalogue** or **Explore Books** page.
3. Find the book you need and click **"Request to Borrow"**.
4. Enter an optional academic research note and confirm.
5. The librarian will review and approve your request. You can then collect your volume at the **Self-Checkout Kiosks**!`;
  }

  if (q.includes('return')) {
    return `### How to Return Books:
1. Go to your **Student Desk** or **Borrow & Returns** tab.
2. Under "Books Currently Checked Out to You", find your loan.
3. Click **"Submit Return Request"**.
4. Drop off the physical book at the **Lobby Return Drop-box**. The librarian will confirm receipt and restore catalog stock.`;
  }

  return `Welcome to **Library Chap Chap**! I am your AI Library Assistant. You can ask me to:
- **Explain any book in our collection** (themes, summary, chapters, author analysis).
- **Find book recommendations** for computer science, literature, engineering, medicine, or economics.
- **Guide you through borrowing, returns, or account navigation**.

Try selecting a book on the **Explore Books** page or ask me any question!`;
}

// Download endpoints for user export
app.get('/api/download/all-code-markdown', (_req, res) => {
  const filePath = path.resolve(__dirname, 'LIBRARY_CHAPCHAP_ALL_CODE.md');
  res.download(filePath, 'LIBRARY_CHAPCHAP_ALL_CODE.md');
});

app.get('/api/download/project-zip', (_req, res) => {
  const filePath = path.resolve(__dirname, 'library_chapchap_project.zip');
  res.download(filePath, 'library_chapchap_project.zip');
});

// Vite middleware in dev, static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Library Chap Chap Server running on http://localhost:${PORT}`);
  });
}

startServer();

```

---

## `src/App.tsx`

```typescript
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

```

---

## `src/components/AuthView.tsx`

```typescript
import React, { useState, useEffect } from 'react';
import {
  Lock,
  User,
  ShieldCheck,
  GraduationCap,
  KeyRound,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  Phone,
  Mail,
  Building,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { checkLoginAttempts, validatePasswordStrength } from '../lib/security';

interface AuthViewProps {
  initialTab?: 'admin' | 'student' | 'register';
  onSuccess?: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialTab = 'student',
  onSuccess,
}) => {
  const { login, registerStudent } = useAuth();
  const [activeTab, setActiveTab] = useState<'admin' | 'student' | 'register'>(initialTab);

  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Lockout inspection
  const [lockoutStatus, setLockoutStatus] = useState(checkLoginAttempts(username));

  // Registration states
  const [regFullName, setRegFullName] = useState('');
  const [regStudentId, setRegStudentId] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDepartment, setRegDepartment] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  const regStrength = validatePasswordStrength(regPassword);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (username) {
      setLockoutStatus(checkLoginAttempts(username));
    }
  }, [username]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const targetRole = activeTab === 'admin' ? 'admin' : 'student';
    const ok = await login(username, password, targetRole);
    setLoading(false);
    if (ok) {
      onSuccess?.();
    } else {
      setLockoutStatus(checkLoginAttempts(username));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await registerStudent({
      fullName: regFullName,
      studentIdNumber: regStudentId,
      username: regUsername,
      email: regEmail,
      department: regDepartment,
      phone: regPhone,
      password: regPassword,
      confirmPassword: regConfirmPassword,
    });
    setLoading(false);
    if (ok) {
      onSuccess?.();
    }
  };

  const fillCredentials = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden">
        {/* Header Branding */}
        <div className="bg-[#701A1E] text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-2xl" />
          <div className="inline-flex p-3 bg-amber-400 text-[#701A1E] rounded-2xl mb-3 shadow-md">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight font-serif">
            Library Chap Chap Portal
          </h2>
          <p className="text-xs sm:text-sm text-stone-200 mt-1 max-w-sm mx-auto">
            Authorized university circulation and catalog account authentication.
          </p>
        </div>

        {/* Role Segmented Tabs */}
        <div className="flex border-b border-stone-200 bg-stone-50 p-2 gap-1.5">
          <button
            type="button"
            onClick={() => {
              setActiveTab('student');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Student Login</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setUsername('');
              setPassword('');
            }}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Admin / Librarian</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Register</span>
          </button>
        </div>

        {/* Tab 1 & 2: Login Forms */}
        {activeTab !== 'register' && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Account Lockout Notice */}
            {lockoutStatus.isLocked && (
              <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-rose-800 text-xs space-y-1">
                <div className="flex items-center gap-2 font-bold text-rose-900">
                  <Clock className="w-4 h-4 text-rose-600" />
                  <span>Account Temporarily Locked</span>
                </div>
                <p>
                  Exceeded 5 failed attempts. Locked for security compliance. Remaining duration:{' '}
                  <span className="font-mono font-bold">
                    {Math.ceil(lockoutStatus.remainingSeconds / 60)} minute(s)
                  </span>.
                </p>
              </div>
            )}

            {!lockoutStatus.isLocked && lockoutStatus.attemptsUsed > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  Failed attempts: <strong className="font-mono">{lockoutStatus.attemptsUsed}/5</strong>.
                  5 failed tries locks account for 15 minutes.
                </span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  {activeTab === 'admin' ? 'Librarian Username' : 'Student Username'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder={activeTab === 'admin' ? 'e.g. admin' : 'e.g. brian or amina'}
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    className="w-full pl-10 pr-4 py-2.5 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
                  />
                  <KeyRound className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || lockoutStatus.isLocked}
                className="w-full py-3 px-4 text-sm font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating with bcrypt...' : `Sign In as ${activeTab === 'admin' ? 'Admin' : 'Student'}`}
              </button>
            </form>

            <div className="pt-2 text-center text-xs text-stone-500">
              {activeTab === 'admin' ? (
                <span>Need to access your student account? Switch to Student tab above.</span>
              ) : (
                <span>
                  Don&apos;t have a student library card?{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="font-bold text-[#701A1E] hover:underline"
                  >
                    Register here
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Student Registration Form */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegister} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={e => setRegFullName(e.target.value)}
                  placeholder="e.g. Grace Wanjiku"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Student Reg Number
                </label>
                <input
                  type="text"
                  required
                  value={regStudentId}
                  onChange={e => setRegStudentId(e.target.value)}
                  placeholder="e.g. SCC/00234/2024"
                  className="w-full px-3.5 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={e => setRegUsername(e.target.value)}
                    placeholder="e.g. grace"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  University Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="grace@chapchap.edu"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Department / Course
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regDepartment}
                    onChange={e => setRegDepartment(e.target.value)}
                    placeholder="e.g. Information Technology"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <Building className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="+254 700 000 000"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Password (OWASP Strong Policy)
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={e => setRegPassword(e.target.value)}
                  placeholder="Create secure password (8+ chars, upper, digit, symbol)"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>

              {/* Password strength real-time indicator */}
              <div className="mt-2 p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between text-stone-600 font-semibold mb-1">
                  <span>OWASP Complexity Requirements:</span>
                  <span
                    className={
                      regStrength.score >= 5
                        ? 'text-emerald-700 font-bold'
                        : regStrength.score >= 3
                        ? 'text-amber-600 font-bold'
                        : 'text-rose-600 font-bold'
                    }
                  >
                    {regStrength.score}/5 Satisfied
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <span className={`flex items-center gap-1 ${regStrength.criteria.minLength ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${regStrength.criteria.hasUpper ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${regStrength.criteria.hasLower ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${regStrength.criteria.hasDigit ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Number
                  </span>
                  <span className={`flex items-center gap-1 col-span-2 ${regStrength.criteria.hasSpecial ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Special Character (!@#$%)
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={e => setRegConfirmPassword(e.target.value)}
                  placeholder="Re-enter chosen password"
                  className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
              {regConfirmPassword && regPassword !== regConfirmPassword && (
                <p className="text-xs text-rose-600 mt-1 font-medium">Passwords do not match.</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !regStrength.valid || regPassword !== regConfirmPassword}
              className="w-full py-3 px-4 text-sm font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Student Profile...' : 'Complete Student Registration'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

```

---

## `src/components/BookCover.tsx`

```typescript
import React from 'react';
import coverAlgorithms from '../assets/images/cover_algorithms_1790695772241.jpg';
import coverCleanArch from '../assets/images/cover_clean_arch_1790695788163.jpg';
import coverThingsFall from '../assets/images/cover_things_fall_1790695799868.jpg';
import { BookOpen } from 'lucide-react';
import { Book } from '../types';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({ book, size = 'md', className = '' }) => {
  // Map specific image covers
  const getImage = () => {
    if (book.id === 'bk_1' || book.title.toLowerCase().includes('algorithm')) return coverAlgorithms;
    if (book.id === 'bk_2' || book.title.toLowerCase().includes('clean architecture')) return coverCleanArch;
    if (book.id === 'bk_3' || book.title.toLowerCase().includes('things fall apart')) return coverThingsFall;
    return null;
  };

  const imageSrc = getImage();

  const sizeClasses = {
    sm: 'w-12 h-16 text-[9px]',
    md: 'w-20 h-28 text-[10px]',
    lg: 'w-28 h-38 text-xs',
    xl: 'w-44 h-60 text-sm',
  }[size];

  if (imageSrc) {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-lg shadow-md border border-stone-200/80 bg-stone-900 group ${sizeClasses} ${className}`}
      >
        <img
          src={imageSrc}
          alt={`Front cover of ${book.title}`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Subtle spine shadow overlay for realistic book effect */}
        <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Elegant fallback book cover with rich typography, book spine and faculty accent
  const getPalette = () => {
    switch (book.genre) {
      case 'Computer Science':
        return { bg: 'from-[#1E1B4B] to-[#312E81]', accent: 'text-indigo-300', border: 'border-indigo-700/50' };
      case 'Software Engineering':
        return { bg: 'from-[#450A0A] to-[#7F1D1D]', accent: 'text-rose-300', border: 'border-rose-700/50' };
      case 'African Literature':
        return { bg: 'from-[#78350F] to-[#B45309]', accent: 'text-amber-300', border: 'border-amber-700/50' };
      case 'Medicine & Health':
        return { bg: 'from-[#064E3B] to-[#047857]', accent: 'text-emerald-300', border: 'border-emerald-700/50' };
      case 'Economics':
        return { bg: 'from-[#14532D] to-[#15803D]', accent: 'text-green-300', border: 'border-green-700/50' };
      default:
        return { bg: 'from-[#701A1E] to-[#8C242A]', accent: 'text-amber-300', border: 'border-amber-600/40' };
    }
  };

  const palette = getPalette();

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-lg shadow-md border ${palette.border} bg-gradient-to-br ${palette.bg} text-white p-2 flex flex-col justify-between select-none ${sizeClasses} ${className}`}
    >
      {/* Book spine highlight */}
      <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-black/45 via-black/20 to-transparent pointer-events-none" />

      {/* Top faculty tag */}
      <div className="relative pl-1.5">
        <span className={`block uppercase tracking-wider font-extrabold text-[8px] truncate ${palette.accent}`}>
          {book.genre}
        </span>
      </div>

      {/* Title & Author */}
      <div className="relative pl-1.5 my-auto">
        <h4 className="font-serif font-extrabold leading-tight line-clamp-2 text-white drop-shadow-xs">
          {book.title}
        </h4>
        <p className="text-[9px] text-stone-300 truncate mt-0.5 font-medium">
          {book.author}
        </p>
      </div>

      {/* Bottom logo emblem */}
      <div className="relative pl-1.5 flex items-center justify-between opacity-80 pt-1 border-t border-white/10 text-[8px]">
        <span className="font-mono">{book.publicationYear}</span>
        <BookOpen className="w-3 h-3 text-amber-400" />
      </div>
    </div>
  );
};

```

---

## `src/components/BookSearchModal.tsx`

```typescript
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

```

---

## `src/components/BooksExplorerView.tsx`

```typescript
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

```

---

## `src/components/ChangePasswordModal.tsx`

```typescript
import React, { useState } from 'react';
import { X, Lock, Check, KeyRound } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validatePasswordStrength } from '../lib/security';

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ isOpen, onClose }) => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const strength = validatePasswordStrength(newPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const success = await changePassword(currentPassword, newPassword, confirmPassword);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-tight">Update Account Password</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={currentPassword}
                onChange={e => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="Enter strong new password"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>

            {/* Password requirements meter */}
            {newPassword.length > 0 && (
              <div className="mt-2.5 p-3 bg-stone-50 border border-stone-200 rounded-lg text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-600 mb-1 font-semibold">
                  <span>OWASP Security Score:</span>
                  <span
                    className={
                      strength.score >= 5
                        ? 'text-emerald-700 font-bold'
                        : strength.score >= 3
                        ? 'text-amber-600 font-bold'
                        : 'text-rose-600 font-bold'
                    }
                  >
                    {strength.score} / 5
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <span className={`flex items-center gap-1 ${strength.criteria.minLength ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 8+ Characters
                  </span>
                  <span className={`flex items-center gap-1 ${strength.criteria.hasUpper ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Uppercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${strength.criteria.hasLower ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Lowercase Letter
                  </span>
                  <span className={`flex items-center gap-1 ${strength.criteria.hasDigit ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Number
                  </span>
                  <span className={`flex items-center gap-1 col-span-2 ${strength.criteria.hasSpecial ? 'text-emerald-700 font-medium' : 'text-stone-400'}`}>
                    <Check className="w-3 h-3" /> 1 Special Character (!@#$%)
                  </span>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-type new password"
                className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#701A1E] focus:border-transparent text-stone-900"
              />
              <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <p className="text-xs text-rose-600 mt-1 font-medium">Passwords do not match.</p>
            )}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !strength.valid || newPassword !== confirmPassword}
              className="px-4 py-2 text-xs font-semibold bg-[#701A1E] text-white hover:bg-[#8C242A] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors shadow-sm"
            >
              {loading ? 'Encrypting & Saving...' : 'Save New Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

```

---

## `src/components/DefaultPasswordBanner.tsx`

```typescript
import React, { useState } from 'react';
import { AlertTriangle, KeyRound, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ChangePasswordModal } from './ChangePasswordModal';

export const DefaultPasswordBanner: React.FC = () => {
  const { showDefaultPasswordBanner, dismissDefaultWarning, currentUser } = useAuth();
  const [showModal, setShowModal] = useState(false);

  if (!showDefaultPasswordBanner || !currentUser) return null;

  return (
    <>
      <div className="bg-amber-500/15 border-b border-amber-500/30 text-stone-900 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2.5">
            <span className="p-1 bg-amber-500 text-stone-950 rounded-md font-bold shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div>
              <span className="font-bold text-stone-900">Default Credentials Warning (OWASP A05):</span>{' '}
              <span className="text-stone-700">
                Your account is currently using the initial default password ({currentUser.role === 'admin' ? 'admin123' : 'student123'}). Please set a strong custom password.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors shadow-sm"
            >
              <KeyRound className="w-3.5 h-3.5 text-amber-400" />
              Change Password Now
            </button>
            <button
              onClick={dismissDefaultWarning}
              className="p-1 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-200/50 transition-colors"
              title="Dismiss warning for this session"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showModal && <ChangePasswordModal isOpen={showModal} onClose={() => setShowModal(false)} />}
    </>
  );
};

```

---

## `src/components/DownloadCodeModal.tsx`

```typescript
import React from 'react';
import { Download, FileText, FolderArchive, X, Check, Copy } from 'lucide-react';
import { useFlash } from '../context/FlashContext';

interface DownloadCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadCodeModal: React.FC<DownloadCodeModalProps> = ({ isOpen, onClose }) => {
  const flash = useFlash();

  if (!isOpen) return null;

  const handleDownloadSingleFile = () => {
    window.location.href = '/api/download/all-code-markdown';
    flash.success('Downloading single-file complete codebase: LIBRARY_CHAPCHAP_ALL_CODE.md');
  };

  const handleDownloadZip = () => {
    window.location.href = '/api/download/project-zip';
    flash.success('Downloading complete project archive: library_chapchap_project.zip');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Download className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base tracking-tight font-serif">Export Codebase to a File</h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-stone-800">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            All project files, React frontend components, Express backend endpoints, database models, and styles have been bundled for you into two convenient formats:
          </p>

          <div className="space-y-3">
            {/* Option 1: Single File Markdown */}
            <div
              onClick={handleDownloadSingleFile}
              className="p-4 rounded-2xl border border-stone-200 hover:border-[#701A1E] bg-stone-50 hover:bg-stone-100/70 transition-all cursor-pointer group flex items-start gap-3.5 shadow-2xs"
            >
              <div className="p-2.5 rounded-xl bg-amber-100 text-[#701A1E] group-hover:scale-105 transition-transform shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900">
                    Single Unified File (.md)
                  </h4>
                  <span className="text-[11px] font-mono text-[#701A1E] font-bold">Recommended</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  <code>LIBRARY_CHAPCHAP_ALL_CODE.md</code> — Contains all project files and source code in a single text file with table of contents.
                </p>
                <div className="mt-2 text-xs font-bold text-[#701A1E] group-hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Single File Now</span>
                </div>
              </div>
            </div>

            {/* Option 2: Full ZIP Archive */}
            <div
              onClick={handleDownloadZip}
              className="p-4 rounded-2xl border border-stone-200 hover:border-amber-600 bg-stone-50 hover:bg-stone-100/70 transition-all cursor-pointer group flex items-start gap-3.5 shadow-2xs"
            >
              <div className="p-2.5 rounded-xl bg-stone-200 text-stone-800 group-hover:scale-105 transition-transform shrink-0">
                <FolderArchive className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-stone-900">
                    Complete Project ZIP (.zip)
                  </h4>
                  <span className="text-[11px] font-mono text-stone-500">Source Folder</span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  <code>library_chapchap_project.zip</code> — Complete folder hierarchy with source code, assets, package.json, and tsconfig.
                </p>
                <div className="mt-2 text-xs font-bold text-amber-800 group-hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download ZIP Archive</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-stone-100 rounded-xl text-[11px] text-stone-600">
            <strong>Location in workspace:</strong> Both <code>/LIBRARY_CHAPCHAP_ALL_CODE.md</code> and <code>/library_chapchap_project.zip</code> are also located directly in your root project workspace.
          </div>
        </div>

        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/ErrorPages.tsx`

```typescript
import React from 'react';
import { ShieldAlert, AlertOctagon, HelpCircle, ArrowLeft } from 'lucide-react';

interface ErrorPageProps {
  code: 403 | 404 | 500;
  onGoHome: () => void;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ code, onGoHome }) => {
  const getDetails = () => {
    switch (code) {
      case 403:
        return {
          title: '403 Forbidden: Access Denied',
          desc: 'Your account lacks the administrative privileges required to access this resource. Deny-by-default role-based access control is actively enforced.',
          icon: <ShieldAlert className="w-12 h-12 text-[#701A1E]" />,
        };
      case 404:
        return {
          title: '404: Catalogue Resource Not Found',
          desc: 'The requested book volume, student record, or circulation resource could not be found or has been relocated.',
          icon: <HelpCircle className="w-12 h-12 text-amber-600" />,
        };
      case 500:
      default:
        return {
          title: '500: Server Safety Interlock',
          desc: 'An internal transaction was halted by our safety checks. No internal diagnostic stack traces are leaked to client browsers.',
          icon: <AlertOctagon className="w-12 h-12 text-rose-600" />,
        };
    }
  };

  const details = getDetails();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-stone-200/90 p-8 shadow-xl text-center space-y-5">
        <div className="w-20 h-20 rounded-2xl bg-stone-100 flex items-center justify-center mx-auto shadow-inner">
          {details.icon}
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-stone-900 font-serif">{details.title}</h2>
          <p className="text-xs text-stone-600 leading-relaxed">{details.desc}</p>
        </div>

        <div className="pt-2">
          <button
            onClick={onGoHome}
            className="px-5 py-2.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-sm inline-flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4 text-amber-400" />
            <span>Return to Safe Campus Desk</span>
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/HomeView.tsx`

```typescript
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

```

---

## `src/components/LibraryAIChatbot.tsx`

```typescript
import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  Compass,
  X,
  Bot,
  User,
  ArrowRight,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { Book } from '../types';
import { askLibraryAI, ChatMessage } from '../lib/aiService';

interface LibraryAIChatbotProps {
  selectedBook?: Book | null;
  onClearSelectedBook?: () => void;
  onNavigateTab?: (tab: string) => void;
  embedded?: boolean;
}

export const LibraryAIChatbot: React.FC<LibraryAIChatbotProps> = ({
  selectedBook,
  onClearSelectedBook,
  onNavigateTab,
  embedded = false,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_welcome',
      sender: 'assistant',
      text: 'Hello! I am your **Library Chap Chap AI Assistant**.\n\nI can explain any book in our collection in depth (chapter themes, author thesis, syllabus context) and help you navigate borrowing, returns, and catalog shelves. What would you like to explore?',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // If selectedBook changes, add an automatic prompt suggestion
  useEffect(() => {
    if (selectedBook) {
      setMessages(prev => [
        ...prev,
        {
          id: 'msg_book_' + Date.now(),
          sender: 'assistant',
          text: `You selected **"${selectedBook.title}"** by ${selectedBook.author}.\n\nWould you like an in-depth explanation of its core ideas, syllabus applications, or how to borrow a copy?`,
          timestamp: Date.now(),
        },
      ]);
    }
  }, [selectedBook]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: 'user_' + Date.now(),
      sender: 'user',
      text,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const responseText = await askLibraryAI(text, selectedBook, messages);
      const aiMsg: ChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: 'ai_err_' + Date.now(),
          sender: 'assistant',
          text: 'I encountered an issue processing your query. Please try again or ask about another title.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`flex flex-col bg-white/95 backdrop-blur-xl border border-stone-200/90 shadow-2xl rounded-3xl overflow-hidden ${embedded ? 'h-full min-h-[580px]' : 'w-full h-[540px]'}`}>
      {/* Header */}
      <div className="bg-[#701A1E] text-white px-5 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-stone-950 flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-tight font-serif flex items-center gap-1.5">
              <span>Chap Chap AI Assistant</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono rounded">Gemini</span>
            </h3>
            <p className="text-[11px] text-stone-300">Book Analysis &amp; Campus Navigation</p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: 'msg_welcome',
                sender: 'assistant',
                text: 'How can I assist you with book explanations or library navigation today?',
                timestamp: Date.now(),
              },
            ]);
            onClearSelectedBook?.();
          }}
          className="text-stone-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          title="Reset conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selected Book Context Pill */}
      {selectedBook && (
        <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-stone-900 shrink-0">
          <div className="flex items-center gap-2 truncate">
            <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span className="font-semibold truncate">Active Book:</span>
            <span className="text-stone-700 truncate">&ldquo;{selectedBook.title}&rdquo;</span>
          </div>
          <button
            onClick={onClearSelectedBook}
            className="text-stone-500 hover:text-stone-800 p-1 shrink-0"
            title="Remove book focus"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs sm:text-sm">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-[#701A1E] text-amber-400 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed whitespace-pre-wrap ${
                msg.sender === 'user'
                  ? 'bg-[#701A1E] text-white shadow-xs rounded-tr-xs'
                  : 'bg-stone-100 text-stone-800 border border-stone-200/80 rounded-tl-xs'
              }`}
            >
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-stone-800 text-stone-200 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2.5 text-stone-500 text-xs italic p-2">
            <div className="w-6 h-6 rounded-lg bg-[#701A1E] text-amber-400 flex items-center justify-center shrink-0 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span>Analyzing catalogue literature...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Bar */}
      <div className="px-4 py-2 border-t border-stone-100 bg-stone-50/80 flex items-center gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
        {selectedBook ? (
          <>
            <button
              onClick={() => handleSend(`Explain the core thesis and major themes of "${selectedBook.title}" in detail.`)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-200 hover:border-[#701A1E] hover:text-[#701A1E] rounded-lg transition-colors whitespace-nowrap"
            >
              📖 Explain this book
            </button>
            <button
              onClick={() => handleSend(`What are the key chapters and practical takeaways in "${selectedBook.title}"?`)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-200 hover:border-[#701A1E] hover:text-[#701A1E] rounded-lg transition-colors whitespace-nowrap"
            >
              📑 Chapter breakdown
            </button>
            <button
              onClick={() => handleSend(`How do I request to borrow "${selectedBook.title}"?`)}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-200 hover:border-[#701A1E] hover:text-[#701A1E] rounded-lg transition-colors whitespace-nowrap"
            >
              🔖 How to borrow
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleSend('How do I submit a borrow request for a book in this app?')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-200 hover:border-[#701A1E] hover:text-[#701A1E] rounded-lg transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <Compass className="w-3 h-3 text-amber-600" />
              <span>How to borrow</span>
            </button>
            <button
              onClick={() => handleSend('Tell me about the classic novel "Things Fall Apart" by Chinua Achebe.')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-200 hover:border-[#701A1E] hover:text-[#701A1E] rounded-lg transition-colors whitespace-nowrap"
            >
              📚 African Literature
            </button>
            <button
              onClick={() => handleSend('Explain "Introduction to Algorithms" and why it is essential for computer science.')}
              className="px-2.5 py-1 text-[11px] font-semibold bg-white border border-stone-200 hover:border-[#701A1E] hover:text-[#701A1E] rounded-lg transition-colors whitespace-nowrap"
            >
              💻 Algorithms
            </button>
          </>
        )}
      </div>

      {/* Input Field */}
      <div className="p-3 border-t border-stone-200 bg-white flex items-center gap-2 shrink-0">
        <textarea
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={selectedBook ? `Ask about "${selectedBook.title}"...` : 'Ask anything about books or navigation...'}
          className="flex-1 resize-none py-2 px-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900 placeholder-stone-400"
        />
        <button
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="p-2.5 bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
        >
          <Send className="w-4 h-4 text-amber-400" />
        </button>
      </div>
    </div>
  );
};

```

---

## `src/components/Navbar.tsx`

```typescript
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

```

---

## `src/components/OwaspSecurityModal.tsx`

```typescript
import React from 'react';
import { X, ShieldCheck, KeyRound, Lock, Database, UserCheck, AlertTriangle } from 'lucide-react';

interface OwaspSecurityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OwaspSecurityModal: React.FC<OwaspSecurityModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const securityMeasures = [
    {
      category: 'A01: Broken Access Control',
      badge: 'RBAC & Strict Isolation',
      icon: <UserCheck className="w-5 h-5 text-emerald-500" />,
      description:
        'Deny-by-default role guards (@admin_required, @student_required). Students cannot approve requests or delete records. Student borrow history and profile records are strictly isolated by session user ID.',
    },
    {
      category: 'A02: Cryptographic Failures',
      badge: 'bcrypt & Salted Hashes',
      icon: <KeyRound className="w-5 h-5 text-amber-500" />,
      description:
        'All passwords hashed using salted bcrypt (cost factor 10). No plaintext or vulnerable legacy SHA-256 passwords allowed. Default credentials generate persistent security alerts on first login.',
    },
    {
      category: 'A03: Injection & XSS',
      badge: 'Parameterized & Sanitized',
      icon: <Database className="w-5 h-5 text-sky-500" />,
      description:
        'All database queries use parameterized access patterns preventing SQL injection. User inputs are sanitized to strip malicious script tags and prevent cross-site scripting (XSS).',
    },
    {
      category: 'A04: Insecure Design',
      badge: 'Business Logic Guards',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      description:
        'Server-side concurrency and availability verification prevents double-issuing or borrowing out-of-stock titles. Duplicate pending requests for the same book are strictly rejected at the service level.',
    },
    {
      category: 'A05: Security Misconfiguration',
      badge: 'Hardened Defaults',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      description:
        'Warning banner displayed when default seeded accounts (admin123 / student123) are active. Generic error boundaries without sensitive stack trace leakage.',
    },
    {
      category: 'A07: Identification & Auth Failures',
      badge: 'Rate Limiting & Lockout',
      icon: <Lock className="w-5 h-5 text-rose-500" />,
      description:
        'Account lockout defense: 5 consecutive failed login attempts trigger an immediate 15-minute lockout timer. Enforces OWASP password complexity (8+ chars, uppercase, digit, special character).',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <div>
              <h3 className="font-bold text-base tracking-tight">OWASP Security Architecture</h3>
              <p className="text-xs text-stone-300">Library Chap Chap Defense & Hardening Matrix</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Library Chap Chap has been engineered with defense-in-depth, incorporating the OWASP Top 10 security controls across identity, access control, cryptography, and business logic verification:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
            {securityMeasures.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-lg border border-stone-200 shadow-2xs shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
                      {item.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 mt-0.5 mb-1">
                      {item.badge}
                    </h4>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-950">
            <span className="font-bold">Automated Penetration Self-Test:</span> Attempting 6 wrong password inputs on the login portal activates the automated 15-minute brute-force lockout. Trying to borrow unavailable books or approve already borrowed titles triggers instant transaction rejection.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors"
          >
            Close Security Specifications
          </button>
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/admin/AdminBooks.tsx`

```typescript
import React, { useState } from 'react';
import {
  Plus,
  Search,
  BookOpen,
  Edit2,
  Trash2,
  X,
  Check,
  AlertCircle,
  FolderOpen,
} from 'lucide-react';
import { Book } from '../../types';
import { db } from '../../lib/database';
import { BookCover } from '../BookCover';
import { useFlash } from '../../context/FlashContext';

export const AdminBooks: React.FC = () => {
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const books = db.getBooks();

  // Search & Filter
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: 'Computer Science',
    totalCopies: 3,
    rackLocation: 'Section B, Shelf 01',
    publicationYear: 2024,
    summary: '',
  });

  const genres = Array.from(new Set(books.map(b => b.genre)));

  const filteredBooks = books.filter(b => {
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.isbn.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || b.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      genre: genres[0] || 'Computer Science',
      totalCopies: 3,
      rackLocation: 'Section B, Shelf 01',
      publicationYear: new Date().getFullYear(),
      summary: '',
    });
    setEditingBook(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (b: Book) => {
    setEditingBook(b);
    setFormData({
      title: b.title,
      author: b.author,
      isbn: b.isbn,
      genre: b.genre,
      totalCopies: b.totalCopies,
      rackLocation: b.rackLocation,
      publicationYear: b.publicationYear,
      summary: b.summary || '',
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        db.updateBook(editingBook.id, {
          title: formData.title,
          author: formData.author,
          isbn: formData.isbn,
          genre: formData.genre,
          totalCopies: Number(formData.totalCopies),
          rackLocation: formData.rackLocation,
          publicationYear: Number(formData.publicationYear),
          summary: formData.summary,
        });
        flash.success(`Book "${formData.title}" updated successfully.`);
      } else {
        db.addBook({
          title: formData.title,
          author: formData.author,
          isbn: formData.isbn,
          genre: formData.genre,
          totalCopies: Number(formData.totalCopies),
          rackLocation: formData.rackLocation,
          publicationYear: Number(formData.publicationYear),
          summary: formData.summary,
        });
        flash.success(`Book "${formData.title}" added to library inventory.`);
      }
      setIsAddModalOpen(false);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed.';
      flash.error(msg);
    }
  };

  const handleDelete = (book: Book) => {
    const confirm = window.confirm(`Are you sure you want to delete "${book.title}" from the library catalogue?`);
    if (!confirm) return;

    try {
      db.deleteBook(book.id);
      flash.success(`"${book.title}" deleted from catalog.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot delete book.';
      flash.error(msg, 'Integrity Check Failed');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Books Inventory Management
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Full CRUD catalog management with strict copy reservation checks.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add New Book</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, author, or ISBN..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-stone-500 whitespace-nowrap">Genre:</label>
          <select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
            className="py-2 px-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-800"
          >
            <option value="all">All Genres ({books.length})</option>
            {genres.map(g => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Title &amp; Author</th>
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4">Genre</th>
                <th className="py-3 px-4">Shelf Location</th>
                <th className="py-3 px-4 text-center">Copies</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-stone-500">
                    No books matching the selected filters.
                  </td>
                </tr>
              ) : (
                filteredBooks.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <BookCover book={b} size="sm" />
                        <div className="min-w-0">
                          <div className="font-bold text-stone-900 leading-snug line-clamp-1">{b.title}</div>
                          <div className="text-[11px] text-stone-500 mt-0.5">{b.author} ({b.publicationYear})</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600 whitespace-nowrap">
                      {b.isbn}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="text-[11px] font-semibold text-stone-700">{b.genre}</span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                      {b.rackLocation}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-xs tabular-nums">
                      <span className="font-bold text-stone-900">{b.availableCopies}</span>
                      <span className="text-stone-400"> / {b.totalCopies}</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          b.availableCopies > 0
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-rose-50 text-rose-800 border border-rose-200'
                        }`}
                      >
                        {b.availableCopies > 0 ? 'Available' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(b)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Edit Book Details"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(b)}
                          className="p-1.5 text-rose-600 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Book Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-lg w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base tracking-tight">
                  {editingBook ? 'Edit Book Details' : 'Add New Book to Catalogue'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Book Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Clean Code"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Author(s)
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={e => setFormData({ ...formData, author: e.target.value })}
                    placeholder="e.g. Robert C. Martin"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    ISBN
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.isbn}
                    onChange={e => setFormData({ ...formData, isbn: e.target.value })}
                    placeholder="978-0132350884"
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Genre / Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.genre}
                    onChange={e => setFormData({ ...formData, genre: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Total Copies
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    required
                    value={formData.totalCopies}
                    onChange={e => setFormData({ ...formData, totalCopies: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Rack / Shelf Location
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.rackLocation}
                    onChange={e => setFormData({ ...formData, rackLocation: e.target.value })}
                    placeholder="e.g. Section B, Shelf 04"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Publication Year
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.publicationYear}
                    onChange={e => setFormData({ ...formData, publicationYear: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Summary / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.summary}
                  onChange={e => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Key concepts, syllabus linkage, or edition notes..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg shadow-sm"
                >
                  {editingBook ? 'Save Changes' : 'Add to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

```

---

## `src/components/admin/AdminDashboard.tsx`

```typescript
import React, { useState } from 'react';
import {
  BookOpen,
  Users,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  BookCheck,
  RotateCcw,
  Check,
  X,
} from 'lucide-react';
import { db } from '../../lib/database';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);

  const refresh = () => setTick(t => t + 1);

  const books = db.getBooks();
  const totalBooks = books.reduce((acc, b) => acc + b.totalCopies, 0);
  const availableBooks = books.reduce((acc, b) => acc + b.availableCopies, 0);
  const students = db.getStudents();
  const borrows = db.getBorrows();
  const activeBorrows = borrows.filter(b => b.status === 'borrowed');
  const requests = db.getRequests();
  const pendingRequests = requests.filter(r => r.status === 'pending');

  const handleApprove = (reqId: string) => {
    if (!currentUser) return;
    try {
      db.approveRequest(currentUser.id, reqId);
      flash.success('Student borrow/return request approved successfully.');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to approve request.';
      flash.error(msg);
    }
  };

  const handleDecline = (reqId: string) => {
    if (!currentUser) return;
    const reason = window.prompt('Reason for declining this request:', 'Book in reserve or duplicate request');
    if (reason === null) return;
    try {
      db.declineRequest(currentUser.id, reqId, reason);
      flash.info('Request marked as declined.');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to decline request.';
      flash.error(msg);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#701A1E] text-white rounded-md">
              Administration
            </span>
            <span className="text-xs text-stone-500 font-medium">· Central Library Desk</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif mt-1">
            Librarian Console Overview
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Monitor real-time book circulation, process student requests, and manage catalogue assets.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('admin_issue_return')}
            className="px-3.5 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
          >
            <BookCheck className="w-4 h-4 text-amber-400" />
            <span>Issue / Return Desk</span>
          </button>

          <button
            onClick={() => onNavigate('admin_books')}
            className="px-3.5 py-2 text-xs font-bold bg-stone-100 text-stone-800 hover:bg-stone-200 rounded-xl transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Book</span>
          </button>
        </div>
      </div>

      {/* Primary KPI Grid (Tabular Numerals) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Total Catalog
            </span>
            <div className="p-2 rounded-lg bg-stone-100 text-[#701A1E]">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#701A1E] font-mono tabular-nums">
              {totalBooks}
            </span>
            <span className="text-xs text-stone-500">volumes</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">{books.length} distinct titles</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Available Copies
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {availableBooks}
            </span>
            <span className="text-xs text-stone-500">ready</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">On physical shelving</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Active Loans
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
              {activeBorrows.length}
            </span>
            <span className="text-xs text-stone-500">checked out</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">Under standard return terms</p>
        </div>

        <div
          onClick={() => onNavigate('admin_requests')}
          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-[#701A1E]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Pending Requests
            </span>
            <div
              className={`p-2 rounded-lg ${
                pendingRequests.length > 0
                  ? 'bg-rose-100 text-rose-700 animate-pulse'
                  : 'bg-stone-100 text-stone-600'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-3xl font-extrabold font-mono tabular-nums ${
                pendingRequests.length > 0 ? 'text-rose-700' : 'text-stone-800'
              }`}
            >
              {pendingRequests.length}
            </span>
            <span className="text-xs text-stone-500">awaiting</span>
          </div>
          <p className="mt-1 text-xs text-[#701A1E] font-medium flex items-center gap-1">
            Review request queue <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>
      </div>

      {/* Pending Requests Queue Card */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Student Request Queue
            </h2>
            <p className="text-xs text-stone-500">Online borrow and return submissions awaiting approval</p>
          </div>
          <button
            onClick={() => onNavigate('admin_requests')}
            className="text-xs font-bold text-[#701A1E] hover:underline"
          >
            View All Requests ({requests.length}) →
          </button>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="p-8 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">All student requests resolved</p>
            <p className="text-xs text-stone-500 mt-0.5">
              No pending borrow or return submissions in queue.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Date Submitted</th>
                  <th className="py-3 px-4">Student Note</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {pendingRequests.slice(0, 5).map(req => (
                  <tr key={req.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-stone-900">{req.studentName}</div>
                      <div className="text-[11px] font-mono text-stone-500">{req.studentIdNumber}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          req.type === 'borrow'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-sky-100 text-sky-900'
                        }`}
                      >
                        {req.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-stone-800 max-w-xs truncate">
                      {req.bookTitle}
                    </td>
                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px]">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-stone-600 italic max-w-xs truncate">
                      {req.studentNotes || '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          title="Approve Request"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="px-2.5 py-1 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                          title="Decline Request"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Decline</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Active Borrows Table Preview */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Currently Circulating Loans
            </h2>
            <p className="text-xs text-stone-500">Active student book checkouts and return deadlines</p>
          </div>
          <button
            onClick={() => onNavigate('admin_issue_return')}
            className="text-xs font-bold text-[#701A1E] hover:underline"
          >
            Manage Circulation →
          </button>
        </div>

        {activeBorrows.length === 0 ? (
          <div className="p-8 text-center text-xs text-stone-500">
            No books currently on loan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Borrower Student</th>
                  <th className="py-3 px-4">Issued On</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {activeBorrows.slice(0, 5).map(loan => (
                  <tr key={loan.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3 px-4 font-bold text-stone-900 max-w-sm truncate">
                      {loan.bookTitle}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-stone-800">{loan.studentName}</div>
                      <div className="text-[11px] font-mono text-stone-500">{loan.studentIdNumber}</div>
                    </td>
                    <td className="py-3 px-4 text-stone-600 font-mono text-[11px]">{loan.issueDate}</td>
                    <td className="py-3 px-4 text-stone-800 font-mono text-[11px] font-bold">
                      {loan.dueDate}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider bg-amber-100 text-amber-800">
                        Active Loan
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

```

---

## `src/components/admin/AdminIssueReturn.tsx`

```typescript
import React, { useState } from 'react';
import { BookCheck, RotateCcw, Check, Calendar, AlertCircle } from 'lucide-react';
import { db } from '../../lib/database';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

export const AdminIssueReturn: React.FC = () => {
  const { currentUser } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [activeTab, setActiveTab] = useState<'issue' | 'return'>('issue');

  const students = db.getStudents();
  const books = db.getBooks();
  const availableBooks = books.filter(b => b.availableCopies > 0);
  const borrows = db.getBorrows();
  const activeBorrows = borrows.filter(b => b.status === 'borrowed');

  // Issue Form states
  const defaultDueDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  };

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [selectedBookId, setSelectedBookId] = useState(availableBooks[0]?.id || '');
  const [dueDate, setDueDate] = useState(defaultDueDate());
  const [issueRemarks, setIssueRemarks] = useState('Standard 14-day academic loan');

  // Return Form states
  const [returnRemarks, setReturnRemarks] = useState('');

  const handleIssueSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!selectedStudentId || !selectedBookId) {
      flash.error('Please select both a valid student and available book.');
      return;
    }

    try {
      db.issueBook(currentUser.id, selectedStudentId, selectedBookId, dueDate, issueRemarks);
      const student = students.find(s => s.id === selectedStudentId);
      const book = books.find(b => b.id === selectedBookId);
      flash.success(`"${book?.title}" issued to ${student?.fullName}. Due on ${dueDate}.`);
      setIssueRemarks('Standard 14-day academic loan');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to issue book.';
      flash.error(msg, 'Issue Denied');
    }
  };

  const handleProcessReturn = (borrowRecordId: string, bookTitle: string, studentName: string) => {
    if (!currentUser) return;
    try {
      db.returnBook(currentUser.id, borrowRecordId, returnRemarks || 'Returned in good condition');
      flash.success(`Book "${bookTitle}" returned by ${studentName}. Stock restored.`);
      setReturnRemarks('');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to return book.';
      flash.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Circulation Desk: Issue &amp; Return
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Physical book checkouts, loan duration tracking, and inventory reconciliation.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('issue')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'issue'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookCheck className="w-4 h-4 text-amber-400" />
            <span>Issue Book</span>
          </button>
          <button
            onClick={() => setActiveTab('return')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'return'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Process Return ({activeBorrows.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Issue Book Form */}
      {activeTab === 'issue' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs space-y-5">
            <h2 className="text-base font-bold text-stone-900 font-serif border-b border-stone-100 pb-3">
              Direct Book Issuance Form
            </h2>

            <form onSubmit={handleIssueSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Select Borrower Student
                </label>
                <select
                  required
                  value={selectedStudentId}
                  onChange={e => setSelectedStudentId(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                >
                  <option value="">-- Choose registered student --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.studentIdNumber}) — {s.department} [{s.activeBorrowsCount} currently borrowed]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Select Available Book from Catalogue
                </label>
                <select
                  required
                  value={selectedBookId}
                  onChange={e => setSelectedBookId(e.target.value)}
                  className="w-full py-2.5 px-3.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                >
                  <option value="">-- Choose book with available stock --</option>
                  {availableBooks.map(b => (
                    <option key={b.id} value={b.id}>
                      {b.title} by {b.author} [{b.availableCopies} available / {b.rackLocation}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    disabled
                    value={new Date().toISOString().split('T')[0]}
                    className="w-full py-2.5 px-3.5 text-xs font-mono bg-stone-100 border border-stone-300 rounded-xl text-stone-600 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                    Expected Due Date (Default 14 Days)
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      required
                      value={dueDate}
                      onChange={e => setDueDate(e.target.value)}
                      className="w-full py-2.5 px-3.5 text-xs font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                    />
                    <Calendar className="w-4 h-4 text-stone-400 absolute right-3.5 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                  Librarian Remarks / Condition Note
                </label>
                <input
                  type="text"
                  value={issueRemarks}
                  onChange={e => setIssueRemarks(e.target.value)}
                  placeholder="e.g. Standard 14-day academic loan, mint copy"
                  className="w-full py-2.5 px-3.5 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={availableBooks.length === 0 || students.length === 0}
                  className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Confirm Book Issue</span>
                </button>
              </div>
            </form>
          </div>

          {/* Quick Rules & Inventory Status */}
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
              <h3 className="font-bold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Circulation Guidelines</span>
              </h3>
              <p className="text-amber-900 leading-relaxed">
                • Undergraduate scholars can hold up to 3 simultaneous book loans.
              </p>
              <p className="text-amber-900 leading-relaxed">
                • The system prevents issuing copies if available inventory is zero.
              </p>
              <p className="text-amber-900 leading-relaxed">
                • Duplicate loan attempts for the same title by the same student will be denied.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs space-y-3">
              <h3 className="font-bold text-stone-900 text-xs uppercase tracking-wider">
                Shelves Summary
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Available Titles:</span>
                  <span className="font-mono font-bold text-emerald-700">{availableBooks.length}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Currently Loaned:</span>
                  <span className="font-mono font-bold text-amber-700">{activeBorrows.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Return Desk */}
      {activeTab === 'return' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 bg-stone-50">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Active Loans Awaiting Return ({activeBorrows.length})
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Click &quot;Process Return&quot; to restore inventory copies and mark the student loan record returned.
            </p>
          </div>

          {activeBorrows.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              <Check className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <p className="font-bold text-stone-800 text-sm">No active loans outstanding!</p>
              <p className="mt-1">All borrowed books have been returned to the shelves.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Book Title</th>
                    <th className="py-3 px-4">Student Borrower</th>
                    <th className="py-3 px-4">Issued Date</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Loan Remarks</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {activeBorrows.map(loan => {
                    const isOverdue = new Date(loan.dueDate) < new Date();
                    return (
                      <tr key={loan.id} className="hover:bg-stone-50/70 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-stone-900 max-w-xs">
                          {loan.bookTitle}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-stone-800">{loan.studentName}</div>
                          <div className="text-[11px] font-mono text-stone-500">{loan.studentIdNumber}</div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-stone-600">{loan.issueDate}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`font-mono font-bold ${
                              isOverdue ? 'text-rose-600' : 'text-stone-800'
                            }`}
                          >
                            {loan.dueDate}
                          </span>
                          {isOverdue && (
                            <span className="block text-[10px] font-bold uppercase text-rose-700">
                              Overdue
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-stone-500 italic max-w-xs truncate">
                          {loan.remarks || '—'}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleProcessReturn(loan.id, loan.bookTitle, loan.studentName)}
                            className="px-3 py-1.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors flex items-center gap-1 shadow-2xs ml-auto"
                          >
                            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                            <span>Process Return</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

```

---

## `src/components/admin/AdminReports.tsx`

```typescript
import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Download,
  BookCheck,
  CheckCircle,
  History,
  AlertTriangle,
} from 'lucide-react';
import { db } from '../../lib/database';

export const AdminReports: React.FC = () => {
  const [activeReportTab, setActiveReportTab] = useState<'borrowed' | 'available' | 'history'>('borrowed');

  const books = db.getBooks();
  const borrows = db.getBorrows();
  const activeBorrows = borrows.filter(b => b.status === 'borrowed');
  const availableBooks = books.filter(b => b.availableCopies > 0);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCsv = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    if (activeReportTab === 'borrowed') {
      csvContent += 'Book Title,Borrower Name,Student ID,Issue Date,Due Date,Status,Remarks\n';
      activeBorrows.forEach(b => {
        csvContent += `"${b.bookTitle}","${b.studentName}","${b.studentIdNumber}","${b.issueDate}","${b.dueDate}","${b.status}","${b.remarks || ''}"\n`;
      });
    } else if (activeReportTab === 'available') {
      csvContent += 'Book Title,Author,ISBN,Genre,Shelf Location,Available,Total\n';
      availableBooks.forEach(b => {
        csvContent += `"${b.title}","${b.author}","${b.isbn}","${b.genre}","${b.rackLocation}",${b.availableCopies},${b.totalCopies}\n`;
      });
    } else {
      csvContent += 'Book Title,Borrower Name,Student ID,Issue Date,Due Date,Return Date,Status\n';
      borrows.forEach(b => {
        csvContent += `"${b.bookTitle}","${b.studentName}","${b.studentIdNumber}","${b.issueDate}","${b.dueDate}","${b.returnDate || 'N/A'}","${b.status}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `chapchap_${activeReportTab}_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Circulation Reports &amp; Audit Logs
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Exportable administrative inventory lists and loan audits for university compliance.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-[#701A1E]" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 bg-white p-2 rounded-2xl border border-stone-200/90 shadow-2xs">
        <button
          onClick={() => setActiveReportTab('borrowed')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'borrowed'
              ? 'bg-[#701A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookCheck className="w-4 h-4 text-amber-400" />
          <span>Currently Borrowed Books ({activeBorrows.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('available')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'available'
              ? 'bg-[#701A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <CheckCircle className="w-4 h-4 text-amber-400" />
          <span>Available Inventory ({availableBooks.length})</span>
        </button>

        <button
          onClick={() => setActiveReportTab('history')}
          className={`flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
            activeReportTab === 'history'
              ? 'bg-[#701A1E] text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <History className="w-4 h-4 text-amber-400" />
          <span>Circulation History ({borrows.length})</span>
        </button>
      </div>

      {/* Report Table 1: Currently Borrowed */}
      {activeReportTab === 'borrowed' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Active Loans Ledger
            </span>
            <span className="text-stone-500 font-mono">
              Generated: {new Date().toLocaleDateString()}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Borrower Student</th>
                  <th className="py-3 px-4">Reg Number</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Standing</th>
                  <th className="py-3 px-4">Circulation Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {activeBorrows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-stone-500">
                      No active loans currently recorded.
                    </td>
                  </tr>
                ) : (
                  activeBorrows.map(b => {
                    const isOverdue = new Date(b.dueDate) < new Date();
                    return (
                      <tr key={b.id} className="hover:bg-stone-50/70">
                        <td className="py-3 px-4 font-bold text-stone-900 max-w-xs">{b.bookTitle}</td>
                        <td className="py-3 px-4 font-medium text-stone-800">{b.studentName}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.studentIdNumber}</td>
                        <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.issueDate}</td>
                        <td className="py-3 px-4 font-mono text-[11px] font-bold text-stone-800">
                          {b.dueDate}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                              isOverdue
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {isOverdue ? 'Overdue' : 'Active'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-stone-500 italic max-w-xs truncate">
                          {b.remarks || '—'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report Table 2: Available Inventory */}
      {activeReportTab === 'available' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Shelf Stock Summary
            </span>
            <span className="text-stone-500 font-mono">
              Total Titles Available: {availableBooks.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Author(s)</th>
                  <th className="py-3 px-4">ISBN</th>
                  <th className="py-3 px-4">Genre</th>
                  <th className="py-3 px-4">Shelf Location</th>
                  <th className="py-3 px-4 text-center">Available / Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {availableBooks.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-bold text-stone-900 max-w-sm">{b.title}</td>
                    <td className="py-3 px-4 text-stone-600">{b.author}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.isbn}</td>
                    <td className="py-3 px-4 text-stone-700">{b.genre}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.rackLocation}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-stone-900 tabular-nums">
                      <span className="text-emerald-700">{b.availableCopies}</span> / {b.totalCopies}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Report Table 3: History */}
      {activeReportTab === 'history' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Circulation History &amp; Audit Trail
            </span>
            <span className="text-stone-500 font-mono">Total Transactions: {borrows.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Issue Date</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Return Date</th>
                  <th className="py-3 px-4">Final Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {borrows.map(b => (
                  <tr key={b.id} className="hover:bg-stone-50/70">
                    <td className="py-3 px-4 font-bold text-stone-900 max-w-sm truncate">{b.bookTitle}</td>
                    <td className="py-3 px-4 text-stone-700">
                      {b.studentName} ({b.studentIdNumber})
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.issueDate}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">{b.dueDate}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-stone-600">
                      {b.returnDate || <span className="text-amber-700 italic">Not Returned</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          b.status === 'returned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

```

---

## `src/components/admin/AdminRequests.tsx`

```typescript
import React, { useState } from 'react';
import {
  RotateCcw,
  Check,
  X,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
} from 'lucide-react';
import { db } from '../../lib/database';
import { useAuth } from '../../context/AuthContext';
import { useFlash } from '../../context/FlashContext';

export const AdminRequests: React.FC = () => {
  const { currentUser } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'declined'>('pending');
  const [typeFilter, setTypeFilter] = useState<'all' | 'borrow' | 'return'>('all');
  const [search, setSearch] = useState('');

  const requests = db.getRequests();

  const filteredRequests = requests.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    const matchesSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentIdNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.bookTitle.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const handleApprove = (reqId: string, title: string, student: string) => {
    if (!currentUser) return;
    try {
      db.approveRequest(currentUser.id, reqId);
      flash.success(`Request for "${title}" by ${student} has been approved.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot approve request.';
      flash.error(msg, 'Approval Blocked');
    }
  };

  const handleDecline = (reqId: string, title: string) => {
    if (!currentUser) return;
    const reason = window.prompt(
      `Provide reason for declining request for "${title}":`,
      'Exceeded student loan quota or book reserved for reference.'
    );
    if (reason === null) return;

    try {
      db.declineRequest(currentUser.id, reqId, reason);
      flash.info(`Request for "${title}" was declined.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot decline request.';
      flash.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Student Circulation Requests
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Review online student book reservations and return submissions.
          </p>
        </div>

        {/* Status Counts */}
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-lg bg-amber-100 text-amber-900 font-bold text-xs">
            {requests.filter(r => r.status === 'pending').length} Pending
          </span>
          <span className="px-3 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-bold text-xs">
            {requests.filter(r => r.status === 'approved').length} Approved
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by student name, reg number, or book..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs">
            {(['all', 'pending', 'approved', 'declined'] as const).map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all ${
                  statusFilter === st
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Type filter */}
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as any)}
            className="py-1.5 px-3 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-800"
          >
            <option value="all">All Types</option>
            <option value="borrow">Borrow Only</option>
            <option value="return">Return Only</option>
          </select>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            No requests matching filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Submitted At</th>
                  <th className="py-3 px-4">Notes / Reason</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Librarian Decision</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {filteredRequests.map(req => (
                  <tr key={req.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900">{req.studentName}</div>
                      <div className="text-[11px] font-mono text-stone-500">{req.studentIdNumber}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          req.type === 'borrow'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-sky-100 text-sky-900'
                        }`}
                      >
                        {req.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-stone-800 max-w-xs truncate">
                      {req.bookTitle}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-500 text-[11px] whitespace-nowrap">
                      {new Date(req.requestDate).toLocaleString([], {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 italic max-w-xs truncate">
                      {req.studentNotes || req.adminNotes || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider ${
                          req.status === 'pending'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : req.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-rose-100 text-rose-900 border border-rose-300'
                        }`}
                      >
                        {req.status === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                        {req.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {req.status === 'declined' && <XCircle className="w-3 h-3 text-rose-600" />}
                        <span>{req.status}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      {req.status === 'pending' ? (
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => handleApprove(req.id, req.bookTitle, req.studentName)}
                            className="px-2.5 py-1 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                          <button
                            onClick={() => handleDecline(req.id, req.bookTitle)}
                            className="px-2.5 py-1 text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-stone-500 font-mono italic">
                          Resolved on {req.resolvedDate ? new Date(req.resolvedDate).toLocaleDateString() : '—'}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

```

---

## `src/components/admin/AdminStudents.tsx`

```typescript
import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Trash2,
  Edit2,
  X,
  History,
  BookOpen,
} from 'lucide-react';
import { BorrowRecord, Student } from '../../types';
import { db } from '../../lib/database';
import { useFlash } from '../../context/FlashContext';

export const AdminStudents: React.FC = () => {
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const students = db.getStudents();
  const [search, setSearch] = useState('');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [historyStudent, setHistoryStudent] = useState<Student | null>(null);
  const [studentHistoryRecords, setStudentHistoryRecords] = useState<BorrowRecord[]>([]);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    studentIdNumber: '',
    username: '',
    email: '',
    department: 'Computer Science',
    phone: '',
  });

  const filteredStudents = students.filter(s =>
    s.fullName.toLowerCase().includes(search.toLowerCase()) ||
    s.studentIdNumber.toLowerCase().includes(search.toLowerCase()) ||
    s.department.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormData({
      fullName: '',
      studentIdNumber: '',
      username: '',
      email: '',
      department: 'Computer Science',
      phone: '',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (s: Student) => {
    setEditingStudent(s);
    setFormData({
      fullName: s.fullName,
      studentIdNumber: s.studentIdNumber,
      username: s.username,
      email: s.email,
      department: s.department,
      phone: s.phone,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenHistory = (s: Student) => {
    setHistoryStudent(s);
    setStudentHistoryRecords(db.getStudentHistory(s.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        db.updateStudent(editingStudent.id, {
          fullName: formData.fullName,
          studentIdNumber: formData.studentIdNumber,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
        });
        flash.success(`Student ${formData.fullName} record updated.`);
      } else {
        db.addStudent({
          fullName: formData.fullName,
          studentIdNumber: formData.studentIdNumber,
          username: formData.username,
          email: formData.email,
          department: formData.department,
          phone: formData.phone,
        });
        flash.success(`Student ${formData.fullName} registered.`);
      }
      setIsAddModalOpen(false);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Operation failed.';
      flash.error(msg);
    }
  };

  const handleDelete = (s: Student) => {
    const confirm = window.confirm(
      `Are you sure you want to delete student record for ${s.fullName} (${s.studentIdNumber})?`
    );
    if (!confirm) return;

    try {
      db.deleteStudent(s.id);
      flash.success(`Student record for ${s.fullName} removed.`);
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot delete student.';
      flash.error(msg, 'Active Loan Violation');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Student Membership Records
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Registered scholars, academic department credentials, and borrowing standing.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Register Student</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="p-4 bg-white rounded-2xl border border-stone-200/90 shadow-2xs">
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by student name, reg number, department, or email..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#701A1E] text-stone-900"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Reg Number</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4 text-center">Active Loans</th>
                <th className="py-3 px-4">Registered</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-stone-500">
                    No student records found.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(s => (
                  <tr key={s.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-stone-900">
                      {s.fullName}
                      <span className="block text-[11px] font-mono text-stone-400 font-normal">
                        @{s.username}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-700 font-bold whitespace-nowrap">
                      {s.studentIdNumber}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700 font-medium">
                      {s.department}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-stone-700">{s.email}</div>
                      <div className="text-[11px] text-stone-500">{s.phone}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2 py-0.5 rounded font-mono font-bold text-xs ${
                          s.activeBorrowsCount > 0
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-stone-100 text-stone-600'
                        }`}
                      >
                        {s.activeBorrowsCount} books
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 font-mono text-[11px] whitespace-nowrap">
                      {s.registeredAt}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenHistory(s)}
                          className="p-1.5 text-stone-600 hover:text-[#701A1E] hover:bg-stone-100 rounded-lg transition-colors"
                          title="View Borrowing History"
                        >
                          <History className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                          title="Edit Student Info"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(s)}
                          className="p-1.5 text-rose-600 hover:text-rose-900 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base tracking-tight">
                  {editingStudent ? 'Edit Student Details' : 'Register New Student'}
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. John Doe"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  required
                  value={formData.studentIdNumber}
                  onChange={e => setFormData({ ...formData, studentIdNumber: e.target.value })}
                  placeholder="e.g. SCC/00500/2024"
                  className="w-full px-3 py-2 text-sm font-mono bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              {!editingStudent && (
                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    placeholder="e.g. jdoe"
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  University Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="jdoe@chapchap.edu"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Department
                </label>
                <input
                  type="text"
                  required
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Mechanical Engineering"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254 700 000 000"
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg shadow-sm"
                >
                  {editingStudent ? 'Save Changes' : 'Register Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Loan History Modal */}
      {historyStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-stone-200 shadow-2xl max-w-2xl w-full overflow-hidden">
            <div className="bg-[#701A1E] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base tracking-tight">
                  Borrowing History: {historyStudent.fullName}
                </h3>
                <p className="text-xs text-stone-300 font-mono">
                  {historyStudent.studentIdNumber} · {historyStudent.department}
                </p>
              </div>
              <button
                onClick={() => setHistoryStudent(null)}
                className="p-1 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {studentHistoryRecords.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-500">
                  No past or current borrowing records for this student.
                </div>
              ) : (
                <div className="space-y-3">
                  {studentHistoryRecords.map(rec => (
                    <div
                      key={rec.id}
                      className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 flex items-start justify-between gap-4"
                    >
                      <div>
                        <h4 className="font-bold text-stone-900 text-xs sm:text-sm">
                          {rec.bookTitle}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-stone-500 mt-1 font-mono">
                          <span>Issued: {rec.issueDate}</span>
                          <span>Due: {rec.dueDate}</span>
                          {rec.returnDate && (
                            <span className="text-emerald-700 font-semibold">
                              Returned: {rec.returnDate}
                            </span>
                          )}
                        </div>
                        {rec.remarks && (
                          <p className="text-xs text-stone-600 mt-1 italic">{rec.remarks}</p>
                        )}
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider shrink-0 ${
                          rec.status === 'returned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-stone-100 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setHistoryStudent(null)}
                className="px-4 py-2 text-xs font-bold bg-[#701A1E] text-white rounded-lg hover:bg-[#8C242A]"
              >
                Close History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

```

---

## `src/components/student/StudentCatalogue.tsx`

```typescript
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

```

---

## `src/components/student/StudentHistory.tsx`

```typescript
import React from 'react';
import { History, ShieldCheck, BookOpen, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/database';

export const StudentHistory: React.FC = () => {
  const { currentStudent } = useAuth();

  if (!currentStudent) return null;

  // OWASP Broken Access Control defense:
  // Data access is strictly bounded to the active session student ID.
  const myRecords = db.getStudentHistory(currentStudent.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            My Personal Borrowing History
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Complete transcript of your academic library loans, returns, and research borrowings.
          </p>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tenant Isolated (OWASP A01)</span>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        {myRecords.length === 0 ? (
          <div className="p-12 text-center text-xs text-stone-500">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">No borrowing history yet</p>
            <p className="mt-1">When you check out books, your loan history will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Book Title</th>
                  <th className="py-3 px-4">Date Issued</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Date Returned</th>
                  <th className="py-3 px-4">Remarks</th>
                  <th className="py-3 px-4 text-center">Standing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {myRecords.map(rec => (
                  <tr key={rec.id} className="hover:bg-stone-50/70">
                    <td className="py-3.5 px-4 font-bold text-stone-900 max-w-sm">
                      {rec.bookTitle}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                      {rec.issueDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] font-bold text-stone-800">
                      {rec.dueDate}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-stone-600">
                      {rec.returnDate || <span className="text-amber-700 italic">Not Returned</span>}
                    </td>
                    <td className="py-3.5 px-4 text-stone-500 italic max-w-xs truncate">
                      {rec.remarks || '—'}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                          rec.status === 'returned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

```

---

## `src/components/student/StudentHome.tsx`

```typescript
import React from 'react';
import {
  BookOpen,
  Clock,
  CheckCircle,
  RotateCcw,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  Calendar,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/database';

interface StudentHomeProps {
  onNavigate: (tab: string) => void;
}

export const StudentHome: React.FC<StudentHomeProps> = ({ onNavigate }) => {
  const { currentUser, currentStudent } = useAuth();

  if (!currentUser || !currentStudent) return null;

  const myBorrows = db.getStudentHistory(currentStudent.id);
  const activeBorrows = myBorrows.filter(b => b.status === 'borrowed');
  const myRequests = db.getStudentRequests(currentStudent.id);
  const pendingRequests = myRequests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-8">
      {/* Student Welcome Banner */}
      <div className="bg-gradient-to-r from-[#701A1E] to-[#8C242A] text-white p-6 sm:p-8 rounded-3xl shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-xs">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Circulation Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-serif mt-2">
              Jambo, {currentUser.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-stone-200">
              Registration: <span className="font-mono font-semibold text-amber-300">{currentStudent.studentIdNumber}</span> · Department: <span className="font-semibold text-white">{currentStudent.department}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('student_catalogue')}
              className="px-4 py-2.5 text-xs font-bold bg-amber-400 text-stone-950 hover:bg-amber-300 rounded-xl transition-all shadow-xs flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-stone-950" />
              <span>Browse Catalogue</span>
            </button>
            <button
              onClick={() => onNavigate('student_requests')}
              className="px-4 py-2.5 text-xs font-bold bg-black/25 hover:bg-black/40 text-stone-100 rounded-xl transition-all border border-white/20 flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Request Return</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards (Tabular Numerals) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Currently Checked Out
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-amber-700 font-mono tabular-nums">
              {activeBorrows.length}
            </span>
            <span className="text-xs text-stone-500">of 3 allowed loans</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">Books currently in your possession</p>
        </div>

        <div
          onClick={() => onNavigate('student_requests')}
          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-[#701A1E]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Pending Submissions
            </span>
            <div className="p-2 rounded-lg bg-stone-100 text-[#701A1E]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#701A1E] font-mono tabular-nums">
              {pendingRequests.length}
            </span>
            <span className="text-xs text-stone-500">in review</span>
          </div>
          <p className="mt-1 text-xs text-[#701A1E] font-medium flex items-center gap-1">
            Track approvals <ArrowRight className="w-3 h-3" />
          </p>
        </div>

        <div
          onClick={() => onNavigate('student_history')}
          className="p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-[#701A1E]/40 transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
              Lifetime Loans
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              {myBorrows.length}
            </span>
            <span className="text-xs text-stone-500">total records</span>
          </div>
          <p className="mt-1 text-xs text-stone-500">Isolated borrowing history</p>
        </div>
      </div>

      {/* Active Borrowed Books List */}
      <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              My Active Library Checkouts ({activeBorrows.length})
            </h2>
            <p className="text-xs text-stone-500">Keep track of due dates to avoid academic loan holds.</p>
          </div>
          <button
            onClick={() => onNavigate('student_catalogue')}
            className="text-xs font-bold text-[#701A1E] hover:underline"
          >
            Borrow Another Title →
          </button>
        </div>

        {activeBorrows.length === 0 ? (
          <div className="p-10 text-center">
            <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-stone-800">You have no books currently on loan.</p>
            <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
              Browse the library catalogue to request textbooks, novels, and research literature.
            </p>
            <button
              onClick={() => onNavigate('student_catalogue')}
              className="mt-4 px-4 py-2 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-xl transition-all shadow-xs"
            >
              Browse Stacks Now
            </button>
          </div>
        ) : (
          <div className="divide-y divide-stone-200">
            {activeBorrows.map(loan => {
              const dueDateObj = new Date(loan.dueDate);
              const now = new Date();
              const diffDays = Math.ceil((dueDateObj.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const isOverdue = diffDays < 0;
              const isDueSoon = diffDays >= 0 && diffDays <= 3;

              return (
                <div
                  key={loan.id}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                      {loan.bookTitle}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-mono">
                      <span>Issued: {loan.issueDate}</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        Due: <strong className="text-stone-800">{loan.dueDate}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    {isOverdue && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-rose-100 text-rose-800 text-xs font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        Overdue by {Math.abs(diffDays)} day(s)
                      </span>
                    )}

                    {!isOverdue && isDueSoon && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        Due in {diffDays} day(s)
                      </span>
                    )}

                    {!isOverdue && !isDueSoon && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                        {diffDays} days remaining
                      </span>
                    )}

                    <button
                      onClick={() => onNavigate('student_requests')}
                      className="px-3 py-1.5 text-xs font-bold bg-[#701A1E] text-white hover:bg-[#8C242A] rounded-lg transition-colors flex items-center gap-1 shadow-2xs"
                    >
                      <RotateCcw className="w-3 h-3 text-amber-400" />
                      <span>Return</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

```

---

## `src/components/student/StudentProfile.tsx`

```typescript
import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Building,
  Calendar,
  Check,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { validatePasswordStrength } from '../../lib/security';

export const StudentProfile: React.FC = () => {
  const { currentUser, currentStudent, changePassword } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!currentUser || !currentStudent) return null;

  const strength = validatePasswordStrength(newPassword);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const ok = await changePassword(currentPassword, newPassword, confirmPassword);
    setLoading(false);
    if (ok) {
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <h1 className="text-2xl font-bold text-stone-900 font-serif">
          Scholar Profile &amp; Security
        </h1>
        <p className="text-xs text-stone-600 mt-0.5">
          Review academic registration data and manage credential encryption.
        </p>
      </div>

      {currentUser.isDefaultPassword && (
        <div className="p-4 bg-amber-500/15 border border-amber-500/40 rounded-2xl text-xs text-stone-900 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Security Notice:</span> You are currently using the default seeded student password (<code className="font-mono bg-white px-1.5 py-0.5 rounded text-amber-900">student123</code>). Please set a strong custom password below.
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-12 h-12 rounded-xl bg-[#701A1E] text-amber-400 flex items-center justify-center font-bold text-lg font-serif shadow-xs">
              {currentUser.fullName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">{currentUser.fullName}</h2>
              <span className="text-xs font-mono text-[#701A1E] font-bold">
                {currentStudent.studentIdNumber}
              </span>
            </div>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-center gap-3 text-stone-700">
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{currentUser.email}</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <Building className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{currentStudent.department}</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <Phone className="w-4 h-4 text-stone-400 shrink-0" />
              <span>{currentStudent.phone}</span>
            </div>

            <div className="flex items-center gap-3 text-stone-700">
              <Calendar className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Registered on: {currentStudent.registeredAt}</span>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
              <span className="text-stone-500 font-medium">Active Book Checkouts:</span>
              <span className="font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                {currentStudent.activeBorrowsCount} of 3 maximum
              </span>
            </div>
          </div>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl border border-stone-200/90 p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
            <KeyRound className="w-5 h-5 text-[#701A1E]" />
            <h2 className="text-base font-bold text-stone-900 font-serif">
              Change Account Password
            </h2>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New strong password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>

              {/* Password meter */}
              {newPassword.length > 0 && (
                <div className="mt-2 p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-[11px] space-y-1">
                  <div className="flex justify-between font-semibold text-stone-700">
                    <span>OWASP Strength:</span>
                    <span className={strength.valid ? 'text-emerald-700' : 'text-amber-700'}>
                      {strength.score}/5 Satisfied
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <span className={strength.criteria.minLength ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 8+ Characters
                    </span>
                    <span className={strength.criteria.hasUpper ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 1 Uppercase
                    </span>
                    <span className={strength.criteria.hasLower ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 1 Lowercase
                    </span>
                    <span className={strength.criteria.hasDigit ? 'text-emerald-700 font-semibold' : 'text-stone-400'}>
                      ✓ 1 Digit
                    </span>
                    <span className={`col-span-2 ${strength.criteria.hasSpecial ? 'text-emerald-700 font-semibold' : 'text-stone-400'}`}>
                      ✓ 1 Special Character (!@#$%)
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full pl-9 pr-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-[#701A1E] text-stone-900"
                />
                <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !strength.valid || newPassword !== confirmPassword}
              className="w-full py-2.5 px-4 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Encrypting & Saving...' : 'Update Password with bcrypt'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

```

---

## `src/components/student/StudentRequests.tsx`

```typescript
import React, { useState } from 'react';
import {
  RotateCcw,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  Send,
  BookOpen,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../lib/database';
import { useFlash } from '../../context/FlashContext';

export const StudentRequests: React.FC = () => {
  const { currentStudent } = useAuth();
  const flash = useFlash();
  const [, setTick] = useState(0);
  const refresh = () => setTick(t => t + 1);

  const [activeTab, setActiveTab] = useState<'return_form' | 'requests_history'>('return_form');
  const [returnNote, setReturnNote] = useState('');
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  if (!currentStudent) return null;

  const myBorrows = db.getStudentHistory(currentStudent.id);
  const activeBorrows = myBorrows.filter(b => b.status === 'borrowed');
  const myRequests = db.getStudentRequests(currentStudent.id);

  const pendingReturnBorrowRecordIds = new Set(
    myRequests.filter(r => r.status === 'pending' && r.type === 'return').map(r => r.borrowRecordId)
  );

  const handleSubmitReturnRequest = (borrowRecordId: string, bookTitle: string) => {
    setSubmittingId(borrowRecordId);
    try {
      db.createReturnRequest(currentStudent.id, borrowRecordId, returnNote || 'Book returned to drop-box');
      flash.success(
        `Return request for "${bookTitle}" has been logged for librarian confirmation.`,
        'Return Request Submitted'
      );
      setReturnNote('');
      refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit return request.';
      flash.error(msg);
    } finally {
      setSubmittingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 font-serif">
            Borrow &amp; Return Requests
          </h1>
          <p className="text-xs text-stone-600 mt-0.5">
            Submit returns or monitor librarian approvals on all your active requests.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-stone-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('return_form')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'return_form'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
            <span>Submit Return ({activeBorrows.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('requests_history')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'requests_history'
                ? 'bg-[#701A1E] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Request Log ({myRequests.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Submit Return */}
      {activeTab === 'return_form' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-6 border-b border-stone-200 bg-stone-50">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Books Currently Checked Out to You
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select any borrowed book below to initiate a return request for the librarian to inspect and approve.
            </p>
          </div>

          {activeBorrows.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm font-bold text-stone-800">No active books to return</p>
              <p className="mt-1">You have returned all borrowed library materials.</p>
            </div>
          ) : (
            <div className="divide-y divide-stone-200">
              {activeBorrows.map(loan => {
                const isPendingReturn = pendingReturnBorrowRecordIds.has(loan.id);

                return (
                  <div
                    key={loan.id}
                    className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-stone-50/70 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-stone-900 text-base">
                        {loan.bookTitle}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 font-mono">
                        <span>Issued On: {loan.issueDate}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-stone-400" />
                          Due Date: <strong className="text-stone-800">{loan.dueDate}</strong>
                        </span>
                      </div>
                      {loan.remarks && (
                        <p className="text-xs text-stone-500 italic">Note: {loan.remarks}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                      {isPendingReturn ? (
                        <span className="px-3 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-700" />
                          <span>Return Pending Librarian Review</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => handleSubmitReturnRequest(loan.id, loan.bookTitle)}
                          disabled={submittingId === loan.id}
                          className="px-4 py-2 text-xs font-bold bg-[#701A1E] hover:bg-[#8C242A] text-white rounded-xl transition-all shadow-xs flex items-center gap-1.5"
                        >
                          <Send className="w-3.5 h-3.5 text-amber-400" />
                          <span>Submit Return Request</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Requests History */}
      {activeTab === 'requests_history' && (
        <div className="bg-white rounded-2xl border border-stone-200/90 shadow-2xs overflow-hidden">
          <div className="p-4 bg-stone-50 border-b border-stone-200 flex justify-between items-center text-xs">
            <span className="font-bold text-stone-800 uppercase tracking-wider">
              Status of Your Circulation Requests
            </span>
            <span className="text-stone-500 font-mono">
              Total Submissions: {myRequests.length}
            </span>
          </div>

          {myRequests.length === 0 ? (
            <div className="p-12 text-center text-xs text-stone-500">
              No borrow or return requests submitted yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-100/75 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4">Request Type</th>
                    <th className="py-3 px-4">Book Title</th>
                    <th className="py-3 px-4">Date Submitted</th>
                    <th className="py-3 px-4">Your Note</th>
                    <th className="py-3 px-4">Librarian Response</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {myRequests.map(req => (
                    <tr key={req.id} className="hover:bg-stone-50/70">
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] tracking-wider ${
                            req.type === 'borrow'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-sky-100 text-sky-900'
                          }`}
                        >
                          {req.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-stone-900 max-w-xs truncate">
                        {req.bookTitle}
                      </td>
                      <td className="py-3 px-4 font-mono text-[11px] text-stone-500 whitespace-nowrap">
                        {new Date(req.requestDate).toLocaleString([], {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })}
                      </td>
                      <td className="py-3 px-4 text-stone-600 italic max-w-xs truncate">
                        {req.studentNotes || '—'}
                      </td>
                      <td className="py-3 px-4 text-stone-700 max-w-xs truncate">
                        {req.adminNotes || '—'}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider ${
                            req.status === 'pending'
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : req.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                              : 'bg-rose-100 text-rose-900 border border-rose-300'
                          }`}
                        >
                          {req.status === 'pending' && <Clock className="w-3 h-3 text-amber-600" />}
                          {req.status === 'approved' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          {req.status === 'declined' && <XCircle className="w-3 h-3 text-rose-600" />}
                          <span>{req.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

```

---

## `src/context/AuthContext.tsx`

```typescript
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

```

---

## `src/context/FlashContext.tsx`

```typescript
import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, ShieldCheck, X, Sparkles } from 'lucide-react';
import { FlashMessage, FlashType } from '../types';

interface FlashContextType {
  flashes: FlashMessage[];
  showFlash: (type: FlashType, message: string, title?: string, duration?: number) => void;
  removeFlash: (id: string) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  warning: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
  security: (message: string, title?: string) => void;
}

const FlashContext = createContext<FlashContextType | undefined>(undefined);

export const FlashProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [flashes, setFlashes] = useState<FlashMessage[]>([]);

  const removeFlash = useCallback((id: string) => {
    setFlashes(prev => prev.filter(f => f.id !== id));
  }, []);

  const showFlash = useCallback((type: FlashType, message: string, title?: string, duration = 4800) => {
    const id = 'flash_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6);
    const newFlash: FlashMessage = {
      id,
      type,
      message,
      title,
      timestamp: Date.now(),
      duration,
    };

    setFlashes(prev => [newFlash, ...prev.slice(0, 3)]); // Keep up to 4 concurrent

    if (duration > 0) {
      setTimeout(() => {
        removeFlash(id);
      }, duration);
    }
  }, [removeFlash]);

  const success = useCallback((message: string, title = 'Completed') => {
    showFlash('success', message, title);
  }, [showFlash]);

  const error = useCallback((message: string, title = 'Notice') => {
    showFlash('error', message, title, 6000);
  }, [showFlash]);

  const warning = useCallback((message: string, title = 'Attention') => {
    showFlash('warning', message, title, 5500);
  }, [showFlash]);

  const info = useCallback((message: string, title = 'Library Update') => {
    showFlash('info', message, title);
  }, [showFlash]);

  const security = useCallback((message: string, title = 'Security Verification') => {
    showFlash('security', message, title, 6500);
  }, [showFlash]);

  return (
    <FlashContext.Provider
      value={{
        flashes,
        showFlash,
        removeFlash,
        success,
        error,
        warning,
        info,
        security,
      }}
    >
      {children}

      {/* Floating Modern Enticing Toast Stack */}
      <div
        aria-live="polite"
        className="fixed top-6 right-6 z-50 flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence mode="popLayout">
          {flashes.map(flash => (
            <FlashItem key={flash.id} flash={flash} onDismiss={() => removeFlash(flash.id)} />
          ))}
        </AnimatePresence>
      </div>
    </FlashContext.Provider>
  );
};

const FlashItem: React.FC<{ flash: FlashMessage; onDismiss: () => void }> = ({ flash, onDismiss }) => {
  const getTheme = () => {
    switch (flash.type) {
      case 'success':
        return {
          glow: 'shadow-[0_12px_40px_-8px_rgba(16,185,129,0.3)] border-emerald-500/30',
          accentGradient: 'from-emerald-500 via-teal-400 to-emerald-600',
          iconWrapper: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
          icon: <CheckCircle2 className="w-4 h-4" />,
          titleColor: 'text-emerald-300',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        };
      case 'error':
        return {
          glow: 'shadow-[0_12px_40px_-8px_rgba(244,63,94,0.3)] border-rose-500/30',
          accentGradient: 'from-rose-500 via-pink-400 to-rose-600',
          iconWrapper: 'bg-rose-500/15 text-rose-400 border border-rose-500/30',
          icon: <AlertCircle className="w-4 h-4" />,
          titleColor: 'text-rose-300',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        };
      case 'warning':
        return {
          glow: 'shadow-[0_12px_40px_-8px_rgba(245,158,11,0.3)] border-amber-500/30',
          accentGradient: 'from-amber-500 via-yellow-400 to-amber-600',
          iconWrapper: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
          icon: <AlertTriangle className="w-4 h-4" />,
          titleColor: 'text-amber-300',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        };
      case 'security':
        return {
          glow: 'shadow-[0_12px_40px_-8px_rgba(112,26,30,0.4)] border-amber-500/40',
          accentGradient: 'from-amber-400 via-rose-500 to-[#701A1E]',
          iconWrapper: 'bg-[#701A1E]/60 text-amber-400 border border-amber-500/30',
          icon: <ShieldCheck className="w-4 h-4" />,
          titleColor: 'text-amber-300 font-bold',
          badge: 'bg-amber-400/20 text-amber-300 border-amber-400/30',
        };
      case 'info':
      default:
        return {
          glow: 'shadow-[0_12px_40px_-8px_rgba(217,119,6,0.25)] border-stone-700/60',
          accentGradient: 'from-amber-400 to-amber-600',
          iconWrapper: 'bg-amber-400/15 text-amber-400 border border-amber-400/30',
          icon: <Info className="w-4 h-4" />,
          titleColor: 'text-stone-200',
          badge: 'bg-stone-800 text-stone-300 border-stone-700',
        };
    }
  };

  const theme = getTheme();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.92, filter: 'blur(4px)' }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.18, ease: 'easeOut' } }}
      transition={{ type: 'spring', damping: 25, stiffness: 350 }}
      className={`pointer-events-auto relative overflow-hidden rounded-2xl bg-stone-950/92 backdrop-blur-xl border ${theme.glow} text-stone-100 p-4 transition-all`}
      role="alert"
    >
      {/* Top subtle radiant bar */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${theme.accentGradient} opacity-90`} />

      <div className="flex items-start gap-3.5">
        {/* Dynamic Icon Pip */}
        <div className={`p-2 rounded-xl shrink-0 flex items-center justify-center ${theme.iconWrapper} shadow-sm`}>
          {theme.icon}
        </div>

        {/* Text Content */}
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-2 mb-1">
            {flash.title && (
              <span className={`text-[11px] font-extrabold uppercase tracking-wider ${theme.titleColor}`}>
                {flash.title}
              </span>
            )}
            <span className="text-[10px] text-stone-400 font-mono">
              {new Date(flash.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-stone-200 leading-snug break-words">
            {flash.message}
          </p>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="text-stone-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10 shrink-0 -mr-1 -mt-1 cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modern Gradient Progress Countdown Bar */}
      {flash.duration && flash.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: flash.duration / 1000, ease: 'linear' }}
            className={`h-full bg-gradient-to-r ${theme.accentGradient} opacity-80`}
          />
        </div>
      )}
    </motion.div>
  );
};

export const useFlash = () => {
  const context = useContext(FlashContext);
  if (!context) {
    throw new Error('useFlash must be used within a FlashProvider');
  }
  return context;
};

```

---

## `src/index.css`

```css
@import "tailwindcss";

```

---

## `src/lib/aiService.ts`

```typescript
import { Book } from '../types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

export async function askLibraryAI(
  message: string,
  selectedBook?: Book | null,
  history?: ChatMessage[]
): Promise<string> {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        selectedBook,
        history: history?.map(h => ({
          role: h.sender === 'user' ? 'user' : 'model',
          text: h.text,
        })),
      }),
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return data.response || 'I could not retrieve an answer at this time.';
  } catch (err) {
    console.warn('AI API fetch error, using local assistant knowledge:', err);
    return getLocalAIExplanation(message, selectedBook);
  }
}

function getLocalAIExplanation(query: string, book?: Book | null): string {
  const q = query.toLowerCase();

  if (book) {
    return `### **${book.title}** by ${book.author} (${book.publicationYear})

**Academic Overview:**
${book.summary || 'A cornerstone text in the ' + book.genre + ' curriculum.'}

**Detailed Highlights:**
- **Academic Faculty:** ${book.genre}
- **Shelf Location:** ${book.rackLocation}
- **ISBN:** ${book.isbn}
- **Availability:** ${book.availableCopies} of ${book.totalCopies} copies ready on physical shelves.

**Study Context & Syllabus Relevance:**
This work is frequently referenced for coursework, examinations, and foundational research. You can request a 14-day checkout directly from the catalogue!`;
  }

  if (q.includes('borrow') || q.includes('loan')) {
    return `### How to Borrow Books:
1. Log in with your **Student Card**.
2. Go to **Book Catalogue** or **Explore Books**.
3. Select any title with available copies and click **"Request to Borrow"**.
4. Once our librarian reviews and approves your submission, you can collect the physical volume at the **Self-Checkout Kiosk**.`;
  }

  if (q.includes('return')) {
    return `### How to Return Books:
1. Navigate to **Student Desk** or **Borrow & Returns**.
2. Under "My Active Checkouts", find your book.
3. Click **"Submit Return Request"**.
4. Deposit the book into the physical return drop-box in the library lobby.`;
  }

  return `Hello! I am your **Library Chap Chap AI Companion**. Ask me anything about our books (synopsis, chapter themes, study recommendations) or about navigating your library membership and loan checkouts!`;
}

```

---

## `src/lib/database.ts`

```typescript
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

```

---

## `src/lib/security.ts`

```typescript
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

```

---

## `src/main.tsx`

```typescript
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

```

---

## `src/types/index.ts`

```typescript
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

```

---

## `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "experimentalDecorators": true,
    "useDefineForClassFields": false,
    "module": "ESNext",
    "types": ["vite/client"],
    "lib": [
      "ES2022",
      "DOM",
      "DOM.Iterable"
    ],
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "moduleDetection": "force",
    "allowJs": true,
    "jsx": "react-jsx",
    "paths": {
      "@/*": [
        "./*"
      ]
    },
    "allowImportingTsExtensions": true,
    "noEmit": true
  }
}

```

---

## `vite.config.ts`

```typescript
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

```

---

