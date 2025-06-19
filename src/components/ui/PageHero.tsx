'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { popIn } from '@/utils/animations';
import { useState } from 'react';

interface PageHeroProps {
  readonly image: string;
  readonly title: string;
  readonly subtitle?: string;
}

export default function PageHero({ image, title, subtitle }: PageHeroProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="relative w-full flex items-center justify-center h-[30vh] lg:h-[35vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        {!imgError ? (
          <>
            <Image
              src={image}
              alt="Background"
              fill
              sizes="100vw"
              priority
              className="object-cover brightness-90"
              onError={() => setImgError(true)}
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-800">
            <h1 className="text-white text-5xl font-bold">NovaCelik</h1>
          </div>
        )}
      </div>
      <div className="relative z-10 text-center px-4 py-12 max-w-4xl">
        <motion.h1
          variants={popIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold text-white mb-3 leading-tight"
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
            className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
