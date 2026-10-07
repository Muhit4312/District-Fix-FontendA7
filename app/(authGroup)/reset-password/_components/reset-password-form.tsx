"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
	ArrowRight,
	Eye,
	EyeOff,
	KeyRound,
	LockKeyhole,
	Mail,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
	resetPasswordAction,
	ResetPasswordState,
} from "../../_actions/reset-password";

type ResetPasswordFormProps = {
	email: string;
};

const initialState: ResetPasswordState = {
	success: false,
	message: "",
};

export function ResetPasswordForm({
	email,
}: ResetPasswordFormProps) {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] =
		useState(false);

	const [state, formAction, isPending] = useActionState(
		resetPasswordAction,
		initialState,
	);

	useEffect(() => {
		if (!state.message) return;

		if (state.success) {
			toast.success(state.message);
			router.push("/login");
		} else {
			toast.error(state.message);
		}
	}, [state, router]);

	return (
		<form action={formAction} className="space-y-5">
			{/* Email */}
			<div className="space-y-2">
				<Label htmlFor="email">Email address</Label>

				<div className="relative">
					<Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

					<Input
						id="email"
						name="email"
						type="email"
						defaultValue={email}
						readOnly
						className="h-11 bg-slate-50 pl-10 text-slate-600"
					/>
				</div>
			</div>

			{/* OTP */}
			<div className="space-y-2">
				<Label htmlFor="otp">Verification code</Label>

				<div className="relative">
					<KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

					<Input
						id="otp"
						name="otp"
						type="text"
						inputMode="numeric"
						maxLength={6}
						placeholder="Enter 6-digit OTP"
						autoComplete="one-time-code"
						className="h-11 pl-10 tracking-[0.3em]"
						required
					/>
				</div>

				
			</div>

			{/* New Password */}
			<div className="space-y-2">
				<Label htmlFor="newPassword">New password</Label>

				<div className="relative">
					<LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

					<Input
						id="newPassword"
						name="newPassword"
						type={showPassword ? "text" : "password"}
						placeholder="Enter your new password"
						autoComplete="new-password"
						className="h-11 pl-10 pr-11"
						required
					/>

					<button
						type="button"
						onClick={() =>
							setShowPassword((previous) => !previous)
						}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
						aria-label={
							showPassword
								? "Hide password"
								: "Show password"
						}
					>
						{showPassword ? (
							<EyeOff className="size-4" />
						) : (
							<Eye className="size-4" />
						)}
					</button>
				</div>
			</div>

			{/* Confirm Password */}
			<div className="space-y-2">
				<Label htmlFor="confirmPassword">
					Confirm password
				</Label>

				<div className="relative">
					<LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

					<Input
						id="confirmPassword"
						name="confirmPassword"
						type={showConfirmPassword ? "text" : "password"}
						placeholder="Confirm your new password"
						autoComplete="new-password"
						className="h-11 pl-10 pr-11"
						required
					/>

					<button
						type="button"
						onClick={() =>
							setShowConfirmPassword(
								(previous) => !previous,
							)
						}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-600"
						aria-label={
							showConfirmPassword
								? "Hide confirm password"
								: "Show confirm password"
						}
					>
						{showConfirmPassword ? (
							<EyeOff className="size-4" />
						) : (
							<Eye className="size-4" />
						)}
					</button>
				</div>
			</div>

			<Button
				type="submit"
				disabled={isPending}
				className="h-11 w-full bg-sky-600 font-semibold text-white shadow-sm shadow-sky-600/20 transition-all hover:bg-sky-700"
			>
				{isPending ? (
					"Resetting password..."
				) : (
					<>
						Reset Password
						<ArrowRight className="size-4" />
					</>
				)}
			</Button>

			<div className="text-center">
				<Link
					href="/login"
					className="text-sm font-medium text-sky-600 transition-colors hover:text-sky-700 hover:underline"
				>
					Back to login
				</Link>
			</div>
		</form>
	);
}