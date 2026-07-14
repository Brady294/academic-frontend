import {
  GraduationCap,
  Zap,
  Wallet,
  ShieldCheck,
  CreditCard,
  Headset,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    color: "text-blue-600",
    title: "Professional Experts",
    description:
      "Work with experienced academic writers and tutors across multiple disciplines.",
  },
  {
    icon: Zap,
    color: "text-orange-500",
    title: "Fast Delivery",
    description:
      "Meet urgent deadlines without compromising quality or originality.",
  },
  {
    icon: Wallet,
    color: "text-green-600",
    title: "Affordable Pricing",
    description:
      "Transparent pricing with competitive rates for every academic level.",
  },
  {
    icon: ShieldCheck,
    color: "text-purple-600",
    title: "100% Original Work",
    description:
      "Every assignment is written from scratch and checked for originality.",
  },
  {
    icon: CreditCard,
    color: "text-cyan-600",
    title: "Secure Payments",
    description:
      "Your payments and personal information are protected using secure technology.",
  },
  {
    icon: Headset,
    color: "text-pink-600",
    title: "24/7 Support",
    description:
      "Friendly support is available any time you need assistance or updates.",
  },
];

export default function WhyChoose() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Why Choose Us
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            Why Students Choose TopStudyTutor
          </h2>

          <p className="mt-6 text-xl leading-8 text-slate-600">
            We combine experienced academic professionals, fast turnaround
            times, secure systems, and exceptional customer support to
            help students succeed with confidence.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
            >

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition-colors duration-300 group-hover:bg-blue-50">

                <feature.icon
                  size={36}
                  className={feature.color}
                />

              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {feature.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}