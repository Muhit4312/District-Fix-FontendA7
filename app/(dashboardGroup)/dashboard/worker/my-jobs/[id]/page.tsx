
import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

import { getMyAssignedSingleService } from "./_actions/worker.actions";
import { ServiceDetails } from "./_components/service-details";

interface AssignedServiceDetailsPageProps {
	params: Promise<{ id: string }>;
}

export default async function AssignedServiceDetailsPage({
	params,
}: AssignedServiceDetailsPageProps) {
	const { id } = await params;

	try {
		const result = await getMyAssignedSingleService(id);

		if (!result.success || !result.data) {
			return (
				<ServiceError
					title="Service not found"
					message={result.message || "This service could not be found."}
				/>
			);
		}

		return (
			<div className="w-full p-4 sm:p-6">
				<ServiceDetails service={result.data} />
			</div>
		);
	} catch (error) {
		const message =
			error instanceof Error
				? error.message
				: "Unable to retrieve service details";

		return (
			<ServiceError
				title="Unable to load service"
				message={message}
			/>
		);
	}
}

function ServiceError({
	title,
	message,
}: {
	title: string;
	message: string;
}) {
	return (
		<div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 px-4 text-center">
			<div className="rounded-full bg-destructive/10 p-3">
				<AlertCircle className="size-6 text-destructive" />
			</div>

			<h1 className="text-xl font-semibold">{title}</h1>

			<p className="max-w-md text-sm text-muted-foreground">
				{message}
			</p>

			<Link
				href="/dashboard/worker/assigned-services"
				className="mt-2 inline-flex h-9 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-colors hover:bg-accent"
			>
				<ArrowLeft className="size-4" />
				Back to assigned services
			</Link>
		</div>
	);
}