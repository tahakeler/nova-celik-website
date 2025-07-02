export interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date string
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  category: 'preventive' | 'corrective' | 'inspection' | 'calibration';
  estimatedDuration: number; // in hours
  assignedTo?: string;
  equipment?: string;
  daysRemaining: number;
}

export interface MaintenanceCalendarProps {
  tasks: MaintenanceTask[];
  currentDate?: Date;
  onTaskClick?: (task: MaintenanceTask) => void;
  onDateClick?: (date: Date) => void;
  className?: string;
}

export interface CalendarDayProps {
  date: Date;
  tasks: MaintenanceTask[];
  isCurrentMonth: boolean;
  isToday: boolean;
  onTaskClick?: (task: MaintenanceTask) => void;
  onDateClick?: (date: Date) => void;
}

export interface TaskDetailsProps {
  task: MaintenanceTask | null;
  isOpen: boolean;
  onClose: () => void;
  position?: { x: number; y: number };
}
