'use client';

import { motion } from 'framer-motion';
import services from '../data/services';

export default function ServicesGrid() {
  return (
    <motion.section
      className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-16 snap-start"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service) => (
            <motion.div
              key={service.title}
              className="bg-white p-5 sm:p-6 rounded-xl shadow transition hover:shadow-md text-left"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
