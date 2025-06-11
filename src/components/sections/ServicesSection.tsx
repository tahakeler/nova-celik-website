'use client';

import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
import {
  Lightbulb,
  ThermometerSun,
  Wind,
  BarChart3,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-20 snap-start"
    >
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-7xl mx-auto"
      >
        {/* Heading */}
        <div className="text-left mb-12 sm:mb-14 max-w-4xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            We deliver tailored energy efficiency solutions that drive operational excellence and sustainability across industrial and commercial sectors.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <ServiceCard
            icon={<Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />}
            title="Energy Efficiency Consulting"
            description="Comprehensive assessments and strategies to reduce energy consumption and enhance system performance."
          />
          <ServiceCard
            icon={<ThermometerSun className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />}
            title="HVAC Optimization"
            description="Advanced solutions for heating, ventilation, and air conditioning systems to improve comfort and efficiency."
          />
          <ServiceCard
            icon={<Wind className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />}
            title="Renewable Energy Integration"
            description="Seamless incorporation of renewable energy sources to support sustainable operations."
          />
          <ServiceCard
            icon={<BarChart3 className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />}
            title="Energy Monitoring & Analytics"
            description="Real-time monitoring and analytics to track energy usage and identify opportunities for improvement."
          />
          <ServiceCard
            icon={<Settings className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />}
            title="Industrial Automation"
            description="Implementation of automation technologies to streamline processes and enhance productivity."
          />
          <ServiceCard
            icon={<ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />}
            title="Compliance & Certification"
            description="Assistance with meeting regulatory requirements and obtaining necessary energy certifications."
          />
        </div>
      </motion.div>
    </section>
  );
}

type ServiceCardProps = {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
};

function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <div className="bg-white hover:bg-blue-50 transition-all duration-300 border border-blue-100 rounded-2xl p-6 sm:p-8 flex flex-col items-start h-full shadow-md">
      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
        {icon}
        <h3 className="text-xl sm:text-2xl font-bold text-blue-800">{title}</h3>
      </div>
      <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
