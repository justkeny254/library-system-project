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
