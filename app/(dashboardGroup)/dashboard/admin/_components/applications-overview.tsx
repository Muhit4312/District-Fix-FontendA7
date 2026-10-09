import Link from "next/link";
import {
ArrowRight,
CalendarDays,
FileSearch,
MapPin,
UserRound,
} from "lucide-react";

import { getOverviewApplications } from "../_actions/get-overview-applications";
import type { OverviewApplication } from "../_actions/get-overview-applications";

function formatDate(date: string) {
const parsedDate = new Date(date);


if (Number.isNaN(parsedDate.getTime())) {
	return "Date unavailable";
}

return new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	month: "short",
	year: "numeric",
}).format(parsedDate);


}

function getStatusClass(status: string) {
switch (status.toUpperCase()) {
case "APPROVED":
return "bg-emerald-50 text-emerald-700";
case "REJECTED":
return "bg-red-50 text-red-700";
case "PENDING":
return "bg-amber-50 text-amber-700";
default:
return "bg-slate-100 text-slate-700";
}
}

export default async function ApplicationsOverview() {
let applications: OverviewApplication[] = [];
let errorMessage = "";


try {
	const result = await getOverviewApplications();
	applications = result.data ?? [];
} catch (error) {
	errorMessage =
		error instanceof Error
			? error.message
			: "Failed to load applications.";
}

return (
	<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
		<div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 className="text-lg font-semibold text-slate-900">
					Service Holder Applications
				</h2>
				<p className="mt-1 text-sm text-slate-500">
					Recently submitted applications.
				</p>
			</div>

			<Link
				href="/dashboard/admin/service-holders/applications"
				className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
			>
				View all
				<ArrowRight className="size-4" />
			</Link>
		</div>

		{errorMessage ? (
			<div className="p-6 text-sm text-red-600">
				{errorMessage}
			</div>
		) : applications.length === 0 ? (
			<div className="flex flex-col items-center px-5 py-12 text-center">
				<div className="flex size-12 items-center justify-center rounded-full bg-slate-100">
					<FileSearch className="size-6 text-slate-500" />
				</div>

				<h3 className="mt-4 font-semibold text-slate-900">
					No applications yet
				</h3>

				<p className="mt-1 text-sm text-slate-500">
					New Service Holder applications will appear here.
				</p>
			</div>
		) : (
			<div className="divide-y divide-slate-100">
				{applications.map((application) => (
					<div
						key={application.id}
						className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
					>
						<div className="min-w-0 space-y-2">
							<div className="flex flex-wrap items-center gap-2">
								<h3 className="font-semibold text-slate-900">
									{application.user?.name ||
										"Unnamed applicant"}
								</h3>

								<span
									className={`rounded-full px-2.5 py-1 text-xs font-medium ${getStatusClass(application.status)}`}
								>
									{application.status}
								</span>
							</div>

							{application.user?.email && (
								<p className="break-all text-sm text-slate-500">
									{application.user.email}
								</p>
							)}

							<div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
								{application.district?.name && (
									<span className="inline-flex items-center gap-1.5">
										<MapPin className="size-3.5" />
										{application.district.name}
									</span>
								)}

								<span className="inline-flex items-center gap-1.5">
									<CalendarDays className="size-3.5" />
									{formatDate(application.createdAt)}
								</span>
							</div>
						</div>

						<Link
							href={`/dashboard/admin/service-holders/applications/${application.id}`}
							className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
						>
							<UserRound className="size-4" />
							Review
						</Link>
					</div>
				))}
			</div>
		)}
	</section>
);


}
