"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Booking = {
  id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  status: string | null;
};

export default function AdminPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState("");

  async function loadBookings() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("booking_date", { ascending: true })
      .order("booking_time", { ascending: true });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    setError("");

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    if (error) {
      setError(error.message);
      setUpdating("");
      return;
    }

    setBookings((current) =>
      current.map((booking) =>
        booking.id === id ? { ...booking, status } : booking
      )
    );

    setUpdating("");
  }

  useEffect(() => {
    loadBookings();
  }, []);

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Fade District
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              Bookings
            </h1>

            <p className="mt-3 text-zinc-400">
              Manage customer appointments.
            </p>
          </div>

          <button
            type="button"
            onClick={loadBookings}
            className="rounded-full border border-zinc-700 px-5 py-2 font-semibold hover:bg-zinc-900"
          >
            Refresh
          </button>
        </div>

        {error && (
          <div className="mt-8 rounded-xl border border-red-800 bg-red-950 p-4">
            <p className="font-semibold text-red-400">
              Something went wrong
            </p>
            <p className="mt-2 text-sm text-red-300">
              {error}
            </p>
          </div>
        )}

        {loading ? (
          <p className="mt-10 text-zinc-400">
            Loading bookings...
          </p>
        ) : bookings.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">
              No bookings yet
            </h2>
            <p className="mt-2 text-zinc-400">
              New bookings will appear here.
            </p>
          </div>
        ) : (
          <div className="mt-10 space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {booking.customer_name}
                    </h2>

                    <p className="mt-2 text-zinc-400">
                      {booking.service}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-zinc-500">
                      Appointment
                    </p>

                    <p className="mt-1 font-semibold">
                      {booking.booking_date}
                    </p>

                    <p className="text-zinc-400">
                      {booking.booking_time}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-zinc-500">
                      Contact
                    </p>

                    <p className="mt-1">
                      {booking.customer_phone}
                    </p>

                    {booking.customer_email && (
                      <p className="mt-1 text-sm text-zinc-400">
                        {booking.customer_email}
                      </p>
                    )}
                  </div>

                  <div>
                    <span className="rounded-full bg-yellow-500/10 px-3 py-1 text-sm text-yellow-400">
                      {booking.status || "pending"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => updateStatus(booking.id, "confirmed")}
                    disabled={updating === booking.id}
                    className="rounded-full bg-white px-5 py-2 font-semibold text-black disabled:opacity-50"
                  >
                    {updating === booking.id ? "Updating..." : "Confirm"}
                  </button>

                  <button
                    type="button"
                    onClick={() => updateStatus(booking.id, "cancelled")}
                    disabled={updating === booking.id}
                    className="rounded-full border border-zinc-700 px-5 py-2 font-semibold text-white hover:bg-zinc-800 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
