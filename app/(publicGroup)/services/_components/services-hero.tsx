
import { ArrowRight, Wrench } from "lucide-react";
import Link from "next/link";

export function ServicesHero() {
	return (
		<section className="relative isolate overflow-hidden bg-slate-950 px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
			<div className="pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-sky-500/15 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-28 -left-20 -z-10 size-72 rounded-full bg-blue-500/10 blur-3xl" />

			<div className="mx-auto max-w-6xl">
				<div className="max-w-2xl">
					<div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-300">
						<Wrench className="size-4" />
						Our Services
					</div>

					<h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
						Home services made{" "}
						<span className="text-sky-400">simpler.</span>
					</h1>

					<p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
						From plumbing repairs to electrical work,
						DistrictFix helps you submit home service
						requests and coordinate with local professionals
						through your district.
					</p>

					<Link
						href="#available-services"
						className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-500"
					>
						Explore services
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
