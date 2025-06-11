'use client';

import { motion } from 'framer-motion';
import React from 'react';

export interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export default function DashboardCard({
  children,
  className,
  title,
}: Readonly<DashboardCardProps>) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`rounded-2xl bg-white shadow border border-gray-200 ${className ?? ''}`}
    >
      {title && (
        <h3 className="px-4 pt-4 text-lg font-semibold text-gray-900">{title}</h3>
      )}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
