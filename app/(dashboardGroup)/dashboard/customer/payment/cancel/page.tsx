
import Link from "next/link";
import {
	ArrowLeft,
	CreditCard,
	RefreshCcw,
	XCircle,
} from "lucide-react";

type PaymentCancelPageProps = {
	searchParams: Promise<{
		paymentID?: string;
	}>;
};

export default async function PaymentCancelPage({
	searchParams,
}: PaymentCancelPageProps) {
	const { paymentID } = await searchParams;

	return (
		<div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center justify-center">
			<div className="w-full rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-10">
				<div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
					<XCircle className="size-8" />
				</div>

				<h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
					Payment Cancelled
				</h1>

				<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
					You cancelled the payment process. No successful payment
					was confirmed by this page. You can return to your
					services and try again whenever you&apos;re ready.
				</p>

				{paymentID && (
					<div className="mx-auto mt-7 max-w-md rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-left">
						<p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
							Payment Reference
						</p>

						<p className="mt-2 break-all font-mono text-sm font-semibold text-slate-800">
							{paymentID}
						</p>

						<p className="mt-2 text-xs leading-5 text-slate-500">
							Keep this reference if you need help with this
							transaction.
						</p>
					</div>
				)}

				<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
					<Link
						href="/dashboard/customer/my-services"
						className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
					>
						<ArrowLeft className="size-4" />
						Back to My Services
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

