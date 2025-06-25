'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import { useRef } from 'react';

const services = [
  {
    id: 1,
    title: 'Energy Efficiency Consulting',
    description: 'Comprehensive assessments and strategies to reduce energy consumption and enhance system performance.',
    benefits: ['Reduce operational costs', 'Improve system reliability', 'Sustainability compliance'],
    svg: '/svgs/efficiency-academy.svg',
    gradient: 'from-blue-700 to-cyan-700',
  },
  {
    id: 2,
    title: 'HVAC Optimization',
    description: 'Advanced solutions for heating, ventilation, and air conditioning systems to improve comfort and efficiency.',
    benefits: ['Enhanced comfort', 'Energy savings', 'Extended equipment life'],
    svg: '/svgs/visualData.svg',
    gradient: 'from-purple-700 to-pink-700',
  },
  {
    id: 3,
    title: 'Renewable Energy Integration',
    description: 'Seamless incorporation of renewable energy sources to support sustainable operations.',
    benefits: ['Lower carbon footprint', 'Energy independence', 'Government incentives'],
    svg: '/svgs/realTimeAnalytics.svg',
    gradient: 'from-green-700 to-emerald-700',
  },
  {
    id: 4,
    title: 'Energy Monitoring & Analytics',
    description: 'Real-time monitoring and analytics to track energy usage and identify opportunities for improvement.',
    benefits: ['Data-driven decisions', 'Identify inefficiencies', 'Continuous improvement'],
    svg: '/svgs/metrics.svg',
    gradient: 'from-orange-700 to-yellow-600',
  },
  {
    id: 5,
    title: 'Industrial Automation',
    description: 'Implementation of automation technologies to streamline processes and enhance productivity.',
    benefits: ['Increased productivity', 'Reduced errors', 'Scalable solutions'],
    svg: '/svgs/factory-concept-illustration.svg',
    gradient: 'from-red-700 to-rose-700',
  },
  {
    id: 6,
    title: 'Compliance & Certification',
    description: 'Assistance with meeting regulatory requirements and obtaining necessary energy certifications.',
    benefits: ['Regulatory compliance', 'Market credibility', 'Risk mitigation'],
    svg: '/svgs/allTheData.svg',
    gradient: 'from-indigo-700 to-violet-700',
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.article
      ref={cardRef}
      style={{ y, opacity, scale }}
      className={`flex flex-col md:flex-row items-center gap-12 relative ${
        index % 2 === 1 ? 'md:flex-row-reverse' : ''
      } shadow-lg rounded-3xl p-6 bg-white/90`}
    >
      <motion.div
        className="md:w-1/2 flex justify-center"
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className={`relative w-80 h-80 bg-gradient-to-br ${service.gradient} rounded-3xl p-1 shadow-lg`}>
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm rounded-3xl" />
          <Image
            src={service.svg}
            alt={`Illustration for ${service.title}`}
            width={600}
            height={400}
            className="object-contain p-8 relative z-10 drop-shadow-xl"
          />
        </div>
      </motion.div>

      <motion.div
        className="md:w-1/2 space-y-6 px-8"
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
          {service.title}
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed">{service.description}</p>
        <ul className="space-y-4" role="list">
          {service.benefits.map((benefit, i) => (
            <li
              key={benefit}
              className="flex items-center gap-3 text-gray-700"
            >
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-3 w-full"
              >
                <span className={`w-2 h-2 rounded-full bg-gray-900`} aria-hidden="true" />
                {benefit}
              </motion.div>
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.article>
  );
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

        {/* Animated Background Elements */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
          aria-hidden="true"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          aria-hidden="true"
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
      <section 
        className="w-full px-6 sm:px-12 lg:px-24 py-20 space-y-32" 
        aria-label="Services list"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-32"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />
    </main>
  );
}
