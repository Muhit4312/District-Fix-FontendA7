
import Link from "next/link";
import {
	ArrowLeft,
	ArrowRight,
	CalendarDays,
	Eye,
	FileSearch,
	MapPin,
	UserRound,
} from "lucide-react";
import { Application } from "../_actions/applications.action";

interface ApplicationsListProps {
	applications: Application[];
	page: number;
	totalPages: number;
	searchTerm: string;
	status: string;
}

function formatDate(value: string) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Unavailable";
	}

	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	}).format(date);
}

function statusStyle(status: string) {
	switch (status.toUpperCase()) {
		case "PENDING":
			return "bg-amber-50 text-amber-700 ring-amber-600/20";
		case "APPROVED":
			return "bg-emerald-50 text-emerald-700 ring-emerald-600/20";
		case "REJECTED":
			return "bg-rose-50 text-rose-700 ring-rose-600/20";
		default:
			return "bg-slate-100 text-slate-600 ring-slate-500/20";
	}
}

function paginationHref(
	page: number,
	searchTerm: string,
	status: string,
) {
	const params = new URLSearchParams({ page: String(page) });

	if (searchTerm) params.set("searchTerm", searchTerm);
	if (status !== "ALL") params.set("status", status);

	return `/dashboard/admin/service-holders/applications?${params.toString()}`;
}

export default function ApplicationsList({
	applications,
	page,
	totalPages,
	searchTerm,
	status,
}: ApplicationsListProps) {
	if (applications.length === 0) {
		return (
			<div className="flex flex-col items-center px-5 py-16 text-center">
				<div className="flex size-16 items-center justify-center rounded-2xl bg-sky-50 text-sky-600">
					<FileSearch className="size-8" />
				</div>

				<h3 className="mt-4 font-semibold text-slate-900">
					No applications found
				</h3>

				<p className="mt-1 max-w-sm text-sm text-slate-500">
					Try changing your search or status filter.
				</p>

				<Link
					href="/dashboard/admin/service-holders/applications"
					className="mt-4 text-sm font-semibold text-sky-700 hover:text-sky-800"
				>
					Clear filters
				</Link>
			</div>
		);
	}

	return (
		<>
			<div className="divide-y divide-slate-100">
				{applications.map((application) => (
					<div
						key={application.id}
						className="flex flex-col gap-4 p-5 transition-colors hover:bg-slate-50/70 sm:flex-row sm:items-center"
					>
						<div className="flex min-w-0 flex-1 items-start gap-3">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
								<UserRound className="size-5" />
							</div>

							<div className="min-w-0 flex-1">
								<div className="flex flex-wrap items-center gap-2">
									<h3 className="break-words text-sm font-semibold text-slate-900">
										{application.user?.name || "Unknown applicant"}
									</h3>

									<span
										className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset ${statusStyle(application.status)}`}
									>
										{application.status}
									</span>
								</div>

								<p className="mt-1 break-all text-sm text-slate-500">
									{application.user?.email || "No email provided"}
								</p>

								<div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
									<span className="inline-flex items-center gap-1.5">
										<MapPin className="size-3.5 text-sky-600" />
										{application.district?.name || "District unavailable"}
									</span>

									<span className="inline-flex items-center gap-1.5">
										<CalendarDays className="size-3.5" />
										{formatDate(application.createdAt)}
									</span>
								</div>
							</div>
						</div>

						<Link
							href={`/dashboard/admin/service-holders/applications/${application.id}`}
							className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-sky-200 bg-white px-3 text-xs font-semibold text-sky-700 transition hover:border-sky-300 hover:bg-sky-50 sm:self-center"
						>
							<Eye className="size-4" />
							View Details
						</Link>
					</div>
				))}
			</div>

			<div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-xs text-slate-500">
					Page {page} of {totalPages}
				</p>

				<div className="flex items-center gap-2">
					<Link
						aria-disabled={page <= 1}
						tabIndex={page <= 1 ? -1 : undefined}
						href={paginationHref(page - 1, searchTerm, status)}
						className={`inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium ${
							page <= 1
								? "pointer-events-none border-slate-100 text-slate-300"
								: "border-slate-200 bg-white text-slate-700 hover:bg-sky-50"
						}`}
					>
						<ArrowLeft className="size-4" />
						Previous
					</Link>

					<Link
						aria-disabled={page >= totalPages}
						tabIndex={page >= totalPages ? -1 : undefined}
						href={paginationHref(page + 1, searchTerm, status)}
						className={`inline-flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium ${
							page >= totalPages
								? "pointer-events-none border-slate-100 text-slate-300"
								: "border-slate-200 bg-white text-slate-700 hover:bg-sky-50"
						}`}
					>
						Next
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</>
	);
}

