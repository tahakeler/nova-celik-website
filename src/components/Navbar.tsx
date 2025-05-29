'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu } from 'lucide-react'; // hamburger icon
import { Dialog } from '@headlessui/react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Blog', href: '/blog' },           // <-- Blog link added here
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        className={`max-w-[1800px] mx-auto px-4 sm:px-10 lg:px-20 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'h-[80px]' : 'h-[100px]'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo-white.svg"
            alt="NovaCelik Logo"
            width={160}
            height={48}
            className={`object-contain transition-all duration-300 ${
              isScrolled ? 'h-[50px]' : 'h-[70px]'
            }`}
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className={`hidden lg:flex gap-20 text-white font-medium transition-all duration-300 ${
            isScrolled ? 'text-[16px]' : 'text-[18px]'
          }`}
        >
          {NAV_ITEMS.map((item) =>
            item.href.startsWith('/')
              ? (
                <Link
                  key={item.href}
                  href={item.href}
                  className="transition-all duration-200 hover:text-[#42b431]"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  className="transition-all duration-200 hover:text-[#42b431]"
                >
                  {item.label}
                </a>
              )
          )}
        </nav>

        {/* Right-side Icons (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-10">
          <Link href="https://www.linkedin.com/company/novacelik" target="_blank">
            <Image
              src="/images/linkedin-white.svg"
              alt="LinkedIn"
              width={30}
              height={30}
              className="text-white"
            />
          </Link>
          <Link href="/request-demo">
            <button
              className={`bg-[#42b431] hover:bg-[#25691b] text-white font-semibold rounded-xl transition-all duration-300 ${
                isScrolled ? 'text-sm px-4 py-2' : 'text-base px-5 py-2.5'
              }`}
            >
              Request Demo
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden text-white p-2"
          title="Open navigation menu"
          aria-label="Open navigation menu"
        >
          <Menu size={28} />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <Dialog
        open={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        className="lg:hidden"
      >
        <div className="fixed inset-0 bg-black/80 z-50" />
        <div className="fixed right-0 top-0 w-72 h-full bg-white z-50 shadow-lg p-6">
          <button
            className="absolute top-4 right-4 text-gray-500"
            onClick={() => setMobileMenuOpen(false)}
            title="Close menu"
          >
            ✕
          </button>
          <nav className="mt-12 space-y-6">
            {NAV_ITEMS.map((item) =>
              item.href.startsWith('/')
                ? (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block text-gray-800 text-lg font-semibold hover:text-[#1e40af]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-gray-800 text-lg font-semibold hover:text-[#1e40af]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
            )}
            <Link href="/request-demo">
              <button className="mt-4 w-full bg-[#42b431] text-white font-semibold py-2 rounded-lg">
                Request Demo
              </button>
            </Link>
            <Link href="https://www.linkedin.com/company/novacelik" target="_blank" className="block mt-6">
              <Image
                src="/images/linkedin-white.svg"
                alt="LinkedIn"
                width={30}
                height={30}
              />
            </Link>
          </nav>
        </div>
      </Dialog>
    </header>
  );
}
