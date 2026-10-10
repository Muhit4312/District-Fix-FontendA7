import Link from "next/link";
import { ArrowRight, ArrowUpRight, Wrench } from "lucide-react";

export function HomeCta() {
	return (
		<section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
			<div className="mx-auto max-w-7xl">
				<div className="group relative isolate overflow-hidden rounded-3xl bg-sky-700 px-6 py-10 shadow-xl shadow-sky-900/10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
					{/* Background decoration */}
					<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-600 via-sky-700 to-blue-900" />

					<div className="pointer-events-none absolute -right-20 -top-28 -z-10 size-80 rounded-full border border-white/10" />
					<div className="pointer-events-none absolute -right-10 -top-16 -z-10 size-60 rounded-full border border-white/10" />
					<div className="pointer-events-none absolute -bottom-32 left-1/3 -z-10 size-72 rounded-full bg-sky-400/20 blur-3xl" />

					<div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
						<div className="max-w-2xl">
							<div className="inline-flex size-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white shadow-lg shadow-sky-950/10 backdrop-blur-sm transition-transform duration-300 group-hover:rotate-3 group-hover:scale-105">
								<Wrench className="size-7" />
							</div>

							<h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
								Need help with your home?
							</h2>

							<p className="mt-4 max-w-xl text-sm leading-7 text-sky-100 sm:text-base sm:leading-8">
								Get started with DistrictFix and submit your
								home service request today.
							</p>

							<div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-sky-100">
								<span className="size-2 rounded-full bg-emerald-300" />
								<span>Reliable service, coordinated locally.</span>
							</div>
						</div>

						<div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
							<Link
								href="/login"
								className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-800 shadow-lg shadow-sky-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700"
							>
								Get Started
								<ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
							</Link>

							<Link
								href="/contact"
								className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700"
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