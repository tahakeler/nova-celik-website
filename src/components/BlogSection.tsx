'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { scrollFade } from '@/utils/animations';

export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 3;

  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = currentPage * postsPerPage;
  const visiblePosts = blogPosts.slice(startIndex, startIndex + postsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const sectionRef = useRef(null);

  return (
    <section
      id="blog"
      ref={sectionRef}
      className="bg-gray-50 text-gray-900 px-6 py-28 flex items-center justify-center"
    >
      <motion.section
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-7xl"
    >
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="mb-12">
          <h2 className="text-5xl font-bold text-left">
            <span className="text-blue-700">Our</span> Blog
          </h2>
          <p className="text-gray-600 text-left mt-2">
            Stay Updated on Energy Efficiency Across All Sectors
          </p>
        </div>

        <div className="relative flex items-center">
          <button
            title="Previous"
            onClick={handlePrev}
            className="absolute -left-16 z-10 w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
            >
              {visiblePosts.map((post, index) => (
                <div
                  key={`${post.title}-${index}`}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between h-[420px]"
                >
                  <div>
                    <div className="w-full h-40 relative mb-4 rounded overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        layout="fill"
                        objectFit="cover"
                        className="rounded"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                    <p className="text-sm text-gray-700 mb-4 line-clamp-4">
                      {post.summary}
                    </p>
                  </div>
                  <Link
                    href={post.link}
                    target="_blank"
                    className="inline-block text-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-md transition no-underline"
                  >
                    Read More
                  </Link>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          <button
            title="Next"
            onClick={handleNext}
            className="absolute -right-16 z-10 w-10 h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.section>
    </section>
  );
}
