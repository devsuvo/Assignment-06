"use client";

import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved, maxPlan } = usePlan();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);

  const handleAddToPlan = () => {
    const result = addToPlan(workout);
    if (result === "added") toast.success("Added to today's plan");
    if (result === "exists") toast("Already in today's plan");
    if (result === "full") toast.error(`Today's plan is full (max ${maxPlan})`);
  };

  const handleSave = () => {
    const result = saveForLater(workout);
    if (result === "added") toast.success("Saved for later");
    if (result === "exists") toast("Already saved");
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={handleAddToPlan}
        className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold shadow-md shadow-black transition ${
          inPlan ? "bg-neon-soft text-neon" : "bg-neon text-ink hover:brightness-110"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {inPlan ? <path d="M20 6 9 17l-5-5" /> : <path d="M12 5v14M5 12h14" />}
        </svg>
        {inPlan ? "Added to today's plan" : "Add to today's plan"}
      </button>

      <button
        onClick={handleSave}
        className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-medium transition ${
          saved ? "border-neon/40 text-neon" : "border-btn-line text-light hover:border-muted hover:bg-white/5"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}