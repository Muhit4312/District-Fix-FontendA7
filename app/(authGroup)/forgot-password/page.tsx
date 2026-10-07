import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoginBrand } from "../_components/login-brand";
import { ForgotPasswordForm } from "./_components/forgot-password-form";

type ForgotPasswordPageProps = {
	searchParams: Promise<{
		email?: string;
	}>;
};

export default async function ForgotPasswordPage({
	searchParams,
}: ForgotPasswordPageProps) {
	const { email } = await searchParams;

	return (
		<main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sky-50 px-5 py-10">
			<div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-sky-100/80 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-sky-100/60 blur-3xl" />

			<div className="relative z-10 w-full max-w-md">
				
				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
					<Link
						href="/login"
						className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
					>
						<ArrowLeft className="size-4" />
						Back to login
					</Link>

					<div className="mb-8">
						<h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
							Forgot your password?
						</h1>

						<p className="mt-3 text-sm leading-6 text-slate-500">
							We&apos;ll send you a
							verification code to reset your password.
						</p>
					</div>

					<ForgotPasswordForm email={email ?? ""} />
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