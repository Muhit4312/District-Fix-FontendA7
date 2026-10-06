import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoginBrand } from "../_components/login-brand";
import { VerifyEmailForm } from "./_components/verify-email-form";

type VerifyEmailPageProps = {
    searchParams: Promise<{
        email?: string;
    }>;
};

export default async function VerifyEmailPage({
    searchParams,
}: VerifyEmailPageProps) {
    const { email } = await searchParams;

    if (!email) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-sky-50 px-5">
                <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                    <div className="mb-6 flex justify-center">
                        <LoginBrand variant="light" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Email address missing
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                        We couldn't find an email address to verify. Please
                        register your account first.
                    </p>

                    <Link
                        href="/register"
                        className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
                    >
                        Go to register
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sky-50 px-5 py-10">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-sky-100/80 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-sky-100/60 blur-3xl" />

            <div className="relative z-10 w-full max-w-md">
                {/* Brand */}


                {/* Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/40 sm:p-8">
                    {/* Back */}
                    <Link
                        href="/register"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
                    >
                        <ArrowLeft className="size-4" />
                        Back to register
                    </Link>

                    {/* Heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Verify your email
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-slate-500">
                            Enter the code below to verify your account.
                        </p>


                    </div>

                    {/* Form */}
                    <VerifyEmailForm email={email} />
                </div>


            </div>
        </main>
    );
}