
import Link from "next/link";
import { ArrowUpRight, Wrench, Zap } from "lucide-react";

const services = [
	{
		title: "Plumbing Services",
		description:
			"Get help with leaking pipes, faulty taps, blocked drains, and other plumbing issues.",
		icon: Wrench,
		iconClass: "bg-sky-100 text-sky-700",
		href: "/services",
	},
	{
		title: "Electrical Services",
		description:
			"Find help for electrical repairs, faulty switches, lighting, and household wiring.",
		icon: Zap,
		iconClass: "bg-amber-100 text-amber-700",
		href: "/services",
	},
];

export function ServicesSection() {
	return (
		<section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
						Our Services
					</p>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						Home services made simple
					</h2>
					<p className="mt-4 leading-7 text-slate-600">
						From everyday plumbing problems to electrical repairs,
						DistrictFix helps you organize the service you need.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-2">
					{services.map((service) => {
						const Icon = service.icon;

						return (
							<article
								key={service.title}
								className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl sm:p-9"
							>
								<div
									className={`flex size-14 items-center justify-center rounded-2xl ${service.iconClass}`}
								>
									<Icon className="size-7" />
								</div>

								<h3 className="mt-6 text-xl font-bold text-slate-900">
									{service.title}
								</h3>

								<p className="mt-3 leading-7 text-slate-600">
									{service.description}
								</p>

								<Link
									href={service.href}
									className="mt-6 inline-flex items-center gap-2 font-semibold text-sky-700 transition-colors hover:text-sky-900"
								>
									Explore service
									<ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
								</Link>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
