'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function RequestDemoPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
        {/* Background Image (hero) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/request-demo.jpg"
            alt="Request Demo Background"
            fill
            priority
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        {/* Overlay Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center md:items-center justify-center gap-0 md:gap-12">
          {/* Left: Title and Description */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left md:items-start py-8 md:py-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight drop-shadow">
              Get Started with <span className="text-[#42b431]">NovaCelik</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed drop-shadow max-w-md">
              Whether you're designing sustainable buildings, managing large-scale energy systems, or implementing smart industrial controls, NovaCelik delivers scalable, precision-driven energy solutions tailored to your facility’s needs.
            </p>
          </div>
          {/* Right: Smaller Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center py-8 md:py-0">
            <div className="w-full sm:w-[85%] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 sm:p-6 md:p-6 flex flex-col justify-center">
              <form className="w-full space-y-3 text-left">
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-gray-700">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="First name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                    required
                  />
                </div>
                {/* Email */}
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                    required
                  />
                </div>
                {/* Phone */}
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                    required
                  />
                </div>
                {/* Company */}
                <div className="space-y-1">
                  <label htmlFor="company" className="text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="Your Company"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                  />
                </div>
                {/* Designation */}
                <div className="space-y-1">
                  <label htmlFor="designation" className="text-sm font-medium text-gray-700">
                    Designation
                  </label>
                  <input
                    id="designation"
                    type="text"
                    placeholder="Designation"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                  />
                </div>
                {/* Subject */}
                <div className="space-y-1">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Subject
                    </option>
                    <option value="audit">Energy Audit</option>
                    <option value="monitoring">Monitoring Solutions</option>
                    <option value="ai">AI Optimization</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {/* Message */}
                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    placeholder="Enter your message here.."
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#42b431] text-white py-2 font-semibold rounded-md hover:bg-[#36a32a] transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section - Updated info */}
      <section className="py-16 px-4 sm:px-6 lg:px-16 bg-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center">
          Get in <span className="text-blue-700">touch with us</span>
        </h2>
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Google Map - Left */}
          <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200 h-72 min-h-[260px] bg-gray-100">
            <iframe
              src="https://maps.google.com/maps?q=4th%20Floor%2C%20EnCo%20Terminal%20(EnTer)%20Building%2C%20425%20Kamphaeng%20Phet%206%20Rd%2C%20Don%20Mueang%2C%20Bangkok%2010210%2C%20Thailand&z=17&output=embed"
              className="w-full h-full border-none"
              allowFullScreen
              title="NovaCelik Company Address"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Info Card - Right */}
          <div className="flex flex-col justify-center bg-[#003399] text-white rounded-2xl p-6 sm:p-8 shadow-md">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-white">
              NOVACELIK COMPANY LIMITED
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-[#0040cc] p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a
                  href="mailto:cancelik@novacelikco.com"
                  className="text-sm break-all text-white"
                >
                  cancelik@novacelikco.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#0040cc] p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a
                  href="tel:+66625948929"
                  className="text-sm text-white"
                >
                  +66 (62) 594 8929
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#0040cc] p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a
                  href="https://wa.me/905384342523"
                  className="text-sm text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp: +90 (538) 434 2523
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#0040cc] p-2 rounded-lg">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm">
                  Line: <span className="font-medium">cancelikth</span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[#0040cc] p-2 rounded-lg">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a
                  href="https://novacelikco.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white"
                >
                  novacelikco.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#0040cc] p-2 rounded-lg mt-1">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div className="text-sm leading-relaxed">
                  4th Floor, EnCo Terminal (EnTer) Building,<br />
                  425 Kamphaeng Phet 6 Rd, Don Mueang,<br />
                  Bangkok 10210, Thailand
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
