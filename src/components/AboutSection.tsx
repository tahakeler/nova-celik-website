"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <SectionWrapper>
      <section
        id="about"
        className="bg-white min-h-screen flex items-center justify-center px-6 py-24 snap-start"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-800">NovaCelik</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              NovaCelik is a leader in precision steel manufacturing, combining
              cutting-edge technology with deep industry knowledge to deliver
              reliable, scalable, and sustainable solutions.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With a team of expert engineers and on-site professionals, we
              focus on innovation, structural safety, and long-term performance
              for industrial and commercial infrastructure projects.
            </p>
            <div className="mt-8">
              <Link href="/about">
                <button className="px-6 py-3 bg-blue-800 text-white font-semibold rounded-md hover:bg-blue-900 transition">
                  Learn More
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Image
              src="/images/about-us.jpg"
              alt="About NovaCelik"
              width={600}
              height={400}
              className="rounded-xl shadow-xl border border-gray-200"
            />
          </motion.div>
        </div>
      </section>
    </SectionWrapper>
  );
}
