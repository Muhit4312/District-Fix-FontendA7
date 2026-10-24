import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Wrench,
  Zap,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Plumbing Services",
    description:
      "From leaking pipes and faulty taps to blocked drains, get the right support to keep your home running smoothly.",
    icon: Wrench,
    theme: "sky",
    href: "/services",
    features: ["Leak & pipe repair", "Drainage solutions"],
  },
  {
    number: "02",
    title: "Electrical Services",
    description:
      "Get help with faulty switches, lighting issues, and household electrical problems through an organized service process.",
    icon: Zap,
    theme: "amber",
    href: "/services",
    features: ["Lighting & switches", "Electrical repairs"],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative isolate overflow-hidden bg-slate-50 py-16 transition-colors duration-300 sm:py-20 lg:py-24 dark:bg-slate-950"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 -z-10 size-72 rounded-full bg-[#0084D1]/5 blur-[100px] sm:size-80 dark:bg-[#0084D1]/10" />

      <div className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-72 rounded-full bg-[#0084D1]/5 blur-[100px] sm:size-80 dark:bg-[#0084D1]/10" />

      {/* Shared page container */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0084D1]/20 bg-white px-3.5 py-2 dark:border-[#0084D1]/30 dark:bg-slate-900">
              <span className="size-2 rounded-full bg-[#0084D1]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#006FB3] dark:text-blue-300">
                Our Services
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-[1.15] tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
              Expert help for your
              <span className="mt-1 block text-[#0084D1]">
                everyday home needs.
              </span>
            </h2>

            
          </div>

          <Link
            href="/services"
            className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:border-[#0084D1] hover:text-[#006FB3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0084D1] sm:min-h-12 sm:px-5 dark:border-white/15 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-[#0084D1] dark:hover:text-blue-300"
          >
            Explore all services
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Service cards */}
        <div className="mt-9 grid items-stretch gap-5 sm:mt-12 sm:gap-6 lg:grid-cols-2 lg:gap-7">
          {services.map((service) => {
            const Icon = service.icon;
            const isPlumbing = service.theme === "sky";

            return (
              <article
                key={service.number}
                className="group relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0084D1]/40 hover:shadow-lg hover:shadow-slate-200/50 sm:p-7 lg:p-8 dark:border-white/10 dark:bg-slate-900 dark:shadow-none dark:hover:border-[#0084D1]/50 dark:hover:shadow-black/20"
              >
                {/* Subtle card accent */}
                <div
                  className={`pointer-events-none absolute right-0 top-0 h-1 w-24 transition-all duration-300 group-hover:w-36 ${
                    isPlumbing ? "bg-[#0084D1]" : "bg-amber-500"
                  }`}
                />

                {/* Card header */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 sm:size-14 ${
                      isPlumbing
                        ? "bg-[#0084D1]/10 text-[#0084D1] group-hover:bg-[#0084D1] group-hover:text-white dark:bg-[#0084D1]/15"
                        : "bg-amber-50 text-amber-700 group-hover:bg-amber-500 group-hover:text-white dark:bg-amber-400/10 dark:text-amber-300"
                    }`}
                  >
                    <Icon className="size-6 sm:size-7" />
                  </div>

                  <span className="text-3xl font-bold tracking-tight text-slate-200 transition-colors duration-300 group-hover:text-slate-300 sm:text-4xl dark:text-slate-800 dark:group-hover:text-slate-700">
                    {service.number}
                  </span>
                </div>

                {/* Card content */}
                <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900 sm:mt-7 sm:text-2xl dark:text-white">
                  {service.title}
                </h3>

                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">
                  {service.description}
                </p>

                {/* Features */}
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 sm:mt-6">
                  {service.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"
                    >
                      <CheckCircle2
                        className={`size-4 shrink-0 ${
                          isPlumbing
                            ? "text-[#0084D1]"
                            : "text-amber-600 dark:text-amber-400"
                        }`}
                      />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div className="mt-auto border-t border-slate-100 pt-5 dark:border-white/10 sm:pt-6">
                  <Link
                    href={service.href}
                    className={`group/link inline-flex min-h-10 items-center gap-2 text-sm font-semibold transition-colors ${
                      isPlumbing
                        ? "text-[#006FB3] hover:text-[#0084D1] dark:text-blue-300 dark:hover:text-blue-200"
                        : "text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
                    }`}
                  >
                    Explore service
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom call to action */}
        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5 dark:border-white/10 dark:bg-slate-900">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-900 sm:text-base dark:text-white">
              Not sure what you need?
            </h3>
            <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Submit a request and let the service team coordinate
              the next step.
            </p>
          </div>

          <Link
            href="/login"
            className="group inline-flex min-h-11 w-fit shrink-0 items-center justify-center gap-2 rounded-lg bg-[#0084D1] px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#006FB3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0084D1] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 sm:px-5"
          >
            Request a service
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}