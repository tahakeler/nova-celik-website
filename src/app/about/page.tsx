'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Leaf, Eye, Users, ShieldCheck } from 'lucide-react';
import { popIn, scrollFade } from '@/utils/animations';

const TEAM = [
  {
    name: 'Iona Moore',
    role: 'Chief Executive Officer',
    bio: 'Visionary leader guiding our mission toward sustainable innovation.',
    image: '/svgs/logo.svg',
  },
  {
    name: 'John Doe',
    role: 'Chief Technology Officer',
    bio: 'Architect of our analytics and IoT infrastructure.',
    image: '/svgs/logo.svg',
  },
  {
    name: 'Georgie Harper',
    role: 'Chief Sustainability Officer',
    bio: 'Driving eco-friendly practices and impactful results.',
    image: '/svgs/logo.svg',
  },
];

export default function AboutPage() {
  return (
    <main className="flex flex-col bg-white text-gray-900">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="/images/hero-image.jpg"
          alt="About NovaCelik"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/70" />
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center">
          <motion.h1
            variants={popIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
          >
            About <span className="text-[#42b431]">NovaCelik</span>
          </motion.h1>
          <motion.p
            variants={popIn}
            initial="hidden"
            whileInView="show"
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="mt-4 max-w-2xl text-base text-gray-200 sm:text-lg"
          >
            We drive energy efficiency with data-driven solutions for a more
            sustainable future.
          </motion.p>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2">
        <motion.div
          variants={scrollFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-blue-800">Our Mission</h2>
          <p className="mb-8 text-base text-gray-700 sm:text-lg">
            Empower organizations to achieve optimal energy performance through
            innovation and engineering excellence.
          </p>
          <h3 className="mb-3 mt-8 text-2xl font-semibold">Core Values</h3>
          <ul className="space-y-2 pl-5 text-gray-600">
            <li className="flex items-start gap-2">
              <Leaf className="mt-1 h-5 w-5 text-[#42b431]" /> Sustainability
            </li>
            <li className="flex items-start gap-2">
              <Eye className="mt-1 h-5 w-5 text-[#42b431]" /> Innovation
            </li>
            <li className="flex items-start gap-2">
              <ShieldCheck className="mt-1 h-5 w-5 text-[#42b431]" /> Integrity
            </li>
            <li className="flex items-start gap-2">
              <Users className="mt-1 h-5 w-5 text-[#42b431]" /> Collaboration
            </li>
          </ul>
        </motion.div>

        <motion.div
          variants={scrollFade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-4"
        >
          <h2 className="mb-4 text-3xl font-bold text-blue-800">
            Key Milestones
          </h2>
          <ul className="space-y-2 pl-5 text-gray-600">
            <li>2022 – NovaCelik founded and first AI dashboard deployed</li>
            <li>2023 – Expanded into new markets and sectors</li>
            <li>2024 – Achieved industry certification in energy management</li>
            <li>2025 – Launched cloud-native analytics platform</li>
          </ul>
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="mb-12 text-center text-4xl font-bold text-blue-800">
            Meet the Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                variants={popIn}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-2xl bg-white p-8 shadow-md transition hover:shadow-lg"
              >
                <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    loading="lazy"
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="mt-1 mb-2 font-medium text-blue-700">
                  {member.role}
                </p>
                <p className="text-center text-sm text-gray-500">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
