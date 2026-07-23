"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { PRIMARY_NAVIGATION } from "@/components/layout/desktop-navigation";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        className="focus-ring border-border bg-surface hover:bg-surface-elevated inline-flex size-10 items-center justify-center rounded-md border transition-colors"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          className="size-5"
        >
          {isOpen ? (
            <path d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="border-border bg-background absolute inset-x-0 top-16 z-40 border-b shadow-2xl shadow-black/40"
        >
          <nav aria-label="Mobile navigation" className="container-shell py-4">
            <ul className="flex flex-col gap-1">
              {PRIMARY_NAVIGATION.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="focus-ring hover:bg-surface hover:text-primary block rounded-md px-3 py-3 text-base font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-border mt-3 flex flex-col gap-1 border-t pt-3">
              <Link
                href="/search"
                onClick={() => setIsOpen(false)}
                className="focus-ring hover:bg-surface hover:text-primary block rounded-md px-3 py-3 text-base font-medium transition-colors"
              >
                Search
              </Link>
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="focus-ring hover:bg-surface hover:text-primary block rounded-md px-3 py-3 text-base font-medium transition-colors"
              >
                Profile
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
