'use client';

import { motion } from 'framer-motion';
import FaqSection, { FaqCategory } from '@/components/sections/FaqSection';
import Image from 'next/image';
import BackToTopButton from '@/components/ui/BackToTopButton';

const FAQ_DATA: FaqCategory[] = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is NovaCelik?',
        a: "NovaCelik is a leading provider of digital energy monitoring and efficiency solutions for industrial and commercial facilities.",
      },
      {
        q: 'Where is NovaCelik based?',
        a: 'Our headquarters are in Bangkok, Thailand, and we serve clients globally.',
      },
    ],
  },
  {
    category: 'Product',
    questions: [
      {
        q: 'Is the dashboard customizable?',
        a: 'Yes, our platform allows extensive customization based on your facility’s needs.',
      },
      {
        q: 'Can I export reports?',
        a: 'You can export reports in multiple formats, including PDF and Excel.',
      },
    ],
  },
  {
    category: 'Support',
    questions: [
      {
        q: 'How do I get technical support?',
        a: 'Contact us via our support form, or email support@novacelik.com. Our team responds within 24 hours.',
      },
      {
        q: 'Where can I find documentation?',
        a: 'Our Help Center contains guides, tutorials, and API documentation.',
      },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1 },
  },
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section
        className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 px-6 sm:px-12 lg:px-24 shadow-xl"
        aria-label="Hero section"
      >
        <Image
          src="/svgs/hero-image.svg"
          alt="Hero Background"
          fill
          className="object-cover absolute inset-0 -z-10 opacity-30 blur-md"
          priority
        />
        <div className="w-full max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 px-6 sm:px-12 lg:px-24">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              className="text-5xl sm:text-7xl font-extrabold max-w-4xl leading-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              variants={containerVariants}
            >
              Frequently Asked Questions
            </motion.h1>
            <motion.p
              className="mt-10 text-2xl sm:text-3xl max-w-3xl text-white"
              variants={containerVariants}
            >
              Find quick answers to common questions about our services
            </motion.p>
          </motion.div>
        </div>
      </section>
      <FaqSection data={FAQ_DATA} />
      <BackToTopButton />
    </main>
  );
}
