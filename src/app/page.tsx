'use client';

import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HomeDashboardSection from '@/components/dashboard/HomeDashboardSection';
import { BlogSection } from '@/modules/blog/components';
import EfficiencyAcademySection from '@/components/sections/EfficiencyAcademySection';
import HomeContactSection from '@/components/sections/ContactSection';
import BackToTopButton from '@/components/ui/BackToTopButton';
import '@/styles/globals.css';

// Sample data for homepage dashboard preview
const sampleDashboardData = {
  voltageFluctuation: 319.12,
  voltageHarmonics: 16713,
  currentHarmonics: 72.15,
  generatorDemand: 85,
  healthy: 48.4,
  risky: 41.1,
  unhealthy: 10.4,
  current: [12000, 15000, 18000, 14000, 16000, 19000, 17000, 13000, 15500, 18500, 16500, 14500],
  previous: [11000, 14000, 17000, 13000, 15000, 18000, 16000, 12000, 14500, 17500, 15500, 13500],
  
  // Additional required properties
  powerFactor: 0.92,
  frequency: 50.1,
  temperature: [65, 68, 72, 75, 78, 82, 85, 88, 91, 89, 86, 83],
  pressure: [2.1, 2.3, 2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7, 3.6, 3.4, 3.2],
  vibration: [0.5, 0.7, 0.6, 0.8, 0.9, 1.1, 1.0, 1.2, 1.4, 1.3, 1.1, 0.9],
  fuelConsumption: [120, 135, 142, 158, 165, 178, 185, 192, 205, 198, 185, 172],
  efficiency: [88, 89, 87, 90, 91, 89, 92, 93, 91, 90, 88, 87],
  emissions: [45, 52, 48, 55, 58, 62, 65, 68, 72, 69, 65, 61],
  
  maintenance: {
    nextService: 15,
    lastService: "2024-01-15",
    alerts: 3,
    upcomingTasks: [
      {
        id: '1',
        title: 'Generator Oil Change',
        description: 'Regular maintenance - oil change required',
        date: '2024-02-15',
        priority: 'high' as const,
        status: 'pending' as const,
        category: 'preventive' as const,
        estimatedDuration: 4,
        assignedTo: 'John Smith',
        equipment: 'Generator Unit 1',
        daysRemaining: 5
      },
      {
        id: '2',
        title: 'System Inspection',
        description: 'Routine system inspection and diagnostics',
        date: '2024-02-20',
        priority: 'medium' as const,
        status: 'pending' as const,
        category: 'inspection' as const,
        estimatedDuration: 2,
        assignedTo: 'Sarah Johnson',
        equipment: 'Main Control Panel',
        daysRemaining: 10
      }
    ]
  },
  
  energy: {
    solar: [0, 0, 0, 0, 0, 5, 15, 25, 35, 45, 55, 65],
    wind: [25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62],
    grid: [150, 145, 140, 135, 130, 125, 120, 115, 110, 105, 100, 95],
    battery: [85, 82, 78, 75, 72, 68, 65, 62, 58, 55, 52, 48]
  },
  
  costs: {
    operational: [1200, 1350, 1420, 1580, 1650, 1780, 1850, 1920, 2050, 1980, 1850, 1720],
    maintenance: [200, 180, 220, 250, 280, 320, 350, 380, 420, 400, 350, 300],
    fuel: [800, 900, 950, 1050, 1100, 1180, 1230, 1280, 1360, 1320, 1230, 1140]
  },
  
  environmental: {
    co2: [120, 135, 142, 158, 165, 178, 185, 192, 205, 198, 185, 172],
    nox: [15, 18, 20, 22, 25, 28, 30, 32, 35, 33, 30, 27],
    particulates: [5, 6, 7, 8, 9, 10, 11, 12, 13, 12, 11, 10]
  },
  
  // New properties for enhanced charts
  voltage: [220, 222, 218, 225, 221, 219, 223, 220, 224, 218, 222, 220],
  thd: [2.1, 2.3, 1.9, 2.5, 2.2, 2.0, 2.4, 2.1, 2.6, 1.8, 2.2, 2.0],
  hourlyLoad: [60, 65, 58, 72, 68, 75, 82, 78, 85, 89, 92, 88],
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

export default function HomePage() {
  return (
    <main className="flex flex-col scroll-smooth">
      <HeroSection />
      <AboutSection />
      <AchievementsSection />
      <ServicesSection />
      <section className="bg-blue-50 py-20 border-y border-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Analytics Dashboard</h2>
          <p className="text-lg text-blue-700 mb-12">Real-time insights into your facility's performance and energy efficiency.</p>
          <HomeDashboardSection data={sampleDashboardData} />
        </div>
      </section>
      <BlogSection />
      <EfficiencyAcademySection />
      <HomeContactSection />
      <BackToTopButton />
    </main>
  );
}
