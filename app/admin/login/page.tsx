"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while signing in."
      );
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-md">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Fade District
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Barber Login
        </h1>

        <p className="mt-3 text-zinc-400">
          Sign in to manage your bookings.
        </p>

        <form onSubmit={handleLogin} className="mt-10 space-y-5">
          <div>
            <label className="text-sm text-zinc-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="text-sm text-zinc-400">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={loading}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your password"
            />
          </div>

          {error && (
            <div className="rounded-xl border border-red-800 bg-red-950 p-4">
              <p className="text-sm text-red-300">
                {error}
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-white px-6 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
