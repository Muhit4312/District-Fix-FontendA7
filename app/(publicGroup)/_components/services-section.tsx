
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
		<section className="relative isolate overflow-hidden bg-slate-50 px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-15">
			{/* Background decoration */}
			<div className="pointer-events-none absolute -left-32 top-20 -z-10 size-80 rounded-full bg-sky-200/30 blur-[100px]" />
			<div className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-80 rounded-full bg-blue-200/30 blur-[100px]" />

			<div className="mx-auto max-w-7xl">
				{/* Section heading */}
				<div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
					<div className="max-w-2xl">
						<div className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 shadow-sm">
							<span className="size-2 rounded-full bg-sky-500" />
							<span className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
								Our Services
							</span>
						</div>

						<h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
							Expert help for your
							<span className="block text-sky-600">
								everyday home needs.
							</span>
						</h2>


					</div>

					<Link
						href="/services"
						className="inline-flex w-fit shrink-0 items-center gap-2 rounded-lg border border-sky-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
					>
						Know About Services
						<ArrowRight className="size-4" />
					</Link>
				</div>

				{/* Service cards */}
				<div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
					{services.map((service) => {
						const Icon = service.icon;
						const isPlumbing = service.theme === "sky";

						return (
							<article
								key={service.number}
								className="group relative isolate overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8 lg:p-9"
							>
								{/* Card lighting */}
								<div
									className={`pointer-events-none absolute -right-16 -top-20 -z-10 size-56 rounded-full blur-[75px] transition-opacity duration-500 group-hover:opacity-100 ${
										isPlumbing
											? "bg-sky-200/50 opacity-50"
											: "bg-amber-200/50 opacity-50"
									}`}
								/>

								{/* Card header */}
								<div className="flex items-start justify-between gap-4">
									<div
										className={`flex size-14 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105 group-hover:rotate-3 ${
											isPlumbing
												? "bg-sky-100 text-sky-700 group-hover:bg-sky-600 group-hover:text-white"
												: "bg-amber-100 text-amber-700 group-hover:bg-amber-500 group-hover:text-white"
										}`}
									>
										<Icon className="size-7" />
									</div>

									<span className="text-4xl font-extrabold tracking-tight text-slate-100 transition-colors duration-300 group-hover:text-slate-200 sm:text-5xl">
										{service.number}
									</span>
								</div>

								{/* Card content */}
								<h3 className="mt-7 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
									{service.title}
								</h3>

								<p className="mt-3 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
									{service.description}
								</p>

								{/* Features */}
								<div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
									{service.features.map((feature) => (
										<div
											key={feature}
											className="flex items-center gap-2 text-sm font-medium text-slate-600"
										>
											<CheckCircle2
												className={`size-4 shrink-0 ${
													isPlumbing
														? "text-sky-600"
														: "text-amber-600"
												}`}
											/>
											{feature}
										</div>
									))}
								</div>

								{/* Card footer */}
								<div className="mt-8 border-t border-slate-100 pt-5">
									<Link
										href={service.href}
										className={`inline-flex items-center gap-2 text-sm font-bold transition-colors ${
											isPlumbing
												? "text-sky-700 hover:text-sky-900"
												: "text-amber-700 hover:text-amber-900"
										}`}
									>
										Explore service
										<ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
									</Link>
								</div>
							</article>
						);
					})}
				</div>

				{/* Bottom note */}
				<div className="mt-8 flex flex-col gap-3 rounded-xl border border-slate-200/80 bg-white/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
					<p className="text-sm leading-6 text-slate-600">
						Not sure what you need? Start with a service request
						and let the team coordinate the next step.
					</p>

					<Link
						href="/login"
						className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-sky-700 hover:text-sky-900"
					>
						Request a service
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
