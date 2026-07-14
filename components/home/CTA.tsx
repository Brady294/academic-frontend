import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, Clock3 } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 py-24">

      {/* Background Decoration */}

      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>

      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl"></div>

      <div className="container relative mx-auto max-w-7xl px-6">

        <div className="mx-auto max-w-4xl text-center">

          <span className="inline-flex rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white">

            Trusted by 10,000+ Students Worldwide

          </span>

          <h2 className="mt-8 text-5xl font-extrabold leading-tight text-white">

            Ready to Achieve Better Grades?

          </h2>

          <p className="mt-8 text-xl leading-9 text-blue-100">

            Join thousands of students who trust TopStudyTutor
            for high-quality academic writing, tutoring,
            proofreading and research assistance.

          </p>

          <div className="mt-12">

            <Link
              href="/register"
              className="inline-flex items-center gap-3 rounded-2xl bg-orange-500 px-10 py-5 text-lg font-bold text-white transition duration-300 hover:scale-105 hover:bg-orange-600"
            >
              Get Started Today

              <ArrowRight size={22} />

            </Link>

          </div>

          {/* Trust Indicators */}

          <div className="mt-16 grid gap-8 md:grid-cols-3">

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">

              <Star
                className="mx-auto text-yellow-300"
                size={40}
              />

              <h3 className="mt-4 text-2xl font-bold text-white">

                4.9 / 5 Rating

              </h3>

              <p className="mt-2 text-blue-100">

                Rated highly by students worldwide.

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">

              <ShieldCheck
                className="mx-auto text-green-300"
                size={40}
              />

              <h3 className="mt-4 text-2xl font-bold text-white">

                Secure Payments

              </h3>

              <p className="mt-2 text-blue-100">

                Safe, encrypted and confidential transactions.

              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">

              <Clock3
                className="mx-auto text-orange-300"
                size={40}
              />

              <h3 className="mt-4 text-2xl font-bold text-white">

                On-Time Delivery

              </h3>

              <p className="mt-2 text-blue-100">

                98% of assignments delivered before deadline.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}