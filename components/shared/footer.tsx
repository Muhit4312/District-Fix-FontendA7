import Link from "next/link";
import {
	ArrowUpRight,
	Mail,
	MapPin,
	Wrench,
	Zap,
} from "lucide-react";

const exploreLinks = [
	{ label: "Home", href: "/" },
	{ label: "About Us", href: "/about" },
	{ label: "Our Services", href: "/services" },
	{ label: "Contact Us", href: "/contact" },
];

const serviceLinks = [
	{ label: "Plumbing Services", href: "/services", icon: Wrench },
	{ label: "Electrical Services", href: "/services", icon: Zap },
];

const legalLinks = [
	{ label: "Privacy Policy", href: "/privacy-policy" },
	{ label: "Terms of Service", href: "/terms-of-service" },
];

export function Footer() {
	return (
		<footer className="relative overflow-hidden bg-slate-950 text-slate-200">
			{/* Background decoration */}
			<div className="pointer-events-none absolute -right-32 -top-40 size-96 rounded-full bg-sky-500/10 blur-3xl" />

			<div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
				{/* Main footer */}
				<div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
					{/* Brand */}
					<div className="lg:col-span-4">
						<Link
							href="/"
							className="group inline-flex items-center gap-3"
						>
							<div className="flex size-12 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-lg shadow-sky-500/20 transition-transform duration-300 group-hover:-rotate-3">
								<Wrench className="size-6" />
							</div>

							<div>
								<p className="text-2xl font-extrabold tracking-tight text-white">
									District
									<span className="text-sky-400">Fix</span>
								</p>

								<p className="mt-1 text-sm font-medium tracking-wide text-slate-300">
									Your local home service partner
								</p>
							</div>
						</Link>

						<p className="mt-6 max-w-sm text-base leading-8 text-slate-300">
							Making home services simpler and more accessible.
							Connect with the right plumbing and electrical
							support through your district.
						</p>

						<Link
							href="/services"
							className="mt-6 inline-flex items-center gap-2 text-base font-bold text-sky-400 transition-colors hover:text-sky-300"
						>
							Explore our services
							<ArrowUpRight className="size-5" />
						</Link>
					</div>

					{/* Explore */}
					<div className="lg:col-span-2">
						<h3 className="text-base font-extrabold tracking-wide text-white">
							Explore
						</h3>

						<div className="mt-6 h-0.5 w-9 rounded-full bg-sky-500" />

						<ul className="mt-5 space-y-4">
							{exploreLinks.map((link) => (
								<li key={link.label}>
									<Link
										href={link.href}
										className="inline-flex items-center text-base font-medium text-slate-300 transition-all duration-200 hover:translate-x-1 hover:text-white"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services */}
					<div className="lg:col-span-3">
						<h3 className="text-base font-extrabold tracking-wide text-white">
							Our Services
						</h3>

						<div className="mt-6 h-0.5 w-9 rounded-full bg-sky-500" />

						<ul className="mt-5 space-y-4">
							{serviceLinks.map((service) => {
								const Icon = service.icon;

								return (
									<li key={service.label}>
										<Link
											href={service.href}
											className="group inline-flex items-center gap-3 text-base font-medium text-slate-300 transition-colors hover:text-white"
										>
											<Icon className="size-5 shrink-0 text-sky-400 transition-transform group-hover:scale-110" />
											{service.label}
										</Link>
									</li>
								);
							})}
						</ul>

						<Link
							href="/login"
							className="mt-7 inline-flex items-center gap-2 rounded-lg border border-sky-400/25 bg-sky-400/10 px-4 py-3 text-base font-bold text-sky-300 transition-colors hover:border-sky-400/40 hover:bg-sky-400/15 hover:text-sky-200"
						>
							Request a service
							<ArrowUpRight className="size-5" />
						</Link>
					</div>

					{/* Contact */}
					<div className="lg:col-span-3">
						<h3 className="text-base font-extrabold tracking-wide text-white">
							Get in Touch
						</h3>

						<div className="mt-6 h-0.5 w-9 rounded-full bg-sky-500" />

						<p className="mt-5 text-base leading-8 text-slate-300">
							Have questions about getting started? Visit our
							contact page and let us know how we can help.
						</p>

						<Link
							href="/contact"
							className="group mt-5 flex items-center gap-3"
						>
							<span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sky-400 transition-colors group-hover:border-sky-400/30 group-hover:bg-sky-400/10">
								<Mail className="size-5" />
							</span>

							<span>
								<span className="block text-sm font-medium text-slate-400">
									Contact & support
								</span>

								<span className="mt-1 block text-base font-bold text-slate-100 transition-colors group-hover:text-white">
									Get in touch
								</span>
							</span>

							<ArrowUpRight className="ml-auto size-5 shrink-0 text-slate-400 transition-colors group-hover:text-sky-400" />
						</Link>

						<div className="mt-5 flex items-start gap-3">
							<MapPin className="mt-1 size-5 shrink-0 text-sky-400" />

							<p className="text-base leading-7 text-slate-300">
								District-based home services across Bangladesh
							</p>
						</div>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="flex flex-col gap-4 border-t border-white/15 py-6 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-center text-sm leading-6 text-slate-300 sm:text-left sm:text-base">
						© {new Date().getFullYear()}{" "}
						<span className="font-bold text-white">
							DistrictFix
						</span>
						. All rights reserved.
					</p>

					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:justify-end">
						{legalLinks.map((link) => (
							<Link
								key={link.label}
								href={link.href}
								className="text-sm font-medium text-slate-300 transition-colors hover:text-white sm:text-base"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			</div>
		</footer>
	);
}