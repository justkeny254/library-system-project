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
