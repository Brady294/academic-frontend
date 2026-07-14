const steps = [
  {
    number: "01",
    title: "Submit Your Requirements",
    description:
      "Tell us about your assignment, deadline, academic level, and any specific instructions.",
  },
  {
    number: "02",
    title: "Receive an Instant Quote",
    description:
      "Our pricing system calculates a fair estimate based on your academic requirements.",
  },
  {
    number: "03",
    title: "Expert Starts Working",
    description:
      "A qualified academic expert is assigned to complete your work with regular progress updates.",
  },
  {
    number: "04",
    title: "Review & Download",
    description:
      "Review your completed assignment, request revisions if necessary, and download your final work.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-50 to-white">

      <div className="container mx-auto max-w-7xl rounded-[36px] border border-white/40 bg-white/75 px-6 py-20 shadow-2xl backdrop-blur-xl">

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-5xl font-extrabold text-slate-900">
            How It Works
          </h2>

          <p className="mt-6 text-xl text-slate-600">
            Getting professional academic assistance is quick, secure,
            and straightforward.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              <div className="mb-6 text-6xl font-extrabold text-blue-100">
                {step.number}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {step.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}