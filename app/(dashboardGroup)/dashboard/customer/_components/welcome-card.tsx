
import Link from "next/link";
import {
	ArrowRight,
	ClipboardList,
	Plus,
	ShieldCheck,
} from "lucide-react";

interface WelcomeCardProps {
	name?: string;
}

export default function WelcomeCard({ name }: WelcomeCardProps) {
	const customerName = name?.trim() || "Customer";

	return (
		<section className="relative isolate overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
			<div className="absolute -right-12 -top-16 -z-10 size-56 rounded-full bg-sky-50" />

			<div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
				<ShieldCheck className="size-4" />
				DistrictFix Customer Center
			</div>

			<h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
				Welcome back, {customerName}!
			</h1>

			<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
				Manage your home service requests, track ongoing work,
				and stay updated on your plumbing and electrical services.
			</p>

			<div className="mt-6 flex flex-wrap gap-3">
				<Link
					href="/dashboard/customer/service-requests"
					className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
				>
					<ClipboardList className="size-4" />
					My Service Requests
					<ArrowRight className="size-4" />
				</Link>

				<Link
					href="/dashboard/customer/service-requests/new"
					className="inline-flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
				>
					<Plus className="size-4" />
					Request a Service
				</Link>
			</div>
		</section>
	);
}