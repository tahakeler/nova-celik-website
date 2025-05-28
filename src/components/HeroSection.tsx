'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { scrollFade } from '@/utils/animations';

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
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-black/50 z-10 mix-blend-multiply" />

      {/* Content */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10 py-16 md:py-28 px-4 sm:px-8">
        <motion.div
          variants={scrollFade}
          initial="hidden"
          whileInView="show"
          exit="exit"
          viewport={{ once: false, amount: 0.3 }}
          className="bg-white/90 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-xl shadow-xl border border-gray-200"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6 tracking-tight">
            NOVACELIK:
            <br />
            <span className="text-blue-800">Strong Structures,</span>
            <br />
            <span className="text-blue-800">Reliable Solutions</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-700 mb-8 leading-relaxed">
            We specialize in industrial steel construction with precision engineering
            and hands-on execution. Our projects deliver structural integrity, efficiency,
            and long-term value.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 flex-wrap">
            <Link href="#services">
              <button className="bg-blue-800 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-900 transition w-full sm:w-auto">
                Our Services
              </button>
            </Link>
            <Link href="#contact">
              <button className="border border-blue-800 px-6 py-3 rounded-md font-semibold text-blue-800 hover:bg-blue-800 hover:text-white transition w-full sm:w-auto">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
