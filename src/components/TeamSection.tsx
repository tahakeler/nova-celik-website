export default function TeamSection() {
  return (
    <section className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Example team bios – expand as needed */}
        <div className="bg-gray-100 rounded-xl p-6 shadow">
          <img src="/images/team/ceo.jpg" alt="CEO" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Ada Yılmaz</h3>
          <p className="text-gray-700 text-base mb-1">Chief Executive Officer</p>
          <p className="text-gray-500 text-sm">Energy sector leader with a passion for sustainable innovation.</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-6 shadow">
          <img src="/images/team/cto.jpg" alt="CTO" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Taha Keler</h3>
          <p className="text-gray-700 text-base mb-1">Chief Technology Officer</p>
          <p className="text-gray-500 text-sm">Expert in IoT, cloud infrastructure, and scalable energy analytics.</p>
        </div>
        <div className="bg-gray-100 rounded-xl p-6 shadow">
          <img src="/images/team/cso.jpg" alt="CSO" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Elif Kaya</h3>
          <p className="text-gray-700 text-base mb-1">Chief Sustainability Officer</p>
          <p className="text-gray-500 text-sm">Dedicated to advancing eco-friendly business solutions worldwide.</p>
        </div>
      </div>
    </section>
  );
}
