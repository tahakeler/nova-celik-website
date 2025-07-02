'use client';

import React from 'react';
import { X } from 'lucide-react';
import { MaintenanceTask } from './types';
import MaintenanceCalendar from './MaintenanceCalendar';

interface MaintenanceCalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: MaintenanceTask[];
}

const MaintenanceCalendarModal: React.FC<MaintenanceCalendarModalProps> = ({
  isOpen,
  onClose,
  tasks
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div>
            <h2 className="text-2xl font-bold text-white">Maintenance Calendar</h2>
            <p className="text-slate-400 text-sm">Complete maintenance schedule and task management</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-700/50 rounded-lg"
            title="Close calendar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Calendar Content */}
        <div className="p-6 h-[calc(100%-88px)] overflow-auto">
          <MaintenanceCalendar 
            tasks={tasks}
            currentDate={new Date()}
            onTaskClick={(task) => console.log('Task clicked:', task)}
            onDateClick={(date) => console.log('Date clicked:', date)}
            className="h-full"
          />
        </div>
      </div>
    </>
  );
};

export default MaintenanceCalendarModal;
