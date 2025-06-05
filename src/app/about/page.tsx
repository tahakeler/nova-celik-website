import React from 'react';
import Image from 'next/image';

export const metadata = {
  title: "About Us | NovaCelik",
  description: "Learn more about NovaCelik, our mission, vision, and the diverse team powering digital energy innovation."
};

export default function AboutPage() {
  return (
    <main className="bg-white min-h-screen">
      {/* Hero/Narrative Section */}
      <section className="w-full bg-gradient-to-r from-blue-100 via-white to-green-50 py-20 mb-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-6">
            About <span className="text-[#42b431]">NovaCelik</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            We drive energy efficiency for industry, commerce, and the future.<br />
            Our mission is to deliver actionable insights and smarter systems for a more sustainable tomorrow.
          </p>
        </div>
      </section>

      {/* Milestones & Values */}
      <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 px-6 pb-16">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Vision</h2>
          <p className="text-lg text-gray-700 mb-4">
            To empower organizations worldwide to achieve optimal energy performance through data-driven innovation and engineering excellence.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-3">Core Values</h2>
          <ul className="list-disc pl-5 text-base text-gray-600 space-y-1">
            <li>Integrity</li>
            <li>Innovation</li>
            <li>Customer Success</li>
            <li>Sustainability</li>
            <li>Collaboration</li>
          </ul>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Key Milestones</h2>
          <ul className="list-disc pl-5 text-base text-gray-600 space-y-2">
            <li>2022 – NovaCelik founded and first AI dashboard deployed</li>
            <li>2023 – Expanded into new markets and sectors</li>
            <li>2024 – Achieved industry certification in energy management</li>
            <li>2025 – Launched cloud-native analytics platform</li>
          </ul>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full bg-gray-50 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-14 text-blue-800">Meet the Team</h2>
          <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-2">
            {/* Team Member 1 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-8 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  src="/svgs/logo.svg"
                  alt="John Doe"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-blue-700 font-medium mt-1 mb-2">Chief Executive Officer</p>
              <p className="text-gray-500 text-center text-sm">Visionary leader guiding our mission to make energy smarter and more sustainable.</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-8 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  src="/svgs/logo.svg"
                  alt="Unknown"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Unknown</h3>
              <p className="text-blue-700 font-medium mt-1 mb-2">Chief Technology Officer</p>
              <p className="text-gray-500 text-center text-sm">Architect of our analytics and IoT infrastructure, ensuring reliability and innovation.</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-8 flex flex-col items-center">
              <div className="w-24 h-24 mb-4 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                <Image
                  src="/svgs/logo.svg"
                  alt="Unknown"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl font-semibold">Unknown</h3>
              <p className="text-blue-700 font-medium mt-1 mb-2">Chief Sustainability Officer</p>
              <p className="text-gray-500 text-center text-sm">Driving sustainable practices and impactful client results worldwide.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
