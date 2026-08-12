import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6">
      <div className="text-center">
        <h1 className="text-7xl font-black text-[var(--text)]">404</h1>

        <p className="mt-4 text-lg text-[var(--muted)]">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-[var(--primary)] px-8 py-3 font-semibold text-[var(--text)] transition hover:bg-[var(--primary-hover)]"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}