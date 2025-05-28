import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
  readonly href: string;
  readonly label: string;
  readonly icon?: boolean;
}

export default function Button({ href, label, icon = true }: Props) {
  return (
    <Link
      href={href}
      className="no-underline inline-flex items-center gap-2 min-w-fit px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-md transition duration-300 hover:scale-105"
    >
      {label}
      {icon && <ArrowRight size={18} />}
    </Link>
  );
}
