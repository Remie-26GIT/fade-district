export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">

        {/* Header */}
        <header className="flex items-center justify-between py-7">
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              FADE DISTRICT
            </h1>

            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-600">
              Premium Barbering
            </p>
          </div>

          <span className="hidden text-sm text-zinc-500 sm:block">
            Cape Town
          </span>
        </header>

        {/* Hero */}
        <section className="flex min-h-[650px] items-center py-20 sm:py-28">
          <div className="max-w-4xl">

            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Premium Barbering · Cape Town
            </p>

            <h2 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              Your next cut
              <span className="block text-zinc-500">
                starts here.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">
              Book your appointment at Fade District in just a few clicks.
              Choose your service, pick your time, and you're sorted.
            </p>

            <a
              href="/book"
              className="mt-9 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
            >
              Book an appointment
            </a>

          </div>
        </section>

        {/* Services */}
        <section className="border-t border-zinc-800 py-16 sm:py-20">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                Services
              </p>

              <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                Choose your service.
              </h3>
            </div>

            <p className="text-sm text-zinc-600">
              Simple pricing. No surprises.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-700">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                01
              </p>

              <h4 className="mt-8 text-xl font-semibold">
                Haircut
              </h4>

              <p className="mt-2 text-sm text-zinc-500">
                30 minutes
              </p>

              <p className="mt-8 text-2xl font-bold">
                R150
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-700">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                02
              </p>

              <h4 className="mt-8 text-xl font-semibold">
                Haircut + Beard
              </h4>

              <p className="mt-2 text-sm text-zinc-500">
                45 minutes
              </p>

              <p className="mt-8 text-2xl font-bold">
                R200
              </p>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 transition hover:border-zinc-700">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
                03
              </p>

              <h4 className="mt-8 text-xl font-semibold">
                Beard Trim
              </h4>

              <p className="mt-2 text-sm text-zinc-500">
                20 minutes
              </p>

              <p className="mt-8 text-2xl font-bold">
                R100
              </p>
            </div>

          </div>
        </section>

        {/* How it works */}
        <section className="border-t border-zinc-800 py-16 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            How it works
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-3">

            <div>
              <span className="text-sm text-zinc-600">
                01
              </span>

              <h4 className="mt-3 text-lg font-semibold">
                Choose a service
              </h4>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Pick the service that works for you.
              </p>
            </div>

            <div>
              <span className="text-sm text-zinc-600">
                02
              </span>

              <h4 className="mt-3 text-lg font-semibold">
                Pick your time
              </h4>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Select an available date and time.
              </p>
            </div>

            <div>
              <span className="text-sm text-zinc-600">
                03
              </span>

              <h4 className="mt-3 text-lg font-semibold">
                You're booked
              </h4>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Confirm your details and you're all set.
              </p>
            </div>

          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-zinc-800 py-20 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
            Ready when you are
          </p>

          <h3 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
            Good cuts shouldn't require a complicated booking process.
          </h3>

          <a
            href="/book"
            className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.98]"
          >
            Book your appointment
          </a>
        </section>

        {/* Footer */}
        <footer className="border-t border-zinc-800 py-8 text-sm text-zinc-600">
          © 2026 Fade District
        </footer>

      </div>
    </main>
  );
}