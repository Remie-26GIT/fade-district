"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { supabase } from "../../../lib/supabase";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const service = searchParams.get("service") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const email = searchParams.get("email") || "";

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    if (!service) {
      setError("Please select a service before confirming.");
      setLoading(false);
      return;
    }

    if (!date || !time) {
      setError("Please select a valid date and time before confirming.");
      setLoading(false);
      return;
    }

    if (!name || !phone) {
      setError("Please provide your name and phone number.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("bookings").insert({
      service,
      booking_date: date,
      booking_time: time,
      customer_name: name,
      customer_phone: phone,
      customer_email: email || null,
    });

    if (error) {
      console.error("BOOKING INSERT ERROR:", error);
      setError(error.message);
      setLoading(false);
      return;
    }

    const params = new URLSearchParams();

    params.set("service", service);
    params.set("date", date);
    params.set("time", time);
    params.set("name", name);

    window.location.href = `/book/success?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-black px-5 py-10 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">

        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Fade District
          </p>

          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Confirm your booking
          </h1>

          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            Take a quick look over your appointment details before confirming.
          </p>
        </div>

        {/* Booking card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">

          {/* Appointment */}
          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Appointment
            </p>

            <div className="mt-5 space-y-5">

              <div>
                <p className="text-xs text-zinc-500">Service</p>
                <p className="mt-1 text-lg font-semibold">
                  {service || "Selected service"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-zinc-500">Date</p>
                  <p className="mt-1 font-medium">
                    {date || "Selected date"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-zinc-500">Time</p>
                  <p className="mt-1 font-medium">
                    {time || "Selected time"}
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="border-t border-zinc-800" />

          {/* Customer */}
          <div className="p-6 sm:p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Your details
            </p>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-xs text-zinc-500">Name</p>
                <p className="mt-1 font-medium">
                  {name || "Your name"}
                </p>
              </div>

              <div>
                <p className="text-xs text-zinc-500">Phone</p>
                <p className="mt-1 font-medium">
                  {phone || "Your phone number"}
                </p>
              </div>

              {email && (
                <div>
                  <p className="text-xs text-zinc-500">Email</p>
                  <p className="mt-1 break-all font-medium">
                    {email}
                  </p>
                </div>
              )}

            </div>
          </div>

          {/* Error */}
          {error && (
            <>
              <div className="border-t border-zinc-800" />

              <div className="p-6 sm:p-7">
                <div className="rounded-2xl border border-red-900/60 bg-red-950/30 p-4">
                  <p className="text-sm font-semibold text-red-400">
                    Booking could not be confirmed
                  </p>

                  <p className="mt-2 text-sm leading-5 text-red-300">
                    {error}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Confirm */}
          <div className="border-t border-zinc-800 p-6 sm:p-7">
            <button
              type="button"
              onClick={handleConfirm}
              disabled={loading}
              className="w-full rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Confirming booking..." : "Confirm booking"}
            </button>

            <p className="mt-3 text-center text-xs text-zinc-600">
              Your appointment details will be saved securely.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-5 py-12 text-white">
          <div className="mx-auto max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Fade District
            </p>

            <h1 className="mt-4 text-3xl font-bold">
              Loading booking...
            </h1>
          </div>
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}