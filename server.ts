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
