'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-[#0f172a] text-white pt-16 pb-10 px-6 md:px-12 lg:px-20 text-sm mt-20"
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 text-left">
        {/* Logo + Description */}
        <div className="col-span-1">
          <Image src="/svgs/logo-white.svg" alt="NovaCelik" width={140} height={32} className="mb-4" />
          <p className="text-gray-400 leading-relaxed max-w-sm text-base">
            NovaCelik delivers intelligent energy efficiency and monitoring solutions to help industrial
            and commercial facilities reduce energy waste, improve sustainability, and optimize systems.
          </p>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Company</h4>
          <ul className="space-y-2 text-white text-base">
            <li><Link href="#about" className="hover:text-gray-300">About Us</Link></li>
            <li><Link href="#blog" className="hover:text-gray-300">Blog</Link></li>
            <li><Link href="#contact" className="hover:text-gray-300">Contact Us</Link></li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Solutions</h4>
          <ul className="space-y-2 text-white text-base">
            <li>Energy Monitoring</li>
            <li>System Optimization</li>
            <li>Sustainability Reporting</li>
            <li>Efficiency Academy</li>
          </ul>
        </div>

        {/* Industries */}
        <div>
          <h4 className="font-semibold mb-3 text-lg">Industries</h4>
          <ul className="space-y-2 text-white text-base">
            <li>Factories</li>
            <li>Hospitals</li>
            <li>Universities</li>
            <li>Energy Plants</li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="mt-10 border-t border-gray-700 pt-6">
        <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} NovaCelik | Energy Optimization Platform
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <a
              href="https://www.linkedin.com/company/novacelik"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Image
                src="/svgs/linkedin-white.svg"
                alt="LinkedIn"
                width={30}
                height={30}
                className="hover:opacity-80 transition"
              />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
