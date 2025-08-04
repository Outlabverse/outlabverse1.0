import React from 'react';

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  message: string;
  success?: boolean;
}

const PopupModal: React.FC<PopupModalProps> = ({ open, onClose, title, message, success }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-[#0f1714] via-[#0a0f0d] to-[#001a33] rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center border border-white/10">
        <div className="mb-4">
          {success ? (
            <span className="inline-block text-4xl text-[#00d4aa]">✅</span>
          ) : (
            <span className="inline-block text-4xl text-red-400">❌</span>
          )}
        </div>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-white/80 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#00d4aa] to-[#0066ff] text-white font-semibold shadow hover:opacity-90 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PopupModal; 