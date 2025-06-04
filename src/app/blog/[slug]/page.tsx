import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { blogPosts, generateBlogPostId, getBlogPostById } from '@/data/blog';

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return blogPosts.map((post, index) => ({
    slug: generateBlogPostId(post, index),
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getBlogPostById(params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [post.image],
    },
  };
}

export const revalidate = 60 * 60; // revalidate every hour

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostById(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-white text-gray-900 px-4 sm:px-6 py-12">
      <article className="max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold mb-6">{post.title}</h1>
        <Image
          src={post.image ?? '/images/blog/default.jpg'}
          alt={post.title}
          width={800}
          height={450}
          className="w-full h-auto rounded-xl mb-8"
          priority
        />
        <p className="text-lg mb-8 leading-relaxed">{post.summary}</p>
        <Link
          href={post.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
        >
          Read Original Article
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </article>
    </main>
  );
}
