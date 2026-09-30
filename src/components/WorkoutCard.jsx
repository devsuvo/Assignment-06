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

export default function WorkoutCard({ workout }) {
  const { id, name, image, muscleGroups, equipment, duration, caloriesBurned, rating } = workout;

  return (
    <Link
      href={`/workouts/${id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-card-line bg-card transition duration-300 hover:-translate-y-1 hover:border-neon/40"
    >
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1024px) 395px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {muscleGroups.map((group) => (
            <span
              key={group}
              className="rounded-full bg-neon px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.55px] text-black"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Name */}
        <h3 className="mt-1 py-2 font-display text-lg font-bold uppercase leading-7 tracking-[0.45px] text-white">
          {name}
        </h3>

        {/* Equipment */}
        <p className="text-xs text-muted">{equipment}</p>

        {/* Stats */}
        <div className="mt-auto pt-4">
          <div className="flex items-center gap-4 border-t border-divider pt-3 text-xs text-muted">
            <span className="flex items-center gap-1.5"><ClockIcon /> {duration} min</span>
            <span className="flex items-center gap-1.5"><FlameIcon /> {caloriesBurned} kcal</span>
            <span className="flex items-center gap-1.5"><StarIcon /> {rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}