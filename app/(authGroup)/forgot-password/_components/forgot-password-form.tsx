"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import { ArrowRight, Mail, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	forgotPasswordAction,
	type ForgotPasswordState,
} from "../../_actions/forgot-password";

type ForgotPasswordFormProps = {
	email: string;
};

const initialState: ForgotPasswordState = {
	success: false,
	message: "",
};

export function ForgotPasswordForm({
	email: initialEmail,
}: ForgotPasswordFormProps) {
	const router = useRouter();

	const [email, setEmail] = useState(initialEmail);

	const [state, formAction, isPending] = useActionState(
		forgotPasswordAction,
		initialState,
	);

	useEffect(() => {
		if (!state.message) {
			return;
		}

		if (state.success) {
			toast.success(state.message);

			if (state.email) {
				router.push(
					`/reset-password?email=${encodeURIComponent(state.email)}`,
				);
			}
		}
	}, [state, router]);

	const handleEmailChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const value = event.target.value;

		setEmail(value);

		const params = new URLSearchParams(window.location.search);

		if (value) {
			params.set("email", value);
		} else {
			params.delete("email");
		}

		const query = params.toString();

		window.history.replaceState(
			null,
			"",
			query ? `${window.location.pathname}?${query}` : window.location.pathname,
		);
	};

	return (
		<div>
			<form action={formAction} className="space-y-5">
				<div className="space-y-2">
					<Label
						htmlFor="email"
						className="text-sm font-medium text-slate-700"
					>
						Email address
					</Label>

					<div className="relative">
						<Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

						<Input
							id="email"
							name="email"
							type="email"
							value={email}
							onChange={handleEmailChange}
							placeholder="Enter Your Email..."
							autoComplete="email"
							required
							className="h-12 border-slate-200 bg-white pl-10 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
						/>
					</div>
				</div>

				<div className="flex items-start gap-3 rounded-xl bg-sky-50 px-4 py-3">
					<ShieldCheck className="mt-0.5 size-4 shrink-0 text-sky-600" />

					<p className="text-xs leading-5 text-sky-700">
						For your security, we&apos;ll send a one-time
						verification code to your registered email address.
					</p>
				</div>

				{!state.success && state.message && (
					<p className="text-center text-sm text-red-500">
						{state.message}
					</p>
				)}

				<Button
					type="submit"
					disabled={isPending}
					className="h-12 w-full rounded-xl bg-sky-600 font-semibold text-white shadow-lg shadow-sky-600/20 hover:bg-sky-700"
				>
					{isPending ? (
						<>
							<span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
							Sending code...
						</>
					) : (
						<>
							Send verification code
							<ArrowRight className="size-4" />
						</>
					)}
				</Button>
			</form>

			<p className="mt-6 text-center text-sm text-slate-500">
				Remember your password?{" "}
				<Link
					href="/login"
					className="font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
				>
					Back to login
				</Link>
			</p>
		</div>
	);
}