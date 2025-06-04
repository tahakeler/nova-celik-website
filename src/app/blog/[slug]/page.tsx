import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import { Award, Zap, ExternalLink } from 'lucide-react';

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | NovaCelik Blog`,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [{ url: post.image, alt: post.title }],
      type: 'article',
      url: `https://novacelik.com/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: [{ url: post.image, alt: post.title }],
    }
  };
}

function AuthorAvatar({ name, alt }: { name: string; alt: string }) {
  const hash = name
    ? Array.from(name).reduce((acc, c) => acc + c.charCodeAt(0), 0).toString(16)
    : 'ccc';
  const color = `#${hash.slice(-6).padEnd(6, 'a')}`;
  return (
    <span
      className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs shadow border border-white"
      style={{ backgroundColor: color }}
      aria-label={alt}
      title={alt}
    >
      {name?.[0] || '?'}
    </span>
  );
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="min-h-screen bg-gray-50">
      <div className="relative w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          unoptimized
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" aria-hidden="true" />
      </div>

      <div className="relative max-w-2xl mx-auto -mt-24 sm:-mt-32 z-10">
        <div className="bg-white rounded-3xl shadow-2xl px-6 sm:px-10 py-10 sm:py-14 flex flex-col items-start">
          <div className="flex gap-2 mb-3 flex-wrap">
            {post.isEditorsPick && (
              <span className="flex items-center gap-1 bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-full text-xs">
                <Award className="w-3 h-3" /> Editor’s Choice
              </span>
            )}
            {post.insight && (
              <span className="flex items-center gap-1 bg-blue-50 text-blue-800 font-semibold px-2 py-1 rounded-full text-xs">
                <Zap className="w-3 h-3" /> {post.insight}
              </span>
            )}
            {post.tags?.map((tag) => (
              <span key={tag} className="bg-gray-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
            ))}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">{post.title}</h1>
          <p className="text-gray-700 text-base mb-6">{post.summary}</p>
          <div className="flex items-center gap-3 text-xs text-gray-600 mb-6">
            <AuthorAvatar name={post.author} alt={`Author: ${post.author}`} />
            <span className="font-semibold text-gray-900">{post.author}</span>
            <span className="text-gray-500 ml-2">{post.authorRole}</span>
            <span className="ml-auto">{post.date}</span>
          </div>
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-700 text-white px-7 py-3 rounded-full text-base font-semibold shadow hover:bg-blue-800 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
            aria-label={`Read the original article on ${post.author}`}
          >
            Continue Reading <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      <section className="max-w-2xl mx-auto mt-14 px-4 sm:px-0 pb-16">
        <div className="prose prose-lg max-w-none text-gray-800">
          <h2 className="mt-8 text-2xl font-bold text-gray-900">Industry Insights & Analysis</h2>
          <p>
            This section provides further analysis, trends, or background relevant to the article. NovaCelik’s editorial team reviews each story to highlight actionable intelligence and energy efficiency strategies.
          </p>
          <blockquote className="border-l-4 border-blue-700 pl-4 italic text-blue-900 my-6">
            “Transform your facility’s energy future with real-time insight.”
          </blockquote>
        </div>
        <div className="flex mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-gray-100 text-blue-700 px-6 py-3 rounded-full text-base font-semibold hover:bg-blue-50 border border-blue-100 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-700"
            aria-label="Back to blog index"
          >
            ← Back to Blog
          </Link>
        </div>
        <footer className="flex flex-col sm:flex-row justify-between items-center border-t pt-8 mt-10 text-sm text-gray-500 gap-2">
          <span>Published: <time dateTime={post.date}>{post.date}</time></span>
          <span>© {new Date().getFullYear()} NovaCelik</span>
        </footer>
      </section>
    </article>
  );
}
