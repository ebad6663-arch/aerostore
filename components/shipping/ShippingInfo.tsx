import {
  Truck,
  Package,
  MapPinned,
  Wallet,
} from "lucide-react";

const shipping = [
  {
    icon: Truck,
    title: "Karachi Delivery",
    value: "PKR 200",
    description: "Estimated delivery within 1–2 business days.",
  },
  {
    icon: MapPinned,
    title: "Nationwide Delivery",
    value: "PKR 300",
    description: "Delivery across Pakistan in 2–5 business days.",
  },
  {
    icon: Package,
    title: "Order Processing",
    value: "24 Hours",
    description: "Orders are packed and dispatched within one working day.",
  },
  {
    icon: Wallet,
    title: "Payment",
    value: "Cash on Delivery",
    description: "Pay securely when your order arrives.",
  },
];

export default function ShippingInfo() {
  return (
    <section className="border-b border-white/10 py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {shipping.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 transition hover:-translate-y-2 hover:border-orange-500/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">
                  <Icon size={28} />
                </div>

                <h3 className="mt-8 text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 font-semibold text-orange-400">
                  {item.value}
                </p>

                <p className="mt-3 leading-7 text-neutral-400">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}