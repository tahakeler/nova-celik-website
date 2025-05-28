'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
import Link from 'next/link';

export default function EfficiencyAcademySection() {
  return (
    <section
      id="efficiency-academy"
      className="bg-gray-50 text-gray-900 px-6 py-20 md:py-28 flex items-center justify-center"
    >
      <motion.div
        className="w-full max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="w-full max-w-md md:max-w-full mx-auto">
          <Image
            src="/images/efficiency-academy.svg"
            alt="Efficiency Academy"
            width={600}
            height={400}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-left mb-4 leading-snug">
            <span className="text-blue-700">NovaCelik</span> Efficiency Academy
          </h2>
          <p className="text-left text-gray-700 text-base sm:text-lg leading-relaxed mb-6">
            Our Efficiency Academy offers structured training and knowledge sharing on energy efficiency,
            sustainability practices, and engineering excellence. We empower both industry professionals and
            students with hands-on workshops, live demonstrations, and expert-led lectures.
          </p>
          <Link href="#contact">
            <button className="bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition w-full sm:w-auto">
              Join the Academy
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
