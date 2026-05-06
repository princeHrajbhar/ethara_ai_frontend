"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      
      {/* Navbar */}
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          
          <h1 className="text-2xl font-bold text-indigo-400">
            Dashboard
          </h1>

          <Link
            href="/auth/login"
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium transition hover:bg-red-600"
          >
            Logout
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* Welcome Section */}
        <div className="mb-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-3xl font-bold">
            Welcome to your Dashboard 👋
          </h2>

          <p className="mt-3 text-slate-400">
            Your authentication system is working successfully.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-indigo-400">
              Total Users
            </h3>

            <p className="mt-4 text-4xl font-bold">
              120
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Active platform users
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-green-400">
              Projects
            </h3>

            <p className="mt-4 text-4xl font-bold">
              15
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Running projects
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold text-pink-400">
              Revenue
            </h3>

            <p className="mt-4 text-4xl font-bold">
              $12K
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Monthly revenue
            </p>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-2xl font-bold">
            Recent Activity
          </h2>

          <div className="mt-6 space-y-4">

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-medium">
                User logged into the platform
              </p>

              <span className="text-sm text-slate-400">
                2 minutes ago
              </span>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-medium">
                New project created successfully
              </p>

              <span className="text-sm text-slate-400">
                1 hour ago
              </span>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-medium">
                Payment received from client
              </p>

              <span className="text-sm text-slate-400">
                Yesterday
              </span>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}