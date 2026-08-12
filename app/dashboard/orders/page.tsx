import Link from "next/link";
import {
  Eye,
  Package,
} from "lucide-react";

import { getAllOrders } from "@/lib/actions/order";

export default async function OrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Order Management
          </p>

          <h1 className="mt-2 text-4xl font-black text-white">
            Orders
          </h1>

          <p className="mt-2 text-neutral-400">
            Manage customer purchases and order progress.
          </p>

        </div>

      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">

        <table className="w-full">

          <thead className="border-b border-white/10 bg-[#181818]">

            <tr className="text-left text-xs font-semibold uppercase tracking-wider text-neutral-500">

              <th className="px-6 py-5">Order</th>
              <th className="px-6 py-5">Customer</th>
              <th className="px-6 py-5">Items</th>
              <th className="px-6 py-5">Payment</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Total</th>
              <th className="px-6 py-5">Date</th>
              <th className="px-6 py-5 text-right">Action</th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
                  colSpan={8}
                  className="py-20 text-center"
                >

                  <Package
                    size={54}
                    className="mx-auto mb-5 text-neutral-600"
                  />

                  <p className="text-lg font-semibold text-white">
                    No Orders Yet
                  </p>

                  <p className="mt-2 text-neutral-500">
                    Customer orders will appear here.
                  </p>

                </td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-b border-white/5 transition hover:bg-white/[0.03]"
                >

                  <td className="px-6 py-5">

                    <p className="font-bold text-white">
                      #{order.id.slice(0,8).toUpperCase()}
                    </p>

                    <p className="mt-1 text-xs text-neutral-500">
                      {order.id.slice(0, 8)}
                    </p>

                  </td>

                  <td className="px-6 py-5">

                    <p className="font-semibold text-white">
                      {order.user?.name ?? "Customer"}
                    </p>

                    <p className="text-sm text-neutral-500">
                      {order.user?.email}
                    </p>

                  </td>

                  <td className="px-6 py-5 font-semibold text-white">
                    {order.items.length}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        order.payment?.status === "PAID"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {order.payment?.status ?? "Pending"}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        order.status === "DELIVERED"
                          ? "bg-green-500/20 text-green-400"
                          : order.status === "CANCELLED"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-blue-500/20 text-blue-400"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="px-6 py-5 font-black text-orange-400">
                    PKR {Number(order.total).toLocaleString()}
                  </td>

                  <td className="px-6 py-5 text-neutral-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 text-right">

                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="inline-flex items-center gap-2 rounded-xl border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:bg-orange-500 hover:text-white"
                    >
                      <Eye size={16} />
                      View
                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}