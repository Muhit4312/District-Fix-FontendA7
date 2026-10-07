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
import { GoogleLoginButton } from "./google-login-button";

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

			<div className="flex justify-center">
				<GoogleLoginButton />
			</div>

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