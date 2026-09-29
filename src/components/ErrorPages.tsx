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
