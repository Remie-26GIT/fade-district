"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { supabase } from "../../../lib/supabase";

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const service = searchParams.get("service") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const name = searchParams.get("name") || "";
  const phone = searchParams.get("phone") || "";
  const email = searchParams.get("email") || "";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    setLoading(true);
    setError("");

    console.log("BOOKING ATTEMPT:", {
      service,
      date,
      time,
      name,
      phone,
      email,
    });

    const { error } = await supabase.from("bookings").insert({
      service,
      booking_date: date,
      booking_time: time,
      customer_name: name,
      customer_phone: phone,
      customer_email: email || null,
      status: "pending",
    });

    if (error) {
      console.error("BOOKING INSERT ERROR MESSAGE:", error.message);
      console.error("BOOKING INSERT ERROR CODE:", error.code);
      console.error("BOOKING INSERT ERROR DETAILS:", error.details);
      console.error("BOOKING INSERT ERROR HINT:", error.hint);

      setError(error.message);
      setLoading(false);
      return;
    }

    console.log("BOOKING INSERT SUCCESS");

    window.location.assign("/book/success");
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Fade District
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Confirm appointment
        </h1>

        <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-zinc-500">Service</p>
              <p className="mt-1 font-semibold">{service}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Date</p>
              <p className="mt-1 font-semibold">{date}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Time</p>
              <p className="mt-1 font-semibold">{time}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Name</p>
              <p className="mt-1 font-semibold">{name}</p>
            </div>

            <div>
              <p className="text-sm text-zinc-500">Phone</p>
              <p className="mt-1 font-semibold">{phone}</p>
            </div>

            {email && (
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <p className="mt-1 font-semibold">{email}</p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-800 bg-red-950 p-4">
            <p className="font-semibold text-red-400">
              Booking could not be created
            </p>

            <p className="mt-2 text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className="mt-8 w-full rounded-full bg-white px-6 py-4 font-semibold text-black disabled:opacity-50"
        >
          {loading ? "Creating booking..." : "Confirm appointment"}
        </button>
      </div>
    </main>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-6 py-12 text-white">
          Loading...
        </main>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
