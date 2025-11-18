# Helper.ai

Helper.ai is an AI agent platform that allows users to create, manage, and chat with custom AI agents built from personalized base prompts.

---

## Features

- Magic link authentication with Supabase
- Create and store reusable text prompts
- Build custom AI agents from prompts
- Chat with agents using OpenAI
- Client-side session handling
- Responsive UI using TailwindCSS and shadcn/ui

---

## Tech Stack

- **Frontend:** Next.js 14, React 18, TailwindCSS  
- **Backend:** Supabase (Auth + Database), Node.js API routes  
- **AI:** OpenAI API for agent responses  
- **UI Components:** shadcn/ui  

---

## Project Structure

helper-ai/
├── app/
│ ├── layout.tsx
│ ├── page.tsx # Home page
│ ├── login/page.tsx # Login page
│ ├── texts/ # CRUD pages for texts
│ └── agents/ # CRUD pages + chat for agents
├── components/ # UI components (Navbar, Input, Card)
├── lib/
│ ├── supabaseClient.ts # Supabase browser client
│ └── supabaseServer.ts # Supabase server client
├── types/ # TypeScript types
├── .env.local # Environment variables
├── package.json
├── tsconfig.json
└── README.md

yaml

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/helper-ai.git
cd helper-ai
2. Install dependencies
bash
Kopier kode
npm install
3. Set up environment variables
Create a .env.local file in the project root:

env
Kopier kode
# Supabase project URL (browser + server)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT.supabase.co

# Supabase anon key (browser)
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY

# Supabase service role key (server only)
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY

# OpenAI API key
OPENAI_API_KEY=YOUR_OPENAI_KEY
Tip: If using GitHub Codespaces, replace localhost:3000 with your Codespace URL in emailRedirectTo when sending magic links.

4. Run the development server
bash
Kopier kode
npm run dev
Open http://localhost:3000 (or your Codespace URL) in your browser.

Authentication Flow
Users log in via magic link email (Supabase Auth)

Navbar updates to show user email once logged in

Server-side pages do not see the client session; use client components to access user data

Notes on Supabase + Magic Link
Ensure SMTP is enabled in Supabase project settings or use the built-in email delivery.

Set the redirect URL to your Codespace or localhost.

Use supabase.auth.onAuthStateChange in client components to detect login state.

License
MIT License

Optional Enhancements
Add screenshots of the UI

Include a .env.example file for developers

Add tests for API routes

Extend with agent builder customization