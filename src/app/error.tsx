"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-shell page-section text-center">
      <p className="text-primary text-sm font-bold tracking-widest uppercase">
        Something went wrong
      </p>
      <h1 className="mt-4 text-4xl font-black">The signal dropped.</h1>
      <p className="text-secondary mx-auto mt-4 max-w-lg">
        An unexpected error interrupted this page. Try the request again.
      </p>
      <button
        className="bg-primary hover:bg-primary-hover focus-ring mt-8 rounded-md px-5 py-3 font-bold text-white"
        onClick={reset}
        type="button"
      >
        Try again
      </button>
    </section>
  );
}
