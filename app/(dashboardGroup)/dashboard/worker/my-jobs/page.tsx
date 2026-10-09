
import { Suspense } from "react";

import { getMyAssignedServices } from "./_actions/worker.action";
import MyJobsList from "./_components/my-jobs-list";

function JobsLoading() {
	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<div className="animate-pulse space-y-6">
				<div className="h-4 w-36 rounded bg-slate-200" />
				<div className="h-8 w-48 rounded bg-slate-200" />

				<div className="grid gap-4 sm:grid-cols-2">
					<div className="h-28 rounded-2xl bg-slate-100" />
					<div className="h-28 rounded-2xl bg-slate-100" />
				</div>

				<div className="h-12 rounded-xl bg-slate-100" />
				<div className="h-64 rounded-2xl bg-slate-100" />
			</div>
		</div>
	);
}

async function WorkerJobsContent() {
	const result = await getMyAssignedServices({
		page: 1,
		limit: 10,
	});

	return (
		<div className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
			<MyJobsList
				initialServices={result.success ? result.data : []}
				initialMeta={result.meta}
				initialError={result.success ? "" : result.message}
			/>
		</div>
	);
}

export default function MyJobsPage() {
	return (
		<Suspense fallback={<JobsLoading />}>
			<WorkerJobsContent />
		</Suspense>
	);
}

