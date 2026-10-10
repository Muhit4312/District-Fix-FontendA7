
import {
	CheckCircle2,
	ClipboardCheck,
	Users,
	Wrench,
} from "lucide-react";

const steps = [
	{
		number: "01",
		icon: ClipboardCheck,
		title: "Submit a request",
		description:
			"Customers choose a service, provide their location and address, and describe what they need.",
	},
	{
		number: "02",
		icon: Users,
		title: "Coordinate locally",
		description:
			"The responsible service holder coordinates the request based on the customer's district.",
	},
	{
		number: "03",
		icon: Wrench,
		title: "Assign a professional",
		description:
			"An appropriate plumber or electrician can be assigned to handle the service request.",
	},
	{
		number: "04",
		icon: CheckCircle2,
		title: "Track progress",
		description:
			"Customers and responsible team members can follow the request as its status changes.",
	},
];

export function AboutHowItWorks() {
	return (
		<section className="px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
						Our process
					</p>

					<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						How DistrictFix works
					</h2>

					<p className="mt-4 text-base leading-8 text-slate-600">
						A straightforward workflow designed to help
						coordinate a home service request from start
						to finish.
					</p>
				</div>

				<div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
					{steps.map((step) => {
						const Icon = step.icon;

						return (
							<div key={step.number}>
								<div className="flex items-center justify-between">
									<div className="flex size-14 items-center justify-center rounded-2xl border-b-2 border-sky-500 bg-sky-50 text-sky-700 ring-1 ring-sky-100">
										<Icon className="size-6" />
									</div>

									<span className="text-3xl font-extrabold tracking-tight text-sky-100">
										{step.number}
									</span>
								</div>

								<h3 className="mt-5 text-lg font-bold text-slate-900">
									{step.title}
								</h3>

								<p className="mt-3 text-sm leading-7 text-slate-600">
									{step.description}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
