'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <dialog
          open={isOpen}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-0 border-0"
          aria-labelledby="modal-title"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 mx-4 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title && (
              <h2 id="modal-title" className="text-xl font-semibold mb-4">
                {title}
              </h2>
            )}
            <div>{children}</div>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              &#x2715;
            </button>
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>,
    document.body
  );
}
