'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import DashboardGrid from '@/components/dashboard/DashboardGrid';
import { staticDashboardData } from '@/data/staticDashboardData';

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
  // Use static data directly without any loading
  const data = staticDashboardData;
  const content = <DashboardGrid data={data} />;

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
