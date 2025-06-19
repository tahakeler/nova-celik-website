'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import ParticleBackground from '@/components/ui/ParticleBackground';
import StatsCounter from '@/components/ui/StatsCounter';
import { Zap } from 'lucide-react';

const statsVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
    },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Hero Background"
          fill
          sizes="100vw"
          priority
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Subtle Particle Effect */}
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-8">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium text-blue-200">Energy Innovation</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              NOVACELIK
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Strong Structures,
                <br />
                Reliable Solutions
              </span>
            </h1>

            <p className="text-lg text-gray-300 mb-8 max-w-xl">
              We specialize in industrial steel construction with precision engineering
              and innovative energy solutions.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button href="#services" label="Our Services" variant="primary" />
              <Button href="#contact" label="Contact Us" variant="secondary" />
            </div>
          </motion.div>

          {/* Right Column - Stats */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { id: 'projects', value: 500, label: 'Projects', prefix: '+' },
              { id: 'satisfaction', value: 95, label: 'Satisfaction', suffix: '%' },
              { id: 'experience', value: 25, label: 'Experience', prefix: '+' },
              { id: 'energy', value: 40, label: 'Energy Saved', suffix: '%' }
            ].map((stat, i) => (
              <motion.div
                key={stat.id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={statsVariants}
                className="bg-white backdrop-blur-sm rounded-xl p-6"
              >
                <StatsCounter
                  end={stat.value}
                  label={stat.label}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
