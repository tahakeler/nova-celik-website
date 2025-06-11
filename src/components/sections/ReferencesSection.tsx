"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from '@/components/ui/Button';
import { references } from "@/data/references";

export default function ReferencesSection() {
  return (
    <section
      id="references"
      className="bg-[linear-gradient(to_bottom,#f0f4ff_0%,#f5f7fa_100%)] py-20 px-4 sm:px-6 md:px-10 lg:px-16 snap-start"
    >
      <div className="mx-auto w-full max-w-7xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-10 sm:mb-12"
        >
          Our References
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {references.map(({ src, alt }) => (
            <div
              key={src}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-6 flex items-center justify-center hover:shadow-md transition"
            >
              <Image
                src={src}
                alt={alt}
                width={0}
                height={0}
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 30vw, 200px"
                className="w-full max-w-[140px] h-auto object-contain"
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-8 sm:mt-10">
          <Button href="/references" label="View All References" />
        </div>

        <div
          className="h-1 bg-blue-600 w-16 sm:w-20 rounded-full mt-12 sm:mt-14 mx-auto"
          aria-hidden
        />
      </div>
    </section>
  );
}
