import SectionWrapper from "./SectionWrapper";
import Button from "./Button";

export default function ContactSection() {
  return (
    <SectionWrapper>
      <section id="contact" className="bg-white py-20 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Contact Us
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Let's talk about your project. Reach out to us directly.
          </p>
          <img
            src="/contact-image.jpg"
            alt="Contact"
            className="rounded-lg shadow-md mx-auto w-full max-w-lg mb-8"
          />
          <Button href="mailto:info@novacelikco.com" label="Send Email" icon={false} />
        </div>
        <div className="h-1 bg-blue-600 w-20 rounded-full mt-14 mx-auto" aria-hidden />
      </section>
    </SectionWrapper>
  );
}
