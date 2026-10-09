
import Link from "next/link";
import {
	ArrowLeft,
	CreditCard,
	RefreshCcw,
	XCircle,
} from "lucide-react";

type PaymentFailurePageProps = {
	searchParams: Promise<{
		paymentID?: string;
	}>;
};

export default async function PaymentFailurePage({
	searchParams,
}: PaymentFailurePageProps) {
	const { paymentID } = await searchParams;

	return (
		<div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center">
			<div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
				<div className="mx-auto flex size-16 items-center justify-center rounded-full bg-red-100 text-red-600">
					<XCircle className="size-8" />
				</div>

				<h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
					Payment Failed
				</h1>

				<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
					We couldn&apos;t complete your payment. You can return to
					your service details and try again.
				</p>

				{paymentID && (
					<div className="mx-auto mt-7 max-w-md rounded-xl border border-red-100 bg-red-50/70 p-4 text-left">
						<p className="text-xs font-semibold uppercase tracking-wider text-red-600">
							Payment Reference
						</p>

						<p className="mt-2 break-all font-mono text-sm font-semibold text-slate-800">
							{paymentID}
						</p>

						<p className="mt-2 text-xs leading-5 text-slate-500">
							Keep this reference if you contact support about
							this transaction.
						</p>
					</div>
				)}

				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Link
						href="/dashboard/customer/my-services"
						className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
					>
						<RefreshCcw className="size-4" />
						View My Services
					</Link>

					<Link
						href="/dashboard/customer"
						className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
					>
						<CreditCard className="size-4" />
						Dashboard
					</Link>
				</div>
			</div>
		</div>
	);
}

