"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function DetailsContent() {
  const searchParams = useSearchParams();

  const service = searchParams.get("service") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+27");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handlePhoneChange = (value: string) => {
    if (!value.startsWith("+27")) {
      value = "+27" + value.replace(/\D/g, "");
    }

    const numbersOnly = value.slice(3).replace(/\D/g, "");

    setPhone("+27" + numbersOnly.slice(0, 9));
    setError("");
  };

  const handleContinue = () => {
    setError("");

    if (!name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    const phoneDigits = phone.slice(3);

    if (phoneDigits.length !== 9) {
      setError("Please enter a valid South African phone number.");
      return;
    }

    if (email.trim()) {
      const emailIsValid =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

      if (!emailIsValid) {
        setError("Please enter a valid email address.");
        return;
      }
    }

    const params = new URLSearchParams();

    params.set("service", service);
    params.set("date", date);
    params.set("time", time);
    params.set("name", name.trim());
    params.set("phone", phone.trim());
    params.set("email", email.trim());

    window.location.assign(`/book/confirmation?${params.toString()}`);
  };

  const phoneComplete = phone.slice(3).length === 9;

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">

        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Fade District
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Your details
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
          Enter your details to complete your booking.
        </p>

        <div className="mt-8 space-y-5">

          {/* Full name */}
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Full name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="Your name"
              autoComplete="name"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Phone number
            </label>

            <input
              type="tel"
              value={phone}
              onChange={(event) => handlePhoneChange(event.target.value)}
              placeholder="+27 82 123 4567"
              inputMode="tel"
              autoComplete="tel"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white"
            />

            <p className="mt-2 text-xs text-zinc-600">
              South African numbers only
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-zinc-300">
              Email <span className="text-zinc-600">(optional)</span>
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              autoComplete="email"
              className="mt-2 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none placeholder:text-zinc-600 focus:border-white"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-4">
              <p className="text-sm text-red-300">
                {error}
              </p>
            </div>
          )}

          {/* Continue */}
          <button
            type="button"
            onClick={handleContinue}
            disabled={!name.trim() || !phoneComplete}
            className={`w-full rounded-full px-6 py-4 font-semibold transition ${
              name.trim() && phoneComplete
                ? "bg-white text-black hover:bg-zinc-200 active:scale-[0.99]"
                : "cursor-not-allowed bg-zinc-800 text-zinc-500"
            }`}
          >
            Continue
          </button>

        </div>
      </div>
    </main>
  );
}

export default function DetailsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-5 py-12 text-white">
          <div className="mx-auto max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Fade District
            </p>

            <h1 className="mt-8 text-3xl font-bold">
              Loading details...
            </h1>
          </div>
        </main>
      }
    >
      <DetailsContent />
    </Suspense>
  );
}