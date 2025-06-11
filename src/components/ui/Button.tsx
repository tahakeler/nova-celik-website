import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  readonly href: string;
  readonly label: string;
  readonly icon?: boolean;
}

export default function Button({ href, label, icon = true }: Props) {
  return (
    <Link href={href} className="no-underline">
      <motion.span
        whileHover={{ scale: 1.05, rotate: 1 }}
        whileTap={{ scale: 0.95, rotate: -1 }}
        className="inline-flex items-center gap-2 min-w-fit px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-md transition-colors"
      >
        {label}
        {icon && <ArrowRight size={18} />}
      </motion.span>
    </Link>
  );
}
