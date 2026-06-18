# Career Compass AI

A responsive MVP prototype for an AI-powered career discovery and application tracking platform.

## What it includes

- Homepage
- Career DNA assessment form
- Career Match dashboard with compass visual
- Optional Bazi / Life Pattern insight card
- Career Explorer for Finance, Consulting and Technology roles
- Skill Gap Analysis + 12-month Roadmap
- Application Tracker with filtering and add-application modal

## Tech stack

- React
- Vite
- CSS
- lucide-react icons

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal.

## Build for production

```bash
npm run build
```

## Deploy to Vercel

1. Push this folder to GitHub.
2. Go to Vercel.
3. Import the GitHub repo.
4. Framework preset: Vite.
5. Build command: `npm run build`.
6. Output directory: `dist`.

## Next steps

- Add Supabase Auth
- Save Career DNA responses to Supabase
- Save applications to Supabase
- Replace mock matching logic with OpenAI or rule-based scoring
- Add real Bazi API later, keeping it optional and framed as reflective insight
