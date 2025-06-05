'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1e40af]/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-20 flex items-center justify-between transition-all duration-300 h-[80px]">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/svgs/logo-white.svg"
            alt="NovaCelik Logo"
            width={160}
            height={48}
            className="object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-10 text-white font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-all duration-200 hover:text-[#42b431]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right-side Icons */}
        <div className="hidden lg:flex items-center gap-6">
          <Link href="https://www.linkedin.com/company/novacelik" target="_blank" rel="noopener noreferrer">
            <Image src="/svgs/linkedin-white.svg" alt="LinkedIn" width={28} height={28} />
          </Link>
          <Link href="/request-demo">
            <button className="bg-[#42b431] hover:bg-[#25691b] text-white font-semibold rounded-xl text-base px-5 py-2.5">
              Request Demo
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={28} />
        </button>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/60 z-[9999] flex">
            <nav className="w-72 bg-white h-full p-6 flex flex-col gap-6 relative">
              <button
                className="absolute top-5 right-5"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={32} className="text-gray-700" />
              </button>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-800 text-lg font-semibold py-2 rounded hover:bg-blue-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/request-demo">
                <button className="mt-8 w-full bg-[#42b431] text-white font-semibold py-2 rounded-lg">
                  Request Demo
                </button>
              </Link>
              <Link href="https://www.linkedin.com/company/novacelik" target="_blank" className="mt-4 inline-flex items-center gap-2">
                <Image src="/svgs/linkedin-white.svg" alt="LinkedIn" width={28} height={28} />
                <span className="text-gray-800">LinkedIn</span>
              </Link>
            </nav>
            <button
              className="flex-1"
              onClick={() => setMobileMenuOpen(false)}
              onKeyDown={(e) => e.key === 'Enter' && setMobileMenuOpen(false)}
              aria-label="Close mobile menu overlay"
            />
          </div>
        )}
      </div>
    </header>
  );
}
