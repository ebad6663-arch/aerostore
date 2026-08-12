const steps = [
  {
    title: "Order Placed",
    description:
      "Your order is confirmed immediately after checkout.",
  },
  {
    title: "Packed",
    description:
      "Our team carefully packs your products with quality checks.",
  },
  {
    title: "Shipped",
    description:
      "Your parcel is handed over to our courier partner.",
  },
  {
    title: "Out for Delivery",
    description:
      "Your package is on its way to your address.",
  },
  {
    title: "Delivered",
    description:
      "Pay Cash on Delivery and enjoy your purchase.",
  },
];

export default function ShippingTimeline() {
  return (
    <section className="border-b border-white/10 py-28">
      <div className="mx-auto max-w-5xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            Delivery Process
          </span>

          <h2 className="mt-8 text-5xl font-black">
            From our warehouse
            <br />
            to your doorstep.
          </h2>

        </div>

        <div className="mt-20 space-y-10">

          {steps.map((step, index) => (
            <div
              key={step.title}
              className="flex gap-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-orange-500 text-lg font-bold">
                {index + 1}
              </div>

              <div>

                <h3 className="text-2xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-8 text-neutral-400">
                  {step.description}
                </p>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}