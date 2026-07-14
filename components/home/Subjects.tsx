import {
  Briefcase,
  Laptop,
  Cog,
  Scale,
  HeartPulse,
  BookOpen,
  BarChart3,
  Calculator,
} from "lucide-react";

const subjects = [
  {
    icon: Briefcase,
    color: "text-amber-700",
    title: "Business",
    description: "Management, Marketing, Finance, HRM, Economics",
  },
  {
    icon: Laptop,
    color: "text-blue-600",
    title: "Computer Science",
    description: "Programming, Databases, AI, Cybersecurity, Web Development",
  },
  {
    icon: Cog,
    color: "text-slate-600",
    title: "Engineering",
    description: "Mechanical, Civil, Electrical, Software Engineering",
  },
  {
    icon: Scale,
    color: "text-orange-500",
    title: "Law",
    description: "Case Briefs, Legal Research, Constitutional Law",
  },
  {
    icon: HeartPulse,
    color: "text-pink-600",
    title: "Nursing & Healthcare",
    description: "Nursing, Public Health, Medicine, Pharmacology",
  },
  {
    icon: BookOpen,
    color: "text-indigo-600",
    title: "Humanities",
    description: "History, Literature, Philosophy, Sociology, Psychology",
  },
  {
    icon: BarChart3,
    color: "text-green-600",
    title: "Statistics",
    description: "SPSS, R, Excel, Regression, Data Analysis",
  },
  {
    icon: Calculator,
    color: "text-red-500",
    title: "Mathematics",
    description: "Calculus, Algebra, Differential Equations, Probability",
  },
];

export default function Subjects() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Section Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Explore Our Expertise
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            Subjects We Cover
          </h2>

          <p className="mt-6 text-xl leading-8 text-slate-600">
            Our experienced academic professionals provide assistance
            across a broad range of disciplines, helping students at
            every academic level achieve their goals.
          </p>

        </div>

        {/* Subject Cards */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {subjects.map((subject) => (
            <div
              key={subject.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-xl"
            >

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 transition-colors duration-300 group-hover:bg-blue-50">

                <subject.icon
                  size={36}
                  className={subject.color}
                />

              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {subject.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {subject.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}