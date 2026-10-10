
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
	AlertCircle,
	ArrowRight,
	BriefcaseBusiness,
	CheckCircle2,
	LoaderCircle,
	MapPin,
	Send,
	ShieldCheck,
	Pencil,
	X,
} from "lucide-react";

import type {
	CreateWorkerApplicationPayload,
	DistrictOption,
	WorkerApplication,
	WorkerType,
} from "../_types/worker-application";

import {
	createWorkerApplication,
	getMyWorkerApplication,
	updateMyWorkerApplication,
} from "../_actions/worker-application.actions";

import WorkerApplicationHistory from "./worker-application-history";
import { WorkerTypeSelector } from "./worker-type-selector";

interface WorkerApplicationFormProps {
	districts: DistrictOption[];
	applications: WorkerApplication[];
	districtError?: string;
	applicationError?: string;
}

export default function WorkerApplicationForm({
	districts,
	applications: initialApplications,
	districtError,
	applicationError,
}: WorkerApplicationFormProps) {
	const formRef = useRef<HTMLFormElement>(null);

	const router = useRouter();
	const searchParams = useSearchParams();
	const editId = searchParams.get("edit");

	const [applications, setApplications] =
		useState<WorkerApplication[]>(initialApplications);

	const [workerType, setWorkerType] =
		useState<WorkerType>("PLUMBER");

	const [submitting, setSubmitting] = useState(false);
	const [editLoading, setEditLoading] = useState(false);
	const [message, setMessage] = useState("");
	const [success, setSuccess] = useState(false);

	// Keep local state synchronized with refreshed server data.
	useEffect(() => {
		setApplications(initialApplications);
	}, [initialApplications]);

	// Load the selected application and populate the existing form.
	useEffect(() => {
		if (!editId) {
			setEditLoading(false);
			setMessage("");
			setSuccess(false);
			return;
		}

		let cancelled = false;

		async function loadApplication() {
			setEditLoading(true);
			setMessage("");
			setSuccess(false);

			try {
				const result = await getMyWorkerApplication(editId!);

				if (cancelled) return;

				if (!result.success || !result.data) {
					setMessage(
						result.message || "Could not load this application.",
					);
					return;
				}

				const application = result.data;

				if (application.status !== "PENDING") {
					setMessage(
						"Only pending applications can be edited.",
					);
					return;
				}

				setWorkerType(application.workerType);

				const form = formRef.current;

				if (form) {
					const setField = (name: string, value: string) => {
						const field = form.elements.namedItem(name);

						if (
							field instanceof HTMLInputElement ||
							field instanceof HTMLTextAreaElement ||
							field instanceof HTMLSelectElement
						) {
							field.value = value;
						}
					};

					setField("phone", application.phone);
					setField("address", application.address);
					setField("districtId", application.districtId);
					setField("businessName", application.businessName ?? "");
					setField("experience", application.experience ?? "");
					setField("description", application.description ?? "");
				}
			} catch {
				if (!cancelled) {
					setMessage("Could not load this application. Please try again.");
				}
			} finally {
				if (!cancelled) {
					setEditLoading(false);
				}
			}
		}

		void loadApplication();

		return () => {
			cancelled = true;
		};
	}, [editId]);

	const hasPendingApplication = applications.some(
		(application) => application.status === "PENDING",
	);

	const hasApprovedApplication = applications.some(
		(application) => application.status === "APPROVED",
	);

	const isEditing = Boolean(editId);

	const canApply =
		!hasPendingApplication && !hasApprovedApplication;

	async function handleSubmit(
		event: React.FormEvent<HTMLFormElement>,
	) {
		event.preventDefault();

		setMessage("");
		setSuccess(false);

		if (submitting || editLoading) return;

		if (isEditing) {
			const selectedApplication = applications.find(
				(application) => application.id === editId,
			);

			if (
				selectedApplication &&
				selectedApplication.status !== "PENDING"
			) {
				setMessage("Only pending applications can be edited.");
				return;
			}
		} else if (!canApply) {
			setMessage(
				"You already have a pending or approved application.",
			);
			return;
		}

		const form = event.currentTarget;
		const formData = new FormData(form);

		const payload: CreateWorkerApplicationPayload = {
			workerType,
			phone: String(formData.get("phone") ?? "").trim(),
			address: String(formData.get("address") ?? "").trim(),
			districtId: String(formData.get("districtId") ?? ""),
			businessName: String(
				formData.get("businessName") ?? "",
			).trim(),
			experience: String(
				formData.get("experience") ?? "",
			).trim(),
			description: String(
				formData.get("description") ?? "",
			).trim(),
		};

		if (
			!payload.phone ||
			!payload.address ||
			!payload.districtId
		) {
			setMessage("Please fill in all required fields.");
			return;
		}

		setSubmitting(true);

		try {
			if (editId) {
				const result = await updateMyWorkerApplication(
					editId,
					payload,
				);

				if (!result.success || !result.data) {
					setMessage(
						result.message || "Failed to update application.",
					);
					return;
				}

				setApplications((current) =>
					current.map((application) =>
						application.id === editId
							? result.data!
							: application,
					),
				);

				setSuccess(true);
				setMessage(
					result.message || "Application updated successfully!",
				);

				router.replace("/dashboard/customer/worker-application");
				router.refresh();
				return;
			}

			const result = await createWorkerApplication(payload);

			if (!result.success || !result.data) {
				setMessage(
					result.message || "Failed to submit application.",
				);
				return;
			}

			setApplications((current) => [
				result.data!,
				...current,
			]);

			setSuccess(true);
			setMessage(
				result.message || "Application submitted successfully!",
			);

			form.reset();
			setWorkerType("PLUMBER");
			router.refresh();
		} catch {
			setMessage("Something went wrong. Please try again.");
		} finally {
			setSubmitting(false);
		}
	}

	function cancelEditing() {
		router.replace("/dashboard/customer/worker-application");
		setMessage("");
		setSuccess(false);
	}

	const showForm = canApply || isEditing;

	return (
		<div className="space-y-8">
			{/* Intro */}
			<section className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-8">
				<div className="absolute -right-16 -top-20 size-64 rounded-full bg-sky-500/20 blur-3xl" />
				<div className="absolute -bottom-24 left-1/3 size-52 rounded-full bg-blue-500/10 blur-3xl" />

				<div className="relative">
					<div className="inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-400/10 px-3 py-1.5 text-xs font-semibold text-sky-200">
						<BriefcaseBusiness className="size-4" />
						Join Our Professional Network
					</div>

					<h1 className="mt-4 max-w-2xl text-2xl font-bold tracking-tight sm:text-3xl">
						Build your career with DistrictFix
					</h1>

					<p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
						Apply to become a professional plumber or electrician.
						Submit your details and track your application status
						directly from your customer dashboard.
					</p>

					<div className="mt-6 flex flex-wrap gap-4 text-sm text-slate-300">
						<span className="flex items-center gap-2">
							<ShieldCheck className="size-4 text-sky-300" />
							Application review
						</span>

						<span className="flex items-center gap-2">
							<MapPin className="size-4 text-sky-300" />
							District-based work
						</span>
					</div>
				</div>
			</section>

			{/* API Errors */}
			{applicationError && (
				<div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
					<AlertCircle className="size-5 shrink-0" />
					<p>{applicationError}</p>
				</div>
			)}

			{/* Current Pending Application */}
			{hasPendingApplication && !isEditing && (
				<section className="space-y-3">
					<h2 className="text-lg font-bold text-slate-900">
						Your current application
					</h2>

					<WorkerApplicationHistory
						applications={applications.filter(
							(application) => application.status === "PENDING",
						)}
					/>
				</section>
			)}

			{/* Approved Application */}
			{hasApprovedApplication && (
				<section className="space-y-3">
					<h2 className="text-lg font-bold text-slate-900">
						Your approved application
					</h2>

					<WorkerApplicationHistory
						applications={applications.filter(
							(application) => application.status === "APPROVED",
						)}
					/>
				</section>
			)}

			{/* Create / Edit Form */}
			{showForm && (
				<section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
					<div className="mb-6 flex items-start justify-between gap-4">
						<div>
							<p className="text-sm font-semibold text-sky-700">
								{isEditing ? "EDIT APPLICATION" : "WORKER REGISTRATION"}
							</p>

							<h2 className="mt-1 text-xl font-bold text-slate-900">
								{isEditing ? "Update application details" : "Application details"}
							</h2>

							<p className="mt-2 text-sm text-slate-500">
								Fields marked with * are required.
							</p>
						</div>

						{isEditing && (
							<button
								type="button"
								onClick={cancelEditing}
								disabled={submitting}
								className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
							>
								<X className="size-4" />
								Cancel
							</button>
						)}
					</div>

					{districtError && (
						<div className="mb-5 flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
							<AlertCircle className="size-5 shrink-0" />
							<p>{districtError}</p>
						</div>
					)}

					{editLoading && (
						<div className="mb-5 flex items-center gap-2 rounded-xl bg-sky-50 p-4 text-sm text-sky-800">
							<LoaderCircle className="size-4 animate-spin" />
							Loading application details...
						</div>
					)}

					<form
						ref={formRef}
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						<fieldset
							disabled={submitting || editLoading}
							className="space-y-6 disabled:opacity-70"
						>
							{/* Worker Type */}
							<div>
								<label className="mb-3 block text-sm font-semibold text-slate-700">
									Choose your profession *
								</label>

								<WorkerTypeSelector
									value={workerType}
									onChange={setWorkerType}
									disabled={submitting || editLoading}
								/>
							</div>

							{/* Phone and District */}
							<div className="grid gap-5 sm:grid-cols-2">
								<div>
									<label
										htmlFor="phone"
										className="mb-2 block text-sm font-semibold text-slate-700"
									>
										Phone number *
									</label>

									<input
										id="phone"
										name="phone"
										type="tel"
										required
										maxLength={20}
										placeholder="Enter your contact number"
										className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
									/>
								</div>

								<div>
									<label
										htmlFor="districtId"
										className="mb-2 block text-sm font-semibold text-slate-700"
									>
										Preferred district *
									</label>

									<select
										id="districtId"
										name="districtId"
										required
										defaultValue=""
										disabled={districts.length === 0}
										className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 disabled:cursor-not-allowed disabled:bg-slate-100"
									>
										<option value="" disabled>
											{districts.length > 0
												? "Select your district"
												: "No districts available"}
										</option>

										{districts.map((district) => (
											<option
												key={district.id}
												value={district.id}
											>
												{district.name} — {district.division}
											</option>
										))}
									</select>
								</div>
							</div>

							{/* Address */}
							<div>
								<label
									htmlFor="address"
									className="mb-2 block text-sm font-semibold text-slate-700"
								>
									Full address *
								</label>

								<textarea
									id="address"
									name="address"
									required
									rows={2}
									maxLength={500}
									placeholder="Enter your village, area or complete address"
									className="w-full resize-y rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
								/>
							</div>

							{/* Business and Experience */}
							<div className="grid gap-5 sm:grid-cols-2">
								<div>
									<label
										htmlFor="businessName"
										className="mb-2 block text-sm font-semibold text-slate-700"
									>
										Business name{" "}
										<span className="font-normal text-slate-400">
											(Optional)
										</span>
									</label>

									<input
										id="businessName"
										name="businessName"
										maxLength={150}
										placeholder="Your business or workshop name"
										className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
									/>
								</div>

								<div>
									<label
										htmlFor="experience"
										className="mb-2 block text-sm font-semibold text-slate-700"
									>
										Experience{" "}
										<span className="font-normal text-slate-400">
											(Optional)
										</span>
									</label>

									<input
										id="experience"
										name="experience"
										maxLength={100}
										placeholder="e.g. 3 years"
										className="w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
									/>
								</div>
							</div>

							{/* Description */}
							<div>
								<label
									htmlFor="description"
									className="mb-2 block text-sm font-semibold text-slate-700"
								>
									Skills and experience details{" "}
									<span className="font-normal text-slate-400">
										(Optional)
									</span>
								</label>

								<textarea
									id="description"
									name="description"
									rows={4}
									maxLength={2000}
									placeholder="Tell us about your skills, previous work and services you can provide."
									className="w-full resize-y rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
								/>
							</div>
						</fieldset>

						{/* Success / Error Message */}
						{message && (
							<div
								role="status"
								aria-live="polite"
								className={`flex gap-3 rounded-xl p-4 text-sm ${
									success
										? "bg-emerald-50 text-emerald-800"
										: "bg-red-50 text-red-800"
								}`}
							>
								{success ? (
									<CheckCircle2 className="size-5 shrink-0" />
								) : (
									<AlertCircle className="size-5 shrink-0" />
								)}

								<p>{message}</p>
							</div>
						)}

						{/* Submit */}
						<div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
							<p className="max-w-md text-xs leading-5 text-slate-500">
								Please make sure your contact details and application
								information are accurate before submitting.
							</p>

							<button
								type="submit"
								disabled={
									submitting ||
									editLoading ||
									districts.length === 0
								}
								className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-200 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{submitting ? (
									<>
										<LoaderCircle className="size-4 animate-spin" />
										{isEditing ? "Saving..." : "Submitting..."}
									</>
								) : (
									<>
										{isEditing ? (
											<Pencil className="size-4" />
										) : (
											<Send className="size-4" />
										)}
										{isEditing ? "Save Changes" : "Submit Application"}
										<ArrowRight className="size-4" />
									</>
								)}
							</button>
						</div>
					</form>
				</section>
			)}

			{/* Application History */}
			<section className="space-y-4">
				<div>
					<h2 className="text-xl font-bold text-slate-900">
						Application history
					</h2>

					<p className="mt-1 text-sm text-slate-500">
						Review the status of your previous applications.
					</p>
				</div>

				<WorkerApplicationHistory
					applications={applications}
				/>
			</section>
		</div>
	);
}
