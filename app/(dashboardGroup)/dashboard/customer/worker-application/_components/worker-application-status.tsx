import {
	AlertCircle,
	CalendarDays,
	CheckCircle2,
	Clock3,
	MapPin,
	XCircle,
} from "lucide-react";
import { WorkerApplication, WorkerApplicationStatusType } from "../_types/worker-application";


interface WorkerApplicationStatusProps {
	application: WorkerApplication;
}

const statusConfig: Record<
	WorkerApplicationStatusType,
	{
		label: string;
		className: string;
		icon: typeof Clock3;
	}
> = {
	PENDING: {
		label: "Pending Review",
		className: "bg-amber-50 text-amber-700 ring-amber-200",
		icon: Clock3,
	},
	APPROVED: {
		label: "Approved",
		className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
		icon: CheckCircle2,
	},
	REJECTED: {
		label: "Rejected",
		className: "bg-red-50 text-red-700 ring-red-200",
		icon: XCircle,
	},
};

export default function WorkerApplicationStatus({
	application,
}: WorkerApplicationStatusProps) {
	const config = statusConfig[application.status];
	const StatusIcon = config.icon;

	const districtName = application.district?.name ?? "District";
	const division = application.district?.division;
	const submittedDate = new Date(application.createdAt);

	return (
		<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
			<div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
				<div className="flex items-start gap-3">
					<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
						<StatusIcon className="size-6" />
					</div>

					<div>
						<p className="text-sm font-medium text-slate-500">
							Worker Application
						</p>
						<h2 className="mt-1 text-lg font-bold text-slate-900">
							{application.workerType === "PLUMBER"
								? "Plumber Application"
								: "Electrician Application"}
						</h2>

						<span
							className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${config.className}`}
						>
							<StatusIcon className="size-3.5" />
							{config.label}
						</span>
					</div>
				</div>

				<div className="text-sm text-slate-500">
					<p className="flex items-center gap-2">
						<CalendarDays className="size-4" />
						{Number.isNaN(submittedDate.getTime())
							? "Date unavailable"
							: submittedDate.toLocaleDateString("en-GB", {
									day: "numeric",
									month: "short",
									year: "numeric",
								})}
					</p>
					<p className="mt-2 flex items-center gap-2">
						<MapPin className="size-4" />
						{districtName}
						{division ? `, ${division}` : ""}
					</p>
				</div>
			</div>

			<div className="mt-5 border-t border-slate-100 pt-4">
				{application.status === "PENDING" && (
					<div className="flex gap-3 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
						<Clock3 className="mt-0.5 size-5 shrink-0" />
						<div>
							<p className="font-semibold">
								Your application is under review.
							</p>
							<p className="mt-1 leading-5 text-amber-800">
								Please wait while the team reviews your information.
								You cannot submit another application while this one is pending.
							</p>
						</div>
					</div>
				)}

				{application.status === "APPROVED" && (
					<div className="flex gap-3 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900">
						<CheckCircle2 className="mt-0.5 size-5 shrink-0" />
						<div>
							<p className="font-semibold">
								Your application has been approved!
							</p>
							<p className="mt-1 leading-5 text-emerald-800">
								Your worker dashboard will be available once your worker
								account and permissions have been configured.
							</p>
						</div>
					</div>
				)}

				{application.status === "REJECTED" && (
					<div className="flex gap-3 rounded-xl bg-red-50 p-4 text-sm text-red-900">
						<AlertCircle className="mt-0.5 size-5 shrink-0" />
						<div>
							<p className="font-semibold">
								Your application was not approved.
							</p>
							<p className="mt-1 leading-5 text-red-800">
								{application.rejectionReason ||
									"No rejection reason was provided."}
							</p>
							<p className="mt-2 text-red-700">
								You may submit a new application if permitted by the backend.
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}