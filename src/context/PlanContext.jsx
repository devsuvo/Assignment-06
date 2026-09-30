"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);
const MAX_PLAN = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan")) || []);
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved")) || []);
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [plan, saved, loaded]);

  const isInPlan = (id) => plan.some((w) => w.id === id);
  const isSaved = (id) => saved.some((w) => w.id === id);

  const addToPlan = (workout) => {
    if (isInPlan(workout.id)) return "exists";
    if (plan.length >= MAX_PLAN) return "full";
    setPlan((prev) => [...prev, workout]);
    return "added";
  };

  const saveForLater = (workout) => {
    if (isSaved(workout.id)) return "exists";
    setSaved((prev) => [...prev, workout]);
    return "added";
  };

  const removeFromPlan = (id) => setPlan((prev) => prev.filter((w) => w.id !== id));
  const removeFromSaved = (id) => setSaved((prev) => prev.filter((w) => w.id !== id));

  return (
    <PlanContext.Provider
      value={{ plan, saved, loaded, maxPlan: MAX_PLAN, isInPlan, isSaved, addToPlan, saveForLater, removeFromPlan, removeFromSaved }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}