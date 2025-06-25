'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

const formVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const infoVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const contactItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export default function ContactSection() {
  return (
    <section className="relative min-h-screen w-full bg-gradient-to-b from-gray-900 to-blue-900 py-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 pointer-events-none"
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Ready to <span className="text-blue-400">Transform</span> Your Energy Future?
          </h2>
          <p className="text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Connect with our experts and discover how NovaCelik can revolutionize your energy efficiency
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          <div>
            {/* Contact Form */}
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl mb-8"
            >
              <form className="space-y-6">
                <motion.div
                  variants={contactItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <label htmlFor="fullName" className="block text-white text-sm font-medium mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="Your Name"
                    aria-required="true"
                  />
                </motion.div>
                <motion.div
                  variants={contactItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <label htmlFor="email" className="block text-white text-sm font-medium mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="you@example.com"
                    aria-required="true"
                  />
                </motion.div>
                <motion.div
                  variants={contactItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <label htmlFor="message" className="block text-white text-sm font-medium mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                    placeholder="How can we help you?"
                    aria-required="true"
                  />
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-500 transition-all shadow-lg"
                  type="submit"
                  aria-label="Send message"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
            {/* Connect With Us Widget */}
            <motion.div
              variants={contactItemVariants}
              whileHover="hover"
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                Connect With Us
              </h3>
              <div className="flex gap-4">
                <motion.a
                  href="https://wa.me/905384342523"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500/20 p-3 rounded-lg hover:bg-blue-500/30 transition-colors"
                  aria-label="Contact us on WhatsApp"
                >
                  <Image src="/svgs/whatsapp.svg" alt="" width={24} height={24} aria-hidden="true" />
                </motion.a>
                <motion.a
                  href="https://line.me/ti/p/cancelikth"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="bg-blue-500/20 p-3 rounded-lg hover:bg-blue-500/30 transition-colors"
                  aria-label="Contact us on Line"
                >
                  <Image src="/svgs/line.svg" alt="" width={24} height={24} aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>
          </div>
          {/* Contact Information and Map */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div
              variants={contactItemVariants}
              whileHover="hover"
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-white mb-6">
                NOVACELIK COMPANY LIMITED
              </h3>
              <div className="space-y-6">
                <motion.a
                  href="mailto:cancelik@novacelikco.com"
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"
                  whileHover={{ x: 10 }}
                  aria-label="Email us at cancelik@novacelikco.com"
                >
                  <span className="bg-blue-500/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span>cancelik@novacelikco.com</span>
                </motion.a>
                <motion.a
                  href="tel:+66625948929"
                  className="flex items-center gap-4 text-gray-300 hover:text-white transition-colors"
                  whileHover={{ x: 10 }}
                  aria-label="Call us at +66 (62) 594 8929"
                >
                  <span className="bg-blue-500/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <span>+66 (62) 594 8929</span>
                </motion.a>
                <motion.div
                  className="flex items-center gap-4 text-gray-300"
                  whileHover={{ x: 10 }}
                >
                  <span className="bg-blue-500/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6" aria-hidden="true" />
                  </span>
                  <address className="not-italic">
                    4th Floor, EnCo Terminal (EnTer) Building,
                    425 Kamphaeng Phet 6 Rd, Don Mueang,
                    Bangkok 10210, Thailand
                  </address>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              variants={contactItemVariants}
              whileHover="hover"
            className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden shadow-2xl h-[348px]"
            >
              <iframe
                src="https://maps.google.com/maps?q=4th%20Floor%2C%20EnCo%20Terminal%20(EnTer)%20Building%2C%20425%20Kamphaeng%20Phet%206%20Rd%2C%20Don%20Mueang%2C%20Bangkok%2010210%2C%20Thailand&z=17&output=embed"
                className="w-full h-full border-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="NovaCelik office location in Bangkok"
                aria-label="Map showing NovaCelik office location in Bangkok"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
