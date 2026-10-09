import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import type { ServiceRequest } from "@/types/service-request";
import CancelServiceDialog from "./cancel-service-dialog";

type ServiceHeaderProps = {
	service: ServiceRequest;
};

const statusStyles: Record<ServiceRequest["status"], string> = {
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

function formatStatus(status: ServiceRequest["status"]) {
	return status.replaceAll("_", " ");
}

function formatServiceType(serviceType: ServiceRequest["serviceType"]) {
	return serviceType === "PLUMBING" ? "Plumbing" : "Electrical";
}

export default function ServiceHeader({
	service,
}: ServiceHeaderProps) {
	const isPaymentCompleted =
		service.payment?.status === "COMPLETED";

	return (
		<section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
			<div className="flex flex-col gap-5">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
					<div className="min-w-0">
						<Link
							href="/dashboard/customer/my-services"
							className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
						>
							<ArrowLeft className="size-4" />
							Back to My Services
						</Link>

						<div className="flex flex-wrap items-center gap-2">
							<span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
								{formatServiceType(service.serviceType)}
							</span>

							<span
								className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${statusStyles[service.status]}`}
							>
								{formatStatus(service.status)}
							</span>
						</div>

						<h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
							{service.serviceName}
						</h1>

						<p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
							{service.description}
						</p>
					</div>

					<div className="shrink-0 text-left sm:text-right">
						<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
							Requested
						</p>

						<p className="mt-1 text-sm font-semibold text-slate-700">
							{new Date(service.createdAt).toLocaleDateString()}
						</p>
					</div>
				</div>

				<div className="flex justify-end border-t border-slate-100 pt-4">
					{isPaymentCompleted ? (
						<div className="inline-flex h-9 items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-700">
							<CheckCircle2 className="size-4" />
							Payment Completed
						</div>
					) : (
						<CancelServiceDialog
							serviceId={service.id}
							status={service.status}
						/>
					)}
				</div>
			</div>
		</section>
	);
}