'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h2 className="text-lg font-semibold text-red-600">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="rounded-md bg-blue-700 px-4 py-2 text-white hover:bg-blue-800"
      >
        Try again
      </button>
    </div>
  );
}
