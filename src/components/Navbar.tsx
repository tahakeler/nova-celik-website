'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#1e40af]/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'
      }`}
    >
      <div
        className={`max-w-[1800px] mx-auto px-12 xl:px-20 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-[80px]' : 'h-[110px]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center transition-all duration-300">
          <Image
            src="/images/logo-white.svg"
            alt="NovaCelik Logo"
            width={200}
            height={56}
            className={`object-contain transition-all duration-300 ${
              isScrolled ? 'h-[60px]' : 'h-[90px]'
            }`}
            priority
          />
        </Link>

        {/* Navigation */}
        <nav
          className={`hidden lg:flex gap-20 text-white font-bold tracking-widest transition-all duration-300 ${
            isScrolled ? 'text-[18px] gap-20' : 'text-[21px] gap-20'
          }`}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-all duration-200 hover:text-[#25691b]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Request Demo Button */}
        <div className="hidden lg:flex">
          <Link href="/request-demo">
            <button
              className={`bg-[#42b431] hover:bg-[#25691b] text-white transition-all duration-300 rounded-xl ${
                isScrolled
                  ? 'text-[16px] px-4 py-2'
                  : 'text-[21px] px-5 py-2.5'
              }`}
            >
              Request Demo
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}
