import SectionWrapper from "./SectionWrapper";
import Image from "next/image";
import Button from "./Button";

export default function DashboardSection() {
  return (
    <SectionWrapper>
      <section id="dashboard" className="bg-gray-100 py-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Interactive Dashboard
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Monitor real-time performance metrics and insights for your projects with our advanced analytics dashboard.
          </p>
          <Image
            src="/dashboard-preview.jpg"
            alt="Dashboard Preview"
            width={800}
            height={400}
            className="rounded-lg shadow-md mx-auto mb-8"
          />
          <Button href="/dashboard" label="Go to Dashboard" />
        </div>
        <div className="h-1 bg-blue-600 w-20 rounded-full mt-14 mx-auto" aria-hidden />
      </section>
    </SectionWrapper>
  );
}
