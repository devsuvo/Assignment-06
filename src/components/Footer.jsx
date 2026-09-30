import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1d24] bg-[#090a0d]">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} />
          <span className="font-display text-sm font-bold tracking-[0.7px] text-white">FITLOG</span>
        </Link>
        <p className="text-center text-xs text-[#6b7280]">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}