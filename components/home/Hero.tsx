import HeroLeft from "./HeroLeft";
import HeroCalculator from "./HeroCalculator";
import UniversityStrip from "./UniversityStrip";
import WhyChoose from "./WhyChoose";
import HowItWorks from "./HowItWorks";
import Subjects from "./Subjects";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import CTA from "./CTA";

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50">

        {/* Background Decorations */}

        <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-blue-200/20 blur-3xl"></div>

        <div className="absolute right-[-120px] bottom-[-120px] h-[350px] w-[350px] rounded-full bg-orange-200/20 blur-3xl"></div>

        <div className="container relative mx-auto max-w-7xl px-6 pt-40 pb-24">

          <div className="grid items-start gap-16 lg:grid-cols-2">

            <HeroLeft />

            <HeroCalculator />

          </div>

        </div>

      </section>

      <UniversityStrip />
      <WhyChoose />
      <HowItWorks />
      <Subjects />
      <Testimonials />
      <FAQ />
      <CTA />

    </>
  );
}