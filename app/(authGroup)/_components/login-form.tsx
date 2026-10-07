"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
    ArrowRight,
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAction, LoginState } from "../_actions/login";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";


const initialState: LoginState = {
    success: false,
    message: "",
};

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const searchParams = useSearchParams()
    const redirectTo = searchParams.get("redirectTo") ?? ""
    const [state, formAction, isPending] = useActionState(loginAction.bind(null, redirectTo), false)

    useEffect(() => {
        if (!state) {
            return
        }
        if (state.success) {
            toast.success(state.message)
        }
    }, [state])

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

                    <div className="relative">
                        <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter Your Email...."
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            className="h-12 border-slate-200 bg-white pl-10 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label
                            htmlFor="password"
                            className="text-sm font-medium text-slate-700"
                        >
                            Password
                        </Label>

                        <Link
                            href={email
                                ? `/forgot-password?email=${encodeURIComponent(email)}`
                                : "/forgot-password"}
                            className="text-sm font-medium text-sky-600 hover:text-sky-700 hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <div className="relative">
                        <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

                        <Input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="h-12 border-slate-200 bg-white pl-10 pr-11 shadow-sm focus-visible:border-sky-500 focus-visible:ring-sky-500/20"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword((value) => !value)}
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

                {/* Server Error */}
                {!state?.success && state?.message && (
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
                            Signing in...
                        </>
                    ) : (
                        <>
                            Sign in
                            <ArrowRight className="size-4" />
                        </>
                    )}
                </Button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-slate-200" />

                <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Or continue with
                </span>

                <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google */}
            <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-xl border-slate-200 bg-white font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
                <GoogleIcon />
                Continue with Google
            </Button>
        </div>
    );
}

function GoogleIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            className="size-5"
            aria-hidden="true"
        >
            <path
                fill="#4285F4"
                d="M21.35 12.23c0-.71-.06-1.4-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.22Z"
            />

            <path
                fill="#34A853"
                d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.75Z"
            />

            <path
                fill="#FBBC05"
                d="M6.53 13.84A5.86 5.86 0 0 1 6.22 12c0-.64.11-1.26.31-1.84V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.03 4.37l3.25-2.53Z"
            />

            <path
                fill="#EA4335"
                d="M12 6.13c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.22 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.38l3.25 2.53C7.3 7.85 9.46 6.13 12 6.13Z"
            />
        </svg>
    );
}