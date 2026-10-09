
import Link from "next/link";
import {
	ArrowLeft,
	Building2,
	CalendarDays,
	CheckCircle2,
	Clock3,
	Mail,
	MapPin,
	Phone,
	ShieldCheck,
	UserRound,
	XCircle,
} from "lucide-react";

interface ApplicationDetailsProps {
	application: {
		id: string;
		businessName: string;
		phone: string;
		address: string;
		description: string;
		status: "PENDING" | "APPROVED" | "REJECTED";
		rejectionReason: string | null;
		reviewedAt: string | null;
		createdAt: string;
		updatedAt: string;
		userId: string;
		user: {
			id: string;
			name: string;
			email: string;
			role: string;
			status: string;
		};
		district: {
			id: string;
			name: string;
			division: string;
			code: string;
			isActive: boolean;
		};
		reviewer: {
			id: string;
			name: string;
			email: string;
		} | null;
	};
}

const statusStyles = {
	PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
	APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
	REJECTED: "bg-red-50 text-red-700 ring-red-600/20",
};

function formatDate(value: string | null) {
	if (!value) return "Not reviewed yet";

	return new Intl.DateTimeFormat("en-GB", {
		day: "2-digit",
		month: "short",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	}).format(new Date(value));
}

function SectionTitle({
	icon: Icon,
	title,
}: {
	icon: typeof Building2;
	title: string;
}) {
	return (
		<div className="mb-5 flex items-center gap-2">
			<div className="rounded-lg bg-sky-50 p-2 text-sky-700">
				<Icon className="size-5" />
			</div>
			<h2 className="text-base font-semibold text-slate-900">
				{title}
			</h2>
		</div>
	);
}

function InfoItem({
	label,
	value,
}: {
	label: string;
	value: string;
}) {
	return (
		<div className="min-w-0">
			<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
				{label}
			</p>
			<p className="mt-1 break-words text-sm font-medium text-slate-800">
				{value || "—"}
			</p>
		</div>
	);
}

export default function ApplicationDetails({
	application,
}: ApplicationDetailsProps) {
	const statusIcon = {
		PENDING: Clock3,
		APPROVED: CheckCircle2,
		REJECTED: XCircle,
	};

	const StatusIcon = statusIcon[application.status];

	return (
		<div className="space-y-6">
			<Link
				href="/dashboard/admin/service-holders/applications"
				className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-sky-700"
			>
				<ArrowLeft className="size-4" />
				Back to applications
			</Link>

			<section className="relative overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
				<div className="absolute -right-12 -top-16 size-48 rounded-full bg-sky-50" />

				<div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
					<div className="flex items-start gap-4">
						<div className="rounded-2xl bg-sky-100 p-3 text-sky-700">
							<Building2 className="size-7" />
						</div>

						<div className="min-w-0">
							<p className="text-xs font-semibold uppercase tracking-wider text-sky-700">
								Service Holder Application
							</p>

							<h1 className="mt-2 break-words text-2xl font-bold tracking-tight text-slate-900">
								{application.businessName}
							</h1>

							<p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
								<MapPin className="size-4 shrink-0" />
								{application.district.name},{" "}
								{application.district.division}
							</p>
						</div>
					</div>

					<span
						className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${statusStyles[application.status]}`}
					>
						<StatusIcon className="size-4" />
						{application.status}
					</span>
				</div>

				<div className="relative mt-7 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">
					<InfoItem
						label="Application ID"
						value={application.id}
					/>
					<InfoItem
						label="Submitted on"
						value={formatDate(application.createdAt)}
					/>
					<InfoItem
						label="Last updated"
						value={formatDate(application.updatedAt)}
					/>
				</div>
			</section>

			<div className="grid gap-6 lg:grid-cols-2">
				<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<SectionTitle
						icon={Building2}
						title="Business Information"
					/>

					<div className="grid gap-5 sm:grid-cols-2">
						<InfoItem
							label="Business name"
							value={application.businessName}
						/>
						<InfoItem
							label="Contact number"
							value={application.phone}
						/>
						<InfoItem
							label="District"
							value={application.district.name}
						/>
						<InfoItem
							label="Division"
							value={application.district.division}
						/>
						<InfoItem
							label="District code"
							value={application.district.code}
						/>
						<InfoItem
							label="District status"
							value={
								application.district.isActive
									? "Active"
									: "Inactive"
							}
						/>
					</div>

					<div className="mt-6 border-t border-slate-100 pt-5">
						<InfoItem
							label="Business address"
							value={application.address}
						/>
					</div>

					<div className="mt-6 border-t border-slate-100 pt-5">
						<p className="text-xs font-medium uppercase tracking-wide text-slate-500">
							Business description
						</p>
						<p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-700">
							{application.description || "No description provided."}
						</p>
					</div>
				</section>

				<div className="space-y-6">
					<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<SectionTitle
							icon={UserRound}
							title="Applicant Information"
						/>

						<div className="grid gap-5 sm:grid-cols-2">
							<InfoItem
								label="Full name"
								value={application.user.name}
							/>
							<InfoItem
								label="Role"
								value={application.user.role}
							/>
							<div className="sm:col-span-2">
								<div className="flex items-center gap-2 text-slate-500">
									<Mail className="size-4" />
									<span className="text-xs font-medium uppercase tracking-wide">
										Email address
									</span>
								</div>
								<p className="mt-1 break-all text-sm font-medium text-slate-800">
									{application.user.email}
								</p>
							</div>
							<div className="sm:col-span-2">
								<InfoItem
									label="Account status"
									value={application.user.status}
								/>
							</div>
						</div>
					</section>

					<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<SectionTitle
							icon={ShieldCheck}
							title="Review Information"
						/>

						<div className="space-y-5">
							<InfoItem
								label="Application status"
								value={application.status}
							/>

							<InfoItem
								label="Reviewed at"
								value={formatDate(application.reviewedAt)}
							/>

							{application.reviewer ? (
								<>
									<div className="border-t border-slate-100 pt-4">
										<InfoItem
											label="Reviewed by"
											value={application.reviewer.name}
										/>
									</div>
									<div className="flex items-start gap-2 text-sm text-slate-600">
										<Mail className="mt-0.5 size-4 shrink-0" />
										<span className="break-all">
											{application.reviewer.email}
										</span>
									</div>
								</>
							) : (
								<p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
									This application has not been reviewed yet.
								</p>
							)}

							{application.status === "REJECTED" &&
								application.rejectionReason && (
									<div className="rounded-xl border border-red-100 bg-red-50 p-4">
										<p className="text-sm font-semibold text-red-800">
											Rejection reason
										</p>
										<p className="mt-2 whitespace-pre-line text-sm leading-6 text-red-700">
											{application.rejectionReason}
										</p>
									</div>
								)}
						</div>
					</section>

					<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
						<SectionTitle
							icon={Phone}
							title="Application Timeline"
						/>

						<div className="space-y-4">
							<div className="flex gap-3">
								<div className="mt-0.5 rounded-lg bg-sky-50 p-2 text-sky-700">
									<CalendarDays className="size-4" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-800">
										Application submitted
									</p>
									<p className="mt-1 text-xs text-slate-500">
										{formatDate(application.createdAt)}
									</p>
								</div>
							</div>

							<div className="flex gap-3">
								<div className="mt-0.5 rounded-lg bg-emerald-50 p-2 text-emerald-700">
									<ShieldCheck className="size-4" />
								</div>
								<div>
									<p className="text-sm font-medium text-slate-800">
										Last review update
									</p>
									<p className="mt-1 text-xs text-slate-500">
										{formatDate(application.reviewedAt)}
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}