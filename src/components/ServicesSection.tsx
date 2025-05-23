"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import Button from "./Button";

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
      <section
        id="services"
        className="bg-gradient-to-b from-white via-gray-50 to-blue-50 py-24 px-6 snap-start min-h-screen flex flex-col justify-center"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16"
          >
            Our Services
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, idx) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg hover:shadow-xl transition duration-300"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  width={600}
                  height={300}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Button href="/services" label="View All Services" />
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
