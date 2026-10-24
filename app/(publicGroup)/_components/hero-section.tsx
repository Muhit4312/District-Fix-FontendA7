import Link from "next/link";
import {
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
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=2000&q=85')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-slate-950/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/65" />

      {/* Decorative glow */}
      <div className="absolute -right-40 top-1/4 -z-10 size-80 rounded-full bg-[#0084D1]/15 blur-[100px] sm:size-[450px]" />

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 py-14 sm:gap-12 sm:py-16 lg:min-h-[620px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-10 lg:py-20 xl:gap-16">
          {/* Left content */}
          <div className="mx-auto w-full max-w-2xl lg:mx-0">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#0084D1]/40 bg-[#0084D1]/10 px-3 py-2 text-xs font-medium text-blue-200 sm:px-4 sm:text-sm">
              <span className="size-2 shrink-0 rounded-full bg-[#0084D1]" />
              <span>Home service, reimagined</span>
            </div>

            <h1 className="mt-6 text-[2.65rem] font-extrabold leading-[1.08] tracking-tight sm:mt-7 sm:text-5xl md:text-6xl lg:text-[3.5rem] xl:text-[4rem]">
              Your home.
              <br />
              Your comfort.
              <br />
              <span className="text-[#42B5F5]">Our expertise.</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">
              From unexpected pipe leaks to electrical faults,
              DistrictFix connects your service request with an
              organized team in your district.
            </p>

            {/* Buttons: content-sized on every screen */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">

              <Link
                href="/login"
                className="inline-flex min-h-11 w-fit items-center justify-center rounded-lg border border-[#0084D1] bg-[#0084D1] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:border-white/25 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:min-h-12 sm:px-6 sm:text-base"
              >
                Request service
              </Link>


              <Link
                href="/services"
                className="group relative isolate inline-flex min-h-11 w-fit items-center justify-center overflow-hidden rounded-lg border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors duration-500 hover:border-[#0084D1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 sm:min-h-12 sm:px-6 sm:text-base before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-[#0084D1] before:transition-transform before:duration-500 before:ease-in-out hover:before:translate-x-0"
              >
                Explore services
              </Link>
            </div>

            {/* Highlights */}
            <div className="mt-8 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-slate-300 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-3 sm:pt-6">
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-[#42B5F5]" />
                District-based requests
              </span>

              <span className="inline-flex items-center gap-2">
                <Zap className="size-4 shrink-0 text-[#42B5F5]" />
                Organized worker assignment
              </span>
            </div>
          </div>

          {/* Right service cards */}
          <div className="mx-auto w-full max-w-xl lg:ml-auto lg:max-w-none lg:pl-2 xl:pl-6">
            <div className="mb-4 flex items-center gap-3 sm:mb-5">
              <span className="h-px w-8 shrink-0 bg-[#42B5F5] sm:w-10" />
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-200 sm:text-xs sm:tracking-[0.25em]">
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
                    className="group flex min-w-0 items-center gap-3 rounded-xl border border-white/15 bg-slate-950/45 p-4 backdrop-blur-md transition duration-300 hover:border-[#0084D1]/70 hover:bg-[#0084D1]/10 sm:gap-5 sm:p-5 lg:p-6"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-[#0084D1]/30 bg-[#0084D1]/15 text-blue-200 transition-colors group-hover:bg-[#0084D1] group-hover:text-white sm:size-14 sm:rounded-xl">
                      <Icon className="size-5 sm:size-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] font-medium tracking-widest text-slate-400 sm:text-xs">
                        SERVICE 0{index + 1}
                      </p>

                      <h2 className="mt-1 text-lg font-bold text-white sm:text-xl">
                        {service.title}
                      </h2>

                      <p className="mt-1 text-xs leading-5 text-slate-400 sm:text-sm">
                        {service.description}
                      </p>
                    </div>

                    <ArrowRight className="size-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-blue-300" />
                  </Link>
                );
              })}
            </div>


            <div className="mt-4 flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.05] p-4 sm:mt-5 sm:gap-4 sm:p-5">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#0084D1]/15 text-blue-200">
                <MapPin className="size-5" />
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  Service organized by district
                </h3>

                <p className="mt-1 text-xs leading-6 text-slate-400 sm:text-sm">
                  Submit your request and let the relevant service team
                  coordinate the assignment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}