import Link from "next/link";
import {
  Package,
  Heart,
  User,
  MapPin,
  ChevronRight,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AccountPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--text)]">
        Please sign in to access your account.
      </div>
    );
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      orders: true,
      wishlist: true,
      addresses: true,
    },
  });

  if (!dbUser) {
    return null;
  }

  const cards = [
    {
      title: "My Orders",
      value: dbUser.orders.length,
      icon: Package,
      href: "/orders",
    },
    {
      title: "Wishlist",
      value: dbUser.wishlist.length,
      icon: Heart,
      href: "/wishlist",
    },
    {
      title: "Addresses",
      value: dbUser.addresses.length,
      icon: MapPin,
      href: "/account/addresses",
    },
    {
      title: "Profile",
      value: "Manage",
      icon: User,
      href: "/account/profile",
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="mb-12">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--primary)]">
            My Account
          </p>

          <h1 className="mt-4 text-5xl font-black text-[var(--text)]">
            Welcome,
            <br />
            {dbUser.name ?? "Customer"}
          </h1>

          <p className="mt-4 text-[var(--muted)]">
            {dbUser.email}
          </p>
        </div>


        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link
                key={card.title}
                href={card.href}
                className="group rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition hover:border-[var(--primary)]/30 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="rounded-2xl bg-[var(--primary)]/10 p-4 text-[var(--primary)]">
                    <Icon size={26} />
                  </div>

                  <ChevronRight className="text-neutral-600 transition group-hover:text-[var(--primary)]" />
                </div>

                <h2 className="mt-8 text-2xl font-bold text-[var(--text)]">
                  {card.value}
                </h2>

                <p className="mt-2 text-[var(--muted)]">
                  {card.title}
                </p>
              </Link>
            );
          })}
        </div>


        <div className="mt-12 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8">
          <h2 className="text-2xl font-bold text-[var(--text)]">
            Recent Activity
          </h2>

          <p className="mt-4 text-[var(--muted)]">
            Total Orders: {dbUser.orders.length}
          </p>

          <p className="mt-2 text-[var(--muted)]">
            Wishlist Items: {dbUser.wishlist.length}
          </p>

          <p className="mt-2 text-[var(--muted)]">
            Saved Addresses: {dbUser.addresses.length}
          </p>
        </div>

      </div>
    </main>
  );
}