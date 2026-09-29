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
