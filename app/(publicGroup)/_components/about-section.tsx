import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
  Users,
} from "lucide-react";

const benefits = [
  "District-based service coordination",
  "Dedicated plumbing and electrical support",
  "Structured service request management",
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-28 dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Visual */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 p-2 shadow-sm dark:border-white/10 dark:bg-slate-900">
              <div className="relative aspect-[4/4.1] overflow-hidden rounded-xl sm:aspect-[5/4] lg:aspect-[4/4.5]">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85"
                  alt="Professional electrician working on an electrical installation"
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/10" />

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                  <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-slate-950/70 p-4 text-white shadow-lg backdrop-blur-md sm:p-5">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-[#0084D1]/20 text-sky-300">
                      <ShieldCheck className="size-6" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold sm:text-base">
                        Service you can rely on
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-300 sm:text-sm">
                        Your home, our priority
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Small decorative accent */}
            <div
              aria-hidden="true"
              className="absolute -bottom-3 -left-3 -z-10 size-24 rounded-2xl border border-[#0084D1]/20 sm:-bottom-4 sm:-left-4 sm:size-32"
            />
          </div>

          {/* Content */}
          <div className="min-w-0 lg:py-4">
            <div className="inline-flex items-center gap-3">
              <span className="h-px w-8 bg-[#0084D1]" />
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0084D1] sm:text-sm">
                About DistrictFix
              </p>
            </div>

            <h2 className="mt-5 max-w-xl text-3xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-[2.75rem] xl:text-5xl dark:text-white">
              Home services,
              <span className="mt-1 block text-[#0084D1]">
                made simpler.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
              DistrictFix simplifies plumbing and electrical service
              requests through a district-based platform that connects
              customers with an organized service team.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base sm:leading-8 dark:text-slate-300">
              From submitting a request to coordinating the right
              professional, the platform brings structure and clarity
              to everyday home maintenance.
            </p>

            {/* Benefits */}
            <ul className="mt-7 space-y-4 border-t border-slate-200 pt-6 dark:border-white/10">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-200"
                >
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#0084D1]/10 text-[#0084D1]">
                    <Check className="size-3.5" />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Link
                href="/about"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0084D1] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006FB3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0084D1] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 sm:px-6"
              >
                Discover our story
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <div className="inline-flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                <Users className="size-5 shrink-0 text-[#0084D1]" />
                <span>Built around customer needs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}