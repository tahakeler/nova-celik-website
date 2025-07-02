'use client';

import React from 'react';
import { TaskDetailsProps } from './types';

const TaskDetails: React.FC<TaskDetailsProps> = ({ task, isOpen, onClose, position }) => {
  if (!isOpen || !task) return null;

  const priorityColors = {
    high: 'bg-red-500/20 text-red-400 border-red-500/30',
    medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    low: 'bg-green-500/20 text-green-400 border-green-500/30'
  };

  const statusColors = {
    pending: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
    'in-progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30',
    overdue: 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  const categoryIcons = {
    preventive: '🔧',
    corrective: '⚠️',
    inspection: '🔍',
    calibration: '⚙️'
  };

  const urgencyLevel = task.daysRemaining <= 7 ? 'urgent' : task.daysRemaining <= 14 ? 'moderate' : 'normal';
  const urgencyColors = {
    urgent: 'text-red-400',
    moderate: 'text-yellow-400',
    normal: 'text-green-400'
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed z-50 bg-slate-800/95 backdrop-blur-md border border-slate-700/50 rounded-xl shadow-2xl p-6 min-w-[400px] max-w-[500px]"
        style={{
          left: position ? `${Math.min(position.x, window.innerWidth - 500)}px` : '50%',
          top: position ? `${Math.min(position.y, window.innerHeight - 400)}px` : '50%',
          transform: position ? 'none' : 'translate(-50%, -50%)'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{categoryIcons[task.category]}</span>
            <div>
              <h3 className="text-xl font-bold text-white">{task.title}</h3>
              <p className="text-sm text-slate-400">{task.equipment}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            title="Close task details"
            className="text-slate-400 hover:text-white transition-colors p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Status and Priority Badges */}
        <div className="flex gap-2 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
            {task.priority.toUpperCase()} PRIORITY
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[task.status]}`}>
            {task.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-slate-300 mb-2">Description</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{task.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Scheduled Date</h4>
            <p className="text-slate-400 text-sm">
              {new Date(task.date).toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Duration</h4>
            <p className="text-slate-400 text-sm">{task.estimatedDuration} hours</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Assigned To</h4>
            <p className="text-slate-400 text-sm">{task.assignedTo}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-300 mb-1">Category</h4>
            <p className="text-slate-400 text-sm capitalize">{task.category}</p>
          </div>
        </div>

        {/* Urgency Indicator */}
        <div className="bg-slate-700/50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-300">Days Remaining</h4>
              <p className={`text-2xl font-bold ${urgencyColors[urgencyLevel]}`}>
                {task.daysRemaining}
              </p>
            </div>
            <div className="text-right">
              <div className={`text-xs font-medium ${urgencyColors[urgencyLevel]}`}>
                {urgencyLevel.toUpperCase()}
              </div>
              {urgencyLevel === 'urgent' && (
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-red-400">Requires immediate attention</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-3">
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  urgencyLevel === 'urgent' ? 'bg-red-500' :
                  urgencyLevel === 'moderate' ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.max(10, (30 - task.daysRemaining) / 30 * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-6">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
            View Details
          </button>
          <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
            Reschedule
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
