
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function ServicesCta() {
	return (
		<section className="bg-white px-5 py-14 sm:px-6 sm:py-16 lg:px-8">
			<div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-sky-700 px-6 py-9 sm:px-10 sm:py-11 lg:px-12">
				<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-600 via-sky-700 to-blue-900" />
				<div className="pointer-events-none absolute -right-12 -top-20 -z-10 size-56 rounded-full border border-white/10" />

				<div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div className="max-w-xl">
						<div className="flex items-center gap-2 text-sm font-semibold text-sky-100">
							<MessageCircle className="size-4" />
							Need some help?
						</div>

						<h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
							Not sure which service you need?
						</h2>

						<p className="mt-3 text-sm leading-7 text-sky-100 sm:text-base">
							Get in touch with us if you have questions
							about using DistrictFix.
						</p>
					</div>

					<Link
						href="/contact"
						className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-800 transition-colors hover:bg-sky-50"
					>
						Contact us
						<ArrowRight className="size-4" />
					</Link>
				</div>
			</div>
		</section>
	);
}
