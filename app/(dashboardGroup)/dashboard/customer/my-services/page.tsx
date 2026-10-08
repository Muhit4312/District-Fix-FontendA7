import Link from "next/link";
import { Plus } from "lucide-react";

import type {
	ServiceRequestStatus,
	ServiceType,
} from "@/types/service-request";
import { getMyServices } from "./_actions/customer-service.action";

import ServiceFilters from "./_components/service-filters";
import ServiceItem from "./_components/service-item";
import ServicePagination from "./_components/service-pagination";
import ServiceStatCard from "./_components/service-stat-card";




const validStatuses: ServiceRequestStatus[] = [
	"PENDING",
	"ASSIGNED",
	"ACCEPTED",
	"IN_PROGRESS",
	"COMPLETED",
	"CANCELLED",
	"REJECTED",
];

const validServiceTypes: ServiceType[] = [
	"PLUMBING",
	"ELECTRICAL",
];

type MyServicesPageProps = {
	searchParams: Promise<{
		page?: string;
		searchTerm?: string;
		status?: string;
		serviceType?: string;
	}>;
};

export default async function MyServicesPage({
	searchParams,
}: MyServicesPageProps) {
	const params = await searchParams;

	const page = Math.max(
		1,
		Number(params.page) || 1,
	);

	const searchTerm = params.searchTerm?.trim() || "";

	const status = validStatuses.includes(
		params.status as ServiceRequestStatus,
	)
		? (params.status as ServiceRequestStatus)
		: undefined;

	const serviceType = validServiceTypes.includes(
		params.serviceType as ServiceType,
	)
		? (params.serviceType as ServiceType)
		: undefined;

	const baseParams = {
		limit: 10,
		searchTerm: searchTerm || undefined,
		serviceType,
		sortBy: "createdAt" as const,
		sortOrder: "desc" as const,
	};

	const [
		servicesResponse,
		allResponse,
		pendingResponse,
		inProgressResponse,
		completedResponse,
	] = await Promise.all([
		getMyServices({
			...baseParams,
			page,
			status,
		}),

		getMyServices({
			limit: 1,
			searchTerm: searchTerm || undefined,
			serviceType,
		}),

		getMyServices({
			limit: 1,
			searchTerm: searchTerm || undefined,
			serviceType,
			status: "PENDING",
		}),

		getMyServices({
			limit: 1,
			searchTerm: searchTerm || undefined,
			serviceType,
			status: "IN_PROGRESS",
		}),

		getMyServices({
			limit: 1,
			searchTerm: searchTerm || undefined,
			serviceType,
			status: "COMPLETED",
		}),
	]);

	const services = servicesResponse.data.data;

	const statistics = {
		all: allResponse.data.meta.total,
		pending: pendingResponse.data.meta.total,
		inProgress: inProgressResponse.data.meta.total,
		completed: completedResponse.data.meta.total,
	};

	return (
		<div className="space-y-6">
			{/* Header */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div>
					<h1 className="text-2xl font-bold tracking-tight text-slate-900">
						My Services
					</h1>

					<p className="mt-1 text-sm text-slate-500">
						View and manage all your service requests.
					</p>
				</div>

				<Link
					href="/dashboard/customer/create-service"
					className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
				>
					<Plus className="size-4" />
					Create Service
				</Link>
			</div>

			{/* Statistics */}
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<ServiceStatCard
					title="Total Services"
					value={statistics.all}
					href="/dashboard/customer/my-services"
					iconType="all"
					isActive={!status}
				/>

				<ServiceStatCard
					title="Pending"
					value={statistics.pending}
					href="/dashboard/customer/my-services?status=PENDING"
					iconType="pending"
					isActive={status === "PENDING"}
				/>

				<ServiceStatCard
					title="In Progress"
					value={statistics.inProgress}
					href="/dashboard/customer/my-services?status=IN_PROGRESS"
					iconType="inProgress"
					isActive={status === "IN_PROGRESS"}
				/>

				<ServiceStatCard
					title="Completed"
					value={statistics.completed}
					href="/dashboard/customer/my-services?status=COMPLETED"
					iconType="completed"
					isActive={status === "COMPLETED"}
				/>
			</div>

			{/* Search & Filter */}
			<ServiceFilters
				searchTerm={searchTerm}
				serviceType={serviceType}
			/>

			{/* Services */}
			<div className="space-y-3">
				{services.length > 0 ? (
					services.map((service) => (
						<ServiceItem
							key={service.id}
							service={service}
						/>
					))
				) : (
					<div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
						<div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
							<span className="text-xl">🔧</span>
						</div>

						<h2 className="mt-4 font-semibold text-slate-800">
							No services found
						</h2>

						<p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
							{searchTerm || serviceType || status
								? "No service requests match your current filters."
								: "You haven't created any service requests yet."}
						</p>

						{!searchTerm &&
							!serviceType &&
							!status && (
								<Link
									href="/dashboard/customer/create-service"
									className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700"
								>
									<Plus className="size-4" />
									Create Service
								</Link>
							)}
					</div>
				)}
			</div>

			{/* Pagination */}
			{servicesResponse.data.meta.totalPage > 1 && (
				<ServicePagination
					currentPage={servicesResponse.data.meta.page}
					totalPages={servicesResponse.data.meta.totalPage}
				/>
			)}
		</div>
	);
}