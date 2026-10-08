import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { ServiceRequest } from "@/types/service-request";
import PendingServiceItem from "./pending-service-item";


type PendingServicesProps = {
	services: ServiceRequest[];
};

export default function PendingServices({
	services,
}: PendingServicesProps) {
	return (
		<section className="overflow-hidden rounded-2xl border bg-white shadow-sm">
			<div className="flex items-center justify-between border-b px-5 py-4">
				<div>
					<h2 className="font-semibold text-slate-900">
						Pending Services
					</h2>

					<p className="mt-1 text-xs text-slate-500">
						Services waiting for assignment
					</p>
				</div>

				<Link
					href="/dashboard/customer/services?status=PENDING"
					className="flex items-center gap-1 text-sm font-medium text-sky-600 transition hover:text-sky-700"
				>
					View all
					<ArrowRight className="size-4" />
				</Link>
			</div>

			<div className="divide-y">
				{services.length > 0 ? (
					services.map((service) => (
						<PendingServiceItem
							key={service.id}
							service={service}
						/>
					))
				) : (
					<div className="px-5 py-12 text-center">
						<div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100">
							<ArrowRight className="size-5 text-slate-400" />
						</div>

						<p className="mt-3 text-sm font-medium text-slate-700">
							No pending services
						</p>

						<p className="mt-1 text-xs text-slate-500">
							You don't have any services waiting
							for assignment.
						</p>
					</div>
				)}
			</div>
		</section>
	);
}