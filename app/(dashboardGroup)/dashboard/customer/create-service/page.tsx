import Link from "next/link";
import { ArrowLeft, ClipboardPlus } from "lucide-react";

import { getActiveDistricts } from "./_actions/district.action";
import CreateServiceForm from "./_components/create-service-form";

export default async function CreateServicePage() {
	const districts = await getActiveDistricts();

	return (
		<div className="mx-auto w-full max-w-4xl space-y-6">
			{/* Header */}
			<div className="space-y-4">
				<Link
					href="/dashboard/customer"
					className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
				>
					<ArrowLeft className="size-4" />
					Back to Dashboard
				</Link>

				<div className="flex items-start gap-4">
					<div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
						<ClipboardPlus className="size-6" />
					</div>

					<div>
						<h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
							Request a Service
						</h1>

						<p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
							Tell us what you need and we&apos;ll connect you
							with a qualified professional in your district.
						</p>
					</div>
				</div>
			</div>

			{/* Form */}
			<div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7">
				<CreateServiceForm districts={districts} />
			</div>
		</div>
	);
}