"use client";

export default function WorkoutActions({ workout }) {
  const handleAddToPlan = () => {
    // Porer step e ashol logic boshbe
    console.log("Add to plan:", workout.name);
  };

  const handleSave = () => {
    // Porer step e ashol logic boshbe
    console.log("Save for later:", workout.name);
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={handleAddToPlan}
        className="inline-flex items-center gap-2 rounded-xl bg-neon px-6 py-3 text-sm font-semibold text-ink shadow-md shadow-black transition hover:brightness-110"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
        Add to today&apos;s plan
      </button>

      <button
        onClick={handleSave}
        className="inline-flex items-center gap-2 rounded-xl border border-btn-line px-6 py-3 text-sm font-medium text-light transition hover:border-muted hover:bg-white/5"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
        Save for later
      </button>
    </div>
  );
}