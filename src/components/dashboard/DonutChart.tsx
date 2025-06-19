'use client';

import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import LiquidContainer from './LiquidContainer';

interface DonutChartProps {
  value: number;
  max?: number;
  label?: string;
  unit?: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: any[];
  unit: string;
}

const CustomTooltip = ({ active, payload, unit }: TooltipProps) => {
  if (active && payload?.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-gray-100">
        <p className="text-sm font-medium text-gray-600">
          {data.name === 'Used' ? 'Current Usage' : 'Available Capacity'}
        </p>
        <p className="text-lg font-bold text-gray-900">
          {data.value.toFixed(1)}{unit}
        </p>
      </div>
    );
  }
  return null;
};

export default function DonutChart({
  value,
  max = 100,
  label = 'Voltage Harmonics',
  unit = '%',
}: Readonly<DonutChartProps>) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [activeIndex, setActiveIndex] = useState(-1);
  const percentage = Math.min((value / max) * 100, 100);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedValue(percentage);
    }, 300);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  const getStatusColor = (value: number) => {
    if (value < 33) return ['#10B981', '#059669'];
    if (value < 66) return ['#F59E0B', '#D97706'];
    return ['#EF4444', '#DC2626'];
  };

  const getStatusText = (value: number) => {
    if (value < 33) return 'Normal';
    if (value < 66) return 'Warning';
    return 'Critical';
  };

  const getStatusBg = (value: number) => {
    if (value < 33) return 'bg-green-50 text-green-700 ring-green-600/20';
    if (value < 66) return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    return 'bg-red-50 text-red-700 ring-red-600/20';
  };

  const data = [
    { name: 'Used', value: animatedValue },
    { name: 'Available', value: 100 - animatedValue },
  ];

  const colors = getStatusColor(percentage);

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    
    return (
      <g>
        {/* Outer glow effect */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius - 2}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          opacity={0.2}
          filter="url(#glow)"
        />
        {/* Main sector with enhanced depth */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 4}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
          filter="url(#glow)"
        />
        {/* Inner highlight for 3D effect */}
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius - 4}
          outerRadius={innerRadius - 2}
          fill="white"
          opacity={0.3}
        />
        {/* Inner shadow for depth */}
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={innerRadius}
          outerRadius={innerRadius + 2}
          fill="black"
          opacity={0.1}
        />
      </g>
    );
  };

  return (
    <LiquidContainer 
      value={percentage}
      color={colors[0]}
      glowColor={colors[1]}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      <div className="relative w-full max-w-[200px] aspect-square">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id={`gradientFill-${label}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={colors[0]} stopOpacity={0.9}/>
                <stop offset="50%" stopColor={colors[1]} stopOpacity={0.8}/>
                <stop offset="100%" stopColor={colors[0]} stopOpacity={0.9}/>
              </linearGradient>
              <filter id="innerShadow">
                <feOffset dx="0" dy="1"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite operator="out" in="SourceGraphic"/>
                <feColorMatrix type="matrix"
                  values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.3 0"/>
                <feBlend in2="SourceGraphic" mode="normal"/>
              </filter>
            </defs>
            <Pie
              data={data}
              innerRadius="75%"
              outerRadius="90%"
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              onMouseEnter={(_, index) => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(-1)}
              stroke="none"
              isAnimationActive={true}
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
            >
              <Cell 
                fill={`url(#gradientFill-${label})`} 
                filter={activeIndex === 0 ? "url(#glow)" : undefined}
              />
            </Pie>
            <Tooltip content={(props) => <CustomTooltip {...props} unit={unit} />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className="text-3xl font-bold transition-colors duration-500"
            style={{ color: colors[0] }}
          >
            {Math.round(animatedValue)}{unit}
          </span>
          <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset ${getStatusBg(percentage)}`}>
            {getStatusText(percentage)}
          </div>
        </div>

        {/* Enhanced Progress Indicators */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => {
            const rotation = i * 30;
            const isActive = (i / 12) * 100 <= percentage;
            const delay = i * 50; // Staggered animation delay
            
            return (
              <div
                key={`progress-indicator-${label}-${i}`}
                className="absolute w-1 origin-bottom"
                style={{
                  height: isActive ? '12px' : '8px',
                  top: '10%',
                  left: '50%',
                  transform: `rotate(${rotation}deg) ${isActive ? 'scale(1.2)' : ''}`,
                  backgroundColor: isActive ? colors[0] : '#E2E8F0',
                  boxShadow: isActive ? `0 0 8px ${colors[0]}` : 'none',
                  transition: `all 500ms cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
                  opacity: isActive ? 1 : 0.5,
                }}
              >
                {/* Glowing dot at the end of active indicators */}
                {isActive && (
                  <div 
                    className="absolute -top-1 left-1/2 w-2 h-2 rounded-full transform -translate-x-1/2"
                    style={{
                      backgroundColor: colors[0],
                      boxShadow: `0 0 6px ${colors[0]}`,
                      animation: `pulse 2s infinite`
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Add pulse animation */}
        <style>{`
          @keyframes pulse {
            0% { transform: translate(-50%, 0) scale(1); opacity: 0.8; }
            50% { transform: translate(-50%, 0) scale(1.2); opacity: 1; }
            100% { transform: translate(-50%, 0) scale(1); opacity: 0.8; }
          }
        `}</style>
      </div>
    </LiquidContainer>
  );
}
