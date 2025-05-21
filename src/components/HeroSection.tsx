'use client';

import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.section
      className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24 px-6 text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        className="text-4xl md:text-6xl font-bold"
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Nova Çelik
      </motion.h1>

      <motion.p
        className="mt-4 text-xl max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Powering Industry with Precision. Discover our steel solutions and energy efficiency expertise.
      </motion.p>

      <motion.a
        href="/dashboard"
        className="btn-primary inline-block mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        View Dashboard
      </motion.a>
    </motion.section>
  );
}
