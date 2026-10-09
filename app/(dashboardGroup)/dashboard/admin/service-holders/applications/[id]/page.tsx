
import { notFound } from "next/navigation";
import { getSingleApplication } from "./_actions/details.action";
import ApplicationDetails from "./_components/application-details";


interface ApplicationDetailsPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function ApplicationDetailsPage({
	params,
}: ApplicationDetailsPageProps) {
	const { id } = await params;

	const result = await getSingleApplication(id);

	if (!result.success || !result.data) {
		if (
			result.message === "Service Holder application not found"
		) {
			notFound();
		}

		return (
			<div className="rounded-2xl border border-red-100 bg-white p-6">
				<h1 className="text-lg font-semibold text-slate-900">
					Unable to load application
				</h1>
				<p className="mt-2 text-sm text-red-600">
					{result.message}
				</p>
			</div>
		);
	}

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6">
			<ApplicationDetails application={result.data} />
		</div>
	);
}