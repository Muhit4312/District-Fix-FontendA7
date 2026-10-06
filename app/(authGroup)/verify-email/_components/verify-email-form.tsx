"use client";

import Link from "next/link";
import { useActionState, useEffect } from "react";
import { ArrowRight, MailCheck } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
	verifyEmailAction,
	type VerifyEmailState,
} from "../../_actions/verify-email";

type VerifyEmailFormProps = {
	email: string;
};

const initialState: VerifyEmailState = {
	success: false,
	message: "",
};

export function VerifyEmailForm({ email }: VerifyEmailFormProps) {
	const router = useRouter();

	const [state, formAction, isPending] = useActionState(
		verifyEmailAction,
		initialState,
	);

	useEffect(() => {
		if (!state.message) {
			return;
		}

		if (state.success) {
			toast.success(state.message);

			router.push("/login");
		}
	}, [state, router]);

	return (
		<div>

			<form action={formAction} className="space-y-5">
				{/* Email */}
				<div className="space-y-2">
					<Label
						htmlFor="email"
						className="text-sm font-medium text-slate-700"
					>
						Email address
					</Label>

					<Input
						id="email"
						name="email"
						type="email"
						value={email}
						readOnly
						className="h-12 border-slate-200 bg-slate-50 shadow-sm"
					/>
				</div>

				{/* OTP */}
				<div className="space-y-2">
					<Label
						htmlFor="otp"
						className="text-sm font-medium text-slate-700"
					>
						Verification code
					</Label>

					<Input
						id="otp"
						name="otp"
						type="text"
						inputMode="numeric"
						maxLength={6}
						placeholder="Enter 6-digit OTP"
						autoComplete="one-time-code"
						required
						className="h-12 border-slate-200 bg-white text-center text-lg font-semibold tracking-[0.35em] shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
					/>
				</div>

				{/* Error */}
				{!state.success && state.message && (
					<p className="text-center text-sm text-red-500">
						{state.message}
					</p>
				)}

				{/* Submit */}
				<Button
					type="submit"
					disabled={isPending}
					className="h-12 w-full rounded-xl bg-sky-600 font-semibold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
				>
					{isPending ? (
						<>
							<span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
							Verifying...
						</>
					) : (
						<>
							Verify email
							<ArrowRight className="size-4" />
						</>
					)}
				</Button>
			</form>

			<p className="mt-6 text-center text-sm text-slate-500">
				Didn't receive the code?{" "}
				<Link
					href="/register"
					className="font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
				>
					Register again
				</Link>
			</p>
		</div>
	);
}