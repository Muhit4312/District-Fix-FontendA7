
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Wrench } from "lucide-react";

export function HomeCta() {
  return (
    <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
      <div className="mx-auto w-full max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl bg-[#0084D1] px-6 py-9 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <div className="flex size-12 items-center justify-center rounded-xl border border-white/25 bg-white/10 text-white">
                <Wrench className="size-6" strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Need help with your home?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                Get started with DistrictFix and submit your home
                service request today.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/login"
                className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#0069A8] transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0084D1] sm:px-6"
              >
                Get Started
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-12 w-fit items-center justify-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0084D1] sm:px-6"
              >
                Contact Us
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
