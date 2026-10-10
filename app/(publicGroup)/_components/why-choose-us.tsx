
import {
	ClipboardCheck,
	MapPinned,
	ShieldCheck,
	Users,
} from "lucide-react";

const benefits = [
	{
		title: "District-based management",
		description:
			"Service requests are organized according to the customer's district.",
		icon: MapPinned,
	},
	{
		title: "Organized requests",
		description:
			"Keep track of your requests and follow their progress.",
		icon: ClipboardCheck,
	},
	{
		title: "Dedicated service workers",
		description:
			"Requests can be assigned to plumbers and electricians.",
		icon: Users,
	},
	{
		title: "A clear process",
		description:
			"Follow a structured workflow from request submission to completion.",
		icon: ShieldCheck,
	},
];

export function WhyChooseUs() {
	return (
		<section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
			<div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
				<div>
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
						Why DistrictFix
					</p>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
						A better way to manage home services
					</h2>
					<p className="mt-5 max-w-xl leading-8 text-slate-600">
						Getting home repairs should not be complicated.
						DistrictFix brings customers, service holders, and
						service workers into one organized system.
					</p>
				</div>

				<div className="grid gap-5 sm:grid-cols-2">
					{benefits.map((benefit) => {
						const Icon = benefit.icon;

						return (
							<div
								key={benefit.title}
								className="rounded-2xl border border-slate-200 p-5 transition-colors hover:border-sky-200"
							>
								<div className="flex size-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
									<Icon className="size-5" />
								</div>
								<h3 className="mt-4 font-semibold text-slate-900">
									{benefit.title}
								</h3>
								<p className="mt-2 text-sm leading-6 text-slate-600">
									{benefit.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
