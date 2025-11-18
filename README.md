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
