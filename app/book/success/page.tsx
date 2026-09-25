"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();

  const service = searchParams.get("service") || "Your service";
  const date = searchParams.get("date") || "Your date";
  const time = searchParams.get("time") || "Your time";
  const name = searchParams.get("name") || "Customer";

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl text-center">

        {/* Brand */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
          Fade District
        </p>

        {/* Success icon */}
        <div className="mx-auto mt-12 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900">
          <svg
            className="h-9 w-9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="mt-8 text-3xl font-bold tracking-tight sm:text-4xl">
          Booking confirmed
        </h1>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-400 sm:text-base">
          Thanks, {name}. Your appointment has been successfully booked.
        </p>

        {/* Booking summary */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 text-left">

          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Appointment details
            </p>

            <div className="mt-6 space-y-5">

              <div>
                <p className="text-xs text-zinc-500">Service</p>
                <p className="mt-1 text-lg font-semibold">
                  {service}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Date</p>
                  <p className="mt-1 font-medium">
                    {date}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Time</p>
                  <p className="mt-1 font-medium">
                    {time}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-zinc-800 bg-zinc-900/40 px-6 py-4 sm:px-7">
            <p className="text-center text-xs text-zinc-500">
              Please arrive a few minutes before your appointment.
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          We look forward to seeing you at Fade District.
        </p>

      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-5 py-12 text-white">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Fade District
            </p>

            <h1 className="mt-8 text-3xl font-bold">
              Loading...
            </h1>
          </div>
        </main>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}