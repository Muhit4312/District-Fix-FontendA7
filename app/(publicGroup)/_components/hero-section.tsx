
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  MapPin,
  Plug,
  Wrench,
  Zap,
} from "lucide-react";

const services = [
  {
    title: "Plumbing",
    description: "Pipes, leaks & repairs",
    href: "/services",
    icon: Wrench,
  },
  {
    title: "Electrical",
    description: "Wiring, lighting & repairs",
    href: "/services",
    icon: Plug,
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/75" />

      {/* Gradient overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-slate-950/85 to-slate-950/50" />

      {/* Blue lighting effect */}
      <div className="absolute -right-40 top-10 -z-10 size-[500px] rounded-full bg-blue-500/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[600px] items-center gap-12 py-16 lg:min-h-[650px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:py-20">
          {/* Left content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-200">
              <span className="size-2 rounded-full bg-blue-400 shadow-[0_0_12px_#60a5fa]" />
              Home service, reimagined
            </div>

            <h1 className="mt-8 text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your home.
              <br />
              Your comfort.
              <br />
              <span className="text-blue-400">
                Our expertise.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              From unexpected pipe leaks to electrical faults,
              DistrictFix connects your service request with an
              organized team in your district.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500"
              >
                Request a service
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/25 bg-white/5 px-6 font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                Explore services
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6 text-sm text-slate-300">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 text-blue-400" />
                District-based requests
              </span>

              <span className="inline-flex items-center gap-2">
                <Zap className="size-4 text-blue-400" />
                Organized worker assignment
              </span>
            </div>
          </div>

          {/* Right service cards */}
          <div className="lg:pl-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-blue-400" />
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">
                What can we fix for you?
              </p>
            </div>

            <div className="space-y-3">
              {services.map((service, index) => {
                const Icon = service.icon;

                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group flex items-center gap-5 rounded-xl border border-white/15 bg-black/25 p-5 backdrop-blur-md transition duration-300 hover:border-blue-400/60 hover:bg-blue-950/40 sm:p-6"
                  >
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-300 transition group-hover:bg-blue-500 group-hover:text-white">
                      <Icon className="size-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium tracking-widest text-slate-400">
                        SERVICE 0{index + 1}
                      </p>

                      <h2 className="mt-1 text-xl font-bold text-white">
                        {service.title}
                      </h2>

                      <p className="mt-1 text-sm text-slate-400">
                        {service.description}
                      </p>
                    </div>

                    <ArrowRight className="size-5 shrink-0 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-300" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-emerald-400/10 text-emerald-300">
                <MapPin className="size-5" />
              </div>

              <div>
                <h3 className="font-semibold text-white">
                  Service organized by district
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Submit your request and let the relevant service
                  team coordinate the assignment.
                </p>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </section>
  );
}
