
import {
	ArrowLeft,
	Check,
	CheckCircle2,
	MapPin,
	Phone,
	Wrench,
} from "lucide-react";
import Link from "next/link";
import type { AssignedService } from "@/types/worker";
import { ServiceActionButtons } from "./service-action-buttons";

type ServiceDetailsProps = {
	service: AssignedService;
};

const BRAND = "#0084D1";

const statusStyles: Record<string, string> = {
	PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
	ASSIGNED: "bg-blue-50 text-blue-700 ring-blue-200",
	ACCEPTED: "bg-indigo-50 text-indigo-700 ring-indigo-200",
	IN_PROGRESS: "bg-orange-50 text-orange-700 ring-orange-200",
	COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
	REJECTED: "bg-red-50 text-red-700 ring-red-200",
	CANCELLED: "bg-gray-100 text-gray-600 ring-gray-200",
};

export function ServiceDetails({ service }: ServiceDetailsProps) {
	const status = service.status;
	const customerPhone = service.phone;

	const progress = [
		{
			label: "Assigned",
			description: "The service has been assigned to you.",
			done: Boolean(service.assignedAt),
		},
		{
			label: "Started",
			description: "The service work has started.",
			done: Boolean(service.startedAt),
		},
		{
			label: "Completed",
			description: "The service work has been completed.",
			done: Boolean(service.completedAt),
		},
	];

	const initials =
		service.customer.name
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0])
			.join("")
			.toUpperCase() || "C";

	return (
		<div className="mx-auto w-full max-w-6xl space-y-5">
			{/* Back Navigation */}
			<Link
				href="/dashboard/worker/my-jobs"
				className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-[#0084D1]"
			>
				<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
				Back to My Jobs
			</Link>

			<section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
				{/* Service Header */}
				<div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
					<div className="min-w-0 space-y-3">
						<div className="flex flex-wrap items-center gap-2">
							<span className="inline-flex items-center gap-1.5 rounded-lg bg-[#0084D1]/10 px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-[#0084D1]">
								<Wrench className="size-3.5" />
								{service.serviceType}
							</span>

							<span className="text-xs text-muted-foreground">
								Service Details
							</span>
						</div>

						<h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
							{service.serviceName}
						</h1>

						<p className="max-w-2xl text-sm leading-6 text-muted-foreground">
							View service information, customer details, and
							track your job progress.
						</p>
					</div>

					<span
						className={`w-fit shrink-0 rounded-full px-3.5 py-2 text-xs font-bold ring-1 ring-inset ${
							statusStyles[status] ??
							"bg-gray-100 text-gray-700 ring-gray-200"
						}`}
					>
						{status.replaceAll("_", " ")}
					</span>
				</div>

				{/* Service Charge */}
				<div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#0084D1]/10 bg-[#0084D1]/[0.035] px-5 py-5 sm:px-7">
					<div>
						<p className="text-sm font-medium text-muted-foreground">
							Service Charge
						</p>

						<p
							className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl"
							style={{ color: BRAND }}
						>
							{service.serviceCharge != null
								? `৳${Number(service.serviceCharge).toLocaleString("en-BD")}`
								: "Not specified"}
						</p>

						<p className="mt-1 text-xs text-muted-foreground">
							{status === "COMPLETED"
								? "Final service charge"
								: "Service pricing"}
						</p>
					</div>

					<div className="flex size-14 items-center justify-center rounded-2xl bg-[#0084D1]/10 text-[#0084D1]">
						<Wrench className="size-7" />
					</div>
				</div>

				{/* Main Content */}
				<div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.15fr_0.85fr]">
					<div className="space-y-6">
						{/* Service Description */}
						<div className="rounded-2xl border border-border p-5">
							<div className="mb-3 flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-xl bg-[#0084D1]/10 text-[#0084D1]">
									<Wrench className="size-4" />
								</div>

								<h2 className="text-sm font-bold">
									Service Details
								</h2>
							</div>

							<p className="text-sm leading-7 text-muted-foreground">
								{service.description ||
									"No description provided."}
							</p>
						</div>

						{/* Customer Information */}
						<div className="rounded-2xl border border-border p-5">
							<div className="mb-4 flex items-center justify-between gap-3">
								<h2 className="text-sm font-bold">
									Customer Information
								</h2>

								<span className="rounded-lg bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
									Customer
								</span>
							</div>

							<div className="flex flex-col gap-4 sm:flex-row sm:items-center">
								<div
									className="flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-bold"
									style={{
										backgroundColor: `${BRAND}14`,
										color: BRAND,
									}}
								>
									{initials}
								</div>

								<div className="min-w-0 flex-1">
									<p className="truncate text-sm font-bold">
										{service.customer.name}
									</p>

									<p className="mt-1 break-all text-sm text-muted-foreground">
										{service.customer.email}
									</p>
								</div>

								{customerPhone && (
									<a
										href={`tel:${customerPhone}`}
										aria-label={`Call ${service.customer.name}`}
										className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0084D1] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#006DB0] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0084D1] focus-visible:ring-offset-2 active:scale-[0.98] sm:w-auto"
									>
										<Phone className="size-4" />
										Call Customer
									</a>
								)}
							</div>

							{customerPhone && (
								<div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
									<Phone className="size-4 text-[#0084D1]" />
									<span>{customerPhone}</span>
								</div>
							)}
						</div>

						{/* Service Location */}
						<div className="rounded-2xl border border-border p-5">
							<div className="mb-4 flex items-center gap-3">
								<div className="flex size-9 items-center justify-center rounded-xl bg-[#0084D1]/10 text-[#0084D1]">
									<MapPin className="size-4" />
								</div>

								<h2 className="text-sm font-bold">
									Service Location
								</h2>
							</div>

							<div className="rounded-xl bg-muted/40 p-4">
								<p className="text-sm font-medium leading-6">
									{service.address}
								</p>

								<div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
									<MapPin className="size-4 shrink-0 text-[#0084D1]" />
									<span>{service.district.name}</span>
								</div>
							</div>
						</div>
					</div>

					{/* Job Progress */}
					<div className="h-fit overflow-hidden rounded-2xl border border-[#0084D1]/15 bg-card shadow-sm">
						<div className="border-b border-[#0084D1]/10 bg-[#0084D1]/[0.04] px-5 py-4">
							<div className="flex items-center gap-3">
								<div className="flex size-10 items-center justify-center rounded-xl bg-[#0084D1]/10 text-[#0084D1]">
									<CheckCircle2 className="size-5" />
								</div>

								<div>
									<h2 className="text-sm font-bold">
										Job Progress
									</h2>

									<p className="mt-0.5 text-xs text-muted-foreground">
										Track your service journey
									</p>
								</div>
							</div>
						</div>

						<div className="p-5">
							<div className="mb-6 flex items-center justify-between gap-3">
								<span className="text-sm text-muted-foreground">
									Current Status
								</span>

								<span
									className={`rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${
										statusStyles[status] ??
										"bg-gray-100 text-gray-700 ring-gray-200"
									}`}
								>
									{status.replaceAll("_", " ")}
								</span>
							</div>

							<div className="space-y-0">
								{progress.map((step, index) => {
									const isCurrent =
										!step.done &&
										(status === "ASSIGNED" ||
											status === "ACCEPTED" ||
											status === "IN_PROGRESS") &&
										((index === 0 &&
											!service.assignedAt) ||
											(index === 1 &&
												(status === "ACCEPTED" ||
													status === "IN_PROGRESS")) ||
											(index === 2 &&
												status === "IN_PROGRESS"));

									const isLast =
										index === progress.length - 1;

									return (
										<div
											key={step.label}
											className="flex gap-4"
										>
											<div className="flex flex-col items-center">
												<div
													className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
														step.done
															? "border-[#0084D1] bg-[#0084D1] text-white"
															: isCurrent
																? "border-[#0084D1] bg-[#0084D1]/10 text-[#0084D1] ring-4 ring-[#0084D1]/10"
																: "border-border bg-muted/50 text-muted-foreground"
													}`}
												>
													{step.done ? (
														<Check className="size-5" />
													) : (
														<span className="text-xs font-bold">
															{String(
																index + 1,
															).padStart(2, "0")}
														</span>
													)}
												</div>

												{!isLast && (
													<div
														className={`my-1 min-h-10 w-0.5 flex-1 rounded-full ${
															step.done
																? "bg-[#0084D1]"
																: "bg-border"
														}`}
													/>
												)}
											</div>

											<div className="flex-1 pb-7 pt-1">
												<p
													className={`text-sm font-bold ${
														step.done ||
														isCurrent
															? "text-foreground"
															: "text-muted-foreground"
													}`}
												>
													{step.label}
												</p>

												<p className="mt-1 text-xs leading-5 text-muted-foreground">
													{step.description}
												</p>

												{isCurrent && (
													<span className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-[#0084D1]/10 px-2 py-1 text-[11px] font-semibold text-[#0084D1]">
														<span className="size-1.5 animate-pulse rounded-full bg-[#0084D1]" />
														In progress
													</span>
												)}
											</div>
										</div>
									);
								})}
							</div>

							{status === "COMPLETED" && (
								<div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
									<CheckCircle2 className="mt-0.5 size-5 shrink-0" />

									<div>
										<p className="text-sm font-bold">
											Service completed successfully
										</p>

										<p className="mt-1 text-xs leading-5 text-emerald-700">
											This service has been completed.
										</p>
									</div>
								</div>
							)}

							{(status === "REJECTED" ||
								status === "CANCELLED") && (
								<div className="rounded-xl border border-red-200 bg-red-50 p-4">
									<p className="text-sm font-bold text-red-700">
										{status === "REJECTED"
											? "Service Rejected"
											: "Service Cancelled"}
									</p>

									<p className="mt-1 text-sm leading-5 text-red-600">
										{status === "REJECTED"
											? service.rejectionReason ||
												"This service was rejected."
											: service.cancellationReason ||
												"This service was cancelled."}
									</p>
								</div>
							)}
						</div>

						<div className="border-t border-border bg-muted/20 p-4">
							<ServiceActionButtons service={service} />
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

