"use client";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorPageProps) {
  console.error(error);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
      <div className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-[var(--card)] p-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-4xl">
          ⚠️
        </div>

        <h1 className="text-4xl font-black text-[var(--text)]">
          Something went wrong
        </h1>

        <p className="mt-4 text-[var(--muted)]">
          An unexpected error occurred while loading this page.
        </p>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-6 overflow-auto rounded-xl bg-black/40 p-4 text-left text-xs text-red-300">
            {error.message}
          </pre>
        )}

        <button
          onClick={reset}
          className="mt-8 rounded-2xl bg-[var(--primary)] px-8 py-3 font-semibold text-[var(--text)] transition hover:bg-[var(--primary-hover)]"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}