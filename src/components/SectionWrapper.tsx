"use client";

import { ReactNode } from "react";

export default function SectionWrapper({ children }: { readonly children: ReactNode }) {
  return (
    <div className="snap-start w-full px-4 sm:px-6 lg:px-16 max-w-7xl mx-auto">
      {children}
    </div>
  );
}
