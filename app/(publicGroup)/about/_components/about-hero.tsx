
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Compass } from "lucide-react";

export function AboutHero() {
	return (
		<section className="relative isolate overflow-hidden bg-slate-950 px-5 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
			<div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-sky-500/15 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-32 -left-20 -z-10 size-72 rounded-full bg-blue-500/10 blur-3xl" />

			<div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
				<div>
					<div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-300">
						<Compass className="size-4" />
						About DistrictFix
					</div>

					<h1 className="mt-5 max-w-xl capitalize text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
						Home services,
						<span className="text-sky-400"> made simpler.</span>
					</h1>

					<p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
						Connecting customers with local service
						professionals through a simpler,
						district-based platform.
					</p>

					<div className="mt-7 flex flex-wrap gap-3">
						<Link
							href="/services"
							className="inline-flex capitalize min-h-11 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-sky-500"
						>
							Explore services
							<ArrowRight className="size-4" />
						</Link>

						<Link
							href="/contact"
							className="inline-flex capitalize min-h-11 items-center justify-center gap-2 rounded-xl border border-sky-400 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
						>
							Contact us
							<ArrowUpRight className="size-4" />
						</Link>
					</div>
				</div>

				<div className="relative mx-auto w-full max-w-sm">
					<div className="absolute -inset-3 rounded-3xl bg-sky-500/10 blur-2xl" />

					<div className="relative rounded-2xl border border-white/10 bg-white/[0.05] p-5 sm:p-6">
						<p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-400">
							How it works
						</p>

						<h2 className="mt-2 text-xl font-bold text-white">
							From request to service
						</h2>

						<div className="mt-5 space-y-4">
							{[
								{
									number: "01",
									title: "Request a service",
									description: "Tell us what you need.",
								},
								{
									number: "02",
									title: "Local coordination",
									description: "Your district request is coordinated.",
								},
								{
									number: "03",
									title: "Professional assignment",
									description: "A suitable worker handles the job.",
								},
							].map((step) => (
								<div
									key={step.number}
									className="flex items-start gap-3"
								>
									<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-xs font-bold text-sky-300">
										{step.number}
									</span>

									<div>
										<h3 className="text-sm font-semibold text-white">
											{step.title}
										</h3>
										<p className="mt-1 text-xs leading-5 text-slate-400">
											{step.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
