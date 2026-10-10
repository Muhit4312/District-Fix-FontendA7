
import Link from "next/link";
import {
	ArrowRight,
	CheckCircle2,
	ClipboardList,
	MapPin,
	UserRoundCheck,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

const steps = [
	{
		number: "01",
		icon: ClipboardList,
		title: "Choose your service",
		description:
			"Select plumbing or electrical service and describe the problem you need help with.",
	},
	{
		number: "02",
		icon: MapPin,
		title: "Share your location",
		description:
			"Select your district and provide your address and contact details so your request can be coordinated locally.",
	},
	{
		number: "03",
		icon: UserRoundCheck,
		title: "Track your request",
		description:
			"Submit your request and follow its status as the responsible service holder coordinates a suitable professional.",
	},
];

export function HowToRequest() {
	return (
		<section className="relative isolate overflow-hidden bg-white px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
			<div className="pointer-events-none absolute -left-32 top-20 -z-10 size-72 rounded-full bg-sky-100/60 blur-3xl" />
			<div className="pointer-events-none absolute -right-32 bottom-0 -z-10 size-72 rounded-full bg-blue-100/50 blur-3xl" />

			<div className="mx-auto max-w-6xl">
				<div className="mx-auto max-w-2xl text-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3.5 py-2 text-xs font-bold uppercase tracking-[0.16em] text-sky-700">
						<CheckCircle2 className="size-4" />
						Simple process
					</div>

					<h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						How to request a{" "}
						<span className="text-sky-600">service</span>
					</h2>

					<p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
						Get started in a few simple steps. DistrictFix
						helps organize your request and coordinate
						home services in your district.
					</p>
				</div>

				<div className="mt-12 grid gap-5 md:grid-cols-3">
					{steps.map((step) => {
						const Icon = step.icon;

						return (
							<Card
								key={step.number}
								className="group relative rounded-2xl border-slate-200 bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl hover:shadow-sky-950/5"
							>
								<CardContent className="p-6 sm:p-7">
									<div className="flex items-start justify-between">
										<div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-600 group-hover:text-white">
											<Icon className="size-6" />
										</div>

										<span className="text-4xl font-black tracking-tight text-sky-100 transition-colors group-hover:text-sky-200">
											{step.number}
										</span>
									</div>

									<h3 className="mt-6 text-lg font-bold text-slate-900">
										{step.title}
									</h3>

									<p className="mt-3 text-sm leading-7 text-slate-600">
										{step.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>

				<div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-sky-100 bg-sky-50/70 p-5 sm:flex-row sm:px-7">
					<div>
						<h3 className="font-bold text-slate-900">
							Ready to get started?
						</h3>
						<p className="mt-1 text-sm leading-6 text-slate-600">
							Explore our services and find the right
							option for your home.
						</p>
					</div>

					<Link
						href="/dashboard/customer/requests/new"
						className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-sky-700 sm:w-auto"
					>
						Create a request
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
