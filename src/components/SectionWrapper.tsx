"use client";

import { ReactNode } from "react";

export default function SectionWrapper({ children }: { readonly children: ReactNode }) {
  return (
    <div className="snap-start w-full">
      {children}
    </div>
  );
}
