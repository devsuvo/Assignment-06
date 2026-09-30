const PRIMARY_API = "https://api.abcz.workers.dev/api/fitlog";
const BACKUP_API = "https://api.api-store.workers.dev/api/fitlog";

async function fetchJSON(url) {
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
}

// Sob workout (Home page er jonno)
export async function getWorkouts() {
  try {
    return await fetchJSON(PRIMARY_API);
  } catch {
    try {
      return await fetchJSON(BACKUP_API);
    } catch {
      return [];
    }
  }
}

// Ekta workout (Details page er jonno)
export async function getWorkoutById(id) {
  try {
    const data = await fetchJSON(`${PRIMARY_API}/${id}`);
    if (data && data.id) return data;
    throw new Error("Invalid data");
  } catch {
    const all = await getWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  }
}