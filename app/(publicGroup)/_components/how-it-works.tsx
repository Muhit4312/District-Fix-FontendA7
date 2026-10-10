
import { ArrowRight, ClipboardList, MapPin, UserCheck } from "lucide-react";

const steps = [
	{
		number: "01",
		title: "Choose your district",
		description:
			"Select your district and provide your service address.",
		icon: MapPin,
	},
	{
		number: "02",
		title: "Submit a request",
		description:
			"Tell us what you need and submit your service request.",
		icon: ClipboardList,
	},
	{
		number: "03",
		title: "Get assigned a worker",
		description:
			"Your request can be managed by the responsible service holder.",
		icon: UserCheck,
	},
];

export function HowItWorks() {
	return (
		<section className="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
						How It Works
					</p>
					<h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
						Three steps to get started
					</h2>
					<p className="mt-4 leading-7 text-slate-600">
						A straightforward process to request home services
						through your district.
					</p>
				</div>

				<div className="mt-12 grid gap-6 md:grid-cols-3">
					{steps.map((step, index) => {
						const Icon = step.icon;

						return (
							<div
								key={step.number}
								className="relative rounded-2xl border border-slate-200 bg-white p-7"
							>
								<div className="flex items-center justify-between">
									<span className="text-3xl font-bold text-sky-100">
										{step.number}
									</span>
									<div className="flex size-12 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
										<Icon className="size-6" />
									</div>
								</div>

								<h3 className="mt-6 text-lg font-bold text-slate-900">
									{step.title}
								</h3>
								<p className="mt-3 text-sm leading-7 text-slate-600">
									{step.description}
								</p>

								{index < steps.length - 1 && (
									<ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-8 rounded-full border bg-white p-1.5 text-sky-600 md:block" />
								)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
