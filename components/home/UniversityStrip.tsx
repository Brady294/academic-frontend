import Image from "next/image";

const universities = [
  {
    name: "Harvard",
    logo: "/universities/harvard.png",
  },
  {
    name: "Oxford",
    logo: "/universities/oxford.png",
  },
  {
    name: "MIT",
    logo: "/universities/mit.png",
  },
  {
    name: "Stanford",
    logo: "/universities/stanford.png",
  },
  {
    name: "University of Toronto",
    logo: "/universities/toronto.png",
  },
  {
    name: "University of Winnipeg",
    logo: "/universities/winnipeg.png",
  },
  {
    name: "National University of Singapore",
    logo: "/universities/nus.png",
  },
];

const scrollingUniversities = [
  ...universities,
  ...universities,
];

export default function UniversityStrip() {
  return (
  <section className="mt-24 overflow-hidden rounded-[32px] border border-white/40 bg-white/75 py-14 shadow-2xl backdrop-blur-xl">

    <div className="mb-12 text-center">

      <span className="rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700">

        Trusted Worldwide

      </span>

      <h2 className="mt-5 text-4xl font-extrabold text-slate-900">

        Trusted by Students from Leading Universities

      </h2>

      <p className="mt-4 text-lg text-slate-600">

        Supporting learners from top universities across the globe.

      </p>

    </div>

    <div className="relative">

      {/* Left Fade */}

      <div className="absolute left-0 top-0 z-10 h-full w-28 bg-gradient-to-r from-white to-transparent"></div>

      {/* Right Fade */}

      <div className="absolute right-0 top-0 z-10 h-full w-28 bg-gradient-to-l from-white to-transparent"></div>

      {/* Marquee */}

      <div className="marquee flex">

        {scrollingUniversities.map((school, index) => (

          <div
            key={`${school.name}-${index}`}
            className="mx-10 flex min-w-[180px] flex-col items-center justify-center grayscale transition duration-300 hover:grayscale-0"
          >

            <Image
              src={school.logo}
              alt={school.name}
              width={100}
              height={100}
              className="object-contain"
            />

            <p className="mt-4 text-center text-sm font-semibold text-slate-600">

              {school.name}

            </p>

          </div>

        ))}

      </div>

    </div>

  </section>
); }
