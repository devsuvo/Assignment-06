import Image from "next/image";
import { notFound } from "next/navigation";
import { getWorkoutById } from "@/lib/api";
import WorkoutActions from "@/components/WorkoutActions";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);
  return { title: workout ? `${workout.name} — FitLog` : "Workout not found — FitLog" };
}

export default async function WorkoutDetailsPage({ params }) {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) notFound();

  const specs = [
    { label: "EQUIPMENT", value: workout.equipment },
    { label: "DIFFICULTY", value: workout.difficulty },
    { label: "SETS", value: workout.sets },
    { label: "REPS", value: workout.reps },
    { label: "DURATION", value: `${workout.duration} min` },
    { label: "CALORIES", value: `${workout.caloriesBurned} kcal` },
    { label: "RATING", value: workout.rating },
  ];

  return (
    <section className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Left: Image */}
        <div className="relative h-80 overflow-hidden rounded-2xl border border-panel-line bg-media shadow-2xl shadow-black/50 sm:h-[500px] lg:h-[735px]">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            priority
            sizes="(min-width: 1024px) 588px, 100vw"
            className="object-cover"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <h1 className="pb-3 font-display text-4xl font-bold uppercase leading-10 tracking-[-0.9px] text-white">
            {workout.name}
          </h1>

          <p className="pb-5 text-base leading-6 text-muted">{workout.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5 pb-7">
            {workout.muscleGroups.map((group) => (
              <span key={group} className="rounded-full bg-neon px-3.5 py-1 text-xs font-semibold text-ink">
                {group}
              </span>
            ))}
          </div>

          {/* Specs panel */}
          <div className="mb-8 overflow-hidden rounded-2xl border border-panel-line bg-panel">
            {specs.map((spec, index) => (
              <div
                key={spec.label}
                className={`flex items-center justify-between px-6 py-3.5 ${index !== 0 ? "border-t border-row-line" : ""}`}
              >
                <span className="text-xs font-bold tracking-[0.6px] text-muted">{spec.label}</span>
                <span className="text-sm font-medium text-light">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="mb-9">
            <h2 className="mb-4 text-base font-extrabold tracking-[0.8px] text-white">INSTRUCTIONS</h2>
            <ol className="flex flex-col gap-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex text-sm leading-[22.75px]">
                  <span className="shrink-0 pr-2 text-muted">{index + 1}.</span>
                  <span className="text-soft">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Buttons */}
          <WorkoutActions workout={workout} />
        </div>
      </div>
    </section>
  );
}