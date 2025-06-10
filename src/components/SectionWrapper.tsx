// src/components/SectionWrapper.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { staggerContainer } from '@/utils/animations';

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = '' }: Readonly<SectionWrapperProps>) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`px-4 py-8 md:px-10 md:py-20 ${className}`}
    >
      {children}
    </motion.section>
  );
}
