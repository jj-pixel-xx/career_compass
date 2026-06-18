# Career Compass AI

A responsive Vite + React prototype for Career Compass AI: an AI-powered career discovery and application tracking platform for university students and young professionals.

## Features

- Landing page
- Career DNA behavioural assessment
- Career Match results with compass dial visual
- Career Explorer for Finance, Consulting and Technology roles
- 12-month Roadmap
- Application Tracker with add modal and filters
- Optional Bazi insight framing as a secondary reflective layer

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal, usually `http://localhost:5173`.

## Build

```bash
npm run build
```

The production files will be generated in `dist/`.

## Cloudflare Pages settings

Use these settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/` if `package.json` is at the top level of your repo

If your files are inside a folder such as `career-compass-full`, set Root directory to that folder name.
