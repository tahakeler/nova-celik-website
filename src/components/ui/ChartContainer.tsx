'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { AlertCircle, TrendingUp, BarChart3, MoreVertical } from 'lucide-react';
import GlassCard from './GlassCard';

interface ChartContainerProps {
  children: ReactNode;
  title: string;
  loading?: boolean;
  className?: string;
  error?: string | null;
  subtitle?: string;
  icon?: 'trend' | 'bar' | 'default';
}

export default function ChartContainer({
  children,
  title,
  loading = false,
  className = '',
  error = null,
  subtitle,
  icon = 'default',
}: ChartContainerProps) {
  const [hasError, setHasError] = useState(false);

  const getIcon = () => {
    switch (icon) {
      case 'trend':
        return <TrendingUp size={20} className="text-blue-600" />;
      case 'bar':
        return <BarChart3 size={20} className="text-blue-600" />;
      default:
        return null;
    }
  };

  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-4 w-full h-full">
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
        <div className="h-3 bg-gray-200 rounded w-3/6"></div>
      </div>
    </div>
  );

  const ErrorDisplay = () => (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      <h4 className="text-lg font-medium text-gray-900 mb-2">Unable to load chart</h4>
      <p className="text-sm text-gray-500 mb-4">{error || 'An unexpected error occurred'}</p>
      <button 
        onClick={() => setHasError(false)}
        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <GlassCard className={`p-4 sm:p-6 relative overflow-hidden ${className}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            {getIcon()}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
              {subtitle && (
                <p className="text-sm text-gray-500">{subtitle}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Status indicator */}
            {loading && (
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            )}
            {error && (
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            {!loading && !error && (
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            )}
            
            {/* Menu button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"
            >
              <MoreVertical size={16} />
            </motion.button>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1">
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoadingSkeleton />
            </div>
          ) : error || hasError ? (
            <ErrorDisplay />
          ) : (
            <div 
              className="h-full"
              onError={() => setHasError(true)}
            >
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-transparent"></div>
      </div>
    </GlassCard>
  );
}
