'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { scrollFade } from '@/utils/animations';

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'NovaCelik helped us cut energy costs by 25% while simplifying our monitoring process.',
    name: 'Supansa Ruangdet',
    role: 'Sustainability Manager',
  },
  {
    quote:
      'The analytics dashboard provides invaluable insights that drive our facility optimizations.',
    name: 'Chaiwat Somchai',
    role: 'Plant Director',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[linear-gradient(to_bottom,#f5f7fa,#ffffff)] py-16 px-4 sm:px-6 lg:px-16">
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto w-full max-w-5xl text-center space-y-10"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-800">Testimonials</h2>
        <div className="grid gap-8 sm:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm text-left hover:shadow-md transition"
            >
              <Quote className="mb-3 h-6 w-6 text-blue-600" />
              <blockquote className="text-gray-700 italic">{t.quote}</blockquote>
              <figcaption className="mt-4 font-semibold text-blue-800">
                {t.name}
                <span className="block text-sm font-normal text-gray-600">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
