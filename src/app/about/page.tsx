'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Lightbulb, Users, Globe } from 'lucide-react';
import { popIn, scrollFade } from '@/utils/animations';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};

const TEAM = [
  {
    name: 'Alice Johnson',
    role: 'Founder & CEO',
    bio: 'Passionate about driving sustainable energy solutions worldwide.',
    image: '/svgs/logo.svg',
  },
  {
    name: 'Michael Lee',
    role: 'Head of Innovation',
    bio: 'Leading the charge in cutting-edge energy analytics and IoT.',
    image: '/svgs/logo.svg',
  },
  {
    name: 'Sophia Martinez',
    role: 'Sustainability Director',
    bio: 'Committed to creating eco-friendly industrial transformations.',
    image: '/svgs/logo.svg',
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col bg-gradient-to-b from-primary-50 to-white text-gray-900 min-h-screen">
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
              Discover NovaCelik
            </motion.h1>
            <motion.p
              className="mt-10 text-2xl sm:text-3xl max-w-3xl text-white"
              variants={containerVariants}
            >
              Pioneering sustainable energy innovation with passion and precision.
            </motion.p>
          </motion.div>
        </div>
      </section>
      {/* Vision & Mission */}
      <section className="mx-auto max-w-6xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 bg-white rounded-lg shadow-lg">
        <motion.div
          variants={scrollFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold text-brand-blue mb-6">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            To be the global leader in energy efficiency, transforming industries through innovative technology and sustainable practices.
          </p>
          <h2 className="text-4xl font-extrabold text-brand-blue mt-12 mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Empowering businesses to optimize energy use, reduce costs, and achieve environmental goals with data-driven solutions.
          </p>
        </motion.div>

        <motion.div
          variants={scrollFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <h2 className="text-4xl font-extrabold text-brand-blue mb-6">Core Values</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-4 text-lg">
            <li className="flex items-center gap-3">
              <Star className="text-brand-blue" size={24} />
              Excellence in Innovation
            </li>
            <li className="flex items-center gap-3">
              <Lightbulb className="text-brand-blue" size={24} />
              Commitment to Sustainability
            </li>
            <li className="flex items-center gap-3">
              <Users className="text-brand-blue" size={24} />
              Collaborative Spirit
            </li>
            <li className="flex items-center gap-3">
              <Globe className="text-brand-blue" size={24} />
              Global Impact
            </li>
          </ul>
        </motion.div>
      </section>

      {/* Milestones */}
      <section className="bg-brand-blue/10 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-brand-blue mb-8 text-center">Milestones & Achievements</h2>
          <ul className="space-y-6 text-brand-blue text-lg max-w-3xl mx-auto list-inside list-decimal">
            <li>2021 - Founded with a vision to revolutionize energy efficiency</li>
            <li>2023 - Launched proprietary AI-powered analytics platform</li>
            <li>2024 - Expanded operations to 10+ countries worldwide</li>
            <li>2025 - Recognized as industry leader in sustainable energy solutions</li>
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-brand-blue mb-12 text-center">Meet Our Leadership</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              variants={popIn}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-lg flex flex-col items-center text-center"
            >
              <div className="mb-6 w-28 h-28 rounded-full bg-brand-blue/20 flex items-center justify-center overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={112}
                  height={112}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <h3 className="text-2xl font-semibold text-brand-blue">{member.name}</h3>
              <p className="text-brand-blue font-medium mb-2">{member.role}</p>
              <p className="text-gray-600 text-sm">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

