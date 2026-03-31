// modal.jsx — Shared Modal wrapper used across all admin pages
// Provides: backdrop, white card container, header with title + close button,
// scrollable body, and an optional footer slot for action buttons.
import React, { useEffect } from 'react';
import { X } from 'lucide-react';

// ─── Modal — generic full-screen overlay dialog ───────────────────────────────
// Props:
//   open       boolean  — controls visibility
//   onClose    fn       — called when backdrop or X is clicked
//   title      string   — modal header title text
//   children   node     — modal body content
//   maxWidth   string   — tailwind max-w class, default 'max-w-lg'
const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else       document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null; // render nothing when closed

  return (
    // ── Backdrop ──
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose} // click outside closes
    >
      {/* ── Modal card — stop propagation so inner clicks don't close ── */}
      <div
        className={`bg-white rounded-xl shadow-2xl w-full ${maxWidth} max-h-[90vh] flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h3 className="font-bold text-base text-gray-900">{title}</h3>
          {/* Close X button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 cursor-pointer transition-colors p-1 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {children}
        </div>
      </div>
    </div>
  );
};

// ─── ModalFooter — standard Cancel + primary action button row ────────────────
// Props:
//   onCancel     fn      — cancel button handler
//   onConfirm    fn      — primary action handler
//   confirmLabel string  — primary button text, default 'Save'
//   confirmClass string  — optional tailwind overrides for primary button
export const ModalFooter = ({ onCancel, onConfirm, confirmLabel = 'Save', confirmClass = '' }) => (
  <div className="flex justify-end gap-2 pt-4 border-t border-gray-100 mt-4">
    {/* Cancel — secondary outlined button */}
    <button
      onClick={onCancel}
      className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
    >
      Cancel
    </button>
    {/* Primary action button */}
    <button
      onClick={onConfirm}
      className={`px-4 py-2 text-sm font-bold rounded-lg cursor-pointer transition-colors ${
        confirmClass || 'bg-yellow-400 hover:bg-yellow-500 text-black'
      }`}
    >
      {confirmLabel}
    </button>
  </div>
);

// ─── ModalField — labeled input field for use inside modals ──────────────────
// Props:
//   label        string  — uppercase label text
//   children     node    — input/select/textarea element
export const ModalField = ({ label, children }) => (
  <div className="space-y-1">
    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide">{label}</label>
    {children}
  </div>
);

// ─── Shared input class string — consistent across all modal inputs ───────────
export const INPUT_CLS = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400';

// ─── Shared select class string ───────────────────────────────────────────────
export const SELECT_CLS = 'w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-yellow-400 bg-white cursor-pointer';

// ─── InfoRow — key/value row used in View/detail modals ──────────────────────
export const InfoRow = ({ label, value, valueClass = '' }) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{label}</span>
    <span className={`text-sm font-semibold text-gray-800 ${valueClass}`}>{value || '—'}</span>
  </div>
);

export default Modal;
