import Link from "next/link";
import {
	ArrowUpRight,
	CalendarDays,
	MapPin,
	Wrench,
} from "lucide-react";

import type { ServiceRequest } from "@/types/service-request";

type ServiceItemProps = {
	service: ServiceRequest;
};

const statusStyles: Record<
	ServiceRequest["status"],
	string
> = {
	PENDING:
		"bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
	ASSIGNED:
		"bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200",
	ACCEPTED:
		"bg-violet-50 text-violet-700 ring-1 ring-inset ring-violet-200",
	IN_PROGRESS:
		"bg-sky-50 text-sky-700 ring-1 ring-inset ring-sky-200",
	COMPLETED:
		"bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
	CANCELLED:
		"bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
	REJECTED:
		"bg-red-50 text-red-700 ring-1 ring-inset ring-red-200",
};

function formatStatus(
	status: ServiceRequest["status"],
) {
	return status.replaceAll("_", " ");
}

function formatServiceType(
	serviceType: ServiceRequest["serviceType"],
) {
	return serviceType === "PLUMBING"
		? "Plumbing"
		: "Electrical";
}

export default function ServiceItem({
	service,
}: ServiceItemProps) {
	return (
		<Link
			href={`/dashboard/customer/my-services/${service.id}`}
			className="group block rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
		>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
				<div className="flex min-w-0 flex-1 items-center gap-4">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
						<Wrench className="size-5" />
					</div>

					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<h2 className="truncate font-semibold text-slate-900">
								{service.serviceName}
							</h2>

							<span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500">
								{formatServiceType(
									service.serviceType,
								)}
							</span>
						</div>

						<div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
							<span className="flex items-center gap-1">
								<MapPin className="size-3.5 shrink-0" />
								{service.district.name}
							</span>

							<span className="flex items-center gap-1">
								<CalendarDays className="size-3.5 shrink-0" />
								{new Date(
									service.createdAt,
								).toLocaleDateString()}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between gap-4 sm:justify-end">
					<span
						className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[service.status]}`}
					>
						{formatStatus(service.status)}
					</span>

					<div className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors group-hover:bg-slate-50 group-hover:text-slate-600">
						<ArrowUpRight className="size-4" />
					</div>
				</div>
			</div>
		</Link>
	);
}