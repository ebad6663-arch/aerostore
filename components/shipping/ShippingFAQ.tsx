const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Karachi orders usually arrive within 1–2 business days. Other cities typically take 2–5 business days.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes. Cash on Delivery is available throughout Pakistan.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Order tracking will be available once your package is dispatched.",
  },
  {
    question: "Do you deliver nationwide?",
    answer:
      "Yes, we ship to customers all across Pakistan.",
  },
];

export default function ShippingFAQ() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-5xl px-6">

        <div className="text-center">

          <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
            Shipping FAQ
          </span>

          <h2 className="mt-8 text-5xl font-black">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-16 space-y-6">

          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <h3 className="text-xl font-bold">
                {faq.question}
              </h3>

              <p className="mt-4 leading-8 text-neutral-400">
                {faq.answer}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}