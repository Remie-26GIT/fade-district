"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function getLocalDateString() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function DateTimeContent() {
  const searchParams = useSearchParams();
  const service = searchParams.get("service") || "";

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const times = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

  const todayString = getLocalDateString();

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const maxDateString = `${maxDate.getFullYear()}-${String(
    maxDate.getMonth() + 1
  ).padStart(2, "0")}-${String(maxDate.getDate()).padStart(2, "0")}`;

  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(selectedDate) &&
    selectedDate >= todayString &&
    selectedDate <= maxDateString;

  const canContinue =
    service !== "" &&
    validDate &&
    selectedTime !== "";

  const continueToDetails = () => {
    if (!canContinue) return;

    const params = new URLSearchParams({
      service,
      date: selectedDate,
      time: selectedTime,
    });

    window.location.assign(`/book/details?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Fade District
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Choose a date & time
        </h1>

        <p className="mt-3 text-zinc-400">
          Select when you would like your appointment.
        </p>

        <div className="mt-10">
          <label className="block text-sm font-medium text-zinc-300">
            Date
          </label>

          <input
            type="date"
            value={selectedDate}
            min={todayString}
            max={maxDateString}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="mt-3 w-full rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-4 text-white outline-none focus:border-white"
          />

          <p className="mt-2 text-xs text-zinc-500">
            Choose a date within the next year.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium text-zinc-300">
            Available times
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {times.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTime(time)}
                className={`rounded-xl border px-4 py-3 transition ${
                  selectedTime === time
                    ? "border-white bg-white text-black"
                    : "border-zinc-800 bg-zinc-900 text-white hover:border-zinc-600"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={continueToDetails}
            disabled={!canContinue}
            className={`w-full rounded-full px-6 py-4 font-semibold transition ${
              canContinue
                ? "bg-white text-black hover:bg-zinc-200"
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

export default function DateTimePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-black px-6 py-12 text-white">
          <div className="mx-auto max-w-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
              Fade District
            </p>

            <h1 className="mt-4 text-4xl font-bold">
              Loading...
            </h1>
          </div>
        </main>
      }
    >
      <DateTimeContent />
    </Suspense>
  );
}
