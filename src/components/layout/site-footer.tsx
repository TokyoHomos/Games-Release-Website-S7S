import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-border border-t">
      <div className="container-shell text-secondary flex flex-col gap-3 py-8 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>Release intelligence, without the noise.</p>
        <div className="flex gap-5">
          <Link
            className="hover:text-primary transition-colors"
            href="/profile"
          >
            Profile
          </Link>
          <Link className="hover:text-primary transition-colors" href="/admin">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
