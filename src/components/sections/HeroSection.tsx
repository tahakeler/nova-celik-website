'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { popIn, slideUp } from '@/utils/animations';
import Button from '@/components/ui/Button';
import ParticleBackground from '@/components/ui/ParticleBackground';
import StatsCounter from '@/components/ui/StatsCounter';
import { Zap, Shield, Target, TrendingUp } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden snap-start bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-image.jpg"
          alt="Hero Background"
          fill
          sizes="100vw"
          priority
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      {/* Particle Effect */}
      <ParticleBackground />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-48 h-48 bg-purple-500/10 rounded-full blur-xl"
        />
      </div>

      {/* Overlay Gradient */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Content */}
      <div className="w-full max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-20 py-16 md:py-28 px-4 sm:px-8">
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="relative"
        >
          {/* Glowing border effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          
          <div className="relative bg-white/95 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 hover:shadow-blue-500/25">
            <motion.div
              variants={popIn}
              className="flex items-center gap-3 mb-6"
              style={{ transform: "translateZ(50px)" }}
            >
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">Energy Innovation</span>
            </motion.div>

            <motion.h1
              variants={popIn}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6 tracking-tight"
              style={{ transform: "translateZ(50px)" }}
            >
              NOVACELIK:
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Strong Structures,
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                Reliable Solutions
              </span>
            </motion.h1>

            <motion.p
              variants={popIn}
              transition={{ delay: 0.1 }}
              className="text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed"
              style={{ transform: "translateZ(40px)" }}
            >
              We specialize in industrial steel construction with precision engineering
              and hands-on execution. Our projects deliver structural integrity, efficiency,
              and long-term value through innovative energy solutions.
            </motion.p>

            {/* Feature highlights */}
            <motion.div
              variants={popIn}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4 mb-8"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="w-4 h-4 text-green-500" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Target className="w-4 h-4 text-blue-500" />
                <span>Precision Engineering</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span>Energy Efficient</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span>Smart Solutions</span>
              </div>
            </motion.div>

            <motion.div
              variants={popIn}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 flex-wrap"
              style={{ transform: "translateZ(40px)" }}
            >
              <Button href="#services" label="Our Services" />
              <Button href="#contact" label="Contact Us" />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 gap-6"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative">
              <StatsCounter
                end={500}
                label="Projects Completed"
                prefix="+"
                className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20"
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotateY: -5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative">
              <StatsCounter
                end={95}
                label="Client Satisfaction"
                suffix="%"
                className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20"
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative">
              <StatsCounter
                end={25}
                label="Years Experience"
                prefix="+"
                className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20"
              />
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, rotateY: -5 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-red-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative">
              <StatsCounter
                end={40}
                label="Energy Savings"
                suffix="%"
                className="bg-white/90 backdrop-blur-xl rounded-xl p-6 shadow-xl border border-white/20"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
