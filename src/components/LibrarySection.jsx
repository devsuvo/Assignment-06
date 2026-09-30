import { getWorkouts } from "@/lib/api";
import WorkoutCard from "./WorkoutCard";

export default async function LibrarySection() {
  const workouts = await getWorkouts();

  return (
    <section id="library" className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-16">
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-white">THE LIBRARY</h2>
        <p className="mt-1 text-sm text-muted">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {workouts.length === 0 ? (
        <p className="rounded-2xl border border-card-line bg-card p-8 text-center text-muted">
          Couldn&apos;t load workouts right now. Please try again later.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
}