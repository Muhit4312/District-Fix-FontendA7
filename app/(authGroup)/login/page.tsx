import Link from "next/link";
import { ArrowRight, ShieldCheck, Wrench } from "lucide-react";


import { LoginForm } from "../_components/login-form";
import { LoginBrand } from "../_components/login-brand";
import { ServiceCard } from "../_components/service-card";

export default function LoginPage() {
	return (
		<main className="min-h-screen bg-sky-50">
			<div className="grid min-h-screen lg:grid-cols-2">
				{/* Left Side */}
				<section className="relative hidden overflow-hidden bg-sky-600 lg:flex">
					{/* Decorative shapes */}
					<div className="absolute -left-32 -top-32 size-96 rounded-full bg-sky-500/50" />
					<div className="absolute -bottom-40 -right-40 size-[32rem] rounded-full bg-sky-700/40" />
					<div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-3xl" />

					<div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
						{/* Brand */}
						<LoginBrand variant="dark" />

						{/* Hero Content */}
						<div className="max-w-xl">
							<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-sky-50 backdrop-blur-sm">
								<span className="size-2 rounded-full bg-emerald-300" />
								Trusted local services
							</div>

							<h1 className="text-3xl font-bold leading-tight tracking-tight text-white xl:text-4xl">
								Your trusted home service,
								<span className="block text-sky-100">
									right in your district.
								</span>
							</h1>

							<p className="mt-6 max-w-lg text-base leading-7 text-sky-100 xl:text-lg">
								Connect with reliable professionals for plumbing and
								electrical services. Request a service, track progress,
								and get your problem solved easily.
							</p>

							<div className="mt-8 flex items-center gap-2 text-sm text-sky-100">
								<ShieldCheck className="size-5" />
								<span>Reliable professionals in your district</span>
							</div>
						</div>

						{/* Services */}
						<div className="flex flex-wrap gap-3">
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

						{/* Heading */}
						<div className="mb-8">
							{/* <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-sky-100">
								<Wrench className="size-6 text-sky-600" />
							</div> */}

							<h2 className="text-3xl font-bold tracking-tight text-slate-900">
								Welcome back...!
							</h2>

							<p className="mt-2 text-sm leading-6 text-slate-500">
								Sign in to your DistrictFix account to manage your
								home services.
							</p>
						</div>

						{/* Login Form */}
						<LoginForm />

						{/* Register */}
						<p className="mt-8 text-center text-sm text-slate-500">
							Don't have an account?{" "}
							<Link
								href="/register"
								className="font-semibold text-sky-600 transition-colors hover:text-sky-700 hover:underline"
							>
								Create an account
							</Link>
						</p>

						{/* Terms */}
						<p className="mt-10 text-center text-xs leading-5 text-slate-400">
							By continuing, you agree to our{" "}
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