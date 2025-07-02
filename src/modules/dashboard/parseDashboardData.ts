import * as XLSX from 'xlsx';
import { MaintenanceTask } from '../../components/dashboard/maintenance/types';

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
  temperature: number[];
  pressure: number[];
  vibration: number[];
  fuelConsumption: number[];
  efficiency: number[];
  emissions: number[];
  maintenance: {
    nextService: number;
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

export async function parseDashboardData(file: File): Promise<DashboardData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json: (string | number | null)[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        resolve({
          voltageFluctuation: Number(json[1]?.[1]) || 0,
          voltageHarmonics: Number(json[2]?.[1]) || 0,
          currentHarmonics: Number(json[3]?.[1]) || 0,
          generatorDemand: Number(json[4]?.[1]) || 0,
          healthy: Number(json[5]?.[1]) || 0,
          risky: Number(json[6]?.[1]) || 0,
          unhealthy: Number(json[7]?.[1]) || 0,
          current: Array.isArray(json[8]) ? json[8].slice(1).map(Number) : [],
          previous: Array.isArray(json[9]) ? json[9].slice(1).map(Number) : [],
          
          // Default values for new fields (since Excel doesn't contain them)
          temperature: Array.from({ length: 24 }, (_, i) => 65 + Math.sin(i * 0.3) * 15),
          pressure: Array.from({ length: 24 }, (_, i) => 2.5 + Math.sin(i * 0.2) * 0.8),
          vibration: Array.from({ length: 24 }, (_, i) => 0.8 + Math.random() * 0.6),
          fuelConsumption: Array.from({ length: 24 }, (_, i) => 150 + Math.sin(i * 0.4) * 50),
          efficiency: Array.from({ length: 24 }, (_, i) => 88 + Math.sin(i * 0.1) * 4),
          emissions: Array.from({ length: 24 }, (_, i) => 50 + Math.sin(i * 0.3) * 20),
          
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
            solar: Array.from({ length: 24 }, (_, i) => i < 6 || i > 18 ? 0 : Math.max(0, 70 * Math.sin((i - 6) * Math.PI / 12))),
            wind: Array.from({ length: 24 }, (_, i) => 60 + Math.sin(i * 0.2) * 30),
            grid: Array.from({ length: 24 }, (_, i) => 120 - Math.sin(i * 0.3) * 40),
            battery: Array.from({ length: 24 }, (_, i) => 70 - i * 2 + Math.sin(i * 0.5) * 10)
          },
          
          costs: {
            operational: Array.from({ length: 24 }, (_, i) => 1500 + Math.sin(i * 0.2) * 400),
            maintenance: Array.from({ length: 24 }, (_, i) => 250 + Math.sin(i * 0.3) * 100),
            fuel: Array.from({ length: 24 }, (_, i) => 900 + Math.sin(i * 0.4) * 300)
          },
          
          environmental: {
            co2: Array.from({ length: 24 }, (_, i) => 150 + Math.sin(i * 0.3) * 50),
            nox: Array.from({ length: 24 }, (_, i) => 20 + Math.sin(i * 0.4) * 10),
            particulates: Array.from({ length: 24 }, (_, i) => 8 + Math.sin(i * 0.5) * 4)
          },
          
          // New properties for enhanced charts
          voltage: Array.from({ length: 24 }, (_, i) => 220 + Math.sin(i * 0.2) * 10),
          thd: Array.from({ length: 24 }, (_, i) => 2 + Math.sin(i * 0.3) * 1.5),
          hourlyLoad: Array.from({ length: 24 }, (_, i) => 60 + Math.sin(i * 0.4) * 30),
          peakDemand: 95,
          averageLoad: 72,
          targetEfficiency: 95,
          energySavings: Array.from({ length: 12 }, () => 500 + Math.sin(Math.random() * 0.5) * 200),
          completedMaintenance: 85,
          totalMaintenance: 100,
          peakCost: Array.from({ length: 12 }, (_, i) => 150 + Math.sin(i * 0.3) * 50),
          offPeakCost: Array.from({ length: 12 }, (_, i) => 80 + Math.sin(i * 0.4) * 30),
          costSavings: 12500,
          projectedCost: 45000,
          batteryLevel: 78,
          batteryVoltage: 12.6,
          batteryCurrent: 2.5,
          batteryTemp: 25
        });
      } catch (err) {
        reject(new Error(err instanceof Error ? err.message : String(err)));
      }
    };

    reader.onerror = () => reject(new Error('File read error'));
    reader.readAsArrayBuffer(file);
  });
}
