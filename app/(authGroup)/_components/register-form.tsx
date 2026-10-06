"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
	ArrowRight,
	Eye,
	EyeOff,
	LockKeyhole,
	Mail,
	User,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
	registerAction,
	type RegisterState,
} from "../_actions/register";

const initialState: RegisterState = {
	success: false,
	statusCode: 0,
	message: "",
	data: null
};

export function RegisterForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [state, formAction, isPending] = useActionState(
		registerAction,
		initialState,
	);

	useEffect(() => {
		if (!state?.message) {
			return;
		}

		if (state.success) {
			toast.success(state.message);
		}
	}, [state]);

	return (
		<div>
			<form action={formAction} className="space-y-5">
				{/* Name */}
				<div className="space-y-2">
					<Label
						htmlFor="name"
						className="text-sm font-medium text-slate-700"
					>
						Full name
					</Label>

					<div className="relative">
						<User className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

						<Input
							id="name"
							name="name"
							type="text"
							placeholder="Enter your full name"
							autoComplete="name"
							required
							className="h-12 border-slate-200 bg-white pl-10 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
						/>
					</div>
				</div>

				{/* Email */}
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
							placeholder="Enter your email"
							autoComplete="email"
							required
							className="h-12 border-slate-200 bg-white pl-10 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
						/>
					</div>
				</div>

				{/* Password */}
				<div className="space-y-2">
					<Label
						htmlFor="password"
						className="text-sm font-medium text-slate-700"
					>
						Password
					</Label>

					<div className="relative">
						<LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Create a password"
							autoComplete="new-password"
							required
							className="h-12 border-slate-200 bg-white pl-10 pr-11 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
						/>

						<button
							type="button"
							onClick={() =>
								setShowPassword((value) => !value)
							}
							aria-label={
								showPassword
									? "Hide password"
									: "Show password"
							}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
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
					<Label
						htmlFor="confirmPassword"
						className="text-sm font-medium text-slate-700"
					>
						Confirm password
					</Label>

					<div className="relative">
						<LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

						<Input
							id="confirmPassword"
							name="confirmPassword"
							type={
								showConfirmPassword
									? "text"
									: "password"
							}
							placeholder="Confirm your password"
							autoComplete="new-password"
							required
							className="h-12 border-slate-200 bg-white pl-10 pr-11 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
						/>

						<button
							type="button"
							onClick={() =>
								setShowConfirmPassword(
									(value) => !value,
								)
							}
							aria-label={
								showConfirmPassword
									? "Hide password"
									: "Show password"
							}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
						>
							{showConfirmPassword ? (
								<EyeOff className="size-4" />
							) : (
								<Eye className="size-4" />
							)}
						</button>
					</div>
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
							Creating account...
						</>
					) : (
						<>
							Create account
							<ArrowRight className="size-4" />
						</>
					)}
				</Button>
			</form>
			<div className="relative my-6">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-slate-200" />
				</div>

				<div className="relative flex justify-center text-xs">
					<span className="bg-sky-50 px-3 text-slate-400">
						OR CONTINUE WITH
					</span>
				</div>
			</div>

			<Button
				type="button"
				variant="outline"
				className="h-12 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-700 shadow-sm hover:bg-slate-50"
			>
				<svg
					className="size-5"
					viewBox="0 0 24 24"
					aria-hidden="true"
				>
					<path
						fill="#4285F4"
						d="M21.35 12.23c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.84-1.69 2.91-4.18 2.91-7.42Z"
					/>
					<path
						fill="#34A853"
						d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.15-2.45c-.87.58-1.98.92-3.3.92-2.54 0-4.69-1.72-5.46-4.03H3.28v2.53A9.74 9.74 0 0 0 12 21.5Z"
					/>
					<path
						fill="#FBBC05"
						d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.1-1.09.31-1.59V7.88H3.28A9.74 9.74 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.12l3.26-2.53Z"
					/>
					<path
						fill="#EA4335"
						d="M12 6.38c1.43 0 2.72.49 3.73 1.46l2.8-2.8C16.84 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.72 5.38l3.26 2.53C7.31 8.1 9.46 6.38 12 6.38Z"
					/>
				</svg>

				Continue with Google
			</Button>

			<p className="mt-6 text-center text-sm text-slate-500">
				Already have an account?{" "}
				<Link
					href="/login"
					className="font-semibold text-sky-600 hover:text-sky-700 hover:underline"
				>
					Sign in
				</Link>
			</p>
		</div>
	);
}