'use client';

import React, { useState, useMemo } from 'react';
import { MaintenanceTask } from './types';
import { Calendar, Clock, AlertTriangle } from 'lucide-react';

interface MiniMaintenanceCalendarProps {
  tasks: MaintenanceTask[];
  onExpand?: () => void;
  className?: string;
}

const MiniMaintenanceCalendar: React.FC<MiniMaintenanceCalendarProps> = ({
  tasks,
  onExpand,
  className = ''
}) => {
  const [currentDate] = useState(new Date());

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    const currentMonthTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear;
    });

    const urgent = currentMonthTasks.filter(task => task.daysRemaining <= 7).length;
    const upcoming = currentMonthTasks.filter(task => task.daysRemaining > 7 && task.daysRemaining <= 30).length;
    const overdue = currentMonthTasks.filter(task => task.daysRemaining < 0).length;

    return { 
      total: currentMonthTasks.length, 
      urgent, 
      upcoming, 
      overdue,
      nextTask: currentMonthTasks
        .filter(task => task.daysRemaining >= 0)
        .sort((a, b) => a.daysRemaining - b.daysRemaining)[0]
    };
  }, [tasks]);

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Get upcoming tasks for the next 7 days
  const upcomingTasks = useMemo(() => {
    return tasks
      .filter(task => task.daysRemaining >= 0 && task.daysRemaining <= 7)
      .sort((a, b) => a.daysRemaining - b.daysRemaining)
      .slice(0, 3);
  }, [tasks]);

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  return (
    <div className={`glass-card-dark rounded-3xl p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">Maintenance Schedule</h3>
        </div>
        <button
          onClick={onExpand}
          className="text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
          title="Open full calendar"
          aria-label="Open full calendar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-16h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3" />
          </svg>
        </button>
      </div>

      {/* Current Month Summary */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-300 mb-2">{monthName}</h4>
        <div className="grid grid-cols-4 gap-2">
          <div className="bg-slate-700/30 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-white">{summaryStats.total}</div>
            <div className="text-xs text-slate-400">Total</div>
          </div>
          <div className="bg-red-500/20 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-red-400">{summaryStats.urgent}</div>
            <div className="text-xs text-red-400">Urgent</div>
          </div>
          <div className="bg-yellow-500/20 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-yellow-400">{summaryStats.upcoming}</div>
            <div className="text-xs text-yellow-400">Soon</div>
          </div>
          <div className="bg-gray-500/20 rounded-lg p-2 text-center">
            <div className="text-2xl font-bold text-gray-400">{summaryStats.overdue}</div>
            <div className="text-xs text-gray-400">Overdue</div>
          </div>
        </div>
      </div>

      {/* Next Task Highlight */}
      {summaryStats.nextTask && (
        <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-400">Next Task</span>
          </div>
          <div className="text-white font-medium">{summaryStats.nextTask.title}</div>
          <div className="text-sm text-slate-400">
            {summaryStats.nextTask.daysRemaining === 0 ? 'Today' : 
             summaryStats.nextTask.daysRemaining === 1 ? 'Tomorrow' :
             `In ${summaryStats.nextTask.daysRemaining} days`}
          </div>
        </div>
      )}

      {/* Upcoming Tasks List */}
      <div>
        <h4 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" />
          Upcoming This Week
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map((task) => (
              <div key={task.id} className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{task.title}</div>
                  <div className="text-xs text-slate-400">{task.equipment}</div>
                </div>
                <div className="text-xs text-slate-400 whitespace-nowrap">
                  {task.daysRemaining === 0 ? 'Today' : 
                   task.daysRemaining === 1 ? 'Tomorrow' :
                   `${task.daysRemaining}d`}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-slate-400 text-center py-2">
              No urgent tasks this week
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-slate-700/50">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <span className="text-xs text-slate-400">High</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <span className="text-xs text-slate-400">Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-400">Low</span>
        </div>
      </div>
    </div>
  );
};

export default MiniMaintenanceCalendar;
