'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Lightbulb, Users, Globe, Award, Target, Zap, Shield } from 'lucide-react';

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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  hover: {
    y: -10,
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
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

const VALUES = [
  {
    icon: Star,
    title: 'Excellence in Innovation',
    description: 'Pushing boundaries with cutting-edge technology',
    color: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Lightbulb,
    title: 'Commitment to Sustainability',
    description: 'Building a greener future for generations',
    color: 'from-green-400 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Collaborative Spirit',
    description: 'Working together to achieve extraordinary results',
    color: 'from-blue-400 to-cyan-500',
  },
  {
    icon: Globe,
    title: 'Global Impact',
    description: 'Creating positive change across the world',
    color: 'from-purple-400 to-pink-500',
  },
];

const ACHIEVEMENTS = [
  {
    icon: Award,
    year: '2021',
    title: 'Company Founded',
    description: 'Started with a vision to revolutionize energy efficiency',
  },
  {
    icon: Target,
    year: '2023',
    title: 'AI Platform Launch',
    description: 'Launched proprietary AI-powered analytics platform',
  },
  {
    icon: Zap,
    year: '2024',
    title: 'Global Expansion',
    description: 'Expanded operations to 10+ countries worldwide',
  },
  {
    icon: Shield,
    year: '2025',
    title: 'Industry Leader',
    description: 'Recognized as industry leader in sustainable energy solutions',
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
        
        {/* Floating Elements */}
        <motion.div
          variants={floatingVariants}
          animate="animate"
          className="absolute top-20 left-20 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"
        />
        <motion.div
          variants={floatingVariants}
          animate="animate"
          style={{ animationDelay: '1s' }}
          className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
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
      <section className="py-20 px-6 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Purpose</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be the global leader in energy efficiency, transforming industries through innovative technology and sustainable practices.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Empowering businesses to optimize energy use, reduce costs, and achieve environmental goals with data-driven solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Core <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-center"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-300 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-20 px-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Our <span className="text-blue-600">Journey</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((achievement, index) => (
              <motion.div
                key={achievement.year}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <achievement.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{achievement.year}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Meet Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Leadership</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {TEAM.map((member, index) => (
              <motion.div
                key={member.name}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover="hover"
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6 w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 mx-auto"
                >
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={112}
                      height={112}
                      className="object-contain"
                      loading="lazy"
                    />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-semibold text-white mb-2">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
