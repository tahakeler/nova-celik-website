'use client';

import { ReactNode, useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface InfoTooltipProps {
  label: string;
  description: ReactNode;
}

export default function InfoTooltip({ label, description }: InfoTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let root = document.getElementById('tooltip-root');
    if (!root) {
      root = document.createElement('div');
      root.setAttribute('id', 'tooltip-root');
      document.body.appendChild(root);
    }
    setPortalRoot(root);
  }, []);

  useEffect(() => {
    if (isHovered && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.top - 8, // 8px above the button
        left: rect.left + rect.width / 2,
      });
    }
  }, [isHovered]);

  const tooltipContent = (
    <div
      role="tooltip"
      className="fixed z-[9999] p-2 rounded-md bg-gray-700 text-white text-xs max-w-xs pointer-events-none"
      style={{
        top: coords.top,
        left: coords.left,
        transform: 'translateX(-50%) translateY(-100%)',
        opacity: isHovered ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
      }}
    >
      {description}
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        aria-label={label}
        className="w-4 h-4 rounded-full bg-gray-300 text-gray-700 flex items-center justify-center text-xs font-bold cursor-default select-none relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        i
      </button>
      {portalRoot && isHovered && createPortal(tooltipContent, portalRoot)}
    </>
  );
}
