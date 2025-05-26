"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function DashboardSection() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.15,
  });

  return (
    <section
      id="dashboard"
      className="bg-gray-50 text-gray-900 px-6 py-28 flex items-center justify-center"
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-screen-xl mx-auto text-center"
      >
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-gray-100 rounded-xl shadow-inner border border-blue-100 px-8 py-20">
          <h2 className="text-5xl font-bold mb-4 text-left">
            <span className="text-blue-700">NovaCelik</span> Dashboard
          </h2>
          <p className="text-gray-600 text-left max-w-2xl">
            The interactive dashboard will provide real-time insights into our energy-saving performance metrics and project outcomes.
          </p>

          {/* Placeholder box for future dashboard content */}
          <div className="mt-12 w-full h-[350px] bg-white border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center text-blue-400 text-xl font-medium">
            Dashboard Content Coming Soon...
          </div>
        </div>
      </motion.div>
    </section>
  );
}
