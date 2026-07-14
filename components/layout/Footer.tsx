import Link from "next/link";
import {
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

      <div className="container mx-auto max-w-7xl px-6 py-20">

        <div className="grid gap-14 lg:grid-cols-5">

          {/* Company */}

          <div className="lg:col-span-2">

            <h2 className="text-3xl font-bold text-white">

              TopStudyTutor

            </h2>

            <p className="mt-6 leading-8">

              TopStudyTutor provides professional academic writing,
              tutoring, proofreading and research assistance to
              students around the world.

            </p>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">

              <h3 className="font-semibold text-white">

                Powered by Brady Freelance Service

              </h3>

              <p className="mt-2 text-sm text-slate-400">

                Delivering professional academic and freelance
                solutions with integrity and excellence.

              </p>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">

              Quick Links

            </h3>

            <ul className="space-y-4">

              <li><Link href="/">Home</Link></li>

              <li><Link href="/about">About Us</Link></li>

              <li><Link href="/services">Services</Link></li>

              <li><Link href="/pricing">Pricing</Link></li>

              <li><Link href="/faq">FAQ</Link></li>

              <li><Link href="/contact">Contact</Link></li>

            </ul>

          </div>

          {/* Services */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">

              Services

            </h3>

            <ul className="space-y-4">

              <li>Essay Writing</li>

              <li>Research Papers</li>

              <li>Dissertations</li>

              <li>Online Classes</li>

              <li>Editing & Proofreading</li>

              <li>Academic Tutoring</li>

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h3 className="mb-6 text-xl font-bold text-white">

              Contact

            </h3>

            <div className="space-y-5">

              <div className="flex items-center gap-3">

                <Mail size={18} />

                support@topstudytutor.com

              </div>

              <div className="flex items-center gap-3">

                <Phone size={18} />

                +1 (863) 855 - 3283

              </div>

              <div className="flex items-center gap-3">

                <MapPin size={18} />

                Delaware, USA

              </div>

            </div>

    

          </div>

        </div>

        {/* Newsletter */}

        <div className="mt-20 rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="grid items-center gap-8 lg:grid-cols-2">

            <div>

              <h3 className="text-3xl font-bold text-white">

                Stay Updated

              </h3>

              <p className="mt-3">

                Receive academic tips, study resources and exclusive
                offers directly in your inbox.

              </p>

            </div>

            <div className="flex gap-4">

              <input
                placeholder="Enter your email"
                className="flex-1 rounded-xl border-0 bg-white px-5 py-4 text-slate-900"
              />

              <button className="btn-primary">

                Subscribe

              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="mt-16 border-t border-slate-800 pt-8">

          <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">

            <p>

              © {new Date().getFullYear()} TopStudyTutor.
              All Rights Reserved.

            </p>

            <div className="flex flex-wrap gap-8">

              <Link href="/privacy">

                Privacy Policy

              </Link>

              <Link href="/terms">

                Terms & Conditions

              </Link>

              <Link href="/refund-policy">

                Refund Policy

              </Link>

              <Link href="/cookies">

                Cookie Policy

              </Link>

            </div>

            <div className="flex items-center gap-2 text-green-400">

              <ShieldCheck size={18} />

              SSL Secured

            </div>

          </div>

        </div>

      </div>

    </footer>
  );
}