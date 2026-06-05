# Personal Apps — Detailed Documentation

Quick links to each app's documentation and live status.

---

## 🎯 Eisenhower Planner

**Status:** ✅ Live  
**Folder:** `apps/Eisenhower_Planner/`  
**Schema:** `eisenhower`  
**GitHub:** https://github.com/mjnewell/personal-apps/tree/main/apps/Eisenhower_Planner

### What It Does
Task prioritization using the Eisenhower Matrix (Urgent/Important quadrants). Organize tasks into:
- **Do** (Urgent & Important)
- **Schedule** (Not Urgent & Important)
- **Delegate** (Urgent & Not Important)
- **Drop** (Not Urgent & Not Important)

### Tables
- `eisenhower.tasks` — User tasks with quadrant, scheduling, completion
- `eisenhower.channels` — 3 customizable labels for Schedule quadrant
- `eisenhower.user_settings` — User preferences (timezone, week start)

### Tech Stack
- Frontend: Next.js 14 + React 18 + TypeScript
- Backend: Supabase (PostgreSQL)
- Hosting: Vercel

### To Deploy
```bash
cd apps/Eisenhower_Planner
npm install
vercel
```

### README
See `apps/Eisenhower_Planner/README.md` for full setup & usage guide.

---

## 📝 To-Do App

**Status:** ⏳ Planned  
**Folder:** `apps/TodoApp/`  
**Schema:** `todoapp`

*Coming soon. Will include task lists, projects, and collaboration.*

---

## 🔥 Habit Tracker

**Status:** ⏳ Planned  
**Folder:** `apps/HabitTracker/`  
**Schema:** `habits`

*Coming soon. Will track daily habits with streaks and analytics.*

---

## 🆕 Add a New App

1. Create a folder: `apps/MyNewApp/`
2. Create the schema migration: `apps/MyNewApp/supabase/migrations/001_init_mynewapp_schema.sql`
3. Set up the app code (Next.js, React, etc.)
4. Update `docs/SCHEMA_STRUCTURE.md` with the new app
5. Push to GitHub
6. Update the root README with a link to the new app

---

## Environment Variables

Each app has its own `.env.example`. Copy to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://avbwykhmzuvtglqmkaqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
```

These are shared across all apps (same Supabase project).

---

## Supabase Project

**URL:** https://app.supabase.com  
**Project ID:** `avbwykhmzuvtglqmkaqu`  
**Project Name:** `personal-apps`

### Access
All apps use the same Supabase project and auth. Users are isolated per device via anonymous auth (can upgrade to email/OAuth later).

---

## Deployment Strategy

### Local Development
```bash
cd apps/Eisenhower_Planner
npm install
npm run dev
```

### Production (Vercel)
Each app is a separate Vercel project:
- `eisenhower-planner.vercel.app` (or custom domain)
- `todoapp.vercel.app` (future)
- `habittracker.vercel.app` (future)

Each points to the same Supabase backend, isolated by schema.

---

## Questions?

Check the app's individual README or the schema structure doc.
