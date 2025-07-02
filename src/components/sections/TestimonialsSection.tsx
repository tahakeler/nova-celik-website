'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

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
  {
    quote:
      'Their team\'s expertise in energy solutions transformed our operations and boosted efficiency.',
    name: 'Niran Phanich',
    role: 'Operations Manager',
  },
  {
    quote:
      'Reliable, innovative, and customer-focused – NovaCelik is our trusted partner.',
    name: 'Kanya Srisuk',
    role: 'Facility Engineer',
  },
  {
    quote:
      'The automation solutions provided have significantly reduced our downtime and costs.',
    name: 'Wichai Thongchai',
    role: 'Production Supervisor',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-primary-50 py-24 px-4 sm:px-6 lg:px-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-primary-900 mb-12">What Our Clients Say</h2>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={false}
          navigation={false}
          loop={true}
          className="w-full testimonials-swiper"
        >
          {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.name}>
              <figure className="bg-white rounded-3xl p-8 text-left">
                <Quote className="mb-6 h-10 w-10 text-primary-600" />
                <blockquote className="text-gray-900 italic text-xl font-semibold leading-relaxed mb-8">{t.quote}</blockquote>
                <figcaption className="mt-6 font-semibold text-primary-900 text-xl">
                  {t.name}
                  <span className="block text-sm font-normal text-gray-600 mt-1">{t.role}</span>
                </figcaption>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
