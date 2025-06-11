'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { popIn } from '@/utils/animations';

interface PageHeroProps {
  readonly image: string;
  readonly title: string;
  readonly subtitle?: string;
}

export default function PageHero({ image, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative w-full flex items-center justify-center min-h-[60vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src={image} alt="Background" fill sizes="100vw" priority className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative z-10 text-center px-6 py-20">
        <motion.h1
          variants={popIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={popIn}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-200 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
