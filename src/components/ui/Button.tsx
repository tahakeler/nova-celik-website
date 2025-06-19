import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  readonly href: string;
  readonly label: string;
  readonly icon?: boolean;
  readonly variant?: 'primary' | 'secondary';
  readonly className?: string;
}

export default function Button({ 
  href, 
  label, 
  icon = true, 
  variant = 'primary',
  className = ''
}: Props) {
  const baseStyles = "relative inline-flex items-center gap-2 min-w-fit px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold rounded-xl transition-all duration-300";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 text-white shadow-lg hover:shadow-blue-500/25",
    secondary: "bg-white/90 text-gray-900 border border-gray-200 shadow-md hover:shadow-lg hover:border-blue-500/50"
  };

  return (
    <Link href={href} className="no-underline group">
      <motion.span
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${className}`}
      >
        {/* Gradient overlay on hover */}
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
        
        {/* Button content */}
        <span className="relative flex items-center gap-2">
          {label}
          {icon && (
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </motion.span>
          )}
        </span>

        {/* Animated border */}
        <motion.span
          className="absolute -inset-1 rounded-xl"
          style={{
            background: `linear-gradient(90deg, #2563eb, #7c3aed, #2563eb)`,
            backgroundSize: '200% 100%',
            opacity: 0
          }}
          animate={{
            backgroundPosition: ['0% 0%', '200% 0%'],
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.span>
    </Link>
  );
}
