"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
	CalendarDays,
	MapPin,
	Pencil,
	Trash2,
	LoaderCircle,
	AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import WorkerApplicationStatus from "./worker-application-status";
import { deleteMyWorkerApplication } from "../_actions/worker-application.actions";

import type { WorkerApplication } from "../_types/worker-application";

interface WorkerApplicationHistoryProps {
	applications: WorkerApplication[];
}

export default function WorkerApplicationHistory({
	applications,
}: WorkerApplicationHistoryProps) {
	const router = useRouter();

	const [deletingId, setDeletingId] = useState<string | null>(null);
	const [selectedApplication, setSelectedApplication] =
		useState<WorkerApplication | null>(null);

	const handleDelete = async () => {
		if (!selectedApplication) return;

		const id = selectedApplication.id;
		setDeletingId(id);

		try {
			const result = await deleteMyWorkerApplication(id);

			if (!result.success) {
				toast.error(result.message || "Failed to delete application.");
				return;
			}

			toast.success(result.message || "Application deleted successfully.");
			setSelectedApplication(null);
			router.refresh();
		} catch {
			toast.error("Something went wrong while deleting the application.");
		} finally {
			setDeletingId(null);
		}
	};

	if (applications.length === 0) {
		return (
			<div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
				<div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
					<CalendarDays className="size-6" />
				</div>

				<h3 className="mt-3 font-semibold text-slate-900">
					No application history yet
				</h3>

				<p className="mt-1 text-sm text-slate-500">
					Your submitted applications will appear here.
				</p>
			</div>
		);
	}

	return (
		<>
			<div className="space-y-4">
				{applications.map((application) => {
					const isPending = application.status === "PENDING";
					const isDeleting = deletingId === application.id;

					return (
						<div key={application.id} className="rounded-2xl">
							<WorkerApplicationStatus application={application} />

							<div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 px-1 text-xs text-slate-500">
								<span className="flex items-center gap-1.5">
									<MapPin className="size-3.5" />
									{application.address}
								</span>

								{application.experience && (
									<span>
										Experience: {application.experience}
									</span>
								)}
							</div>

							{isPending && (
								<div className="mt-4 flex flex-wrap gap-2">
									<Button
										type="button"
										variant="outline"
										disabled={deletingId !== null}
										onClick={() => {
											router.push(
												`/dashboard/customer/worker-application?edit=${application.id}`,
											);
										}}
										className="border-sky-200 text-sky-700 hover:bg-sky-50"
									>
										<Pencil className="mr-2 size-4" />
										Edit Application
									</Button>

									<Button
										type="button"
										variant="destructive"
										disabled={deletingId !== null}
										onClick={() => setSelectedApplication(application)}
									>
										<Trash2 className="mr-2 size-4" />
										Delete Application
									</Button>
								</div>
							)}
						</div>
					);
				})}
			</div>

			<AlertDialog
				open={selectedApplication !== null}
				onOpenChange={(open) => {
					if (!open && deletingId === null) {
						setSelectedApplication(null);
					}
				}}
			>
				<AlertDialogContent className="max-w-md rounded-2xl">
					<AlertDialogHeader>
						<div className="mb-2 flex size-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
							<AlertTriangle className="size-6" />
						</div>

						<AlertDialogTitle className="text-xl">
							Delete application?
						</AlertDialogTitle>

						<AlertDialogDescription className="leading-6">
							Are you sure you want to delete your{" "}
							<strong>
								{selectedApplication?.workerType === "PLUMBER"
									? "Plumber"
									: "Electrician"}
							</strong>{" "}
							application? This action cannot be undone.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<AlertDialogFooter className="gap-2 sm:gap-2">
						<AlertDialogCancel disabled={deletingId !== null}>
							Keep Application
						</AlertDialogCancel>

						<AlertDialogAction
							disabled={deletingId !== null}
							onClick={(event) => {
								event.preventDefault();
								void handleDelete();
							}}
							className="bg-red-600 text-white hover:bg-red-700"
						>
							{deletingId !== null ? (
								<>
									<LoaderCircle className="mr-2 size-4 animate-spin" />
									Deleting...
								</>
							) : (
								"Yes, Delete"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}