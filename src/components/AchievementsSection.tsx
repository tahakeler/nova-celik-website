'use client';

import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
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
      className="bg-gray-50 text-gray-900 px-6 py-28 flex items-center justify-center"
    >
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-7xl"
        >
        {/* Heading and Description */}
        <div className="text-left mb-16 max-w-4xl">
          <h2 className="text-5xl font-extrabold mb-6">
            Our <span className="text-blue-600">Achievements</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We provide end-to-end energy efficiency solutions for industrial sectors using diverse energy sources.
            Our strategic analysis methods help enterprises reduce energy costs per product or operational hour,
            cut carbon emissions, and reach sustainability targets.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AchievementCard icon={<Users className="w-8 h-8 text-blue-600" />} title="Specialized Engineering Team" />
          <AchievementCard icon={<Globe2 className="w-8 h-8 text-blue-600" />} title="International Partners" />
          <AchievementCard icon={<ClipboardList className="w-8 h-8 text-blue-600" />} title="Project Efficiency Practices" />
          <AchievementCard icon={<Leaf className="w-8 h-8 text-blue-600" />} title="Eco-Friendly Technologies" />
          <AchievementCard icon={<ShieldCheck className="w-8 h-8 text-blue-600" />} title="15+ Energy Audits Completed" />
          <AchievementCard icon={<ActivitySquare className="w-8 h-8 text-blue-600" />} title="Energy Monitoring & Management" />
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto text-center">
            <div>
                <div className="text-5xl font-extrabold text-blue-700">
                +15 <span className="text-xl font-medium text-gray-600">million THB</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600 mt-4">Energy Saving</div>
            </div>
            <div>
                <div className="text-5xl font-extrabold text-blue-700">
                +3,000 <span className="text-xl font-medium text-gray-600">tons</span>
                </div>
                <div className="text-2xl font-semibold text-blue-600 mt-4">Carbon Reduction</div>
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
    <div className="bg-blue-100 rounded-2xl p-8 shadow-sm flex items-center gap-5 hover:bg-blue-200 transition-all duration-300 h-full">
      <div className="p-3 bg-white rounded-full shadow-md">{icon}</div>
      <h3 className="text-lg font-semibold text-blue-800 leading-snug">{title}</h3>
    </div>
  );
}
