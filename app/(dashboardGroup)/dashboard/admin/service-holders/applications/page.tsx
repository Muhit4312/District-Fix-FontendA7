
import Link from "next/link";
import { ArrowLeft, FileCheck2 } from "lucide-react";

import ApplicationsFilters from "./_components/applications-filters";
import ApplicationsList from "./_components/applications-list";
import { getApplications } from "./_actions/applications.action";
interface PageProps {
	searchParams: Promise<{
		page?: string;
		searchTerm?: string;
		status?: string;
	}>;
}

const ALLOWED_STATUSES = [
	"ALL",
	"PENDING",
	"APPROVED",
	"REJECTED",
] as const;

export default async function ApplicationsPage({
	searchParams,
}: PageProps) {
	const params = await searchParams;

	const parsedPage = Number(params.page ?? 1);
	const page =
		Number.isSafeInteger(parsedPage) && parsedPage > 0
			? parsedPage
			: 1;

	const searchTerm = (params.searchTerm ?? "").trim();
	const requestedStatus = (params.status ?? "ALL").toUpperCase();

	const status = ALLOWED_STATUSES.includes(
		requestedStatus as (typeof ALLOWED_STATUSES)[number],
	)
		? requestedStatus
		: "ALL";

	let applications: Awaited<
		ReturnType<typeof getApplications>
	>["data"] = [];

	let totalPages = 1;
	let total = 0;
	let errorMessage = "";

	try {
		const result = await getApplications({
			page,
			limit: 10,
			searchTerm,
			status,
		});

		applications = result.data ?? [];
		totalPages = Math.max(1, result.meta?.totalPage ?? 1);
		total = result.meta?.total ?? applications.length;
	} catch (error) {
		errorMessage =
			error instanceof Error
				? error.message
				: "Failed to load applications.";
	}

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
			<Link
				href="/dashboard/admin"
				className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-700"
			>
				<ArrowLeft className="size-4" />
				Admin Overview
			</Link>

			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
						<FileCheck2 className="size-6" />
					</div>

					<div>
						<h1 className="text-2xl font-bold tracking-tight text-slate-900">
							Service Holder Applications
						</h1>
						<p className="mt-1 text-sm text-slate-500">
							Review and manage applications
						</p>
					</div>
				</div>

				<div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
					<p className="text-xs text-slate-500">
						Total applications
					</p>
					<p className="mt-1 text-xl font-bold text-slate-900">
						{total}
					</p>
				</div>
			</div>

			<div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
				<ApplicationsFilters
					searchTerm={searchTerm}
					status={status}
				/>
			</div>

			<section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
				{errorMessage ? (
					<div className="m-5 rounded-xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
						<p className="font-semibold">
							Could not load applications
						</p>
						<p className="mt-1 break-words">{errorMessage}</p>
					</div>
				) : (
					<>
						<div className="border-b border-slate-100 px-5 py-4 sm:px-6">
							<p className="text-sm font-semibold text-slate-800">
								Applications
							</p>
							<p className="mt-1 text-xs text-slate-500">
								{applications.length} shown on this page
							</p>
						</div>

						<ApplicationsList
							applications={applications}
							page={page}
							totalPages={totalPages}
							searchTerm={searchTerm}
							status={status}
						/>
					</>
				)}
			</section>
		</div>
	);
}

