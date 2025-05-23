"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Button from "./Button";

const references = [
  { src: "/images/reference1.png", alt: "Reference Logo 1" },
  { src: "/images/reference2.png", alt: "Reference Logo 2" },
  { src: "/images/reference3.png", alt: "Reference Logo 3" },
];

export default function ReferencesSection() {
  return (
    <section
      id="references"
      className="bg-[linear-gradient(to_bottom,#f0f4ff_0%,#f5f7fa_100%)] py-20 px-6 snap-start"
    >
      <div className="container mx-auto max-w-6xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-12"
        >
          Our References
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center"
        >
          {references.map(({ src, alt }) => (
            <div
              key={src}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex items-center justify-center hover:shadow-md transition"
            >
              <Image
                src={src}
                alt={alt}
                width={140}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>

        <div className="mt-10">
          <Button href="/references" label="View All References" />
        </div>

        <div
          className="h-1 bg-blue-600 w-20 rounded-full mt-14 mx-auto"
          aria-hidden
        />
      </div>
    </section>
  );
}
