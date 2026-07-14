import {
  Star,
  Quote,
  BadgeCheck
} from "lucide-react";

const reviews = [
  {
    name: "Sarah Mitchell",
    university: "University of Toronto",
    country: "🇨🇦 Canada",
    course: "Business Management",
    review:
      "The writer exceeded my expectations. The assignment was well researched, plagiarism-free and delivered before the deadline.",
  },
  {
    name: "James Walker",
    university: "University of Winnipeg",
    country: "🇨🇦 Canada",
    course: "Computer Science",
    review:
      "Excellent communication throughout the project. The quality was outstanding and I scored one of my highest grades.",
  },
  {
    name: "Ho Ngo",
    university: "University of Winnipeg",
    country: "🇨🇦 Canada",
    course: "Nursing",
    review:
      "Very professional service. The work was original, properly referenced and delivered exactly as requested.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto max-w-7xl rounded-[36px] border border-white/40 bg-white/75 px-6 py-20 shadow-2xl backdrop-blur-xl">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">
            Student Success Stories
          </span>

          <h2 className="mt-6 text-5xl font-extrabold text-slate-900">
            What Students Say
          </h2>

          <p className="mt-6 text-xl leading-8 text-slate-600">
            Thousands of students trust TopStudyTutor to help them
            succeed academically.
          </p>

        </div>

        {/* Review Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="group rounded-3xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Quote */}

              <Quote
                size={42}
                className="text-blue-600"
              />

              {/* Stars */}

              <div className="mt-6 flex gap-1">

                {[1,2,3,4,5].map((star)=>(
                  <Star
                    key={star}
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}

              </div>

              {/* Review */}

              <p className="mt-6 leading-8 text-slate-600">

                "{review.review}"

              </p>

              {/* Student */}

              <div className="mt-8 border-t pt-6">

                <div className="flex items-center gap-4">

                  {/* Avatar */}

                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">

                    {review.name.charAt(0)}

                  </div>

                  <div>

                    <div className="flex items-center gap-2">

                      <h3 className="font-bold text-slate-900">

                        {review.name}

                      </h3>

                      <BadgeCheck
                        size={18}
                        className="text-blue-600"
                      />

                    </div>

                    <p className="text-sm text-slate-500">

                      {review.university}

                    </p>

                    <p className="text-sm text-slate-500">

                      {review.country}

                    </p>

                  </div>

                </div>

                <div className="mt-5 inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">

                  {review.course}

                </div>

              </div>

            </div>

          ))}

        </div>

        {/* Bottom Statistics */}

        <div className="mt-20 grid gap-8 text-center md:grid-cols-3">

          <div>

            <h3 className="text-5xl font-extrabold text-blue-600">

              10,000+

            </h3>

            <p className="mt-2 text-slate-600">

              Happy Students

            </p>

          </div>

          <div>

            <h3 className="text-5xl font-extrabold text-green-600">

              4.9/5

            </h3>

            <p className="mt-2 text-slate-600">

              Average Rating

            </p>

          </div>

          <div>

            <h3 className="text-5xl font-extrabold text-orange-500">

              98%

            </h3>

            <p className="mt-2 text-slate-600">

              On-Time Delivery

            </p>

          </div>

        </div>

      </div>
    </section>
  );
}