"use client";

import { useState } from "react";
import { CheckCircle2, CreditCard, LoaderCircle } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { ServiceRequest } from "@/types/service-request";
import { createPayment } from "../../../_actions/payment.action";


type ServicePaymentProps = {
	service: ServiceRequest;
};

export default function ServicePayment({
	service,
}: ServicePaymentProps) {
	const [isLoading, setIsLoading] = useState(false);

	const payment = service.payment;

	if (payment?.status === "COMPLETED") {
		return (
			<div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
				<div className="flex items-start gap-4">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
						<CheckCircle2 className="size-5" />
					</div>

					<div className="min-w-0 flex-1">
						<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<h2 className="font-semibold text-emerald-900">
									Payment Completed
								</h2>

								<p className="mt-1 text-sm text-emerald-700">
									Your payment for this service has been
									successfully completed.
								</p>
							</div>

							{service.serviceCharge && (
								<p className="text-lg font-bold text-emerald-800">
									৳ {service.serviceCharge}
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (service.status !== "COMPLETED") {
		return null;
	}

	const handlePayment = async () => {
		try {
			setIsLoading(true);

			const result = await createPayment(service.id);

			if (!result.paymentUrl) {
				throw new Error("Payment URL was not provided");
			}

			window.location.href = result.paymentUrl;
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to start payment",
			);

			setIsLoading(false);
		}
	};

	return (
		<div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5">
			<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
				<div className="flex items-start gap-4">
					<div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-sky-100 text-sky-600">
						<CreditCard className="size-5" />
					</div>

					<div>
						<h2 className="font-semibold text-slate-900">
							Payment Required
						</h2>

						<p className="mt-1 text-sm leading-5 text-slate-500">
							Your service has been completed. Please complete
							the payment to continue.
						</p>
					</div>
				</div>

				<div className="flex shrink-0 items-center gap-4">
					{service.serviceCharge && (
						<div className="text-right">
							<p className="text-xs font-medium uppercase tracking-wide text-slate-400">
								Amount
							</p>

							<p className="mt-0.5 text-xl font-bold text-slate-900">
								৳ {service.serviceCharge}
							</p>
						</div>
					)}

					<Button
						type="button"
						onClick={handlePayment}
						disabled={isLoading}
						className="h-10 rounded-lg bg-sky-600 px-5 font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
					>
						{isLoading ? (
							<>
								<LoaderCircle className="size-4 animate-spin" />
								Processing...
							</>
						) : (
							<>
								<CreditCard className="size-4" />
								Pay Now
							</>
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}