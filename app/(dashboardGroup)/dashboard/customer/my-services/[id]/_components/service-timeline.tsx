import {
	Check,
	Circle,
	Clock3,
	ClipboardCheck,
	Hammer,
	UserCheck,
	Wrench,
	XCircle,
} from "lucide-react";

import type { ServiceRequest } from "@/types/service-request";

type ServiceTimelineProps = {
	service: ServiceRequest;
};

type TimelineItem = {
	label: string;
	description: string;
	date: string | null;
	icon: typeof Circle;
};

function formatDate(date: string | null) {
	if (!date) return null;

	return new Date(date).toLocaleString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
	});
}

export default function ServiceTimeline({
	service,
}: ServiceTimelineProps) {
	const timeline: TimelineItem[] = [
		{
			label: "Request Submitted",
			description: "Your service request has been submitted.",
			date: service.createdAt,
			icon: ClipboardCheck,
		},
		{
			label: "Assigned",
			description: "Your request has been assigned to a service holder.",
			date: service.assignedAt,
			icon: UserCheck,
		},
		{
			label: "Service Accepted",
			description: "The assigned worker accepted the service request.",
			date: service.acceptedAt,
			icon: Check,
		},
		{
			label: "Work In Progress",
			description: "The worker has started working on your request.",
			date: service.startedAt,
			icon: Wrench,
		},
		{
			label: "Completed",
			description: "Your service request has been completed.",
			date: service.completedAt,
			icon: Check,
		},
	];

	const isCancelled = service.status === "CANCELLED";
	const isRejected = service.status === "REJECTED";

	if (isCancelled) {
		timeline.push({
			label: "Request Cancelled",
			description:
				service.cancellationReason || "This service request was cancelled.",
			date: service.cancelledAt,
			icon: XCircle,
		});
	}

	if (isRejected) {
		timeline.push({
			label: "Request Rejected",
			description:
				service.rejectionReason || "This service request was rejected.",
			date: service.rejectedAt,
			icon: XCircle,
		});
	}

	return (
		<section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
			<div className="mb-6">
				<h2 className="text-lg font-semibold text-slate-900">
					Service Timeline
				</h2>

				<p className="mt-1 text-sm text-slate-500">
					Track the progress of your service request.
				</p>
			</div>

			<div className="space-y-0">
				{timeline.map((item, index) => {
					const Icon = item.icon;
					const isCompleted = Boolean(item.date);
					const isLast = index === timeline.length - 1;

					return (
						<div key={item.label} className="relative flex gap-4">
							{!isLast && (
								<div
									className={`absolute left-5 top-10 h-[calc(100%-18px)] w-px ${
										isCompleted
											? "bg-emerald-200"
											: "bg-slate-200"
									}`}
								/>
							)}

							<div
								className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ${
									isCompleted
										? "bg-emerald-50 text-emerald-600 ring-4 ring-white"
										: "bg-slate-50 text-slate-300 ring-4 ring-white"
								}`}
							>
								{isCompleted ? (
									<Icon className="size-4" />
								) : (
									<Circle className="size-3.5" />
								)}
							</div>

							<div className="min-w-0 flex-1 pb-7">
								<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
									<h3
										className={`text-sm font-semibold ${
											isCompleted
												? "text-slate-900"
												: "text-slate-400"
										}`}
									>
										{item.label}
									</h3>

									{item.date && (
										<span className="text-xs text-slate-400">
											{formatDate(item.date)}
										</span>
									)}
								</div>

								<p
									className={`mt-1 text-sm leading-5 ${
										isCompleted
											? "text-slate-500"
											: "text-slate-400"
									}`}
								>
									{item.description}
								</p>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
}