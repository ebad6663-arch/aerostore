"use client";

import { useTransition } from "react";
import { OrderStatus } from "@prisma/client";

import { updateOrderStatus } from "@/lib/actions/order";

interface Props {
  orderId: string;
  value: OrderStatus;
}

export default function OrderStatusSelect({
  orderId,
  value,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      defaultValue={value}
      disabled={pending}
      onChange={(e) =>
        startTransition(async () => {
          await updateOrderStatus(
            orderId,
            e.target.value as OrderStatus
          );
        })
      }
      className="w-full rounded-xl border border-white/10 bg-[#1b1b1b] px-4 py-3 text-white outline-none transition focus:border-orange-500 disabled:opacity-50"
    >
      {Object.values(OrderStatus).map((status) => (
        <option
          key={status}
          value={status}
        >
          {status}
        </option>
      ))}
    </select>
  );
}