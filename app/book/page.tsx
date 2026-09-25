"use client";

import { useState } from "react";

const services = [
  {
    name: "Classic Haircut",
    description: "A clean, classic cut tailored to you.",
    duration: "45 min",
    price: "R150",
  },
  {
    name: "Fade",
    description: "A sharp fade with a clean finish.",
    duration: "45 min",
    price: "R180",
  },
  {
    name: "Haircut & Beard",
    description: "Haircut with a professional beard trim.",
    duration: "60 min",
    price: "R220",
  },
];

export default function BookPage() {
  const [selectedService, setSelectedService] = useState("");

  const continueToDateTime = () => {
    if (!selectedService) return;

    const params = new URLSearchParams({
      service: selectedService,
    });

    window.location.assign(`/book/date-time?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-[0.25em] text-zinc-500">
          Fade District
        </p>

        <h1 className="mt-4 text-4xl font-bold">
          Choose your service
        </h1>

        <p className="mt-3 text-zinc-400">
          Select the haircut or service you would like to book.
        </p>

        <div className="mt-10 space-y-4">
          {services.map((service) => {
            const selected = selectedService === service.name;

            return (
              <button
                key={service.name}
                type="button"
                onClick={() => setSelectedService(service.name)}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selected
                    ? "border-white bg-white text-black"
                    : "border-zinc-800 bg-zinc-900 text-white hover:border-zinc-600"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {service.name}
                    </h2>

                    <p
                      className={`mt-1 text-sm ${
                        selected ? "text-zinc-600" : "text-zinc-400"
                      }`}
                    >
                      {service.description}
                    </p>

                    <p
                      className={`mt-3 text-sm ${
                        selected ? "text-zinc-600" : "text-zinc-500"
                      }`}
                    >
                      {service.duration}
                    </p>
                  </div>

                  <p className="text-lg font-semibold">
                    {service.price}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={continueToDateTime}
            disabled={!selectedService}
            className={`w-full rounded-full px-6 py-4 font-semibold transition ${
              selectedService
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
