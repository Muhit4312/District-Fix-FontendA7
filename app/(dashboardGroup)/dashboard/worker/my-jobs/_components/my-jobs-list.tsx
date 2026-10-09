
"use client";

import { BriefcaseBusiness, LoaderCircle, Timer } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import type { ServiceType } from "@/types/service-request";
import type { JobsMeta, JobStatus, WorkerService } from "@/types/worker";

import { getMyAssignedServices } from "../_actions/worker.action";
import JobListing from "./job-listing";
import JobsHeader from "./jobs-header";
import JobsStatusTabs from "./jobs-status-tabs";
import JobsFilters from "./jobs-filters";
import JobsPagination from "./jobs-pagination";
import JobsSearch from "./jobs-search";


interface MyJobsListProps {
	initialServices: WorkerService[];
	initialMeta: JobsMeta;
	initialError?: string;
}

type TabValue = "ALL" | JobStatus | "OTHER";

const PAGE_SIZE = 10;

const emptyMeta: JobsMeta = {
	page: 1,
	limit: PAGE_SIZE,
	total: 0,
	totalPages: 0,
};

export default function MyJobsList({
	initialServices,
	initialMeta,
	initialError = "",
}: MyJobsListProps) {
	const [services, setServices] =
		useState<WorkerService[]>(initialServices);
	const [meta, setMeta] = useState<JobsMeta>(initialMeta ?? emptyMeta);
	const [activeTab, setActiveTab] = useState<TabValue>("ALL");
	const [searchTerm, setSearchTerm] = useState("");
	const [serviceType, setServiceType] = useState<ServiceType | "">("");
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(initialError);

	const loadJobs = useCallback(async () => {
		setLoading(true);
		setError("");

		try {
			if (activeTab === "OTHER") {
				const [cancelled, rejected] = await Promise.all([
					getMyAssignedServices({
						page: 1,
						limit: 100,
						status: "CANCELLED",
						searchTerm: searchTerm.trim(),
						serviceType,
					}),
					getMyAssignedServices({
						page: 1,
						limit: 100,
						status: "REJECTED",
						searchTerm: searchTerm.trim(),
						serviceType,
					}),
				]);

				if (!cancelled.success && !rejected.success) {
					throw new Error(
						cancelled.message ||
							rejected.message ||
							"Failed to load jobs.",
					);
				}

				const combined = [
					...(cancelled.success ? cancelled.data : []),
					...(rejected.success ? rejected.data : []),
				].sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime(),
				);

				const start = (page - 1) * PAGE_SIZE;

				setServices(combined.slice(start, start + PAGE_SIZE));
				setMeta({
					page,
					limit: PAGE_SIZE,
					total: combined.length,
					totalPages: Math.ceil(combined.length / PAGE_SIZE),
				});

				if (!cancelled.success || !rejected.success) {
					setError(
						"Some cancelled or rejected jobs could not be loaded.",
					);
				}

				return;
			}

			const result = await getMyAssignedServices({
				page,
				limit: PAGE_SIZE,
				status: activeTab === "ALL" ? undefined : activeTab,
				searchTerm: searchTerm.trim(),
				serviceType,
			});

			if (!result.success) {
				throw new Error(result.message || "Failed to load jobs.");
			}

			setServices(result.data);
			setMeta(result.meta);
		} catch (err) {
			setServices([]);
			setMeta(emptyMeta);
			setError(
				err instanceof Error ? err.message : "Failed to load jobs.",
			);
		} finally {
			setLoading(false);
		}
	}, [activeTab, page, searchTerm, serviceType]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			void loadJobs();
		}, 250);

		return () => clearTimeout(timeout);
	}, [loadJobs]);

	function changeTab(value: TabValue) {
		setActiveTab(value);
		setPage(1);
	}

	function changeSearch(value: string) {
		setSearchTerm(value);
		setPage(1);
	}

	function changeServiceType(value: ServiceType | "") {
		setServiceType(value);
		setPage(1);
	}

	const inProgressCount = services.filter(
		(service) => service.status === "IN_PROGRESS",
	).length;

	return (
		<div className="space-y-6">
			{/* Page header */}
			<JobsHeader />

			{/* Summary cards */}
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="rounded-2xl border border-slate-200 bg-white p-5">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-slate-500">
								Total Jobs
							</p>
							<p className="mt-2 text-3xl font-bold text-slate-900">
								{meta.total}
							</p>
						</div>

						<div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
							<BriefcaseBusiness className="size-6" />
						</div>
					</div>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-5">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium text-slate-500">
								In Progress on This Page
							</p>
							<p className="mt-2 text-3xl font-bold text-slate-900">
								{inProgressCount}
							</p>
						</div>

						<div className="flex size-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
							<Timer className="size-6" />
						</div>
					</div>
				</div>
			</div>

			{/* Status tabs */}
			<JobsStatusTabs
				activeTab={activeTab}
				onTabChange={changeTab}
			/>

			{/* Search and filters */}
			<div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row">
				<JobsSearch
					value={searchTerm}
					onChange={changeSearch}
				/>

				<JobsFilters
					value={serviceType}
					onChange={changeServiceType}
				/>
			</div>

			{/* Error message */}
			{error && (
				<div
					role="alert"
					className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
				>
					<p>{error}</p>

					<button
						type="button"
						onClick={() => void loadJobs()}
						disabled={loading}
						className="mt-2 font-semibold underline underline-offset-2 disabled:opacity-50"
					>
						Try again
					</button>
				</div>
			)}

			{/* Job listing */}
			<div className="relative" aria-busy={loading}>
				{loading && (
					<div className="absolute inset-0 z-10 flex items-start justify-center rounded-2xl bg-white/70 pt-16 backdrop-blur-[1px]">
						<div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm">
							<LoaderCircle className="size-4 animate-spin" />
							Loading jobs...
						</div>
					</div>
				)}

				<JobListing services={services} />
			</div>

			{/* Pagination */}
			<JobsPagination
				page={page}
				meta={meta}
				loading={loading}
				onPageChange={setPage}
			/>
		</div>
	);
}