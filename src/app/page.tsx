// src/app/page.tsx

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold">Nova Çelik</h1>
        <p className="mt-4 text-xl max-w-2xl mx-auto">
          Powering Industry with Precision. Discover our steel solutions and energy efficiency expertise.
        </p>
        <a
          href="/dashboard"
          className="inline-block mt-8 px-8 py-3 bg-white text-gray-900 font-semibold rounded-md hover:bg-gray-200 transition"
        >
          View Dashboard
        </a>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-lg text-gray-700">
          Nova Çelik is a leading provider of industrial steel solutions. With decades of experience,
          we serve the energy, infrastructure, and manufacturing sectors with precision-engineered products
          and a strong focus on sustainability and efficiency.
        </p>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Steel Production</h3>
              <p className="text-gray-600">High-quality, customizable steel products for industrial applications.</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>
              <p className="text-gray-600">Expert planning and execution of industrial steel infrastructure projects.</p>
            </div>
            <div className="bg-white p-6 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Energy Efficiency Solutions</h3>
              <p className="text-gray-600">Monitor and optimize energy consumption using our advanced dashboard tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-700">
          Email: <a href="mailto:info@novacelikco.com" className="text-blue-600 underline">info@novacelikco.com</a>
        </p>
        <p className="text-gray-700 mt-2">Phone: +90 123 456 7890</p>
        <p className="text-gray-700 mt-2">Address: Nova Çelik Headquarters, Istanbul, Turkey</p>
      </section>
    </main>
  );
}
