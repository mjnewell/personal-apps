# Supabase Schema Structure

**Project:** `avbwykhmzuvtglqmkaqu` (personal-apps)  
**URL:** https://avbwykhmzuvtglqmkaqu.supabase.co

---

## Schema Overview

Each app has its own Postgres schema. Tables are isolated by schema to prevent collisions.

```
Supabase Project
└── public (system tables only)
├── eisenhower (Eisenhower Planner)
│   ├── tasks
│   ├── channels
│   └── user_settings
├── todoapp (To-Do App) [Planned]
│   ├── tasks
│   ├── projects
│   └── labels
├── habits (Habit Tracker) [Planned]
│   ├── habits
│   ├── logs
│   └── streaks
└── [future apps...]
```

---

## Apps & Their Schemas

| App Name | Schema Name | Status | Tables | Location |
|----------|-------------|--------|--------|----------|
| **Eisenhower Planner** | `eisenhower` | ✅ Live | 3 | `apps/Eisenhower_Planner/` |
| **To-Do App** | `todoapp` | ⏳ Planned | 3 | `apps/TodoApp/` |
| **Habit Tracker** | `habits` | ⏳ Planned | 3 | `apps/HabitTracker/` |
| — | — | — | — | — |

---

## How to View in Supabase UI

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Open project `personal-apps`
3. Go to **SQL Editor**
4. Top-left dropdown: select a schema (`eisenhower`, `todoapp`, etc.)
5. View tables for that app only

---

## How to Add a New App

1. Create a new folder in `apps/YourNewApp/`
2. Create `supabase/migrations/001_init_<app>_schema.sql` with your schema
3. Define your schema using the pattern: `CREATE SCHEMA <app_name>; CREATE TABLE <app_name>.<table_name> (...)`
4. Update this file with the new app's row
5. Commit and push
6. Run the migration in Supabase SQL Editor

---

## Naming Conventions

**Schemas:** lowercase, no spaces  
- ✅ `eisenhower`, `todoapp`, `habit_tracker`
- ❌ `Eisenhower`, `todo app`, `HabitTracker`

**Tables (within schema):** lowercase, underscores  
- ✅ `tasks`, `user_settings`, `habit_logs`
- ❌ `Tasks`, `UserSettings`, `habitLogs`

**Columns:** lowercase, underscores  
- ✅ `user_id`, `created_at`, `completed_at`
- ❌ `userId`, `createdAt`, `user_ID`

---

## Data Isolation

Each user sees only their own data via **Row Level Security (RLS)** policies:

```sql
-- Example from eisenhower schema
CREATE POLICY "users_see_own_tasks" ON eisenhower.tasks
  FOR ALL USING (auth.uid() = user_id);
```

This means even if someone accesses the database directly, they can only see their own rows.

---

## Backup & Recovery

All schemas are backed up together in the Supabase project. To back up:

1. Supabase Dashboard → **Backups** tab
2. Create manual backup before major changes
3. All app data is included

---

## Questions?

See the per-app docs in `docs/APPS.md` or check the app's README in its folder.
