import Link from "next/link";

export const PRIMARY_NAVIGATION = [
  { href: "/releases", label: "Releases" },
  { href: "/calendar", label: "Calendar" },
  { href: "/news", label: "News" },
  { href: "/favorites", label: "Favorites" },
] as const;

export function DesktopNavigation() {
  return (
    <nav aria-label="Primary navigation" className="hidden md:block">
      <ul className="flex items-center gap-1">
        {PRIMARY_NAVIGATION.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="focus-ring text-secondary hover:text-primary hover:bg-surface rounded-md px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
