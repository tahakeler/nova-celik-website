'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TestimonialsSection from '@/components/sections/TestimonialsSection';

const services = [
  {
    id: 1,
    title: 'Energy Efficiency Consulting',
    description:
      'Comprehensive assessments and strategies to reduce energy consumption and enhance system performance.',
    benefits: [
      'Reduce operational costs',
      'Improve system reliability',
      'Sustainability compliance',
    ],
    svg: '/svgs/efficiency-academy.svg',
  },
  {
    id: 2,
    title: 'HVAC Optimization',
    description:
      'Advanced solutions for heating, ventilation, and air conditioning systems to improve comfort and efficiency.',
    benefits: [
      'Enhanced comfort',
      'Energy savings',
      'Extended equipment life',
    ],
    svg: '/svgs/visualData.svg',
  },
  {
    id: 3,
    title: 'Renewable Energy Integration',
    description:
      'Seamless incorporation of renewable energy sources to support sustainable operations.',
    benefits: [
      'Lower carbon footprint',
      'Energy independence',
      'Government incentives',
    ],
    svg: '/svgs/realTimeAnalytics.svg',
  },
  {
    id: 4,
    title: 'Energy Monitoring & Analytics',
    description:
      'Real-time monitoring and analytics to track energy usage and identify opportunities for improvement.',
    benefits: [
      'Data-driven decisions',
      'Identify inefficiencies',
      'Continuous improvement',
    ],
    svg: '/svgs/metrics.svg',
  },
  {
    id: 5,
    title: 'Industrial Automation',
    description:
      'Implementation of automation technologies to streamline processes and enhance productivity.',
    benefits: [
      'Increased productivity',
      'Reduced errors',
      'Scalable solutions',
    ],
    svg: '/svgs/factory-concept-illustration.svg',
  },
  {
    id: 6,
    title: 'Compliance & Certification',
    description:
      'Assistance with meeting regulatory requirements and obtaining necessary energy certifications.',
    benefits: [
      'Regulatory compliance',
      'Market credibility',
      'Risk mitigation',
    ],
    svg: '/svgs/allTheData.svg',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    },
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
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
          <div className="lg:w-1/2 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-5xl sm:text-7xl font-extrabold max-w-4xl leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Explore Our Expert Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="mt-10 text-2xl sm:text-3xl max-w-3xl text-white"
            >
              Innovative solutions tailored to drive sustainable performance.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full px-6 sm:px-12 lg:px-24 py-100 space-y-64" aria-label="Services list">
        <motion.div
          className="flex flex-col space-y-24"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              className={`flex flex-col md:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut', delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="md:w-1/2 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <Image
                  src={service.svg}
                  alt={service.title}
                  width={600}
                  height={400}
                  className="object-contain"
                />
              </motion.div>
              <motion.div
                className="md:w-1/2 space-y-6 px-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.4 }}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-900">{service.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {service.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </motion.div>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Tracking placeholder */}
      <div aria-hidden="true" className="hidden">{/** Analytics scripts */}</div>
    </main>
  );
}
