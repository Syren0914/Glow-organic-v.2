# Salon Website V2

A modern React + Vite website for a skincare/salon business. The app includes a marketing landing page, a services/menu section backed by Supabase, an admin panel route (`#AdminPanel`), and an AI skincare assistant integration.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Supabase (`@supabase/supabase-js`) for service/menu data
- Google Gemini (`@google/genai`) for AI skincare advice
- `lucide-react` for iconography

## Project Structure

```text
.
├── components/              # UI sections (Hero, Services, Contact, AdminPanel, etc.)
├── services/                # Supabase and Gemini service logic
├── supabase/
│   ├── admin_setup.sql      # SQL setup for admin support
│   └── seed_menu.sql        # Seed data for service menu
├── public/                  # Static assets
├── App.tsx                  # Main app composition + hash-based admin route
└── README.md
```

## Prerequisites

- Node.js 18+ (recommended)
- npm
- (Optional) A Supabase project
- (Optional) A Google Gemini API key

## Environment Variables

Create a `.env.local` file in the project root.

```bash
# Supabase (required for live menu/admin data)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional fallback names (also supported)
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini (optional, for AI skincare advice)
API_KEY=your_gemini_api_key
```

> If Supabase variables are missing, the app falls back to local/default behavior where supported.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Add environment variables to `.env.local`.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the printed local URL (usually `http://localhost:5173`).

## Available Scripts

- `npm run dev` – start Vite dev server
- `npm run build` – create production build
- `npm run preview` – preview production build locally

## Supabase Setup (Optional but Recommended)

If you want live service/admin data:

1. Create a Supabase project.
2. Run SQL scripts in the Supabase SQL editor in this order:
   1. `supabase/admin_setup.sql`
   2. `supabase/seed_menu.sql`
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local`.

## Admin Panel Route

The admin panel is rendered using a hash route:

- Main website: `/`
- Admin panel: `/#AdminPanel`

## Build for Production

```bash
npm run build
```

The output is generated in the `dist/` directory.
