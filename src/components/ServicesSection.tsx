"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Project Design",
    description: "Detailed and safe structural analysis from experienced engineers.",
    image: "/service1.jpg",
  },
  {
    title: "Steel Manufacturing",
    description: "Production that meets international standards using cutting-edge tools.",
    image: "/service2.jpg",
  },
  {
    title: "On-Site Assembly",
    description: "Professional teams executing fast and secure field installation.",
    image: "/service3.jpg",
  },
];

export default function ServicesSection() {
  return (
    <SectionWrapper>
      <section id="services" className="bg-gray-50 py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <Image src={service.image} alt={service.title} width={400} height={250} className="w-full object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{service.title}</h3>
                  <p className="text-gray-600 text-base mb-4">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="no-underline inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
