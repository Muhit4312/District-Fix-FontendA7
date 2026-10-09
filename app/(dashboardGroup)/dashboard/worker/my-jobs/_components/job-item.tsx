
import Link from "next/link";
import {
	ArrowRight,
	CalendarDays,
	MapPin,
	Wrench,
} from "lucide-react";

import type { WorkerService } from "@/types/worker";

interface JobItemProps {
	service: WorkerService;
}

const statusStyles: Record<string, string> = {
	PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
	ASSIGNED: "bg-blue-50 text-blue-700 ring-blue-200",
	ACCEPTED: "bg-violet-50 text-violet-700 ring-violet-200",
	IN_PROGRESS: "bg-sky-50 text-sky-700 ring-sky-200",
	COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
	CANCELLED: "bg-red-50 text-red-700 ring-red-200",
	REJECTED: "bg-red-50 text-red-700 ring-red-200",
};

function formatStatus(status: string) {
	return status.replaceAll("_", " ");
}

function formatDate(date: string | Date) {
	return new Date(date).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	});
}

export default function JobItem({ service }: JobItemProps) {
	const statusClass =
		statusStyles[service.status] ??
		"bg-slate-100 text-slate-700 ring-slate-200";

	return (
		<Link
			href={`/dashboard/worker/my-jobs/${service.id}`}
			className="group block w-full rounded-xl border border-slate-200/80 bg-white p-4 transition-all duration-200 hover:border-sky-300 hover:bg-sky-50/30 hover:shadow-sm sm:p-5"
		>
			<div className="flex items-start justify-between gap-3">
				<div className="flex min-w-0 items-start gap-3">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition-colors group-hover:bg-sky-100">
						<Wrench className="size-5" />
					</div>

					<div className="min-w-0 flex-1">
						<h3 className="truncate font-semibold text-slate-900 transition-colors group-hover:text-sky-700">
							{service.serviceName}
						</h3>

						<div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
							<span className="truncate">
								Customer: {service.customer.name}
							</span>

							<span className="hidden size-1 rounded-full bg-slate-300 sm:inline-block" />

							<span className="flex items-center gap-1">
								<MapPin className="size-3.5 shrink-0" />
								{service.district.name}
							</span>
						</div>
					</div>
				</div>

				<span
					className={`inline-flex shrink-0 items-center rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusClass}`}
				>
					{formatStatus(service.status)}
				</span>
			</div>

			<div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3">
				<div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
					<CalendarDays className="size-4 shrink-0" />
					<span>Requested date</span>
					<span className="font-medium text-slate-700">
						{formatDate(service.createdAt)}
					</span>
				</div>

				<span className="ml-auto inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-sky-700 transition-colors group-hover:text-sky-800">
					View Details
					<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
				</span>
			</div>
		</Link>
	);
}