"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);
const MAX_PLAN = 5;

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // Page khulle localStorage theke data ana
  useEffect(() => {
    try {
      setPlan(JSON.parse(localStorage.getItem("fitlog-plan")) || []);
      setSaved(JSON.parse(localStorage.getItem("fitlog-saved")) || []);
      setDone(JSON.parse(localStorage.getItem("fitlog-done")) || []);
    } catch {}
    setLoaded(true);
  }, []);

  // Data bodlale localStorage e save
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    localStorage.setItem("fitlog-done", JSON.stringify(done));
  }, [plan, saved, done, loaded]);

  const isInPlan = (id) => plan.some((w) => w.id === id);
  const isSaved = (id) => saved.some((w) => w.id === id);
  const isDone = (id) => done.includes(id);

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

  const markAsDone = (id) => {
    setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const removeFromPlan = (id) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDone((prev) => prev.filter((doneId) => doneId !== id));
  };

  const removeFromSaved = (id) => setSaved((prev) => prev.filter((w) => w.id !== id));

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        loaded,
        maxPlan: MAX_PLAN,
        isInPlan,
        isSaved,
        isDone,
        addToPlan,
        saveForLater,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  return useContext(PlanContext);
}