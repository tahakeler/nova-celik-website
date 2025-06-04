'use client';

import { motion } from 'framer-motion';
import { scrollFade, slideLeft } from '@/utils/animations';
import AnimatedCounter from './AnimatedCounter';
import {
  Users,
  Globe2,
  ClipboardList,
  Leaf,
  ShieldCheck,
  ActivitySquare,
} from 'lucide-react';

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-20 sm:py-28 flex items-center justify-center w-full"
    >
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-screen-xl"
      >
        {/* Heading and Description */}
        <div className="text-left mb-16 max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">
            Our <span className="text-blue-600">Achievements</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
            We provide end-to-end energy efficiency solutions for industrial sectors using diverse energy sources.
            Our strategic analysis methods help enterprises reduce energy costs per product or operational hour,
            cut carbon emissions, and reach sustainability targets.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-20">
          {[
            { icon: <Users className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />, title: 'Specialized Engineering Team' },
            { icon: <Globe2 className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />, title: 'International Partners' },
            { icon: <ClipboardList className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />, title: 'Project Efficiency Practices' },
            { icon: <Leaf className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />, title: 'Eco-Friendly Technologies' },
            { icon: <ShieldCheck className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />, title: '15+ Energy Audits Completed' },
            { icon: <ActivitySquare className="w-7 sm:w-8 h-7 sm:h-8 text-blue-600" />, title: 'Energy Monitoring & Management' },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              variants={slideLeft}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <AchievementCard icon={item.icon} title={item.title} />
            </motion.div>
          ))}
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 max-w-4xl mx-auto text-center">
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-blue-700">
              +<AnimatedCounter value={15} />{' '}
              <span className="text-base sm:text-xl font-medium text-gray-600">million THB</span>
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-blue-600 mt-3 sm:mt-4">Energy Saving</div>
          </div>
          <div>
            <div className="text-4xl sm:text-5xl font-extrabold text-blue-700">
              +<AnimatedCounter value={3000} />{' '}
              <span className="text-base sm:text-xl font-medium text-gray-600">tons</span>
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-blue-600 mt-3 sm:mt-4">Carbon Reduction</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

type AchievementCardProps = {
  readonly icon: React.ReactNode;
  readonly title: string;
};

function AchievementCard({ icon, title }: AchievementCardProps) {
  return (
    <div className="bg-blue-100 rounded-2xl p-5 sm:p-8 shadow-sm flex items-center gap-4 hover:bg-blue-200 transition-all duration-300 h-full">
      <div className="p-3 bg-white rounded-full shadow-md">{icon}</div>
      <h3 className="text-sm sm:text-lg font-semibold text-blue-800 leading-snug">{title}</h3>
    </div>
  );
}
