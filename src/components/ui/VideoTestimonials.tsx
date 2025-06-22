'use client';

interface VideoTestimonial {
  id: string;
  title: string;
  videoUrl: string;
  clientName: string;
}

interface VideoTestimonialsProps {
  readonly testimonials: VideoTestimonial[];
}

export default function VideoTestimonials({ testimonials }: VideoTestimonialsProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Client Video Testimonials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map(({ id, title, videoUrl, clientName }) => (
          <div key={id} className="bg-white rounded-lg shadow p-4">
            <h3 className="text-xl font-semibold mb-4">{title}</h3>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={videoUrl}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded"
              />
            </div>
            <p className="mt-3 text-gray-600 italic">- {clientName}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
