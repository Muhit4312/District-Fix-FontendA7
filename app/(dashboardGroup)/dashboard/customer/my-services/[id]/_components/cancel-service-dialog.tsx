"use client";

import { useState } from "react";
import { LoaderCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cancelMyService } from "../_actions/customer-cnncel-service.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";




type CancelServiceDialogProps = {
	serviceId: string;
	status:
	| "PENDING"
	| "ASSIGNED"
	| "ACCEPTED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED"
	| "REJECTED";
};

export default function CancelServiceDialog({
	serviceId,
	status,
}: CancelServiceDialogProps) {
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [reason, setReason] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);

	const canCancel =
		status === "PENDING" ||
		status === "ASSIGNED" ||
		status === "ACCEPTED";

	if (!canCancel) {
		return null;
	}

	const handleCancel = async () => {
		const trimmedReason = reason.trim();

		if (!trimmedReason) {
			toast.error("Please provide a cancellation reason.");
			return;
		}

		if (trimmedReason.length < 5) {
			toast.error("Reason must be at least 5 characters.");
			return;
		}

		if (trimmedReason.length > 500) {
			toast.error("Reason cannot exceed 500 characters.");
			return;
		}

		try {
			setIsSubmitting(true);

			await cancelMyService(serviceId, trimmedReason);

			toast.success("Service request cancelled successfully");

			setReason("");
			setOpen(false);

			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to cancel service request",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleOpenChange = (value: boolean) => {
		if (isSubmitting) {
			return;
		}

		setOpen(value);

		if (!value) {
			setReason("");
		}
	};

	return (
		<>
			<Button
				type="button"
				variant="outline"
				onClick={() => setOpen(true)}
				className="h-9 rounded-lg border-red-200 bg-red-50 px-4 text-sm font-semibold text-red-900 shadow-sm transition-all hover:border-red-300 hover:bg-red-100 hover:text-red-800 hover:shadow"
			>
				<XCircle className="size-4" />
				Cancel Request
			</Button>

			<AlertDialog
				open={open}
				onOpenChange={handleOpenChange}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Cancel Service Request?
						</AlertDialogTitle>

						<AlertDialogDescription>
							This action will cancel your service request.
							Please provide a reason before confirming.
						</AlertDialogDescription>
					</AlertDialogHeader>

					<div className="space-y-2">
						<label
							htmlFor="cancellation-reason"
							className="text-sm font-medium text-slate-900"
						>
							Cancellation Reason
						</label>

						<Textarea
							id="cancellation-reason"
							value={reason}
							onChange={(event) =>
								setReason(event.target.value)
							}
							placeholder="Tell us why you want to cancel this service request..."
							rows={4}
							disabled={isSubmitting}
							className="resize-none"
						/>

						<div className="flex justify-end">
							<span className="text-xs text-slate-400">
								{reason.length}/500
							</span>
						</div>
					</div>

					<AlertDialogFooter>
						<AlertDialogCancel
							type="button"
							disabled={isSubmitting}
						>
							Keep Request
						</AlertDialogCancel>

						<Button
							type="button"
							onClick={handleCancel}
							disabled={isSubmitting}
							className="bg-red-900 text-white hover:bg-red-800"
						>
							{isSubmitting ? (
								<>
									<LoaderCircle className="size-4 animate-spin" />
									Cancelling...
								</>
							) : (
								<>
									<XCircle className="size-4" />
									Confirm Cancellation
								</>
							)}
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}