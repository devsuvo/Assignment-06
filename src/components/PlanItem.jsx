import Link from "next/link";
import Image from "next/image";

function ClockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FlameIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function PlanItem({ workout, showDone, isDone, onDone, onRemove }) {
  const { id, name, image, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border bg-[#14171e] p-4 transition sm:flex-row sm:items-center sm:justify-between ${
        isDone ? "border-neon/30" : "border-[#232732]"
      }`}
    >
      {/* Left: thumbnail + info */}
      <div className={`flex items-center gap-4 ${isDone ? "opacity-60" : ""}`}>
        <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-xl bg-[#1f2937]">
          <Image src={image} alt={name} fill sizes="144px" className="object-cover" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className={`font-display text-base font-bold uppercase tracking-[0.4px] text-white ${isDone ? "line-through" : ""}`}>
            {name}
          </h2>
          <p className="text-xs font-semibold text-[#8a92a0]">{equipment}</p>
          <div className="flex flex-wrap items-center gap-3 pt-1.5 text-xs text-soft">
            <span className="flex items-center gap-1.5"><ClockIcon /> {duration} min</span>
            <span className="flex items-center gap-1"><FlameIcon /> {caloriesBurned} kcal</span>
            <span className="flex items-center gap-1"><StarIcon /> {rating}</span>
          </div>
        </div>
      </div>

      {/* Right: buttons */}
      <div className="flex items-center gap-3 sm:shrink-0">
        <Link
          href={`/workouts/${id}`}
          className="rounded-full border border-btn-line px-5 py-2 text-xs text-white transition hover:bg-white/5"
        >
          View Details
        </Link>

        {showDone &&
          (isDone ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-neon-soft px-4 py-2 text-xs font-semibold text-neon">
              <CheckIcon />
              Done
            </span>
          ) : (
            <button
              onClick={() => onDone(workout)}
              className="inline-flex items-center gap-1.5 rounded-full bg-neon px-4 py-2 text-xs font-semibold text-black transition hover:brightness-110"
            >
              <CheckIcon />
              Mark as Done
            </button>
          ))}

        <button
          onClick={() => onRemove(workout)}
          aria-label={`Remove ${name}`}
          className="ml-auto rounded-full p-1.5 text-[#8a92a0] transition hover:bg-white/5 hover:text-white sm:ml-0"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
    </article>
  );
}