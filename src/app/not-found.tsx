import Link from "next/link";

export default function NotFoundPage() {
  return (
    <section className="container-shell page-section text-center">
      <p className="text-primary text-sm font-bold tracking-widest uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-black">No signal found.</h1>
      <p className="text-secondary mx-auto mt-4 max-w-lg">
        This page may have moved, or the release window is still to be
        announced.
      </p>
      <Link
        href="/"
        className="bg-primary hover:bg-primary-hover focus-ring mt-8 inline-flex rounded-md px-5 py-3 font-bold text-white"
      >
        Return home
      </Link>
    </section>
  );
}
