export const metadata = {
  title: "FAQ | NovaCelik",
  description: "Frequently asked questions about NovaCelik's services, platform, and support.",
};

const faq = [
  {
    category: "General",
    questions: [
      { q: "What is NovaCelik?", a: "NovaCelik is a leading provider of digital energy monitoring and efficiency solutions for industrial and commercial facilities." },
      { q: "Where is NovaCelik based?", a: "Our headquarters are in Bangkok, Thailand, and we serve clients globally." }
    ]
  },
  {
    category: "Product",
    questions: [
      { q: "Is the dashboard customizable?", a: "Yes, our platform allows extensive customization based on your facility’s needs." },
      { q: "Can I export reports?", a: "You can export reports in multiple formats, including PDF and Excel." }
    ]
  },
  {
    category: "Support",
    questions: [
      { q: "How do I get technical support?", a: "Contact us via our support form, or email support@novacelik.com. Our team responds within 24 hours." },
      { q: "Where can I find documentation?", a: "Our Help Center contains guides, tutorials, and API documentation." }
    ]
  }
];

export default function FaqPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <section className="max-w-3xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>
        {faq.map(cat => (
          <div key={cat.category} className="mb-10">
            <h2 className="text-2xl font-semibold mb-3">{cat.category}</h2>
            <ul>
              {cat.questions.map(({ q, a }) => (
                <li key={q} className="mb-5">
                  <details className="bg-white rounded shadow p-4">
                    <summary className="cursor-pointer font-semibold text-blue-700">{q}</summary>
                    <div className="pt-3 text-gray-700">{a}</div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}
