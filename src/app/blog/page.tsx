'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { blogPosts, BlogPost, generateBlogPostId } from '@/data/blog';

type BlogPostWithSlug = BlogPost & { slug: string };

const POSTS_INITIAL = 6;

export default function BlogPage() {
  const postsWithSlug: BlogPostWithSlug[] = blogPosts.map((p, idx) => ({
    ...p,
    slug: generateBlogPostId(p, idx),
  }));
  const [featured, ...restPosts] = postsWithSlug.slice(0, 19);
  const [showAll, setShowAll] = useState(false);
  const visiblePosts = showAll ? restPosts : restPosts.slice(0, POSTS_INITIAL);

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* --- FEATURED HERO WITH BACKGROUND IMAGE --- */}
      <section className="relative w-full flex items-center justify-center min-h-[480px] md:min-h-[640px]">
        {/* Background Image (fills section) */}
        <Image
          src={featured.image ?? '/images/blog/default.jpg'}
          alt={featured.title}
          fill
          className="object-cover object-center w-full h-full z-0"
          priority
          unoptimized
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-0" />
        {/* Featured Content Box */}
        <div className="relative z-10 flex flex-col items-start max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl px-8 py-10 mt-24 mb-16 md:mt-32 md:mb-20 border border-gray-200">
          {featured.tags?.[0] && (
            <span className="mb-5 px-5 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800 border border-green-500">
              {featured.tags[0]}
            </span>
          )}
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 leading-tight drop-shadow">
            {featured.title}
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl drop-shadow">
            {featured.summary}
          </p>
          <Link
            href={`/blog/${featured.slug}`}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-7 py-3 rounded-full text-base font-semibold hover:bg-green-700 transition"
          >
            Continue Reading
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <span className="mb-4 px-6 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 select-none block w-fit mx-auto">
          Latest News
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-center text-gray-900">
          Latest Blog & News
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 text-center max-w-2xl mx-auto mb-12">
          Explore insights and trends in energy management, sustainability, and smart building solutions.
        </p>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {visiblePosts.map((post: BlogPostWithSlug, idx: number) => (
            <div
              key={post.slug}
              className="group relative flex flex-col bg-white rounded-[28px] hover:border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              style={{ minHeight: 420 }}
            >
                <div className="relative h-48 w-full overflow-hidden rounded-[28px]">
                <Image
                  src={post.image ?? '/images/blog/default.jpg'}
                  alt={post.title}
                  fill
                  unoptimized
                  className="object-cover transition-all duration-300 group-hover:scale-105 rounded-[28px]"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  priority={idx < 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-[28px]" />
                <div className="absolute top-3 left-3 z-10">
                  <Image
                    src="/images/logo-white.svg"
                    alt="NovaCelik Logo"
                    width={96}
                    height={32}
                    className="opacity-100"
                  />
                </div>
              </div>
              <div className="flex flex-col flex-1 p-6">
                {post.tags?.length > 0 && (
                  <span className="mb-3 px-4 py-1 rounded-full text-xs font-semibold border border-green-600 text-green-700 bg-green-50 w-fit select-none">
                    {post.tags[0]}
                  </span>
                )}
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 group-hover:text-[#25691b] transition line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mb-5 line-clamp-2">
                  {post.summary}
                </p>
                <div className="flex gap-2 flex-wrap mb-4">
                  {(post.tags ?? []).slice(1).map((tag: string, j: number) => (
                    <span
                      key={tag + j}
                      className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium border border-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex-1" />
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-fit mt-2 inline-flex items-center gap-2 rounded-full bg-green-600 text-white font-semibold px-6 py-2.5 shadow-sm transition hover:bg-green-700 group-hover:translate-x-2 duration-200"
                >
                  Read More
                  <svg className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {!showAll && restPosts.length > POSTS_INITIAL && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full text-base font-semibold hover:bg-gray-900 transition"
            >
              Show More Blog Posts
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
