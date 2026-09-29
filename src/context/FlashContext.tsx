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
