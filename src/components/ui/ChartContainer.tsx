'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { TrendingUp, BarChart3, MoreVertical, Download, Maximize2, Info } from 'lucide-react';

interface ChartContainerProps {
  readonly children: ReactNode;
  readonly title: string;
  readonly loading?: boolean;
  readonly className?: string;
  readonly error?: string | null;
  readonly subtitle?: string;
  readonly icon?: 'trend' | 'bar' | 'default';
  readonly onExport?: () => void;
  readonly onFullscreen?: () => void;
  readonly chartId?: string;
}

export default function ChartContainer({
  children,
  title,
  loading = false,
  className = '',
  error = null,
  subtitle,
  icon = 'default',
  onExport,
  onFullscreen,
  chartId
}: ChartContainerProps) {
  const [showMenu, setShowMenu] = useState(false);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Default export functionality
      const csvContent = `Chart: ${title}\nExported at: ${new Date().toISOString()}\n`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-export.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    setShowMenu(false);
  };

  const handleFullscreen = () => {
    if (onFullscreen) {
      onFullscreen();
    }
    setShowMenu(false);
  };

  const handleInfo = () => {
    // Create a modern overlay for chart information
    const infoDiv = document.createElement('div');
    infoDiv.className = 'fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50';
    infoDiv.innerHTML = `
      <div class="bg-[#1e293b] rounded-2xl p-6 max-w-md w-full mx-4 border border-blue-500/30 shadow-2xl transform transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">${title}</h3>
            <p class="text-sm text-gray-400 mt-1">${subtitle || 'Real-time monitoring data'}</p>
          </div>
          <button class="text-gray-400 hover:text-white transition-colors" onclick="this.parentElement.parentElement.parentElement.remove()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        <div class="space-y-4">
          <div class="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20">
            <p class="text-gray-300">This chart provides live insights into system performance metrics with real-time updates and interactive features.</p>
          </div>
          <div class="bg-slate-800/50 rounded-xl p-4 border border-blue-500/20">
            <div class="flex items-center gap-2 text-sm text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
              </svg>
              <span>Click and drag to zoom, double-click to reset</span>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(infoDiv);
    
    // Add click handler to close on backdrop click
    infoDiv.addEventListener('click', (e) => {
      if (e.target === infoDiv) {
        infoDiv.remove();
      }
    });
    
    setShowMenu(false);
  };

  const getIcon = () => {
    switch (icon) {
      case 'trend':
        return <TrendingUp size={20} className="text-blue-400" />;
      case 'bar':
        return <BarChart3 size={20} className="text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <div className={`bg-[#1e293b] rounded-2xl p-4 sm:p-6 relative shadow-lg border border-blue-900/30 backdrop-blur-xl ${className}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <div>
              <h3 className="text-lg font-semibold text-gray-200">{title}</h3>
              {subtitle && (
                <p className="text-sm text-gray-400">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Status indicator */}
            {loading && (
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            )}
            {error && (
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            )}
            {!loading && !error && (
              <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
            )}
            
            {/* Menu button */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-8 h-8 rounded-lg text-gray-400 flex items-center justify-center hover:text-blue-400 transition-all duration-200 ${showMenu ? 'bg-[#0f172a]/50' : ''}`}
                onClick={() => setShowMenu(!showMenu)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setShowMenu(!showMenu);
                  }
                }}
                aria-label="Chart options menu"
                aria-expanded={showMenu}
              >
                <MoreVertical size={16} />
              </motion.button>

              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: showMenu ? 1 : 0,
                  scale: showMenu ? 1 : 0.95,
                  pointerEvents: showMenu ? 'auto' : 'none'
                }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 mt-2 w-48 bg-[#1e293b] rounded-xl shadow-lg border border-blue-900/30 overflow-hidden z-50"
              >
                <div className="p-1">
                  <button
                    onClick={handleFullscreen}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-[#0f172a]/50 rounded-lg transition-colors gap-2"
                  >
                    <Maximize2 size={14} />
                    <span>Fullscreen</span>
                  </button>
                  <button
                    onClick={handleExport}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-[#0f172a]/50 rounded-lg transition-colors gap-2"
                  >
                    <Download size={14} />
                    <span>Export Data</span>
                  </button>
                  <button
                    onClick={handleInfo}
                    className="flex items-center w-full px-3 py-2 text-sm text-gray-300 hover:bg-[#0f172a]/50 rounded-lg transition-colors gap-2"
                  >
                    <Info size={14} />
                    <span>Chart Information</span>
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1">
          {children}
        </div>
      </div>

      {/* Click outside to close menu */}
      {showMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowMenu(false)}
        />
      )}

      {/* Futuristic background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
      </div>
    </div>
  );
}
