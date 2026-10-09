import { Suspense } from "react";
import WorkerOverview from "./_components/worker-overview";
import WorkerLoading from "./loading";

export default function WorkerDashboardPage() {
	return (
		<Suspense fallback={<WorkerLoading />}>
			<WorkerOverview />
		</Suspense>
	);
}