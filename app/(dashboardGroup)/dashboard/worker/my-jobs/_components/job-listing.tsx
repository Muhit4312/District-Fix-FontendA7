
import { BriefcaseBusiness } from "lucide-react";

import type { WorkerService } from "@/types/worker";
import JobItem from "./job-item";

interface JobListingProps {
	services: WorkerService[];
}

export default function JobListing({ services }: JobListingProps) {
	if (services.length === 0) {
		return (
			<div className="rounded-xl border border-dashed border-slate-200 bg-white px-5 py-12 text-center">
				<div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100">
					<BriefcaseBusiness className="size-7 text-slate-400" />
				</div>

				<h3 className="mt-4 font-semibold text-slate-900">
					No jobs found
				</h3>

				<p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
					There are no jobs matching your current search or filters.
					Try changing your filters or search for another service.
				</p>
			</div>
		);
	}

	return (
		<div className="flex w-full flex-col gap-3">
			{services.map((service) => (
				<JobItem key={service.id} service={service} />
			))}
		</div>
	);
}