// Standardized Chart Configuration System
export const CHART_CONFIG = {
  // Color Palette - Consistent across all charts
  colors: {
    primary: '#3b82f6',
    secondary: '#10b981',
    tertiary: '#f59e0b',
    quaternary: '#ef4444',
    quinary: '#8b5cf6',
    senary: '#06b6d4',
    septenary: '#f97316',
    octonary: '#84cc16',
    
    // Semantic colors
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
    info: '#3b82f6',
    
    // Neutral colors
    gray: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    
    // Chart specific colors
    grid: 'rgba(148, 163, 184, 0.1)',
    gridHover: 'rgba(148, 163, 184, 0.2)',
    background: 'rgba(30, 41, 59, 0.8)',
    backgroundHover: 'rgba(30, 41, 59, 0.9)',
    text: '#ffffff',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    border: 'rgba(59, 130, 246, 0.2)',
    borderHover: 'rgba(59, 130, 246, 0.4)',
  },
  
  // Typography
  fonts: {
    primary: 'Montserrat, system-ui, sans-serif',
    secondary: 'Poppins, system-ui, sans-serif',
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
    },
    weights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
  
  // Spacing and Layout
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    padding: {
      chart: { top: 30, right: 30, bottom: 50, left: 60 },
      chartMobile: { top: 20, right: 20, bottom: 40, left: 40 },
    },
  },
  
  // Animation Configuration
  animations: {
    duration: {
      fast: 150,
      normal: 300,
      slow: 500,
      chart: 1200,
    },
    easing: {
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      elastic: (x: number): number => {
        const c4 = (2 * Math.PI) / 3;
        return x === 0 ? 0 : x === 1 ? 1
          : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
      },
      easeOutCubic: (x: number): number => 1 - Math.pow(1 - x, 3),
    },
    stagger: {
      delay: 100,
      chartDelay: 150,
    },
  },
  
  // Interactive Elements
  interactions: {
    hover: {
      scale: 1.05,
      scaleSmall: 1.02,
      scaleLarge: 1.1,
      opacity: 0.8,
      shadowBlur: 20,
      shadowIntensity: 0.3,
    },
    active: {
      scale: 0.98,
      scaleSmall: 0.95,
    },
    focus: {
      outline: '2px solid rgba(59, 130, 246, 0.5)',
      outlineOffset: '2px',
    },
  },
  
  // Tooltip Configuration
  tooltip: {
    background: 'rgba(15, 23, 42, 0.95)',
    border: 'rgba(59, 130, 246, 0.2)',
    borderRadius: '12px',
    padding: '16px',
    shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    maxWidth: '280px',
    fontSize: '0.875rem',
    offset: { x: 10, y: -10 },
    animation: {
      initial: { opacity: 0, scale: 0.9, y: 10 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.9, y: 10 },
      duration: 0.15,
    },
  },
  
  // Loading States
  loading: {
    dots: {
      size: 8,
      color: '#3b82f6',
      gap: 8,
      animationDelay: [0, 150, 300],
    },
    skeleton: {
      background: 'linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%)',
      backgroundSize: '200% 100%',
      borderRadius: '8px',
    },
  },
  
  // Chart Specific Settings
  charts: {
    line: {
      lineWidth: 3,
      pointRadius: 4,
      pointRadiusHover: 6,
      gridLines: 5,
      smoothing: 0.4,
    },
    bar: {
      borderRadius: 6,
      borderRadiusHover: 8,
      widthRatio: 0.6,
      spacingRatio: 0.4,
      maxBars: 20,
    },
    donut: {
      innerRadius: 0.55,
      outerRadius: 1,
      hoverOffset: 8,
      centerTextOffset: 8,
    },
    gauge: {
      innerRadius: 0.7,
      outerRadius: 1,
      needleWidth: 4,
      tickCount: 20,
      majorTickInterval: 4,
    },
  },
  
  // Responsive Breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
  },
} as const;

// Utility Functions
export const getChartColors = (count: number): string[] => {
  const colors = [
    CHART_CONFIG.colors.primary,
    CHART_CONFIG.colors.secondary,
    CHART_CONFIG.colors.tertiary,
    CHART_CONFIG.colors.quaternary,
    CHART_CONFIG.colors.quinary,
    CHART_CONFIG.colors.senary,
    CHART_CONFIG.colors.septenary,
    CHART_CONFIG.colors.octonary,
  ];
  
  return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
};

export const formatValue = (value: number, options?: {
  decimals?: number;
  suffix?: string;
  prefix?: string;
  compact?: boolean;
}): string => {
  const { decimals = 0, suffix = '', prefix = '', compact = false } = options ?? {};
  
  if (compact && value >= 1000) {
    const units = ['', 'k', 'M', 'B', 'T'];
    const unitIndex = Math.floor(Math.log10(Math.abs(value)) / 3);
    const scaledValue = value / Math.pow(1000, unitIndex);
    return `${prefix}${scaledValue.toFixed(decimals)}${units[unitIndex]}${suffix}`;
  }
  
  return `${prefix}${value.toLocaleString(undefined, { 
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals 
  })}${suffix}`;
};

export const createGradient = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  colorStops: Array<{ offset: number; color: string }>
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });
  return gradient;
};

export const createRadialGradient = (
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  r1: number,
  x2: number,
  y2: number,
  r2: number,
  colorStops: Array<{ offset: number; color: string }>
): CanvasGradient => {
  const gradient = ctx.createRadialGradient(x1, y1, r1, x2, y2, r2);
  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });
  return gradient;
};

export const getResponsivePadding = (width: number) => {
  if (width < CHART_CONFIG.breakpoints.mobile) {
    return CHART_CONFIG.spacing.padding.chartMobile;
  }
  return CHART_CONFIG.spacing.padding.chart;
};

export const setupCanvas = (
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D
): { width: number; height: number } => {
  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  
  return { width: rect.width, height: rect.height };
};

export type ChartConfig = typeof CHART_CONFIG;
