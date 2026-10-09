
import { BriefcaseBusiness, Timer } from "lucide-react";

interface JobsSummaryProps {
	totalJobs: number;
	inProgressCount: number;
}

export default function JobsSummary({
	totalJobs,
	inProgressCount,
}: JobsSummaryProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			<div className="rounded-2xl border border-slate-200 bg-white p-5">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm font-medium text-slate-500">
							Total Jobs
						</p>
						<p className="mt-2 text-3xl font-bold text-slate-900">
							{totalJobs}
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
	);
}