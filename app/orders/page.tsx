import Link from "next/link";
import { redirect } from "next/navigation";
import {
  Package,
  Calendar,
  ChevronRight,
} from "lucide-react";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: user.id,
    },
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 py-20 text-[var(--text)]">
      <div className="mx-auto max-w-6xl">

        <div className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
            Account
          </p>

          <h1 className="mt-3 text-5xl font-black tracking-tight">
            My Orders
          </h1>

          <p className="mt-4 text-[var(--muted)]">
            View and track all your recent purchases.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-16 text-center">

            <Package
              size={64}
              className="mx-auto text-[var(--primary)]"
            />

            <h2 className="mt-8 text-3xl font-bold">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-[var(--muted)]">
              You haven&apos;t placed any orders yet.
              Start shopping and your orders will appear here.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-flex rounded-2xl bg-[var(--primary)] px-8 py-4 font-semibold text-[var(--text)] transition hover:bg-[var(--primary-hover)]"
            >
              Start Shopping
            </Link>

          </div>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order.id}
                className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 transition hover:border-[var(--primary)]/30"
              >

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  <div>

                    <h2 className="text-2xl font-bold">
                      {order.orderNumber}
                    </h2>

                    <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
                      <Calendar size={16} />

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </div>

                  </div>

                  <span className="rounded-full bg-[var(--primary)]/10 px-5 py-2 text-sm font-semibold text-[var(--primary)]">
                    {order.status}
                  </span>

                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Total
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      PKR {Number(order.total).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--muted)]">
                      Items
                    </p>

                    <p className="mt-2 text-2xl font-bold">
                      {order.items.length}
                    </p>
                  </div>

                  <div className="flex items-end justify-start md:justify-end">

                    <Link
                      href={`/orders/${order.id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-[var(--border)] px-5 py-3 font-semibold transition hover:border-orange-500 hover:text-[var(--primary)]"
                    >
                      View Details

                      <ChevronRight size={18} />
                    </Link>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}