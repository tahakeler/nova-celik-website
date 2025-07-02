'use client';

import React, { useState } from 'react';
import { CalendarDayProps, MaintenanceTask } from './types';
import TaskDetails from './TaskDetails';

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  tasks,
  isCurrentMonth,
  isToday,
  onTaskClick,
  onDateClick,
}) => {
  const [selectedTask, setSelectedTask] = useState<MaintenanceTask | null>(null);
  const [taskDetailsPosition, setTaskDetailsPosition] = useState<{ x: number; y: number } | undefined>();

  const handleTaskClick = (task: MaintenanceTask, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedTask(task);
    setTaskDetailsPosition({ x: event.clientX, y: event.clientY });
    onTaskClick?.(task);
  };

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500'
  };

  const dayClasses = `
    relative h-20 p-2 border border-slate-700/50 transition-all duration-200 cursor-pointer
    ${isCurrentMonth ? 'bg-slate-800/50' : 'bg-slate-900/50'}
    ${isToday ? 'ring-2 ring-blue-500/50 bg-blue-900/20' : ''}
    hover:bg-slate-700/30 hover:scale-[1.02] hover:shadow-lg
  `;

  const dateClasses = `
    text-sm font-medium
    ${isCurrentMonth ? 'text-slate-200' : 'text-slate-500'}
    ${isToday ? 'text-blue-400 font-bold' : ''}
  `;

  return (
    <>
      <div 
        className={dayClasses}
        onClick={() => onDateClick?.(date)}
      >
        {/* Date number */}
        <span className={dateClasses}>
          {date.getDate()}
        </span>

        {/* Task indicators - Show as colored dots */}
        <div className="mt-1 flex flex-wrap gap-1">
          {tasks.slice(0, 6).map((task, index) => (
            <button
              key={task.id}
              onClick={(e) => handleTaskClick(task, e)}
              className="group relative"
              title={`${task.title} - ${task.priority} priority`}
            >
              <div className={`w-2 h-2 rounded-full transition-all duration-200 group-hover:scale-150 ${priorityColors[task.priority]} ${
                task.daysRemaining <= 7 ? 'animate-pulse ring-1 ring-red-400' : ''
              }`} />
              
              {/* Tooltip on hover */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap pointer-events-none">
                {task.title}
              </div>
            </button>
          ))}
          
          {/* Show additional tasks count if more than 6 */}
          {tasks.length > 6 && (
            <div className="w-2 h-2 rounded-full bg-slate-500 flex items-center justify-center">
              <span className="text-xs text-white font-bold">+</span>
            </div>
          )}
        </div>

        {/* Task list for larger displays */}
        <div className="mt-1 space-y-0.5 hidden lg:block">
          {tasks.slice(0, 2).map((task) => (
            <button
              key={task.id}
              onClick={(e) => handleTaskClick(task, e)}
              className="w-full group"
              title={task.title}
            >
              <div className="flex items-center gap-1 px-1 py-0.5 rounded hover:bg-slate-700/50 transition-colors">
                {/* Priority indicator */}
                <div className={`w-1 h-1 rounded-full ${priorityColors[task.priority]}`} />
                
                {/* Task title */}
                <span className="text-xs text-slate-300 truncate group-hover:text-white transition-colors">
                  {task.title}
                </span>

                {/* Urgency indicator for tasks due soon */}
                {task.daysRemaining <= 7 && (
                  <span className="ml-auto">
                    <div className="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Task count badge (if more than 2 tasks) - only show on larger screens */}
        {tasks.length > 2 && (
          <div className="absolute bottom-1 right-1 hidden lg:block">
            <span className="text-xs text-slate-400 bg-slate-700/50 px-1 py-0.5 rounded-full">
              +{tasks.length - 2}
            </span>
          </div>
        )}

        {/* Task count for smaller screens */}
        {tasks.length > 0 && (
          <div className="absolute top-1 right-1 lg:hidden">
            <span className="text-xs text-slate-300 bg-slate-700/70 px-1 py-0.5 rounded-full min-w-[16px] text-center">
              {tasks.length}
            </span>
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      <TaskDetails
        task={selectedTask}
        isOpen={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        position={taskDetailsPosition}
      />
    </>
  );
};

export default CalendarDay;
