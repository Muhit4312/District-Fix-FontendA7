import Link from "next/link";
import { ArrowLeft } from "lucide-react";



import { ResetPasswordForm } from "./_components/reset-password-form";

type ResetPasswordPageProps = {
	searchParams: Promise<{
		email?: string;
	}>;
};

export default async function ResetPasswordPage({
	searchParams,
}: ResetPasswordPageProps) {
	const { email } = await searchParams;

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sky-50 px-5 py-10">
			<div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-sky-100/80 blur-3xl" />

			<div className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-sky-100/60 blur-3xl" />

			<div className="relative z-10 w-full max-w-md">
				

				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
					<Link
						href="/forgot-password"
						className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
					>
						<ArrowLeft className="size-4" />
						Back to forgot password
					</Link>

					<div className="mb-8">
						

						<h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
							Reset your password
						</h1>

						
					</div>

					{email ? (
						<ResetPasswordForm email={email} />
					) : (
						<div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
							<p className="text-sm font-medium text-amber-800">
								Email address is missing.
							</p>

							<p className="mt-1 text-xs leading-5 text-amber-700">
								Please start the password reset process from
								the forgot password page.
							</p>

							<Link
								href="/forgot-password"
								className="mt-4 inline-flex text-sm font-semibold text-sky-600 hover:text-sky-700 hover:underline"
							>
								Go to forgot password
							</Link>
						</div>
					)}
				</div>

				<p className="mt-6 text-center text-xs leading-5 text-slate-400">
					Need help?{" "}
					<Link
						href="/contact"
						className="font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
					>
						Contact DistrictFix
					</Link>
				</p>
			</div>
		</main>
	);
}