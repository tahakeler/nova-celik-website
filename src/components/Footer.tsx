"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="bg-blue-600 text-white py-8 text-center text-sm"
    >
      <div className="flex justify-center gap-8 mb-6">
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/novacelik"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-110"
          aria-label="LinkedIn"
        >
          <Image
            src="/images/linkedin.svg"
            alt="LinkedIn"
            width={32}
            height={32}
            className="mx-auto filter-white hover:filter-none hover:brightness-100 hover:invert-0"
            style={{ filter: "invert(1)", transition: "filter 0.3s" }}
          />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/novacelik"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform transform hover:scale-110"
          aria-label="Instagram"
        >
          <Image
            src="/images/instagram.svg"
            alt="Instagram"
            width={32}
            height={32}
            className="mx-auto"
            style={{ filter: "invert(1)", transition: "filter 0.3s", }}
            onMouseOver={(e) => e.currentTarget.style.filter = "none"}
            onMouseOut={(e) => e.currentTarget.style.filter = "invert(1)"}
          />
        </a>

        {/* Email */}
        <a
          href="mailto:info@novacelikco.com"
          className="transition-transform transform hover:scale-110"
          aria-label="Email"
        >
          <Image
            src="/images/mail.svg"
            alt="Email"
            width={32}
            height={32}
            className="mx-auto"
            style={{ filter: "invert(1)", transition: "filter 0.3s", }}
            onMouseOver={(e) => e.currentTarget.style.filter = "none"}
            onMouseOut={(e) => e.currentTarget.style.filter = "invert(1)"}
          />
        </a>
      </div>
      <p className="text-white">&copy; {new Date().getFullYear()} Nova Celik. All rights reserved.</p>
    </motion.footer>
  );
}
