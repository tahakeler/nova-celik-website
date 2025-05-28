'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { scrollFade } from '@/utils/animations';

export default function BlogSection() {
  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev === Math.ceil(blogPosts.length / visibleCount) - 1 ? 0 : prev + 1));
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
  }, [visibleCount]);

  const totalPages = Math.ceil(blogPosts.length / visibleCount);
  const maxIndex = totalPages - 1;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const shiftPercentage = 100 / visibleCount;
  const translateX = `-${currentIndex * shiftPercentage}%`;

  return (
    <section
      id="blog"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-20 sm:py-28 flex items-center justify-center w-full"
    >
      <motion.section
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-screen-xl"
      >
        <div className="w-full mx-auto">
          {/* Heading */}
          <div className="mb-10 sm:mb-12 px-2 sm:px-0">
            <h2 className="text-3xl sm:text-5xl font-bold text-left">
              <span className="text-blue-700">Our</span> Blog
            </h2>
            <p className="text-gray-600 text-left mt-2 text-sm sm:text-base">
              Stay Updated on Energy Efficiency Across All Sectors
            </p>
          </div>

          {/* Carousel */}
          <div className="relative w-full">
            {/* Prev Button */}
            <button
              title="Previous"
              onClick={handlePrev}
              className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition z-20"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Track */}
            <div className="overflow-hidden w-full">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(${translateX})` }}
              >
                {blogPosts.map((post) => (
                  <div
                    key={post.link}
                    className="w-full sm:w-1/2 lg:w-1/3 px-2 shrink-0 box-border"
                  >
                    <BlogCard post={post} />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Next Button */}
            <button
              title="Next"
              onClick={handleNext}
              className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-blue-700 text-white flex items-center justify-center hover:bg-blue-800 transition z-20"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </motion.section>
    </section>
  );
}

function BlogCard({ post }: { readonly post: (typeof blogPosts)[0] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 flex flex-col justify-between h-[420px]">
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
        <h3 className="text-base sm:text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-sm text-gray-700 mb-4 line-clamp-4">{post.summary}</p>
      </div>
      <Link
        href={post.link}
        target="_blank"
        className="inline-block text-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2 px-4 rounded-md transition no-underline"
      >
        Read More
      </Link>
    </div>
  );
}
