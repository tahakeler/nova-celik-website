'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Modal from '@/components/ui/Modal';
import AnimatedCounter from '@/components/ui/AnimatedCounters';
import VideoTestimonials from '@/components/ui/VideoTestimonials';
import { references } from '@/data/references';

export default function ReferencesPage() {
  const [selectedReference, setSelectedReference] = useState<typeof references[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (reference: typeof references[0]) => {
    setSelectedReference(reference);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedReference(null);
    setIsModalOpen(false);
  };

  // Extract featured references for carousel (simple horizontal scroll)
  const featuredReferences = references.filter((ref) => ref.featured);

  // Example achievement counters data
  const achievements = [
    { label: 'Projects Completed', value: 120 },
    { label: 'Satisfied Clients', value: 85 },
    { label: 'Awards Won', value: 15 },
  ];

  // Prepare video testimonials data from references with videos
  const videoTestimonialsData = references
    .filter((ref) => ref.caseStudy?.videoUrl)
    .map((ref) => ({
      id: ref.id,
      title: ref.caseStudy?.title || '',
      videoUrl: ref.caseStudy?.videoUrl || '',
      clientName: ref.alt,
    }));

  return (
    <main className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Custom Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-[50vh] min-h-[300px] bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-extrabold mb-4 max-w-4xl"
        >
          Our Valued References
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-3xl text-lg"
        >
          Showcasing client successes across diverse sectors with innovative energy solutions.
        </motion.p>
      </section>

      {/* Achievement Counters */}
      <section className="py-12 bg-white shadow-inner">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {achievements.map(({ label, value }) => (
            <AnimatedCounter key={label} label={label} value={value} />
          ))}
        </div>
      </section>

      {/* Featured References Carousel */}
      <section className="py-16 max-w-7xl mx-auto px-6 overflow-x-auto scrollbar-hide">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Featured References</h2>
        <div className="flex space-x-6">
          {featuredReferences.map(({ id, src, alt }) => (
            <motion.button
              key={id}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.15)' }}
              className="min-w-[200px] bg-white border border-gray-200 rounded-xl p-6 flex items-center justify-center cursor-pointer relative overflow-hidden"
              aria-label={`Reference: ${alt}`}
              type="button"
              onClick={() => openModal(references.find((ref) => ref.id === id)!)}
            >
              <Image
                src={src}
                alt={alt}
                width={140}
                height={80}
                className="object-contain"
                loading="lazy"
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-white text-lg font-semibold rounded-xl pointer-events-none"
              >
                {alt}
              </motion.div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Modal for Case Study */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedReference?.caseStudy?.title}>
        {selectedReference && (
          <div>
            <p className="mb-4">{selectedReference.caseStudy?.description}</p>
            <blockquote className="italic text-gray-700 mb-4">"{selectedReference.caseStudy?.testimonial}"</blockquote>
            {selectedReference.caseStudy?.videoUrl && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={selectedReference.caseStudy.videoUrl}
                  title={selectedReference.caseStudy.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                />
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Video Testimonials Section */}
      <VideoTestimonials testimonials={videoTestimonialsData} />
    </main>
  );
}
