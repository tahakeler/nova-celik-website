export const metadata = {
  title: "Services | NovaCelik",
  description: "Explore our energy efficiency solutions and digital services for industrial performance.",
};

export default function ServicesPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-10">Our Services & Solutions</h1>
        <div className="grid gap-10 md:grid-cols-2">
          {/* Service 1 */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-2">Energy Monitoring Platform</h2>
            <p className="mb-4">Real-time dashboards, analytics, and automated reporting to reduce costs and energy waste.</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Facility-wide data collection</li>
              <li>Actionable performance insights</li>
              <li>Automated alerts</li>
            </ul>
            <a href="/request-demo" className="inline-block bg-blue-700 text-white px-6 py-3 rounded font-semibold hover:bg-blue-800">
              Request a Demo
            </a>
          </div>
          {/* Service 2 */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-2">Smart Facility Management</h2>
            <p className="mb-4">Optimize operations, track maintenance, and improve sustainability using smart sensors and AI.</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700">
              <li>Predictive maintenance</li>
              <li>IoT-powered asset tracking</li>
              <li>Remote management</li>
            </ul>
            <a href="/contact" className="inline-block bg-green-700 text-white px-6 py-3 rounded font-semibold hover:bg-green-800">
              Contact Us
            </a>
          </div>
          {/* Add more services as needed */}
        </div>
      </section>
    </main>
  );
}
