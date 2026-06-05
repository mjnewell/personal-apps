# Personal Apps

A collection of experimental personal projects, all backed by a single Supabase instance.

## 🚀 Quick Links

- **[Schema Structure](docs/SCHEMA_STRUCTURE.md)** — Visual map of all apps and their databases
- **[Apps Documentation](docs/APPS.md)** — Detailed per-app guides
- **[Eisenhower Planner](apps/Eisenhower_Planner/)** — Live task prioritization app

---

## 📊 Apps Overview

| App | Status | Tech | Schema |
|-----|--------|------|--------|
| [Eisenhower Planner](apps/Eisenhower_Planner/) | ✅ Live | Next.js 14 + Supabase | `eisenhower` |
| To-Do App | ⏳ Planned | Next.js + Supabase | `todoapp` |
| Habit Tracker | ⏳ Planned | Next.js + Supabase | `habits` |

---

## 🗄️ Architecture

**One Supabase Project, Multiple Apps**

Each app has its own database schema to prevent collisions:

```
Supabase (avbwykhmzuvtglqmkaqu)
├── eisenhower (Eisenhower Planner) → Vercel
├── todoapp (To-Do App) → Vercel
└── habits (Habit Tracker) → Vercel
```

All apps share the same Supabase backend but have isolated data per schema and per user.

---

## 🏃 Getting Started

### Run Locally

```bash
cd apps/Eisenhower_Planner
npm install
npm run dev
```

Then open http://localhost:3000

### Deploy to Vercel

```bash
cd apps/Eisenhower_Planner
vercel
```

---

## 📚 Documentation

- **[Schema Structure](docs/SCHEMA_STRUCTURE.md)** — How schemas are organized, how to add new apps
- **[Apps](docs/APPS.md)** — Details for each app, tech stack, deployment
- **[Eisenhower Planner README](apps/Eisenhower_Planner/README.md)** — Feature guide, usage

---

## 🔐 Supabase Setup

**Project:** https://app.supabase.com/projects  
**Project ID:** `avbwykhmzuvtglqmkaqu`

### Environment Variables

Copy `.env.example` → `.env.local` in any app folder:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://avbwykhmzuvtglqmkaqu.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_0Fpu06kWZrWBuX6rQsFNpQ_zw7oxZA6
```

---

## 🆕 Adding a New App

1. Create a folder in `apps/YourNewApp/`
2. Set up Next.js or your preferred framework
3. Create a schema migration in `supabase/migrations/`
4. Update `docs/SCHEMA_STRUCTURE.md` with the new app
5. Deploy to Vercel

See [Schema Structure](docs/SCHEMA_STRUCTURE.md) for detailed steps.

---

## 📋 Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **Hosting:** Vercel
- **Styling:** CSS with CSS variables

---

## 📝 Notes

- Each user is isolated via Row Level Security (RLS)
- Uses anonymous auth (can upgrade to email/OAuth)
- All state lives in Supabase, not browser storage
- Apps are completely independent but share one backend

---

## 📞 Questions?

Check the [docs](docs/) folder or the README in each app's folder.
