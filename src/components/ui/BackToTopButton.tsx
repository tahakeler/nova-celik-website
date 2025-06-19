'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          title="Back to Top"
          className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-50 bg-blue-700 text-white p-3 sm:p-4 rounded-full shadow-lg"
          aria-label="Back to Top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ scale: 1.1, backgroundColor: '#1e40af' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
