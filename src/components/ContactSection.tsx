'use client';

import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-16 sm:py-24 w-full"
    >
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-screen-xl mx-auto flex flex-col items-center gap-16"
      >
        {/* Title */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Get in <span className="text-blue-700">touch with us</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            We're here to help with your energy transformation journey. Reach out to us via the form or visit our office.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Your Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  placeholder="Write your message here..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-blue-700 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-800 transition w-full sm:w-auto"
              >
                Send Message
              </button>
            </div>
          </div>

          {/* Info + Map */}
          <div className="flex flex-col gap-4">
            {/* Unified Info Card */}
            <div className="bg-[#002b80] text-white rounded-xl p-6 sm:p-8 shadow-md">
              <h3 className="text-xl text-white sm:text-2xl font-bold mb-6">
                NOVACELIK COMPANY LIMITED
              </h3>
              <div className="bg-[#003399] rounded-lg p-4 flex flex-col gap-4">
                {/* Email */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#0040cc] p-2 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="mailto:cancelik@novacelikco.com"
                    className="text-sm break-all"
                  >
                    cancelik@novacelikco.com
                  </a>
                </div>
                {/* Mobile */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#0040cc] p-2 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a
                    href="tel:+66625948929"
                    className="text-sm"
                  >
                    +66 (62) 594 8929
                  </a>
                </div>
                {/* WhatsApp */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#0040cc] p-2 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a
                    href="https://wa.me/905384342523"
                    className="text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp: +90 (538) 434 2523
                  </a>
                </div>
                {/* Line */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#0040cc] p-2 rounded-lg">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">
                    Line: <span className="font-medium">cancelikth</span>
                  </span>
                </div>
                {/* Website */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#0040cc] p-2 rounded-lg">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a
                    href="https://novacelikco.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm"
                  >
                    novacelikco.com
                  </a>
                </div>
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="bg-[#0040cc] p-2 rounded-lg mt-1">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-sm leading-relaxed">
                    4th Floor, EnCo Terminal (EnTer) Building,
                    425 Kamphaeng Phet 6 Rd, Don Mueang,
                    Bangkok 10210, Thailand
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-200 h-60">
              <iframe
                src="https://maps.google.com/maps?q=4th%20Floor%2C%20EnCo%20Terminal%20(EnTer)%20Building%2C%20425%20Kamphaeng%20Phet%206%20Rd%2C%20Don%20Mueang%2C%20Bangkok%2010210%2C%20Thailand&z=17&output=embed"
                className="w-full h-full border-none"
                allowFullScreen
                title="NovaCelik Company Address"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
