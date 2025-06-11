'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { popIn, slideUp } from '@/utils/animations';
import Button from './Button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden snap-start bg-gray-50 text-gray-900"
    >
      {/* Background SVG */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Hero Background"
          fill
          sizes="100vw"
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 mix-blend-multiply bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 py-16 md:py-28 px-4 sm:px-8">
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-gray-200"
        >
          <motion.h1
            variants={popIn}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
          >
            NOVACELIK:
            <br />
            <span className="text-blue-800">Strong Structures,</span>
            <br />
            <span className="text-blue-800">Reliable Solutions</span>
          </motion.h1>

          <motion.p
            variants={popIn}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed"
          >
            We specialize in industrial steel construction with precision engineering
            and hands-on execution. Our projects deliver structural integrity, efficiency,
            and long-term value.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <Button href="#services" label="Our Services" />
            <Button href="#contact" label="Contact Us" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}