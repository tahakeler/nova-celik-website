import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

export default function HeroSection() {
  return (
    <SectionWrapper>
      <section className="bg-gray-100 py-20 px-6 text-center md:text-left">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
              Nova Celik: Strong Structures, Reliable Solutions
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              We specialize in industrial steel construction with precision engineering and hands-on execution.
            </p>
            <Button href="/contact" label="Contact Us" />
          </div>
          <div className="md:w-1/2">
            <Image
              src="/hero-steel.jpg"
              alt="Steel Structure"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
        <div className="h-1 bg-blue-600 w-20 rounded-full mt-14 mx-auto" aria-hidden />
      </section>
    </SectionWrapper>
  );
}
