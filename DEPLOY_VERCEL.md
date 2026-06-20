# Deploying CareerForge AI to Vercel

This repo is now configured for Vercel self-hosting:

- `vite.config.ts` forces Nitro's `vercel` preset outside Lovable.
- `vercel.json` uses Bun and lets Nitro generate Vercel Build Output API files.
- Resume analysis uses `OPENAI_API_KEY` on Vercel, while still using the managed
  Lovable AI key inside Lovable preview.

> ⚠️ Self-hosting means you must provide your own database/auth/storage project
> and your own AI API key in Vercel.

---

## 1. Push the repo to GitHub

In the Lovable editor click **GitHub → Connect to GitHub** and create a repo,
then import that repo into Vercel ("Add New → Project").

## 2. Create your own Supabase project

1. Create a project at https://supabase.com.
2. In the SQL editor, run every file from `supabase/migrations/` in order
   (oldest first). These create the `profiles`, `user_roles`, `jobs`,
   `applications`, `resumes`, `interviews`, `notifications` tables, the
   `app_role` enum, RLS policies, the `handle_new_user` trigger, and the
   `resumes` storage bucket.
3. Create a **private** storage bucket named `resumes` if it was not created
   automatically by your SQL workflow.
4. In **Authentication → Providers**, enable Email and (optionally) Google.
5. In **Authentication → URL Configuration**, set Site URL to your Vercel URL
   and add it to Redirect URLs.
6. Copy the Project URL and the **publishable / anon** key — you'll need them
   in step 4.

## 3. Add an AI provider key

`src/lib/ai.functions.ts` is already wired to use `OPENAI_API_KEY` when present.
Create an OpenAI API key and add it to Vercel as `OPENAI_API_KEY`.

## 4. Configure Vercel environment variables

In **Vercel → Project → Settings → Environment Variables**, add:

| Name | Value | Notes |
|---|---|---|
| `VITE_SUPABASE_URL` | `https://<ref>.supabase.co` | exposed to client |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | your anon/publishable key | exposed to client |
| `VITE_SUPABASE_PROJECT_ID` | `<ref>` | exposed to client |
| `SUPABASE_URL` | same as above | server functions |
| `SUPABASE_PUBLISHABLE_KEY` | same as above | server functions |
| `SUPABASE_SERVICE_ROLE_KEY` | service role key | server admin only |
| `OPENAI_API_KEY` | OpenAI API key | resume analysis |

Apply them to **Production, Preview, and Development**.

## 5. Deploy

Vercel will run `bun install && bun run build`. The app emits Vercel Build
Output API files under `.vercel/output`, which Vercel deploys automatically.

## 6. Post-deploy checks

- `/auth` sign-up creates a row in `profiles` + `user_roles` (trigger).
- `/resume` upload succeeds (Supabase Storage bucket `resumes` exists & RLS allows owner).
- Resume AI analysis returns a score (your provider key is working).
- `/jobs`, `/applications`, `/interviews`, `/notifications` load with RLS in place.

## Known limitations on Vercel

- The Lovable preview/edit experience only works while the project is hosted
  on Lovable. You can keep both — Lovable hosts the editing copy, Vercel hosts
  the production deploy from GitHub.
- The Cloudflare Workers nodejs_compat surface differs slightly from Vercel's
  Node runtime; if a server function fails, check Vercel's function logs.
- Realtime notifications use the Supabase JS client and work unchanged.
