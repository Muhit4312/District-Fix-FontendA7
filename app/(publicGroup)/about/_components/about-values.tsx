
import {
	HandHeart,
	MapPin,
	ShieldCheck,
	Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const values = [
	{
		icon: MapPin,
		title: "Local-first service",
		description:
			"We organize home service requests by district to make it easier to coordinate customers and local service professionals.",
	},
	{
		icon: ShieldCheck,
		title: "Trust and accountability",
		description:
			"Clear request statuses and role-based responsibilities help make the service process easier to follow.",
	},
	{
		icon: HandHeart,
		title: "Customer-focused",
		description:
			"We aim to make requesting plumbing and electrical services simpler, clearer, and more convenient.",
	},
	{
		icon: Users,
		title: "Connected community",
		description:
			"DistrictFix brings customers, service holders, and skilled workers together through one platform.",
	},
];

export function AboutValues() {
	return (
		<section className="bg-slate-50 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto max-w-3xl text-center">
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
						What matters to us
					</p>

					<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
						Built around your needs
					</h2>

					<p className="mt-4 text-base leading-8 text-slate-600">
						The principles behind the way DistrictFix
						is designed to work.
					</p>
				</div>

				<div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
					{values.map((value) => {
						const Icon = value.icon;

						return (
							<Card
								key={value.title}
								className="group rounded-2xl border-b-2 border-sky-300 bg-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/5"
							>
								<CardContent className="p-6">
									<div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-600 group-hover:text-white">
										<Icon className="size-6" />
									</div>

									<h3 className="mt-5 text-lg font-bold text-slate-900">
										{value.title}
									</h3>

									<p className="mt-3 text-sm leading-7 text-slate-600">
										{value.description}
									</p>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
		</section>
	);
}
