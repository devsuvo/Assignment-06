"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isActive = (href) => {
    if (href === "/") return pathname === "/" || pathname.startsWith("/workouts");
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-header/95 backdrop-blur-sm">
      <nav className="mx-auto grid h-20 max-w-[1280px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 justify-self-start">
          <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
          <span className="hidden font-display text-lg font-bold tracking-[0.9px] text-white sm:inline">
            FITLOG
          </span>
        </Link>

        {/* Middle: Links */}
        <ul className="flex items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block whitespace-nowrap rounded-full px-3 py-1.5 text-xs transition-colors sm:px-4 ${
                  isActive(link.href)
                    ? "bg-neon-soft font-semibold text-neon"
                    : "font-medium text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: Badges */}
        <div className="flex items-center gap-3 justify-self-end sm:gap-6">
          <Link href="/my-plan" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="hidden text-xs font-medium text-soft sm:inline">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-neon px-1.5 text-[11px] font-bold text-black">
              {plan.length}
            </span>
          </Link>
          <Link href="/my-plan" className="flex items-center gap-2 transition hover:opacity-80">
            <span className="hidden text-xs font-medium text-muted sm:inline">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-pill-line px-1.5 text-[11px] font-medium text-soft">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}