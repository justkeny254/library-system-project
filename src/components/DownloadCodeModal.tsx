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
