
import Link from "next/link";
import {
	ArrowUpRight,
	CheckCircle2,
	Droplets,
	Zap,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const services = [
	{
		title: "Plumbing Services",
		description:
			"Get help with common plumbing problems and essential water system repairs around your home.",
		icon: Droplets,
		number: "01",
		features: [
			"Leaking taps and pipes",
			"Faucet and sink repairs",
			"Water supply issues",
			"Pipe and plumbing maintenance",
		],
	},
	{
		title: "Electrical Services",
		description:
			"Request help with household electrical problems and common electrical installation work.",
		icon: Zap,
		number: "02",
		features: [
			"Switch and socket problems",
			"Lighting installation",
			"Electrical wiring issues",
			"Basic electrical troubleshooting",
		],
	},
];

export function ServicesList() {
	return (
		<section
			id="available-services"
			className="scroll-mt-20 bg-slate-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8"
		>
			<div className="mx-auto max-w-6xl">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-700">
						What we offer
					</p>

					<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						Our home services
					</h2>

					<p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
						Choose the service you need and start a request
						through DistrictFix.
					</p>
				</div>

				<div className="mt-10 grid gap-6 md:grid-cols-2">
					{services.map((service) => {
						const Icon = service.icon;

						return (
							<Card
								key={service.number}
								className="group overflow-hidden rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/5"
							>
								<CardContent className="p-6 sm:p-8">
									<div className="flex items-start justify-between">
										<div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-lg shadow-sky-600/15">
											<Icon className="size-7" />
										</div>

										<span className="text-4xl font-black tracking-tight text-sky-100 transition-colors group-hover:text-sky-200">
											{service.number}
										</span>
									</div>

									<h3 className="mt-6 text-2xl font-extrabold tracking-tight text-slate-900">
										{service.title}
									</h3>

									<p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
										{service.description}
									</p>

									<ul className="mt-6 space-y-3">
										{service.features.map((feature) => (
											<li
												key={feature}
												className="flex items-start gap-3 text-sm text-slate-700"
											>
												<CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-600" />
												<span>{feature}</span>
											</li>
										))}
									</ul>

									<Link
										href="/dashboard/customer/create-service"
										className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-sky-50 px-5 py-3 text-sm font-bold text-sky-800 transition-colors hover:bg-sky-600 hover:text-white"
									>
										Request this service
										<ArrowUpRight className="size-4" />
									</Link>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<p className="mt-6 text-center text-xs leading-6 text-slate-500">
					Service availability depends on your district and
					the professionals available to handle your request.
				</p>
			</div>
		</section>
	);
}
