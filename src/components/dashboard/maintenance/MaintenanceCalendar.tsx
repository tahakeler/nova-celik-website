'use client';

import React, { useState, useMemo } from 'react';
import { MaintenanceCalendarProps, MaintenanceTask } from './types';
import CalendarDay from './CalendarDay';
import { Filter, Calendar, List, Grid } from 'lucide-react';

type ViewMode = 'month' | 'week' | 'list';
type FilterType = 'all' | 'preventive' | 'corrective' | 'inspection' | 'calibration';

const MaintenanceCalendar: React.FC<MaintenanceCalendarProps> = ({
  tasks,
  currentDate = new Date(),
  onTaskClick,
  onDateClick,
  className = ''
}) => {
  const [viewDate, setViewDate] = useState(currentDate);
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [isAnimating, setIsAnimating] = useState(false);

  // Calendar calculations
  const { calendarDays, monthName, year } = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const monthName = viewDate.toLocaleDateString('en-US', { month: 'long' });
    
    // Get first day of month and calculate starting date
    const firstDayOfMonth = new Date(year, month, 1);
    const startDate = new Date(firstDayOfMonth);
    startDate.setDate(startDate.getDate() - firstDayOfMonth.getDay());
    
    // Generate 42 days (6 weeks)
    const calendarDays = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      calendarDays.push(date);
    }
    
    return { calendarDays, monthName, year };
  }, [viewDate]);

  // Filter tasks based on selected filters
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filterType !== 'all' && task.category !== filterType) return false;
      if (selectedLocation !== 'all' && task.equipment !== selectedLocation) return false;
      return true;
    });
  }, [tasks, filterType, selectedLocation]);

  // Group filtered tasks by date
  const tasksByDate = useMemo(() => {
    const grouped: { [key: string]: MaintenanceTask[] } = {};

    filteredTasks.forEach(task => {
      const taskDate = new Date(task.date);
      const dateKey = `${taskDate.getFullYear()}-${taskDate.getMonth()}-${taskDate.getDate()}`;

      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(task);
    });

    return grouped;
  }, [filteredTasks]);

  const getTasksForDate = (date: Date): MaintenanceTask[] => {
    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    return tasksByDate[dateKey] || [];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setIsAnimating(true);
    setTimeout(() => {
      setViewDate(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
        return newDate;
      });
      setIsAnimating(false);
    }, 150);
  };

  const goToToday = () => {
    setViewDate(new Date());
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === viewDate.getMonth();
  };

  // Get unique locations for filter
  const locations = useMemo(() => {
    const uniqueLocations = [...new Set(tasks.map(task => task.equipment).filter(Boolean))];
    return uniqueLocations;
  }, [tasks]);

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const currentMonthTasks = filteredTasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.getMonth() === viewDate.getMonth() && 
             taskDate.getFullYear() === viewDate.getFullYear();
    });

    const urgent = currentMonthTasks.filter(task => task.daysRemaining <= 7).length;
    const moderate = currentMonthTasks.filter(task => task.daysRemaining > 7 && task.daysRemaining <= 14).length;
    const normal = currentMonthTasks.filter(task => task.daysRemaining > 14).length;

    return { total: currentMonthTasks.length, urgent, moderate, normal };
  }, [filteredTasks, viewDate]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={`h-full flex flex-col ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">
            Maintenance Calendar
          </h2>
          <p className="text-slate-400 text-sm">
            {summaryStats.total} tasks scheduled for {monthName} {year}
          </p>
        </div>
        
        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-800/50 rounded-lg p-1">
            {[
              { mode: 'month' as ViewMode, icon: Calendar, label: 'Month' },
              { mode: 'week' as ViewMode, icon: Grid, label: 'Week' },
              { mode: 'list' as ViewMode, icon: List, label: 'List' }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-md transition-all ${
                  viewMode === mode 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
                title={label}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Navigation */}
      <div className="flex items-center justify-between mb-4">
        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as FilterType)}
              className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              aria-label="Filter by maintenance type"
            >
              <option value="all">All Types</option>
              <option value="preventive">Preventive</option>
              <option value="corrective">Corrective</option>
              <option value="inspection">Inspection</option>
              <option value="calibration">Calibration</option>
            </select>
          </div>
          
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-800/50 border border-slate-700/50 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            aria-label="Filter by equipment location"
          >
            <option value="all">All Equipment</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Today
          </button>
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => navigateMonth('prev')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
              title="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <h3 className={`text-lg font-semibold text-white min-w-[140px] text-center transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              {monthName} {year}
            </h3>
            
            <button
              onClick={() => navigateMonth('next')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-200 hover:scale-105"
              title="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Stats - Only show if there are tasks */}
      {summaryStats.total > 0 && (
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="bg-slate-700/30 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-white">{summaryStats.total}</div>
            <div className="text-xs text-slate-400">Total</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-red-400">{summaryStats.urgent}</div>
            <div className="text-xs text-red-400">Urgent</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-yellow-400">{summaryStats.moderate}</div>
            <div className="text-xs text-yellow-400">Moderate</div>
          </div>
          <div className="bg-green-500/20 rounded-lg p-2 text-center">
            <div className="text-lg font-bold text-green-400">{summaryStats.normal}</div>
            <div className="text-xs text-green-400">Normal</div>
          </div>
        </div>
      )}

      {/* Calendar Grid */}
      {viewMode === 'month' && (
        <div className={`bg-slate-900/50 rounded-lg overflow-hidden transition-all duration-300 ${isAnimating ? 'opacity-50 scale-98' : 'opacity-100 scale-100'}`}>
          {/* Week day headers */}
          <div className="grid grid-cols-7 bg-slate-800/50">
            {weekDays.map(day => (
              <div key={day} className="p-3 text-center">
                <span className="text-sm font-medium text-slate-300">{day}</span>
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 flex-1">
            {calendarDays.map((date) => (
              <CalendarDay
                key={date.toISOString()}
                date={date}
                tasks={getTasksForDate(date)}
                isCurrentMonth={isCurrentMonth(date)}
                isToday={isToday(date)}
                onTaskClick={onTaskClick}
                onDateClick={onDateClick}
              />
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-slate-900/50 rounded-lg p-4">
          <div className="space-y-2">
            {filteredTasks
              .filter(task => {
                const taskDate = new Date(task.date);
                return taskDate.getMonth() === viewDate.getMonth() && 
                       taskDate.getFullYear() === viewDate.getFullYear();
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .map(task => (
                <button
                  key={task.id}
                  type="button"
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => onTaskClick?.(task)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onTaskClick?.(task);
                    }
                  }}
                  tabIndex={0}
                  aria-pressed="false"
                >
                  <div className="flex items-center gap-3">
                    {(() => {
                      let priorityClass = '';
                      if (task.priority === 'high') {
                        priorityClass = 'bg-red-500';
                      } else if (task.priority === 'medium') {
                        priorityClass = 'bg-yellow-500';
                      } else {
                        priorityClass = 'bg-green-500';
                      }
                      return (
                        <div className={`w-3 h-3 rounded-full ${priorityClass}`} />
                      );
                    })()}
                    <div>
                      <div className="text-white font-medium">{task.title}</div>
                      <div className="text-sm text-slate-400">{task.equipment} • {task.assignedTo}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white">{new Date(task.date).toLocaleDateString()}</div>
                    {(() => {
                      let daysClass = '';
                      if (task.daysRemaining <= 7) {
                        daysClass = 'text-red-400';
                      } else if (task.daysRemaining <= 14) {
                        daysClass = 'text-yellow-400';
                      } else {
                        daysClass = 'text-green-400';
                      }
                      return (
                        <div className={`text-xs ${daysClass}`}>
                          {task.daysRemaining} days remaining
                        </div>
                      );
                    })()}
                  </div>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-slate-400">High Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <span className="text-sm text-slate-400">Medium Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-slate-400">Low Priority</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-sm text-slate-400">Urgent (≤7 days)</span>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCalendar;
