'use client';

import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
import { Eye, Leaf, Factory, BadgePercent } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
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
        {/* Heading */}
        <div className="text-left mb-14 max-w-4xl">
          <h2 className="text-5xl font-extrabold mb-6">
            About <span className="text-blue-600">NovaCelik</span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed">
            Thailand&apos;s first process-oriented energy efficiency company, delivering scalable solutions
            for industrial facilities, commercial buildings, and infrastructure systems.
          </p>
        </div>

        {/* Paragraphs with justification */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 max-w-6xl">
          <div className="text-lg text-gray-800 leading-relaxed text-justify space-y-6">
            <p>
              <strong>NovaCelik</strong> helps reduce energy costs without sacrificing production quality or comfort.
              Our engineering-first approach delivers measurable efficiency improvements across manufacturing,
              commercial, and infrastructure sectors.
            </p>
            <p>
              We focus on technical precision, sustainable engineering, and strategic outcomes — giving businesses a smarter way
              to manage energy and performance.
            </p>
          </div>

          <div className="text-lg text-gray-800 leading-relaxed text-justify space-y-6">
            <p>
              Whether you&apos;re upgrading legacy systems or designing new infrastructure, we combine field-tested expertise
              with cutting-edge innovation to deliver lasting value.
            </p>
            <p>
              Looking to boost system reliability, lower operational costs, or future-proof your facility? NovaCelik is your
              partner in industrial energy transformation.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Eye className="w-10 h-10 text-blue-600" />}
            title="Vision"
            description="Efficient energy, sustainability, and innovation — shaping the future of industrial systems."
          />
          <FeatureCard
            icon={<Leaf className="w-10 h-10 text-blue-600" />}
            title="Mission"
            description="To enable sustainable, livable industry through tailored, data-driven energy strategies."
          />
          <FeatureCard
            icon={<Factory className="w-10 h-10 text-blue-600" />}
            title="Sustainable Facilities"
            description="We build energy-intelligent factories, plants, and facilities that meet tomorrow&apos;s standards."
          />
          <FeatureCard
            icon={<BadgePercent className="w-10 h-10 text-blue-600" />}
            title="Reduce Energy Cost"
            description="Optimize operations without sacrificing comfort, performance, or safety."
          />
        </div>
      </motion.div>
    </section>
  );
}

type FeatureCardProps = {
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-blue-100 hover:bg-blue-200 transition-all duration-300 border border-blue-100 rounded-2xl p-8 flex flex-col items-start h-full shadow-sm">
      <div className="flex items-center gap-4 mb-4">
        {icon}
        <h3 className="text-2xl font-bold text-blue-800">{title}</h3>
      </div>
      <p className="text-lg text-gray-700 leading-relaxed">{description}</p>
    </div>
  );
}
