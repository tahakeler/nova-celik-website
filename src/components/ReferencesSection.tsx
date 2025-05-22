import SectionWrapper from "./SectionWrapper";

const logos = [
  "/reference1.png",
  "/reference2.png",
  "/reference3.png",
  "/reference4.png",
  "/reference5.png",
];

export default function ReferencesSection() {
  return (
    <SectionWrapper>
      <section id="references" className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
            Our References
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {logos.map((src) => (
              <img
                key={src}
                src={src}
                alt="Reference Logo"
                className="h-16 md:h-20 grayscale hover:grayscale-0 transition"
              />
            ))}
          </div>
          <div className="mt-12">
            <a
              href="/references"
              className="no-underline inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-300"
            >
              View All References
            </a>
          </div>
        </div>
        <div className="h-1 bg-blue-600 w-20 rounded-full mt-14 mx-auto" aria-hidden />
      </section>
    </SectionWrapper>
  );
}
