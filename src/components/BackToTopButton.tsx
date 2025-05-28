'use client';

import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

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
    visible && (
      <button
        onClick={scrollToTop}
        title="Back to Top"
        className="fixed bottom-4 right-4 sm:bottom-7 sm:right-7 z-50 bg-blue-700 hover:bg-blue-800 text-white p-3 sm:p-4 rounded-full shadow-lg transition-opacity"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      </button>
    )
  );
}
