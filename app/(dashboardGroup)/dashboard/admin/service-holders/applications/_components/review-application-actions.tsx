
"use client";

import { useState, useTransition } from "react";
import {
	CheckCircle2,
	LoaderCircle,
	ShieldCheck,
	XCircle,
} from "lucide-react";
import { toast } from "sonner";

import {
	approveApplicationAction,
	rejectApplicationAction,
} from "../_actions/review-application.action";

interface ReviewApplicationActionsProps {
	applicationId: string;
	status: "PENDING" | "APPROVED" | "REJECTED";
}

type ActiveAction = "approve" | "reject" | null;

export default function ReviewApplicationActions({
	applicationId,
	status,
}: ReviewApplicationActionsProps) {
	const [isPending, startTransition] = useTransition();
	const [activeAction, setActiveAction] = useState<ActiveAction>(null);
	const [showRejectForm, setShowRejectForm] = useState(false);
	const [rejectionReason, setRejectionReason] = useState("");

	if (status !== "PENDING") {
		return null;
	}

	function handleApprove() {
		const confirmed = window.confirm(
			"Are you sure you want to approve this application?",
		);

		if (!confirmed || isPending) return;

		setActiveAction("approve");

		startTransition(async () => {
			try {
				const result = await approveApplicationAction(applicationId);

				if (!result.success) {
					toast.error(result.message);
					return;
				}

				toast.success(result.message);
				window.location.reload();
			} catch {
				toast.error("Failed to approve application. Please try again.");
			} finally {
				setActiveAction(null);
			}
		});
	}

	function handleReject() {
		if (isPending) return;

		const reason = rejectionReason.trim();

		if (reason.length < 5) {
			toast.error("Rejection reason must be at least 5 characters.");
			return;
		}

		if (reason.length > 500) {
			toast.error("Rejection reason cannot exceed 500 characters.");
			return;
		}

		setActiveAction("reject");

		startTransition(async () => {
			try {
				const result = await rejectApplicationAction(
					applicationId,
					reason,
				);

				if (!result.success) {
					toast.error(result.message);
					return;
				}

				toast.success(result.message);
				window.location.reload();
			} catch {
				toast.error("Failed to reject application. Please try again.");
			} finally {
				setActiveAction(null);
			}
		});
	}

	return (
		<section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
			<div className="flex items-start gap-3">
				<div className="rounded-xl bg-sky-50 p-3 text-sky-700">
					<ShieldCheck className="size-6" />
				</div>

				<div>
					<h2 className="text-lg font-semibold text-slate-900">
						Application Review
					</h2>
					<p className="mt-1 text-sm leading-6 text-slate-500">
						Review the submitted information before making your decision.
					</p>
				</div>
			</div>

			<div className="mt-6 flex flex-col gap-3 sm:flex-row">
				<button
					type="button"
					onClick={handleApprove}
					disabled={isPending}
					className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{activeAction === "approve" ? (
						<LoaderCircle className="size-4 animate-spin" />
					) : (
						<CheckCircle2 className="size-4" />
					)}
					{activeAction === "approve"
						? "Approving..."
						: "Approve Application"}
				</button>

				<button
					type="button"
					onClick={() => setShowRejectForm((current) => !current)}
					disabled={isPending}
					className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-rose-200 bg-white px-5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{activeAction === "reject" ? (
						<LoaderCircle className="size-4 animate-spin" />
					) : (
						<XCircle className="size-4" />
					)}
					{activeAction === "reject"
						? "Rejecting..."
						: "Reject Application"}
				</button>
			</div>

			{showRejectForm && (
				<div className="mt-5 space-y-3 rounded-xl border border-rose-100 bg-rose-50/50 p-4">
					<label
						htmlFor="rejectionReason"
						className="block text-sm font-semibold text-slate-800"
					>
						Reason for rejection
					</label>

					<textarea
						id="rejectionReason"
						value={rejectionReason}
						onChange={(event) => setRejectionReason(event.target.value)}
						placeholder="Explain why this application is being rejected..."
						rows={4}
						maxLength={500}
						disabled={isPending}
						className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 disabled:opacity-60"
					/>

					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<p className="text-xs text-slate-500">
							{rejectionReason.trim().length}/500 characters (minimum 5)
						</p>

						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => setShowRejectForm(false)}
								disabled={isPending}
								className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
							>
								Cancel
							</button>

							<button
								type="button"
								onClick={handleReject}
								disabled={
									isPending || rejectionReason.trim().length < 5
								}
								className="inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:cursor-not-allowed disabled:opacity-60"
							>
								{activeAction === "reject" && (
									<LoaderCircle className="size-4 animate-spin" />
								)}
								{activeAction === "reject"
									? "Rejecting..."
									: "Confirm Rejection"}
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}

