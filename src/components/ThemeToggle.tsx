'use client';
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <button
      className="fixed z-50 top-4 right-4 bg-gray-200 dark:bg-gray-700 p-2 rounded-xl shadow hover:scale-110 transition"
      aria-label="Toggle dark mode"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? "🌙" : "🌞"}
    </button>
  );
}
