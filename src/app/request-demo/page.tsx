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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
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
        <div className="relative z-10 max-w-7xl w-full px-6 grid md:grid-cols-2 gap-12 items-center py-20">
          {/* Left Text */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Get Started with <span className="text-[#42b431]">NovaCelik</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Whether you're designing sustainable buildings, managing large-scale energy systems,
              or implementing smart industrial controls, NovaCelik delivers scalable, precision-driven
              energy solutions tailored to your facility’s needs.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-[75%] mx-auto">
            <form className="bg-white rounded-2xl shadow-xl p-8 w-full space-y-4 text-left">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="First name"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                  required
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <input
                  id="company"
                  type="text"
                  placeholder="Your Company"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="designation" className="text-sm font-medium text-gray-700">
                  Designation
                </label>
                <input
                  id="designation"
                  type="text"
                  placeholder="Designation"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#42b431]"
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

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Enter your message here.."
                  rows={4}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#42b431]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#42b431] text-white py-3 font-semibold rounded-md hover:bg-[#36a32a] transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Locations Section */}
      <section className="py-28 px-6 bg-white text-center">
      <h2 className="text-5xl font-extrabold mb-4">Get in touch with us</h2>
      <p className="max-w-7xl mx-auto text-lg text-gray-700 mb-16">
        We are passionate about building smarter and more resilient energy solutions that benefit both organizations
        and the environment. If you're interested in a custom audit, real-time monitoring, or AI-powered optimization,
        our team is ready to help you achieve your sustainability goals.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Google Map Thailand */}
        <div className="h-[300] overflow-hidden rounded-2xl shadow-sm">
          <iframe
            title="NovaCelik Thailand Map"
            className="w-full h-full border-none"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.415798931169!2d100.52026327510728!3d13.650083586747376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2bdc7ba6d7a4f%3A0x1a0d97823ed5f0e4!2sEnCo%20Terminal%20(EnTer)%20Building%20B%2C%20Suksawat%2076!5e0!3m2!1sen!2sth!4v1716823377793!5m2!1sen!2sth"
          />
        </div>

        {/* NovaCelik Thailand Card */}
        <div className="bg-[#1e40af] text-white rounded-2xl p-8 text-left shadow-sm">
          <h3 className="text-[26px] text-white font-bold mb-6">NOVACELIK Thailand</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Mail className="w-5 h-5 text-white" />
              <span>info@novacelikco.com</span>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-5 h-5 text-white" />
              <span>+66 2 123 4567</span>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-white mt-1" />
              <span>
                EnCo Terminal (EnTer) Building B,<br />
                88 Soi Suksawat 76, Suksawat Road,<br />
                Bang Phueng Subdistrict, Phra Pradaeng District,<br />
                Samut Prakan 10130, Thailand
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
}
