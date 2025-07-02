import { MaintenanceTask } from '../components/dashboard/maintenance/types';

export interface DashboardData {
  voltageFluctuation: number;
  voltageHarmonics: number;
  currentHarmonics: number;
  generatorDemand: number;
  healthy: number;
  risky: number;
  unhealthy: number;
  current: number[];
  previous: number[];
  // New diverse data fields
  powerFactor: number;
  frequency: number;
  temperature: number[];
  pressure: number[];
  vibration: number[];
  fuelConsumption: number[];
  efficiency: number[];
  emissions: number[];
  maintenance: {
    nextService: number; // days
    lastService: string;
    alerts: number;
    upcomingTasks: MaintenanceTask[];
  };
  energy: {
    solar: number[];
    wind: number[];
    grid: number[];
    battery: number[];
  };
  costs: {
    operational: number[];
    maintenance: number[];
    fuel: number[];
  };
  environmental: {
    co2: number[];
    nox: number[];
    particulates: number[];
  };
  
  // New properties for enhanced charts
  voltage: number[];
  thd: number[];
  hourlyLoad: number[];
  peakDemand: number;
  averageLoad: number;
  targetEfficiency: number;
  energySavings: number[];
  completedMaintenance: number;
  totalMaintenance: number;
  peakCost: number[];
  offPeakCost: number[];
  costSavings: number;
  projectedCost: number;
  batteryLevel: number;
  batteryVoltage: number;
  batteryCurrent: number;
  batteryTemp: number;
}

export const staticDashboardData: DashboardData = {
  voltageFluctuation: 2.3,
  voltageHarmonics: 85.7,
  currentHarmonics: 12.4,
  generatorDemand: 78.5,
  healthy: 85,
  risky: 12,
  unhealthy: 3,
  current: [45, 52, 48, 61, 55, 67, 59, 72, 68, 75, 82, 78, 85, 89, 92, 88, 94, 91, 87, 83, 79, 74, 69, 65],
  previous: [42, 48, 45, 58, 52, 63, 56, 68, 64, 71, 78, 74, 81, 85, 88, 84, 90, 87, 83, 79, 75, 70, 65, 61],
  
  // New diverse data
  powerFactor: 0.92,
  frequency: 50.1,
  temperature: [65, 68, 72, 75, 78, 82, 85, 88, 91, 89, 86, 83, 80, 77, 74, 71, 68, 65, 62, 59, 56, 58, 61, 64],
  pressure: [2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.6, 3.4, 3.2, 3.0, 2.8, 2.6, 2.4, 2.2, 2.0, 1.9, 2.1, 2.3, 2.5, 2.7, 2.9],
  vibration: [0.5, 0.7, 0.6, 0.8, 0.9, 1.1, 1.0, 1.2, 1.4, 1.3, 1.1, 0.9, 0.8, 0.6, 0.5, 0.7, 0.8, 1.0, 1.1, 0.9, 0.7, 0.6, 0.5, 0.4],
  fuelConsumption: [120, 135, 142, 158, 165, 178, 185, 192, 205, 198, 185, 172, 165, 158, 145, 138, 125, 118, 112, 108, 115, 122, 128, 135],
  efficiency: [88, 89, 87, 90, 91, 89, 92, 93, 91, 90, 88, 87, 89, 90, 92, 91, 89, 88, 87, 86, 88, 89, 90, 91],
  emissions: [45, 52, 48, 55, 58, 62, 65, 68, 72, 69, 65, 61, 58, 55, 52, 48, 45, 42, 39, 41, 44, 47, 50, 53],
  
  maintenance: {
    nextService: 15,
    lastService: "2024-01-15",
    alerts: 3,
    upcomingTasks: [
      {
        id: '1',
        title: 'Generator Oil Change',
        description: 'Replace engine oil and oil filter for Generator Unit 1',
        date: '2024-02-15',
        priority: 'high',
        status: 'pending',
        category: 'preventive',
        estimatedDuration: 4,
        assignedTo: 'John Smith',
        equipment: 'Generator Unit 1',
        daysRemaining: 5
      },
      {
        id: '2',
        title: 'Voltage Regulator Inspection',
        description: 'Inspect and test voltage regulator functionality',
        date: '2024-02-18',
        priority: 'medium',
        status: 'pending',
        category: 'inspection',
        estimatedDuration: 2,
        assignedTo: 'Sarah Johnson',
        equipment: 'Control Panel A',
        daysRemaining: 8
      },
      {
        id: '3',
        title: 'Cooling System Maintenance',
        description: 'Check coolant levels, inspect radiator and cooling fans',
        date: '2024-02-20',
        priority: 'medium',
        status: 'pending',
        category: 'preventive',
        estimatedDuration: 3,
        assignedTo: 'Mike Davis',
        equipment: 'Cooling System',
        daysRemaining: 10
      },
      {
        id: '4',
        title: 'Battery Bank Testing',
        description: 'Load test battery bank and check connections',
        date: '2024-02-22',
        priority: 'high',
        status: 'pending',
        category: 'inspection',
        estimatedDuration: 2,
        assignedTo: 'Lisa Chen',
        equipment: 'Battery Bank 1',
        daysRemaining: 12
      },
      {
        id: '5',
        title: 'Air Filter Replacement',
        description: 'Replace air intake filters for all generator units',
        date: '2024-02-25',
        priority: 'low',
        status: 'pending',
        category: 'preventive',
        estimatedDuration: 1,
        assignedTo: 'Tom Wilson',
        equipment: 'All Generator Units',
        daysRemaining: 15
      }
    ]
  },
  
  energy: {
    solar: [0, 0, 0, 0, 0, 5, 15, 25, 35, 45, 55, 65, 70, 68, 60, 50, 35, 20, 8, 0, 0, 0, 0, 0],
    wind: [25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65, 68, 72, 75, 78, 82, 85, 88, 82, 75, 68, 55],
    grid: [150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95, 90, 85, 80, 75, 80, 85, 90, 95, 105, 115, 125, 135],
    battery: [85, 82, 78, 75, 72, 68, 65, 62, 58, 55, 52, 48, 45, 42, 38, 35, 38, 42, 46, 50, 55, 62, 68, 75]
  },
  
  costs: {
    operational: [1200, 1350, 1420, 1580, 1650, 1780, 1850, 1920, 2050, 1980, 1850, 1720, 1650, 1580, 1450, 1380, 1250, 1180, 1120, 1080, 1150, 1220, 1280, 1350],
    maintenance: [200, 180, 220, 250, 280, 320, 350, 380, 420, 400, 350, 300, 280, 250, 220, 200, 180, 160, 140, 150, 170, 190, 210, 230],
    fuel: [800, 900, 950, 1050, 1100, 1180, 1230, 1280, 1360, 1320, 1230, 1140, 1100, 1050, 960, 920, 830, 780, 740, 720, 760, 810, 850, 900]
  },
  
  environmental: {
    co2: [120, 135, 142, 158, 165, 178, 185, 192, 205, 198, 185, 172, 165, 158, 145, 138, 125, 118, 112, 108, 115, 122, 128, 135],
    nox: [15, 18, 20, 22, 25, 28, 30, 32, 35, 33, 30, 27, 25, 22, 20, 18, 15, 13, 11, 12, 14, 16, 18, 20],
    particulates: [5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 4, 5, 6, 7, 8]
  },
  
  // New properties for enhanced charts
  voltage: [220, 222, 218, 225, 221, 219, 223, 220, 224, 218, 222, 220, 219, 221, 223, 220, 218, 222, 221, 219, 220, 222, 221, 220],
  thd: [2.1, 2.3, 1.9, 2.5, 2.2, 2.0, 2.4, 2.1, 2.6, 1.8, 2.2, 2.0, 1.9, 2.1, 2.3, 2.0, 1.8, 2.2, 2.1, 1.9, 2.0, 2.2, 2.1, 2.0],
  hourlyLoad: [60, 65, 58, 72, 68, 75, 82, 78, 85, 89, 92, 88, 94, 91, 87, 83, 79, 74, 69, 65, 62, 58, 55, 58],
  peakDemand: 95,
  averageLoad: 72,
  targetEfficiency: 95,
  energySavings: [500, 520, 480, 550, 530, 510, 540, 520, 560, 490, 520, 500],
  completedMaintenance: 85,
  totalMaintenance: 100,
  peakCost: [150, 155, 145, 160, 152, 148, 158, 150, 162, 142, 152, 150],
  offPeakCost: [80, 82, 78, 85, 81, 79, 84, 80, 86, 76, 81, 80],
  costSavings: 12500,
  projectedCost: 45000,
  batteryLevel: 78,
  batteryVoltage: 12.6,
  batteryCurrent: 2.5,
  batteryTemp: 25
};
