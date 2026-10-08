import {
	CheckCircle2,
	Clock3,
	Files,
	LoaderCircle,
} from "lucide-react";

import ServiceStatCard from "./service-stat-card";

type ServiceStatisticsProps = {
	statistics: {
		all: number;
		pending: number;
		inProgress: number;
		completed: number;
	};
};

export default function ServiceStatistics({
	statistics,
}: ServiceStatisticsProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			<ServiceStatCard
				title="All Services"
				value={statistics.all}
				href="/dashboard/customer/services"
				icon={Files}
				iconClassName="bg-slate-100 text-slate-600"
			/>

			<ServiceStatCard
				title="Pending"
				value={statistics.pending}
				href="/dashboard/customer/services?status=PENDING"
				icon={Clock3}
				iconClassName="bg-amber-50 text-amber-600"
			/>

			<ServiceStatCard
				title="In Progress"
				value={statistics.inProgress}
				href="/dashboard/customer/services?status=IN_PROGRESS"
				icon={LoaderCircle}
				iconClassName="bg-sky-50 text-sky-600"
			/>

			<ServiceStatCard
				title="Completed"
				value={statistics.completed}
				href="/dashboard/customer/services?status=COMPLETED"
				icon={CheckCircle2}
				iconClassName="bg-emerald-50 text-emerald-600"
			/>
		</div>
	);
}