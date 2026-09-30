# 🏋️ FitLog — Workout Library

**Train with intent. Log every set.**

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of twelve lifts covering every major muscle group, check the details of each exercise, lock up to five lifts into today's plan, save others for later, and watch the day's minutes and calories add up.

🔗 **Live Site:** _coming soon_

---

## ✨ Key Features

1. **Workout Library** — 12 workouts fetched from a live API, shown as responsive cards (3×4 grid on desktop) with muscle group tags, equipment, duration, calories, and rating.
2. **Workout Details Page** — dynamic route (`/workouts/[id]`) with a large illustration, key specs panel (equipment, difficulty, sets, reps, duration, calories, rating), and step-by-step instructions.
3. **Today's Plan (max 5)** — add workouts to today's plan with toast feedback; duplicates are blocked and the plan is capped at five lifts.
4. **Save for Later** — bookmark workouts into a separate Saved tab, with live Plan and Saved counters in the navbar.
5. **My Plan Dashboard** — live metrics (exercises, minutes, calories), Today's Plan / Saved tabs, sort by duration, calories, or rating, "Mark as Done", and remove actions.
6. **Persistent Data** — plan, saved, and done items are stored in `localStorage`, so nothing is lost on refresh.
7. **Fully Responsive** — works smoothly on mobile, tablet, and desktop.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | UI and page navigation |
| [React 19](https://react.dev/) | Components, state, and Context API |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling and responsiveness |
| [daisyUI 5](https://daisyui.com/) | Component library (theme and loading spinner) |
| [react-hot-toast](https://react-hot-toast.com/) | Toast notifications |
| next/font (Oswald + Inter) | Optimized Google Fonts |
| Vercel | Deployment |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js            # Root layout (Navbar, Footer, Providers)
│   ├── page.js              # Home page (Hero + Library)
│   ├── my-plan/page.js      # My Plan page
│   └── workouts/[id]/page.js # Workout details page
├── components/              # Navbar, Hero, WorkoutCard, PlanItem, Footer...
├── context/PlanContext.jsx  # Global plan / saved / done state
└── lib/api.js               # API helpers with backup endpoint
```

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/devsuvo/Assignment-06.git
cd Assignment-06

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API

- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`
- Backup: `https://api.api-store.workers.dev/api/fitlog`

---

© 2026 FitLog — Workout Library. Train hard, log honest.