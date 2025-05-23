import services from "@/data/services";

type Service = {
  title: string;
  description: string;
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen px-6 py-20 bg-white text-gray-900">
      <h1 className="text-4xl font-bold mb-8">Our Services</h1>
      <ul className="space-y-6 text-lg max-w-3xl">
        {(services as Service[]).map((service) => (
          <li key={service.title}>
            <strong>{service.title}:</strong> {service.description}
          </li>
        ))}
      </ul>
    </main>
  );
}