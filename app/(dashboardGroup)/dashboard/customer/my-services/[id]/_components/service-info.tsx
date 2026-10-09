import {
	CalendarDays,
	MapPin,
	Phone,
	Wrench,
} from "lucide-react";

import type { ServiceRequest } from "@/types/service-request";

type ServiceInfoProps = {
	service: ServiceRequest;
};

function formatServiceType(serviceType: ServiceRequest["serviceType"]) {
	return serviceType === "PLUMBING" ? "Plumbing" : "Electrical";
}

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

export default function ServiceInfo({
	service,
}: ServiceInfoProps) {
	return (
		<section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
			<div className="mb-5">
				<h2 className="text-lg font-semibold text-slate-900">
					Service Information
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					Details about your service request.
				</p>
			</div>

			<div className="grid gap-5 sm:grid-cols-2">
				<div className="flex gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
						<Wrench className="size-5" />
					</div>

					<div>
						<p className="text-xs font-medium text-slate-400">
							Service Type
						</p>

						<p className="mt-1 text-sm font-semibold text-slate-800">
							{formatServiceType(service.serviceType)}
						</p>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
						<MapPin className="size-5" />
					</div>

					<div className="min-w-0">
						<p className="text-xs font-medium text-slate-400">
							District
						</p>

						<p className="mt-1 text-sm font-semibold text-slate-800">
							{service.district.name}, {service.district.division}
						</p>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
						<Phone className="size-5" />
					</div>

					<div>
						<p className="text-xs font-medium text-slate-400">
							Phone
						</p>

						<p className="mt-1 text-sm font-semibold text-slate-800">
							{service.phone || "Not provided"}
						</p>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
						<CalendarDays className="size-5" />
					</div>

					<div>
						<p className="text-xs font-medium text-slate-400">
							Requested On
						</p>

						<p className="mt-1 text-sm font-semibold text-slate-800">
							{formatDate(service.createdAt)}
						</p>
					</div>
				</div>
			</div>

			<div className="mt-6 border-t border-slate-100 pt-5">
				<div className="flex gap-3">
					<MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />

					<div>
						<p className="text-xs font-medium text-slate-400">
							Service Address
						</p>

						<p className="mt-1 text-sm leading-6 text-slate-700">
							{service.address}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}