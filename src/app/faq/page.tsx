import FaqSection, { FaqCategory } from '@/components/sections/FaqSection';
import PageHero from '@/components/ui/PageHero';
import BackToTopButton from '@/components/ui/BackToTopButton';

export const metadata = {
  title: 'FAQ | NovaCelik',
  description: "Frequently asked questions about NovaCelik's services, platform, and support.",
};

const FAQ_DATA: FaqCategory[] = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is NovaCelik?',
        a: "NovaCelik is a leading provider of digital energy monitoring and efficiency solutions for industrial and commercial facilities.",
      },
      {
        q: 'Where is NovaCelik based?',
        a: 'Our headquarters are in Bangkok, Thailand, and we serve clients globally.',
      },
    ],
  },
  {
    category: 'Product',
    questions: [
      {
        q: 'Is the dashboard customizable?',
        a: 'Yes, our platform allows extensive customization based on your facility’s needs.',
      },
      {
        q: 'Can I export reports?',
        a: 'You can export reports in multiple formats, including PDF and Excel.',
      },
    ],
  },
  {
    category: 'Support',
    questions: [
      {
        q: 'How do I get technical support?',
        a: 'Contact us via our support form, or email support@novacelik.com. Our team responds within 24 hours.',
      },
      {
        q: 'Where can I find documentation?',
        a: 'Our Help Center contains guides, tutorials, and API documentation.',
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main className="flex flex-col bg-white text-gray-900">
      <PageHero
        image="/images/hero-image.jpg"
        title="Frequently Asked Questions"
        subtitle="Find quick answers to common questions about our services"
      />
      <FaqSection data={FAQ_DATA} />
      <BackToTopButton />
    </main>
  );
}
