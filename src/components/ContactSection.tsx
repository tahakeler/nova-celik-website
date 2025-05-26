'use client';

import { motion } from 'framer-motion';
import { scrollFade } from '@/utils/animations';
import { Mail, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="bg-gray-50 text-gray-900 px-6 py-28 flex items-center justify-center"
    >
      <motion.div
        className="w-full max-w-screen-xl mx-auto grid md:grid-cols-2 gap-16"
        variants={scrollFade}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Contact Form */}
        <div>
          <h2 className="text-5xl font-bold text-left mb-6">
            <span className="text-blue-700">Contact</span> Us
          </h2>
          <p className="text-gray-600 text-left mb-8">
            Have questions or inquiries? Reach out to us using the form below.
            We usually respond within 24 hours.
          </p>

          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                placeholder="Write your message here..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-700 resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white font-medium px-6 py-3 rounded-md hover:bg-blue-800 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info with Icons + Google Map */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Office Address</h3>
            <p className="text-gray-700">
              NovaCelik<br />
              EnCo Terminal (EnTer) Building B<br />
              88 Soi Suksawat 76, Suksawat Road,<br />
              Bang Phueng Subdistrict, Phra Pradaeng District,<br />
              Samut Prakan 10130, Thailand
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Mail className="text-blue-700 w-5 h-5" />
            <p className="text-blue-700">info@novacelikco.com</p>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="text-blue-700 w-5 h-5" />
            <p className="text-gray-700">+66 2 123 4567</p>
          </div>

          <div className="w-full h-52 rounded-md overflow-hidden border border-gray-300">
            <iframe
              src="https://www.google.com/maps?q=13.650089,100.527064&z=17&output=embed"
              className="w-full h-full border-none"
              allowFullScreen
              title="NovaCelik Location"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
