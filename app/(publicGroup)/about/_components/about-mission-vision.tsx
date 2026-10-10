
import { ArrowUpRight, Compass, HandHeart, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function AboutMissionVision() {
	return (
		<section className="relative isolate overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="pointer-events-none absolute -left-32 top-20 -z-10 size-72 rounded-full bg-sky-100/60 blur-3xl" />
			<div className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-72 rounded-full bg-blue-100/50 blur-3xl" />

			<div className="mx-auto max-w-6xl">
				<div className="mx-auto max-w-2xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
						<Sparkles className="size-4" />
						Our purpose
					</div>

					<h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
						Driven by purpose,
						<span className="text-sky-600"> built for people.</span>
					</h2>

					<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
						We believe getting reliable home services
						should be simpler, more organized, and closer
						to every community.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14">
					{/* Mission */}
					<Card className="group relative isolate overflow-hidden rounded-3xl border-sky-100 bg-white py-0 shadow-sm shadow-sky-950/5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/10">
						<div className="pointer-events-none absolute right-0 top-0 -z-10 size-48 rounded-full bg-sky-100/70 blur-3xl transition-colors group-hover:bg-sky-200/70" />

						<CardContent className="relative p-6 sm:p-8 lg:p-9">
							<div className="flex items-start justify-between">
								<div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg shadow-sky-600/20">
									<Compass className="size-7" />
								</div>

								<span className="text-5xl font-black tracking-tight text-sky-100 transition-colors group-hover:text-sky-200">
									01
								</span>
							</div>

							<p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
								What we do
							</p>

							<h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
								Our Mission
							</h3>

							<p className="mt-4 max-w-md text-sm leading-7 text-slate-600 sm:text-base">
								To simplify the home service journey by
								connecting customers, district-level
								coordinators, and skilled professionals
								through one organized digital platform.
							</p>

							<div className="mt-7 flex items-center gap-2 border-t border-slate-100 pt-5 text-sm font-semibold text-sky-700">
								Making every request easier
								<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</div>
						</CardContent>
					</Card>

					{/* Vision */}
					<Card className="group relative isolate overflow-hidden rounded-3xl border-slate-200 bg-slate-950 py-0 shadow-sm shadow-slate-950/10 transition-all duration-300 hover:-translate-y-1 hover:border-sky-800 hover:shadow-xl hover:shadow-sky-950/20">
						<div className="pointer-events-none absolute -right-10 -top-10 -z-10 size-56 rounded-full bg-sky-500/15 blur-3xl transition-colors group-hover:bg-sky-500/25" />
						<div className="pointer-events-none absolute -bottom-20 -left-10 -z-10 size-48 rounded-full bg-blue-500/10 blur-3xl" />

						<CardContent className="relative p-6 sm:p-8 lg:p-9">
							<div className="flex items-start justify-between">
								<div className="flex size-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
									<HandHeart className="size-7" />
								</div>

								<span className="text-5xl font-black tracking-tight text-white/10 transition-colors group-hover:text-sky-400/20">
									02
								</span>
							</div>

							<p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
								Where we&apos;re going
							</p>

							<h3 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
								Our Vision
							</h3>

							<p className="mt-4 max-w-md text-sm leading-7 text-slate-300 sm:text-base">
								To help build a future where accessible
								home services and better coordination
								connect communities across districts
								through a dependable digital experience.
							</p>

							<div className="mt-7 flex items-center gap-2 border-t border-white/10 pt-5 text-sm font-semibold text-sky-300">
								Building stronger local connections
								<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
