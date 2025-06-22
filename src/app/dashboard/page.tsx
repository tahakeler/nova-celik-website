'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Users, Globe } from 'lucide-react';
import { popIn, scrollFade } from '@/utils/animations';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import { parseDashboardData, type DashboardData } from '@/modules/dashboard/parseDashboardData';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/excel/sample.xlsx');
        if (!response.ok) throw new Error(`Failed to load Excel file (HTTP ${response.status})`);
        const arrayBuffer = await response.arrayBuffer();
        const file = new File([arrayBuffer], 'sample.xlsx');
        const parsed = await parseDashboardData(file);
        setData(parsed);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
        setError('Failed to load dashboard data.');
      }
    };
    loadData();
  }, []);

  let content: React.ReactNode;
  if (error) {
    content = (
      <section className="px-4 py-20 text-center text-red-600 font-semibold">{error}</section>
    );
  } else if (!data) {
    content = (
      <section className="px-4 py-20">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
            {[...Array(8)].map((_, i) => (
              <div key={`skeleton-card-${i}`} className="bg-white rounded-2xl p-6 h-64 shadow" />
            ))}
          </div>
        </div>
      </section>
    );
  } else {
    content = <DashboardGrid data={data} />;
  }

  return (
    <main className="flex flex-col bg-gradient-to-b from-primary-50 to-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 px-6 sm:px-12 lg:px-24 shadow-xl"
        aria-label="Hero section"
      >
        <Image
          src="/svgs/hero-image.svg"
          alt="Hero Background"
          fill
          className="object-cover absolute inset-0 -z-10 opacity-30 blur-md"
          priority
        />
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 px-6 sm:px-12 lg:px-24">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl sm:text-7xl font-extrabold max-w-4xl leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              variants={containerVariants}
            >
              NovaCelik Analytics Dashboard
            </motion.h1>
            <motion.p
              className="mt-10 text-2xl sm:text-3xl max-w-3xl text-white"
              variants={containerVariants}
            >
              Real-time insights, facility comparisons, and energy quality reports at your fingertips.
            </motion.p>
          </motion.div>
        </div>
      </section>
      {content}
    </main>
  );
}
