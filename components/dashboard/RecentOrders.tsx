import Link from "next/link";
import {
  Calendar,
  ChevronRight,
} from "lucide-react";

import {
  OrderStatus,
  PaymentStatus,
} from "@prisma/client";

interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  user: {
    name: string | null;
    email: string |null;
  };
}

interface Props {
  orders: Order[];
}

export default function RecentOrders({
  orders,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111]">

      <div className="flex items-center justify-between border-b border-white/10 p-7">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent Orders
          </h2>

          <p className="mt-2 text-neutral-400">
            Latest customer purchases
          </p>

        </div>

        <Link
          href="/dashboard/orders"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:border-orange-500 hover:bg-orange-500/10"
        >
          View All
        </Link>

      </div>

      {orders.length === 0 ? (
        <div className="p-16 text-center text-neutral-500">
          No orders found.
        </div>
      ) : (
        <div className="divide-y divide-white/10">

          {orders.map((order) => (

            <div
              key={order.id}
              className="flex flex-col gap-5 p-6 transition hover:bg-white/[0.03] lg:flex-row lg:items-center lg:justify-between"
            >

              <div>

                <h3 className="text-lg font-bold text-white">
                  #{order.orderNumber}
                </h3>

                <p className="mt-2 text-neutral-400">
                  {order.user?.name ??
                    order.user?.email ??
                    "Guest Customer"}
                </p>

                <div className="mt-3 flex items-center gap-2 text-sm text-neutral-500">

                  <Calendar size={15} />

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </div>

              </div>

              <div className="flex flex-col items-start gap-4 lg:items-end">

                <p className="text-2xl font-black text-orange-400">
                  PKR {Number(order.total).toLocaleString()}
                </p>

                <div className="flex flex-wrap gap-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.paymentStatus === "PAID"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      order.status === "DELIVERED"
                        ? "bg-green-500/20 text-green-400"
                        : order.status === "CANCELLED"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {order.status}
                  </span>

                </div>

                <Link
                  href={`/dashboard/orders/${order.id}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 transition hover:text-orange-300"
                >
                  View Order

                  <ChevronRight size={16} />
                </Link>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}