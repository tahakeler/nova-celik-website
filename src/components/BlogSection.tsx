'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { scrollFade } from '@/utils/animations';

export default function BlogSection() {
  // Show only the latest 3 blog posts on homepage
  const latestPosts = blogPosts.slice(0, 3);

  return (
    <section
      id="blog"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-20 sm:py-28 flex flex-col items-center w-full"
    >
      <motion.section
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        exit="exit"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-screen-xl mx-auto"
      >
        {/* Heading */}
        <div className="mb-12 px-2 sm:px-0 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold">
            <span className="text-blue-700">Our</span> Blog
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Stay Updated on Energy Efficiency Across All Sectors
          </p>
        </div>

        {/* Blog cards grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 place-items-center">
          {latestPosts.map((post, idx) => (
            <BlogImageCard key={post.link} post={post} index={idx} />
          ))}
        </div>

        {/* Read More Button */}
        <div className="w-full flex justify-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white text-base font-semibold shadow-md transition"
          >
            View All Blog Posts
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </motion.section>
    </section>
  );
}

function BlogImageCard({
  post,
  index,
}: {
  readonly post: (typeof blogPosts)[0];
  readonly index: number;
}) {
  // Use a fallback slug, e.g., based on post.link or index
  const slug = post.link || index.toString();
  return (
    <div className="
      group relative w-full 
      max-w-[620px] 
      aspect-[3/1] 
      min-h-[260px] 
      md:min-h-[320px] 
      rounded-3xl overflow-hidden shadow-2xl transition-all duration-200
    ">
      {/* Blog Image */}
      <Image
        src={post.image}
        alt={post.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        priority
      />
      {/* Logo overlay */}
      <div className="absolute top-5 left-5 z-20">
        <Image
          src="/images/logo-white.svg"
          alt="NovaCelik Logo"
          width={90}
          height={34}
          className="opacity-90 drop-shadow"
        />
      </div>
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      <div className="
        absolute bottom-0 left-0 right-0 z-20
        flex flex-col items-start gap-2 px-10 pb-10 pt-12
        opacity-0 group-hover:opacity-100
        translate-y-8 group-hover:translate-y-0
        transition-all duration-300
      ">
        <h3 className="text-2xl font-bold text-white drop-shadow mb-3">
          {post.title}
        </h3>
        <Link
          href={`/blog/${slug}`}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-700 hover:bg-blue-800 text-white font-semibold text-lg shadow transition"
        >
          Read More
          <svg className="w-6 h-6 ml-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
