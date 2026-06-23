# CareerForge AI

This is a modern web application built with **React**, **Vite**, and **TanStack**. It is fully configured for deployment on Vercel.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- [Bun](https://bun.sh/) (recommended for managing dependencies)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd adept-path-ai-main
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env` (if available) and fill in your Supabase and OpenAI credentials.
   > **Note:** The `.env` file is ignored by Git to prevent exposing your sensitive API keys.

4. Start the development server:
   ```bash
   bun run dev
   ```

## 🛠️ Deployment

This project is configured out-of-the-box for **Vercel**. Please see the [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) file for comprehensive, step-by-step instructions on setting up your database, authentication, and deploying the app.

## 📁 Tech Stack

- **Framework**: React with Vite
- **Routing**: TanStack Router / TanStack Start
- **Styling**: Tailwind CSS & Radix UI primitives
- **Database & Auth**: Supabase
- **Package Manager**: Bun
