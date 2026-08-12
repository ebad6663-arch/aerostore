import Link from "next/link";
import {
  Users,
  ShoppingBag,
} from "lucide-react";

import { getCustomers } from "@/lib/actions/customer";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Customer Management
          </p>

          <h1 className="mt-2 text-4xl font-black text-white">
            Customers
          </h1>

          <p className="mt-2 text-neutral-400">
            Manage your registered customers.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#111111] px-6 py-4">
          <p className="text-sm text-neutral-400">
            Total Customers
          </p>

          <p className="mt-2 text-3xl font-black text-white">
            {customers.length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#111111]">
        <table className="w-full">
          <thead className="border-b border-white/10 bg-[#171717]">
            <tr className="text-left text-sm text-neutral-400">
              <th className="p-5">Customer</th>
              <th className="p-5">Email</th>
              <th className="p-5">Orders</th>
              <th className="p-5">Joined</th>
            </tr>
          </thead>

          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-24 text-center"
                >
                  <Users
                    size={50}
                    className="mx-auto mb-5 text-neutral-600"
                  />

                  <h2 className="text-2xl font-bold text-white">
                    No Customers Yet
                  </h2>

                  <p className="mt-3 text-neutral-500">
                    Customers will appear here after placing orders.
                  </p>

                  <Link
                    href="/dashboard/orders"
                    className="mt-8 inline-flex rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400"
                  >
                    View Orders
                  </Link>
                </td>
              </tr>
            ) : (
              customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-5">
                    <h3 className="font-semibold text-white">
                      {customer.name ?? "Customer"}
                    </h3>
                  </td>

                  <td className="p-5 text-neutral-400">
                    {customer.email ?? "No Email"}
                  </td>

                  <td className="p-5">
                    <div className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-3 py-1 text-orange-400">
                      <ShoppingBag size={15} />
                      {customer.orders.length}
                    </div>
                  </td>

                  <td className="p-5 text-neutral-400">
                    {customer.createdAt.toLocaleDateString()}
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