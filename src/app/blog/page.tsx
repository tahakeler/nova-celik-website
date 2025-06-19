'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { blogPosts } from '@/modules/blog/data';
import { Award, Zap, BarChart3 } from 'lucide-react';

const POSTS_BATCH_SIZE = 6;

function Sparkline({ data }: { readonly data: readonly number[] }) {
  if (!data?.length) return null;
  const w = 60, h = 16;
  const max = Math.max(...data), min = Math.min(...data);
  const points = data.map((v, i) =>
    `${(i * w) / (data.length - 1)},${h - ((v - min) / (max - min || 1)) * h}`
  ).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block align-middle mx-1">
      <polyline fill="none" stroke="#1d4ed8" strokeWidth="2" points={points} />
    </svg>
  );
}

function AuthorAvatar({ name }: { readonly name: string }) {
  const hash = name
    ? Array.from(name)
        .reduce((acc, c) => acc + c.charCodeAt(0), 0)
        .toString(16)
    : 'ccc';
  const color = `#${hash.slice(-6).padEnd(6, 'a')}`;
  return (
    <span className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow"
      style={{ backgroundColor: color }}>
      {name?.[0] || '?'}
    </span>
  );
}

export default function BlogPage() {
  // Infinite scroll setup
  const [postsToShow, setPostsToShow] = useState(POSTS_BATCH_SIZE);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) setPostsToShow(s => Math.min(blogPosts.length, s + POSTS_BATCH_SIZE));
      },
      { threshold: 0.9 }
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, []);

  // Tag filter
  const [tagFilter, setTagFilter] = useState<string | null>(null);
  const filtered = tagFilter
    ? blogPosts.filter(p => p.tags?.includes(tagFilter))
    : blogPosts;

  // Hero: use first post for highlight
  const featured = filtered[0];

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* HERO */}
      {featured && (
        <section className="relative w-full flex items-center justify-center min-h-[480px] md:min-h-[640px]">
          <Image
            src={featured.image ?? '/images/blog/default.jpg'}
            alt={featured.title}
            fill
            className="object-cover w-full h-full z-0"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60 z-0" />
          <div className="relative z-10 flex flex-col items-start max-w-2xl mx-auto bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl px-10 py-12 mt-24 mb-16 md:mt-32 md:mb-20 border border-gray-200">
            <div className="flex gap-3 items-center mb-3">
              {featured.isEditorsPick && (
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-900 font-bold px-4 py-1 rounded-full text-xs">
                  <Award className="w-4 h-4" /> Editor’s Choice
                </span>
              )}
              {featured.tags?.[0] && (
                <span className="px-4 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-500">
                  {featured.tags[0]}
                </span>
              )}
              {featured.insight && (
                <span className="flex items-center gap-1 bg-blue-50 text-blue-800 font-semibold px-3 py-1 rounded-full text-xs">
                  <Zap className="w-4 h-4" /> {featured.insight}
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-5 text-gray-900 leading-tight drop-shadow">
              {featured.title}
            </h2>
            <p className="text-lg text-gray-700 mb-7 max-w-2xl drop-shadow">
              {featured.summary}
            </p>
            <Link
                href={featured.link}
                target="_blank"
                rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-blue-700 text-white px-7 py-3 rounded-full text-base font-semibold hover:bg-blue-800 transition"
            >
              Continue Reading
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}
      {/* Tag filter and stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-10">
        <div className="mb-8 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 rounded-full font-bold text-sm">
            <BarChart3 className="w-5 h-5" /> Energy Blog — {filtered.length} posts
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(blogPosts.flatMap(p => p.tags || []))).map(tag => (
              <button
                key={tag}
                onClick={() => setTagFilter(tagFilter === tag ? null : tag)}
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${tagFilter === tag ? 'bg-blue-700 text-white border-blue-700' : 'bg-gray-100 text-gray-700 border-gray-200'} transition`}
              >
                {tag}
              </button>
            ))}
            {tagFilter && (
              <button onClick={() => setTagFilter(null)} className="text-xs px-2 py-1 rounded-full ml-2 bg-red-50 text-red-600 border border-red-200">Clear</button>
            )}
          </div>
        </div>
        {/* Blog cards, infinite scroll */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, postsToShow).map((post, idx) => (
            <article key={`${post.slug}-${idx}`} className="group relative flex flex-col bg-white rounded-[28px] hover:border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2" style={{ minHeight: 420 }}>
              {/* Blog Card Image */}
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
              </div>
              <div className="flex flex-col flex-1 p-6">
                {/* Editorial/Insight badge, mini-chart, and avatar */}
                <div className="flex items-center gap-2 mb-3">
                  {post.isEditorsPick && (
                    <span className="flex items-center gap-1 bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs animate-pulse">
                      <Award className="w-3 h-3" /> Editor’s Choice
                    </span>
                  )}
                  {post.insight && (
                    <span className="flex items-center gap-1 bg-blue-50 text-blue-800 font-semibold px-2 py-1 rounded-full text-xs">
                      <Zap className="w-3 h-3" /> {post.insight}
                    </span>
                  )}
                  {post.previewChart && <Sparkline data={post.previewChart} />}
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="font-bold text-lg sm:text-xl mb-2 text-gray-900 group-hover:text-blue-700 transition line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.summary}</p>
                {/* Tag chips */}
                <div className="flex gap-2 flex-wrap mb-2">
                  {(post.tags ?? []).map((tag: string, j: number) => (
                    <span key={tag + j} className="px-3 py-1 text-xs rounded-full bg-gray-100 text-blue-700 font-medium border border-blue-200">{tag}</span>
                  ))}
                </div>
                {/* Author */}
                <div className="flex items-center gap-2 mb-3">
                  <AuthorAvatar name={post.author ?? 'N'} />
                  <span className="font-semibold text-xs text-gray-800">{post.author || "Staff"}</span>
                  <span className="text-xs text-gray-400 ml-2">{post.authorRole || "Staff Writer"}</span>
                  <span className="ml-auto text-xs text-gray-400">{post.date}</span>
                </div>
                <div className="flex-1" />
                <Link
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit mt-2 inline-flex items-center gap-2 rounded-full bg-blue-700 text-white font-semibold px-6 py-2.5 shadow-sm transition hover:bg-blue-800 group-hover:translate-x-2 duration-200"
                >
                  Read Full Insight
                  <svg className="w-5 h-5 ml-1 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>
        {/* Infinite scroll sentinel */}
        {postsToShow < filtered.length && (
          <div ref={observerRef} className="h-16 flex items-center justify-center text-gray-400">
            Loading more posts...
          </div>
        )}
      </section>
    </main>
  );
}
