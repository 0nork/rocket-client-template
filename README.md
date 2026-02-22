# Wall Works Hardscape

Professional website for **Wall Works** — expert retaining walls, stone masonry, and hardscape services in **Westmoreland County**.

Powered by **Google Workspace as CMS**, **Gemini AI** for content generation, **CRO9** for analytics & SXO behavioral tracking, and CRM integration.

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **Tailwind CSS 4**
- **Google Sheets** as content database
- **Google Drive** for media storage
- **Gemini AI** for content generation
- **CRO9** analytics + SXO behavioral tracking
- **CRM** OAuth integration

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in environment variables
npm run dev
```

## Full Deployment Guide

See [DEPLOY.md](./DEPLOY.md) for the complete step-by-step deployment process.

## Project Structure

```
app/           Public pages + admin dashboard + API routes
components/    Site, admin, and UI components
lib/           Google, Gemini, CRM, CRO9 integrations
config/        Site config + Sheets schema
client/        Client-specific files (protected from template updates)
```

## Features

- **Onboarding Wizard** — 7-step AI-powered setup at `/admin/setup`
- **CRO9 Analytics** — Visitor tracking, page views, bounce rate, session duration
- **SXO Panel** — Scroll depth, rage clicks, dead clicks, form abandonment, AI recommendations
- **AI Content Generator** — Blog posts, service descriptions, FAQs via Gemini
- **Custom Apps** — JSON-driven calculators, wizards, and tools at `/tools/[slug]`
- **Admin Dashboard** — Content editor, media uploader, analytics viewer, settings

## Domain

[wallworkshardscape.com](https://wallworkshardscape.com)
