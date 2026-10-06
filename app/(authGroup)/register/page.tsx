import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck, Wrench } from "lucide-react";

import { LoginBrand } from "../_components/login-brand";
import { ServiceCard } from "../_components/service-card";
import { RegisterForm } from "../_components/register-form";


export default function RegisterPage() {
	return (
		<main className="min-h-screen bg-sky-50">
			<div className="grid min-h-screen lg:grid-cols-2">
				{/* Left Side */}
				<section className="relative hidden overflow-hidden bg-sky-600 lg:flex">
					{/* Decorative shapes */}
					<div className="absolute -left-32 -top-32 size-96 rounded-full bg-sky-500/50" />
					<div className="absolute -bottom-40 -right-40 size-[32rem] rounded-full bg-sky-700/40" />
					<div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-3xl" />

					<div className="relative z-10 flex w-full flex-col p-10 xl:p-14">
						{/* Brand */}
						<div>
							<LoginBrand variant="dark" />
						</div>

						{/* Hero Content */}
						<div className="mt-24 max-w-xl">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-sky-50 backdrop-blur-sm">
								<span className="size-2 rounded-full bg-emerald-300" />
								Join DistrictFix today
							</div>

							<h1 className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
								Trusted home services,
								<span className="block text-sky-100">
									right in your district.
								</span>
							</h1>

							<p className="mt-6 max-w-lg text-base leading-7 text-sky-100 xl:text-lg">
								Create your DistrictFix account and connect with
								reliable professionals for plumbing and electrical
								services in your area.
							</p>

							<div className="mt-8 flex items-center gap-2 text-sm text-sky-100">
								<ShieldCheck className="size-5" />
								<span>Reliable professionals in your district</span>
							</div>

							{/* Services */}
							<div className="mt-10 flex flex-wrap gap-3">
								<ServiceCard
									icon={<Wrench className="size-5" />}
									title="Plumbing"
									description="Professional help"
								/>

								<ServiceCard
									icon={<ArrowRight className="size-5" />}
									title="Electrical"
									description="Expert assistance"
								/>
							</div>
						</div>
					</div>
				</section>

				{/* Right Side */}
				<section className="relative flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
					{/* Mobile background decoration */}
					<div className="pointer-events-none absolute right-0 top-0 size-72 rounded-full bg-sky-100/70 blur-3xl lg:hidden" />

					<div className="relative z-10 w-full max-w-md">
						{/* Mobile Brand */}
						<div className="mb-10 flex justify-center lg:hidden">
							<LoginBrand variant="light" />
						</div>

						{/* Back to Login */}
						<div className="mb-6">
							<Link
								href="/login"
								className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-sky-600"
							>
								<ArrowLeft className="size-4" />
								Back to login
							</Link>
						</div>

						{/* Heading */}
						<div className="mb-8">
							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Create your account...!
							</h2>

							<p className="mt-2 text-sm leading-6 text-slate-500">
								Join DistrictFix and get reliable home services
								from professionals in your district.
							</p>
						</div>

						{/* Register Form */}
						<RegisterForm />

						{/* Terms */}
						<p className="mt-10 text-center text-xs leading-5 text-slate-400">
							By creating an account, you agree to our{" "}
							<Link
								href="/terms-of-service"
								className="underline underline-offset-2 transition-colors hover:text-slate-600"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy-policy"
								className="underline underline-offset-2 transition-colors hover:text-slate-600"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</section>
			</div>
		</main>
	);
}