'use client';

import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <p className="text-lg text-gray-700">
        Nova Çelik is a leading provider of industrial steel solutions. With decades of experience,
        we serve the energy, infrastructure, and manufacturing sectors with precision-engineered products
        and a strong focus on sustainability and efficiency.
      </p>
    </motion.section>
  );
}
