export const metadata = {
  title: "Contact | NovaCelik",
  description: "Contact NovaCelik for more information on our solutions, support, or to request a demo.",
};

export default function ContactPage() {
  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-2xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8">Get in Touch</h1>
        <p className="mb-8 text-lg">
          We’re here to help. Reach out via the form below or connect through email, phone, or LinkedIn.
        </p>
        {/* Contact Info */}
        <div className="mb-8 space-y-3">
          <div>Email: <a href="mailto:info@novacelik.com" className="text-blue-700">info@novacelik.com</a></div>
          <div>Phone: <a href="tel:+66999999999" className="text-blue-700">+66 99 999 9999</a></div>
          <div>
            LinkedIn: <a href="https://www.linkedin.com/company/novacelik" target="_blank" rel="noopener noreferrer" className="text-blue-700">NovaCelik</a>
          </div>
        </div>
        {/* Contact Form */}
        <form className="space-y-5">
          <div>
            <label htmlFor="name" className="block font-semibold mb-1">Name</label>
            <input type="text" id="name" name="name" required className="w-full border px-4 py-2 rounded" />
          </div>
          <div>
            <label htmlFor="email" className="block font-semibold mb-1">Email</label>
            <input type="email" id="email" name="email" required className="w-full border px-4 py-2 rounded" />
          </div>
          <div>
            <label htmlFor="message" className="block font-semibold mb-1">Message</label>
            <textarea id="message" name="message" rows={5} required className="w-full border px-4 py-2 rounded"></textarea>
          </div>
          <button type="submit" className="bg-blue-700 text-white px-8 py-3 rounded font-semibold hover:bg-blue-800">Send Message</button>
        </form>
        {/* Map example */}
        <div className="mt-12">
          <iframe
            title="NovaCelik Office"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3874.122523782501!2d100.5241239153315!3d13.736717501202803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ed41b546d85%3A0x69040c95e388bfa0!2sBangkok!5e0!3m2!1sen!2sth!4v1622026622635!5m2!1sen!2sth"
            width="100%" height="300" allowFullScreen loading="lazy"
            className="rounded border mt-8"
          />
        </div>
      </section>
    </main>
  );
}
