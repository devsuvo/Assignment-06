import Image from "next/image";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-6 pt-12">
      <div className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-card-line bg-card p-8 md:flex-row md:p-14">
        {/* Left: Text */}
        <div className="flex max-w-[558px] flex-col gap-5">
          <p className="text-[11px] font-bold tracking-[1.1px] text-neon">
            WORKOUT LIBRARY
          </p>

          <h1 className="font-display text-4xl font-bold uppercase leading-none tracking-[-1.5px] text-white md:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="max-w-[512px] text-base leading-6 text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <a
              href="#library"
              className="inline-flex items-center gap-2 rounded-md bg-neon px-6 py-3 text-xs font-bold tracking-[0.3px] text-black shadow-md shadow-black transition hover:brightness-110"
            >
              BROWSE WORKOUTS
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right: Banner image */}
        <Image
          src="/banner.png"
          alt="Muscle figure training on a preacher curl machine"
          width={334}
          height={334}
          priority
          className="h-auto w-64 md:w-[334px]"
        />
      </div>
    </section>
  );
}