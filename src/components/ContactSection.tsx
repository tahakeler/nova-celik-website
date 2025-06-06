'use client';

import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gray-50 text-gray-900 px-4 sm:px-6 lg:px-16 py-16 sm:py-24 pb-0 w-full"
    >
      <motion.div
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="w-full max-w-screen-xl mx-auto flex flex-col items-center gap-10"
      >
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">
            Get in <span className="text-blue-700">touch with us</span>
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            We're here to help with your energy transformation journey. Reach out to us via the form or contact methods below.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full min-h-[420px]">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 sm:p-8 flex flex-col justify-between gap-6 h-full">
            <form className="flex flex-col gap-5 h-full">
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
              <div className="flex-grow">
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  placeholder="Write your message here..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none min-h-auto"
                ></textarea>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-800 transition w-full sm:w-auto"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
          <div className="bg-[#002b80] text-white rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-between h-full">
            <div>
              <h3 className="text-xl text-white sm:text-2xl font-bold mb-6">
                NOVACELIK COMPANY LIMITED
              </h3>
              <div className="bg-[#003399] rounded-lg p-4 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="bg-[#0040cc] p-2 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </span>
                  <a href="mailto:cancelik@novacelikco.com" className="text-sm break-all">
                    cancelik@novacelikco.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="bg-[#0040cc] p-2 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </span>
                  <a href="tel:+66625948929" className="text-sm">
                    +66 (62) 594 8929
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://wa.me/905384342523"
                    className="bg-[#0040cc] p-2 rounded-lg flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                  >
                    <Image src="/svgs/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
                  </a>
                  <span className="text-sm">+90 (538) 434 2523</span>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://line.me/ti/p/cancelikth"
                    className="bg-[#0040cc] p-2 rounded-lg flex items-center justify-center"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Line"
                  >
                    <Image src="/svgs/line.svg" alt="Line" width={20} height={20} />
                  </a>
                  <span className="text-sm">cancelikth</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="bg-[#0040cc] p-2 rounded-lg flex items-center justify-center mt-1">
                    <MapPin className="w-5 h-5" />
                  </span>
                  <span className="text-sm leading-relaxed">
                    4th Floor, EnCo Terminal (EnTer) Building,
                    425 Kamphaeng Phet 6 Rd, Don Mueang,
                    Bangkok 10210, Thailand
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-xl rounded-xl overflow-hidden shadow-md border border-gray-200 h-60 mt-2">
          <iframe
            src="https://maps.google.com/maps?q=4th%20Floor%2C%20EnCo%20Terminal%20(EnTer)%20Building%2C%20425%20Kamphaeng%20Phet%206%20Rd%2C%20Don%20Mueang%2C%20Bangkok%2010210%2C%20Thailand&z=17&output=embed"
            className="w-full h-full border-none"
            allowFullScreen
            title="NovaCelik Company Address"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
    </section>
  );
}
