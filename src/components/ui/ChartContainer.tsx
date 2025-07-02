'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useRef, useEffect } from 'react';
import { 
  TrendingUp, BarChart3, Download, Maximize2, Info, 
  AlertTriangle, CheckCircle, Clock, ZoomIn,
  ZoomOut, X, Mouse
} from 'lucide-react';

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
  readonly priority?: 'high' | 'medium' | 'low';
  readonly status?: 'good' | 'warning' | 'critical' | 'loading';
  readonly kpiValue?: string;
  readonly trend?: 'up' | 'down' | 'stable';
  readonly trendValue?: string;
  readonly onZoom?: (type: 'in' | 'out') => void;
  readonly onRefresh?: () => void | Promise<void>;
  readonly lastUpdated?: string;
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
  priority = 'medium',
  status = 'good',
  kpiValue,
  trend,
  trendValue,
  onZoom,
  onRefresh,
  lastUpdated
}: ChartContainerProps): React.JSX.Element {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [chartScale, setChartScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // Enhanced zoom controls
  const handleZoom = (type: 'in' | 'out') => {
    if (type === 'in' && chartScale < 2) {
      setChartScale(prev => prev + 0.1);
    } else if (type === 'out' && chartScale > 0.5) {
      setChartScale(prev => prev - 0.1);
    }
  };

  // Enhanced interaction system
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && showTooltip) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Smooth tooltip positioning with easing
        const targetX = x;
        const targetY = y - 20; // Offset above cursor
        
        // Update tooltip position smoothly
        if (Math.abs(targetX - x) > 5 || Math.abs(targetY - y) > 5) {
          // Only update if significant movement to avoid jitter
        }
      }
    };

    if (isHovered && showTooltip) {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHovered, showTooltip]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isZoomed) return;
      
      switch (e.key) {
        case 'ArrowUp':
          handleZoom('in');
          break;
        case 'ArrowDown':
          handleZoom('out');
          break;
        case 'Escape':
          setIsZoomed(false);
          setChartScale(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isZoomed]);

  // Handle escape key and click outside for tooltip
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showTooltip) {
        setShowTooltip(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (showTooltip && containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowTooltip(false);
      }
    };

    if (showTooltip) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTooltip]);

  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      // Enhanced export functionality
      const timestamp = new Date().toISOString();
      const exportData = {
        title,
        subtitle,
        status,
        kpiValue,
        trend,
        trendValue,
        timestamp,
        lastUpdated
      };
      
      // Create and trigger download
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-${timestamp}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      // Show success notification
      showNotification('Export successful', 'success');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const colors = {
      success: 'bg-emerald-500',
      error: 'bg-red-500',
      info: 'bg-blue-500'
    };

    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-[9999] font-medium animate-fade-in`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.classList.add('animate-fade-out');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, 3000);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'good':
        return <CheckCircle size={16} className="text-emerald-400" />;
      case 'warning':
        return <AlertTriangle size={16} className="text-amber-400" />;
      case 'critical':
        return <AlertTriangle size={16} className="text-red-400" />;
      case 'loading':
        return <Clock size={16} className="text-blue-400 animate-pulse" />;
      default:
        return <CheckCircle size={16} className="text-emerald-400" />;
    }
  };

  const getStatusColor = () => {
    const statusColors = {
      good: 'from-emerald-500/20 to-emerald-600/10',
      warning: 'from-amber-500/20 to-amber-600/10',
      critical: 'from-red-500/20 to-red-600/10',
      loading: 'from-blue-500/20 to-blue-600/10'
    };
    return statusColors[status] ?? statusColors.good;
  };

  const getPriorityBorder = () => {
    const priorityBorders = {
      high: 'border-red-500/30 shadow-red-500/10',
      medium: 'border-amber-500/30 shadow-amber-500/10',
      low: 'border-blue-500/30 shadow-blue-500/10'
    };
    return priorityBorders[priority] ?? priorityBorders.medium;
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

  const getTrendStyles = () => {
    const trendStyles = {
      up: 'bg-emerald-500/20 text-emerald-400',
      down: 'bg-red-500/20 text-red-400',
      stable: 'bg-blue-500/20 text-blue-400'
    };
    return trendStyles[trend ?? 'stable'];
  };

  const getTrendIcon = () => {
    const trendIcons = {
      up: '▲',
      down: '▼',
      stable: '•'
    };
    return trendIcons[trend ?? 'stable'];
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      onHoverStart={() => {
        setIsHovered(true);
        setShowControls(true);
      }}
      onHoverEnd={() => {
        setIsHovered(false);
        setShowControls(false);
      }}
      className={`
        relative overflow-hidden rounded-3xl
        bg-gradient-to-br from-slate-800/95 to-slate-900/95
        backdrop-blur-xl border ${getPriorityBorder()}
        shadow-2xl hover:shadow-3xl
        transition-all duration-300 ease-out
        ${className}
      `}
      style={{
        boxShadow: isHovered 
          ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)'
          : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Enhanced background effects */}
      <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor()} opacity-50`} />
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Enhanced main content with zoom controls */}
      <div className="relative z-10 p-6 transition-all duration-300">
        {isZoomed && (
          <div className="absolute top-4 right-4 flex items-center gap-2 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleZoom('in')}
              className="p-2 rounded-xl bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all"
              title="Zoom in"
            >
              <ZoomIn size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleZoom('out')}
              className="p-2 rounded-xl bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all"
              title="Zoom out"
            >
              <ZoomOut size={18} />
            </motion.button>
          </div>
        )}
        {/* Enhanced header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            {getIcon() && (
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/20"
              >
                {getIcon()}
              </motion.div>
            )}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-white font-montserrat">
                  {title}
                </h3>
                {getStatusIcon()}
              </div>
              {subtitle && (
                <p className="text-sm text-gray-300 font-poppins">
                  {subtitle}
                </p>
              )}
              {lastUpdated && (
                <p className="text-xs text-gray-400 mt-1">
                  Last updated: {lastUpdated}
                </p>
              )}
            </div>
          </div>

          {/* Enhanced controls */}
          <AnimatePresence>
            {showControls && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex items-center gap-2"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExport}
                  className="p-2 rounded-xl bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all"
                  title="Export data"
                >
                  <Download size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onFullscreen}
                  className="p-2 rounded-xl bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all"
                  title="View fullscreen"
                >
                  <Maximize2 size={18} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowTooltip(true)}
                  className="p-2 rounded-xl bg-slate-700/50 text-gray-300 hover:text-white hover:bg-slate-600/50 transition-all"
                  title="Chart information"
                >
                  <Info size={18} />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced content area with zoom and transitions */}
        <div 
          ref={chartRef}
          className="relative transition-transform duration-300 ease-out"
          style={{ 
            transform: `scale(${chartScale})`,
            transformOrigin: 'center center'
          }}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/20 backdrop-blur-sm rounded-2xl">
              <div className="flex items-center gap-2 text-red-400">
                <AlertTriangle size={20} />
                <span>{error}</span>
              </div>
            </div>
          ) : null}
          
          <div 
            className={`transition-all duration-300 ${
              loading || error ? 'opacity-50 filter blur-sm' : 'opacity-100 filter blur-0'
            }`}
          >
            <motion.div
              initial={false}
              animate={{ 
                scale: loading ? 0.98 : 1,
                opacity: loading ? 0.8 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Enhanced information modal */}
      <AnimatePresence>
        {showTooltip && (
          <div className="fixed inset-0 z-[9999]" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-md"
              onClick={() => setShowTooltip(false)}
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
            />
            <div className="fixed inset-0 flex items-center justify-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-slate-800/90 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl border border-slate-700/50"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <button
                    onClick={() => setShowTooltip(false)}
                    className="p-2 hover:bg-slate-700/50 rounded-xl transition-colors"
                    title="Close information modal"
                    aria-label="Close information modal"
                  >
                    <X size={20} className="text-gray-400 hover:text-white" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  {subtitle && (
                    <p className="text-gray-300">{subtitle}</p>
                  )}
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon()}
                      <span className="text-gray-300 capitalize">{status} Status</span>
                    </div>
                    
                    {kpiValue && (
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold text-white">{kpiValue}</div>
                        {trend && (
                          <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${getTrendStyles()}`}>
                            {getTrendIcon()}
                            <span className="text-sm font-medium">{trendValue}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Interactive Features</h4>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <Mouse size={16} />
                        <span>Hover over elements for detailed information</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Maximize2 size={16} />
                        <span>Click fullscreen for expanded view</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Download size={16} />
                        <span>Export data for further analysis</span>
                      </li>
                    </ul>
                  </div>

                  {lastUpdated && (
                    <div className="text-sm text-gray-400">
                      Last updated: {lastUpdated}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
