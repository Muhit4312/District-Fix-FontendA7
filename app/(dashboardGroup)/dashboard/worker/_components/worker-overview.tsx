import Link from "next/link";
import {
	ArrowRight,
	BriefcaseBusiness,
	CalendarDays,
	CheckCircle2,
	Clock3,
	MapPin,
	Wrench,
} from "lucide-react";

import {
	getMyAssignedServices,
	getMyWorkerProfile,
} from "../_actions/worker.action";

import type { WorkerService } from "@/types/worker";

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

function formatDate(date: string) {
	return new Date(date).toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

function formatMoney(amount: string | null) {
	if (!amount) return "Not set";

	return `৳ ${Number(amount).toLocaleString("en-BD")}`;
}

function StatCard({
	title,
	value,
	description,
	icon: Icon,
}: {
	title: string;
	value: number;
	description: string;
	icon: typeof BriefcaseBusiness;
}) {
	return (
		<div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-sm font-medium text-slate-500">
						{title}
					</p>
					<p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
						{value}
					</p>
					<p className="mt-1 text-xs text-slate-500">
						{description}
					</p>
				</div>

				<div className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
					<Icon className="size-5" />
				</div>
			</div>
		</div>
	);
}

function JobItem({ service }: { service: WorkerService }) {
	return (
		<Link
			href={`/dashboard/worker/my-jobs/${service.id}`}
			className="group block rounded-xl border border-slate-200/80 bg-white p-4 transition-colors hover:border-sky-200 hover:bg-sky-50/30 sm:p-5"
		>
			<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex min-w-0 items-start gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
						<Wrench className="size-5" />
					</div>

					<div className="min-w-0 flex-1">
						<h3 className="truncate font-semibold text-slate-900">
							{service.serviceName}
						</h3>

						<p className="mt-1 text-sm text-slate-500">
							Customer: {service.customer.name}
						</p>

						<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
							<span className="flex items-center gap-1">
								<MapPin className="size-3.5 shrink-0" />
								{service.district.name}
							</span>

							<span className="flex items-center gap-1">
								<CalendarDays className="size-3.5 shrink-0" />
								{formatDate(service.createdAt)}
							</span>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between gap-3 sm:justify-end">
					<span
						className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
							statusStyles[service.status] ??
							"bg-slate-100 text-slate-700 ring-slate-200"
						}`}
					>
						{formatStatus(service.status)}
					</span>

					<ArrowRight className="size-4 shrink-0 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-sky-600" />
				</div>
			</div>
		</Link>
	);
}

export default async function WorkerOverview() {
	const [profileResponse, servicesResponse] = await Promise.all([
		getMyWorkerProfile(),
		getMyAssignedServices(),
	]);

	const worker = profileResponse.data;
	const services = servicesResponse.data.data;

	const completed = services.filter(
		(service) => service.status === "COMPLETED",
	).length;

	const active = services.filter((service) =>
		["ACCEPTED", "IN_PROGRESS"].includes(service.status),
	).length;

	const awaitingAction = services.filter(
		(service) => service.status === "ASSIGNED",
	).length;

	const recentServices = [...services]
		.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() -
				new Date(a.createdAt).getTime(),
		)
		.slice(0, 5);

	return (
		<div className="space-y-7">
			<section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
				<div className="bg-gradient-to-r from-sky-700 to-sky-600 px-5 py-7 text-white sm:px-7">
					<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<p className="text-sm font-medium text-sky-100">
								Worker Dashboard
							</p>

							<h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
								Welcome, {worker.user.name}!
							</h1>

							<p className="mt-2 text-sm text-sky-100">
								Manage your assigned jobs and track your work.
							</p>
						</div>

						<div className="flex items-center gap-3 self-start rounded-xl border border-white/20 bg-white/10 p-3 sm:self-auto">
							<div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
								<Wrench className="size-5" />
							</div>

							<div>
								<p className="font-semibold">
									{worker.workerType === "PLUMBER"
										? "Plumber"
										: "Electrician"}
								</p>
								<p className="mt-0.5 flex items-center gap-1.5 text-xs text-sky-100">
									<MapPin className="size-3.5" />
									{worker.district.name},{" "}
									{worker.district.division}
								</p>
							</div>
						</div>
					</div>
				</div>

				<div className="grid gap-4 p-5 sm:grid-cols-3 sm:p-6">
					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
							Worker Status
						</p>
						<p className="mt-1.5 font-semibold text-emerald-700">
							{worker.status}
						</p>
					</div>

					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
							Experience
						</p>
						<p className="mt-1.5 font-semibold text-slate-800">
							{worker.experience} years
						</p>
					</div>

					<div>
						<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
							Assigned Services
						</p>
						<p className="mt-1.5 font-semibold text-slate-800">
							{servicesResponse.data.meta.total}
						</p>
					</div>
				</div>
			</section>

			<section>
				<div className="mb-4">
					<h2 className="text-lg font-bold text-slate-900">
						Your Work Summary
					</h2>
					<p className="mt-1 text-sm text-slate-500">
						An overview of your assigned service requests.
					</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
					<StatCard
						title="Assigned Jobs"
						value={servicesResponse.data.meta.total}
						description="Total assigned services"
						icon={BriefcaseBusiness}
					/>

					<StatCard
						title="Awaiting Action"
						value={awaitingAction}
						description="Jobs awaiting acceptance"
						icon={Clock3}
					/>

					<StatCard
						title="Active Jobs"
						value={active}
						description="Accepted or in progress"
						icon={Wrench}
					/>

					<StatCard
						title="Completed"
						value={completed}
						description="Completed jobs in this result"
						icon={CheckCircle2}
					/>
				</div>
			</section>

			<section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
				<div className="mb-5 flex items-center justify-between gap-3">
					<div>
						<h2 className="text-lg font-bold text-slate-900">
							Recent Jobs
						</h2>
						<p className="mt-1 text-sm text-slate-500">
							Your latest assigned service requests.
						</p>
					</div>

					<Link
						href="/dashboard/worker/my-jobs"
						className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-sky-700 hover:text-sky-800"
					>
						View all
						<ArrowRight className="size-4" />
					</Link>
				</div>

				{recentServices.length > 0 ? (
					<div className="space-y-3">
						{recentServices.map((service) => (
							<JobItem key={service.id} service={service} />
						))}
					</div>
				) : (
					<div className="rounded-xl border border-dashed border-slate-200 px-5 py-12 text-center">
						<div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
							<BriefcaseBusiness className="size-6" />
						</div>

						<h3 className="mt-4 font-semibold text-slate-900">
							No assigned jobs yet
						</h3>

						<p className="mt-1 text-sm text-slate-500">
							New service requests will appear here when assigned
							to you.
						</p>
					</div>
				)}
			</section>
		</div>
	);
}