
import Link from "next/link";
import { ArrowLeft, FileSearch } from "lucide-react";
import { notFound } from "next/navigation";


import ReviewApplicationActions from "../_components/review-application-actions";
import { getSingleApplication } from "./_actions/details.action";
import ApplicationDetails from "./_components/application-details";

interface ApplicationDetailsPageProps {
	params: Promise<{ id: string }>;
}

export default async function ApplicationDetailsPage({
	params,
}: ApplicationDetailsPageProps) {
	const { id } = await params;
	const result = await getSingleApplication(id);

	if (!result.success || !result.data) {
		if (
			result.message.toLowerCase().includes("not found") ||
			result.message.toLowerCase().includes("does not exist")
		) {
			notFound();
		}

		return (
			<div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
				<div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sky-50 text-sky-700">
					<FileSearch className="size-7" />
				</div>

				<h1 className="mt-4 text-xl font-bold text-slate-900">
					Unable to Load Application
				</h1>

				<p className="mt-2 text-sm text-slate-600">
					{result.message}
				</p>

				<Link
					href="/dashboard/admin/service-holders/applications"
					className="mt-6 inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
				>
					<ArrowLeft className="size-4" />
					Back to Applications
				</Link>
			</div>
		);
	}

	const application = result.data;

	return (
		<div className="mx-auto w-full max-w-7xl space-y-6">
			<ApplicationDetails application={application} />

			<ReviewApplicationActions
				applicationId={application.id}
				status={application.status}
			/>
		</div>
	);
}

