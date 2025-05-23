"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu,
  X,
  Info,
  Hammer,
  Building2,
  LayoutDashboard,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "About", href: "#about", icon: <Info size={18} /> },
  { label: "Services", href: "#services", icon: <Hammer size={18} /> },
  { label: "References", href: "#references", icon: <Building2 size={18} /> },
  { label: "Dashboard", href: "#dashboard", icon: <LayoutDashboard size={18} /> },
  { label: "Contact", href: "#contact", icon: <Phone size={18} /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm"
      animate={{
        paddingTop: isScrolled ? 4 : 12,
        paddingBottom: isScrolled ? 4 : 12,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 h-[56px] relative">
        <motion.div
          initial={false}
          animate={{
            x: open ? -40 : 0,
            opacity: open ? 0 : 1,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="z-50"
        >
          <motion.button
            onClick={() => setOpen(true)}
            aria-label="Open Menu"
            className="text-black"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <Menu size={22} />
          </motion.button>
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          animate={{
            width: isScrolled ? 300 : 480,
            height: isScrolled ? 100 : 160,
          }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" aria-label="Home">
            <Image
              src="/images/logo.svg"
              alt="Nova Celik Logo"
              fill
              className="object-contain"
            />
          </Link>
        </motion.div>

        <div className="w-[22px]" />

        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black z-40"
                onClick={() => setOpen(false)}
              />

              <motion.div
                key="drawer"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="fixed top-0 left-0 h-full w-[280px] bg-neutral-100 z-50 p-6 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-semibold text-gray-900">Menu</span>
                    <button onClick={() => setOpen(false)} aria-label="Close Menu">
                      <X size={24} className="text-gray-600" />
                    </button>
                  </div>

                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.07, delayChildren: 0.1 },
                      },
                    }}
                    className="flex flex-col gap-4 text-base font-medium text-black"
                  >
                    {navItems.map(({ label, href, icon }) => (
                      <motion.li
                        key={href}
                        variants={{
                          hidden: { opacity: 0, x: -20 },
                          visible: { opacity: 1, x: 0 },
                        }}
                      >
                        <a
                          href={href}
                          onClick={() => setOpen(false)}
                          className="no-underline flex items-center gap-2 text-black hover:text-neutral-800 transition-colors"

                        >
                          {icon}
                          {label}
                        </a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>

                <div className="mt-8 flex gap-5 items-center justify-center border-t border-gray-300 pt-6">
                  <a
                    href="https://www.linkedin.com/company/novacelik"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <Image
                      src="/images/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="hover:opacity-80 transition"
                    />
                  </a>
                  <a
                    href="https://www.instagram.com/novacelik"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <Image
                      src="/images/instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                      className="hover:opacity-80 transition"
                    />
                  </a>
                  <a href="mailto:info@novacelikco.com" aria-label="Email">
                    <Image
                      src="/images/mail.svg"
                      alt="Email"
                      width={24}
                      height={24}
                      className="hover:opacity-80 transition"
                    />
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
