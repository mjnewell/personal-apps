# Eisenhower Planner

A clean, modern task prioritization app based on the Eisenhower Matrix (Urgent/Important quadrants).

## Features

- **4-Quadrant Matrix**: Organize tasks by urgency and importance
- **Inbox**: Capture tasks quickly, then prioritize
- **Drag & Drop**: Move tasks between quadrants
- **Channel Labels**: Customize the 3 channels in the "Schedule" quadrant
- **Completed Tasks**: Track what you've finished
- **Real-time Sync**: All data saved to Supabase

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Database**: Supabase (PostgreSQL + Auth)
- **Styling**: CSS with CSS variables
- **Hosting**: Vercel (ready to deploy)

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example` (already configured):
   ```bash
   cp .env.example .env.local
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000

## Usage

### Adding Tasks
Type in the input box and press Enter or click "Add".

### Organizing Tasks
Drag tasks between the four quadrants:
- **Do**: Urgent & Important → tackle these first
- **Schedule**: Not Urgent & Important → calendar for later
- **Delegate**: Urgent & Not Important → hand off
- **Drop**: Not Urgent & Not Important → delete or ignore

### Completing Tasks
Check the box next to any task to mark it complete. It moves to the "Completed" section.

### Channel Labels
In the "Schedule" quadrant, customize the 3 channel labels (e.g., "Projects", "Learning", "Health").

## Deployment

### To Vercel

```bash
vercel
```

The app is already configured for Vercel. It will auto-detect the Next.js setup.

### Environment Variables

Make sure these are set in your Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Database Schema

See `schema.sql` in the repo root for the Postgres schema. Tables:
- `tasks` — User's tasks with quadrant placement, scheduling, completion
- `channels` — Custom labels for the 3 Schedule channels
- `user_settings` — User preferences (timezone, week start, etc.)

All data is isolated per user via Row Level Security (RLS).

## Notes

- Uses Supabase anonymous auth (per-device user)
- All state lives in Supabase, not browser storage
- Styling uses CSS variables for easy theming

## Future Ideas

- Week/month view with time blocking
- Recurring tasks
- Collaborative boards
- Mobile app (React Native)
