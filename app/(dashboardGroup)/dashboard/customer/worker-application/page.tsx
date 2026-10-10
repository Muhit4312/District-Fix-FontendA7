import type { Metadata } from "next";
import { getActiveDistricts, getMyWorkerApplications } from "./_actions/worker-application.actions";
import WorkerApplicationForm from "./_components/worker-application-form";


export const metadata: Metadata = {
	title: "Worker Application | DistrictFix",
	description:
		"Apply to become a plumber or electrician with DistrictFix.",
};

export default async function WorkerApplicationPage() {
	const [applicationResult, districtResult] = await Promise.all([
		getMyWorkerApplications(),
		getActiveDistricts(),
	]);

	return (
		<div className="mx-auto w-full max-w-5xl space-y-6">
			<WorkerApplicationForm
				applications={applicationResult.data ?? []}
				districts={districtResult.data ?? []}
				applicationError={
					applicationResult.success
						? undefined
						: applicationResult.message
				}
				districtError={
					districtResult.success
						? undefined
						: districtResult.message
				}
			/>
		</div>
	);
}