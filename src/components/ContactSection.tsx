'use client';

import { motion } from 'framer-motion';

export default function ContactSection() {
  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <p className="text-gray-700">
        Email: <a href="mailto:info@novacelikco.com" className="text-blue-600 underline">info@novacelikco.com</a>
      </p>
      <p className="text-gray-700 mt-2">Phone: +90 123 456 7890</p>
      <p className="text-gray-700 mt-2">Address: Nova Çelik Headquarters, Istanbul, Turkey</p>
    </motion.section>
  );
}
