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
        className="fixed bottom-7 right-7 z-50 bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-full shadow-lg transition-opacity"
        aria-label="Back to Top"
      >
        <ArrowUp className="w-8 h-8" />
      </button>
    )
  );
}
