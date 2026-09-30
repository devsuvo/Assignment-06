"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { usePlan } from "@/context/PlanContext";
import PlanItem from "@/components/PlanItem";

const TABS = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

const SORT_OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function MyPlanPage() {
  const { plan, saved, loaded, isDone, markAsDone, removeFromPlan, removeFromSaved } = usePlan();
  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");

  // Metrics (Today's Plan theke)
  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.caloriesBurned, 0);

  const metrics = [
    { label: "Exercises", value: plan.length, highlight: true },
    { label: "Minutes", value: totalMinutes },
    { label: "Calories", value: totalCalories },
  ];

  // Current tab er list + sort
  const list = [...(activeTab === "plan" ? plan : saved)];
  if (sortBy === "duration") list.sort((a, b) => a.duration - b.duration);
  if (sortBy === "calories") list.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);

  const handleDone = (workout) => {
    markAsDone(workout.id);
    toast.success(`${workout.name} marked as done 💪`);
  };

  const handleRemove = (workout) => {
    if (activeTab === "plan") {
      removeFromPlan(workout.id);
      toast(`${workout.name} removed from today's plan`);
    } else {
      removeFromSaved(workout.id);
      toast(`${workout.name} removed from saved`);
    }
  };

  return (
    <section className="mx-auto flex max-w-[1280px] flex-col gap-6 px-6 py-10">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold tracking-[-0.75px] text-white">MY PLAN</h1>
        <p className="text-sm text-[#8a92a0]">Cap of five lifts for today. Finish them, then load more.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 rounded-2xl border border-[#232732] bg-[#13161d] px-4 py-6 sm:px-6 sm:pt-8">
        {metrics.map((metric, index) => (
          <div key={metric.label} className={index !== 0 ? "border-l border-[#232732] pl-4 sm:pl-8" : ""}>
            <p className="mb-1 text-xs text-[#8a92a0]">{metric.label}</p>
            <p className={`font-display text-2xl font-bold sm:text-4xl ${metric.highlight ? "text-[#ccff00]" : "text-white"}`}>
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-fit gap-1 rounded-xl border border-[#232732] bg-[#151921] p-1">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`rounded-lg border px-4 py-1.5 text-xs transition ${
                activeTab === tab.key
                  ? "border-[#2b303d] bg-[#1f242d] font-bold text-white"
                  : "border-transparent text-[#8a92a0] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="sort" className="text-xs text-[#8a92a0]">Sort By</label>
          <div className="relative">
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="cursor-pointer appearance-none rounded-[9px] border border-[#232732] bg-[#13161d] py-2 pl-4 pr-9 text-xs text-white outline-none transition focus:border-neon/50"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <svg
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white"
              width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* List / Loading / Empty */}
      {!loaded ? (
        <div className="flex flex-col items-center gap-3 py-20 text-sm text-[#8a92a0]">
          <span className="loading loading-spinner loading-md text-neon"></span>
          Loading workouts…
        </div>
      ) : list.length === 0 ? (
        <div className="flex flex-col items-center rounded-xl border border-white/10 bg-[#111317]/50 px-4 py-24 text-center">
          <h2 className="pb-2 font-display text-xl font-bold tracking-[0.7px] text-white">NOTHING HERE YET</h2>
          <p className="pb-6 text-xs text-[#a1a1aa]">Browse the library and add a lift to get today moving.</p>
          <Link
            href="/"
            className="rounded-full bg-neon px-6 py-2.5 text-xs font-semibold tracking-[-0.3px] text-black transition hover:brightness-110"
          >
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {list.map((workout) => (
            <PlanItem
              key={workout.id}
              workout={workout}
              showDone={activeTab === "plan"}
              isDone={isDone(workout.id)}
              onDone={handleDone}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </section>
  );
}