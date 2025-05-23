export default function ContactPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form className="space-y-6 max-w-xl">
        <div>
          <label htmlFor="fullName" className="block font-semibold">Full Name</label>
          <input
            id="fullName"
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your full name"
            title="Full Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold">Email Address</label>
          <input
            id="email"
            type="email"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email address"
            title="Email Address"
          />
        </div>
        <div>
          <label htmlFor="message" className="block font-semibold">Message</label>
          <textarea
            id="message"
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Type your message"
            title="Message"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-black text-white font-semibold px-6 py-3 rounded hover:bg-gray-800 transition"
        >
          Send Message
        </button>
      </form>

      <p className="mt-10 text-sm text-gray-600">
        Or email us at: <strong>info@novacelik.com</strong>
      </p>
    </main>
  );
}
