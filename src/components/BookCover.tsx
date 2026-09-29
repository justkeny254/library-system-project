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
