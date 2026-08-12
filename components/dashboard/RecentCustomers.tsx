import Link from "next/link";
import { Calendar, Phone } from "lucide-react";

import {
  FaInstagram,
  FaFacebook,
  FaWhatsapp,
  FaTiktok,
} from "react-icons/fa6";

interface Customer {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  instagram: string | null;
  facebook: string | null;
  whatsapp: string | null;
  tiktok: string | null;
  createdAt: Date;
}

interface Props {
  customers: Customer[];
}

export default function RecentCustomers({
  customers,
}: Props) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#111111]">

      <div className="flex items-center justify-between border-b border-white/10 p-7">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Recent Customers
          </h2>

          <p className="mt-2 text-neutral-400">
            Latest customers who joined AeroStore.
          </p>

        </div>

        <Link
          href="/dashboard/customers"
          className="rounded-xl border border-white/10 px-4 py-2 text-sm font-semibold text-orange-400 transition hover:border-orange-500 hover:bg-orange-500/10"
        >
          View All
        </Link>

      </div>

      {customers.length === 0 ? (

        <div className="p-16 text-center text-neutral-500">
          No customers found.
        </div>

      ) : (

        <div className="divide-y divide-white/10">

          {customers.map((customer) => (

            <div
              key={customer.id}
              className="flex flex-col gap-5 p-6 transition hover:bg-white/[0.03] lg:flex-row lg:items-center lg:justify-between"
            >

              <div>

                <h3 className="text-lg font-bold text-white">
                  {customer.name}
                </h3>

                <p className="mt-2 text-neutral-400">
                  {customer.email ?? "No email"}
                </p>

                <div className="mt-4 flex items-center gap-4">

                  {customer.phone && (
                    <Phone
                      size={17}
                      className="text-neutral-500"
                    />
                  )}

                  {customer.instagram && (
                    <FaInstagram
                      size={17}
                      className="text-pink-500"
                    />
                  )}

                  {customer.facebook && (
                    <FaFacebook
                      size={17}
                      className="text-blue-500"
                    />
                  )}

                  {customer.whatsapp && (
                    <FaWhatsapp
                      size={17}
                      className="text-green-500"
                    />
                  )}

                  {customer.tiktok && (
                    <FaTiktok
                      size={17}
                      className="text-white"
                    />
                  )}

                </div>

              </div>

              <div className="flex items-center gap-2 text-sm text-neutral-500">

                <Calendar size={15} />

                {customer.createdAt.toLocaleDateString()}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}