
import Link from "next/link";
import { ArrowRight, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeCta() {
	return (
		<section className="px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
			<div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-sky-700 px-6 py-12 sm:px-12 sm:py-16">
				<div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
					<div className="max-w-2xl">
						<div className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-white">
							<Wrench className="size-6" />
						</div>

						<h2 className="mt-5 text-3xl font-bold text-white sm:text-4xl">
							Need help with your home?
						</h2>
						<p className="mt-4 leading-7 text-sky-100">
							Get started with DistrictFix and submit your home
							service request today.
						</p>
					</div>

					<div className="flex shrink-0 flex-col gap-3 sm:flex-row">
						<Button
							size="lg"
							className="bg-white text-sky-800 hover:bg-sky-50"
						>
							<Link href="/login" className="inline-flex items-center">
								Get Started
								<ArrowRight className="ml-2 size-4" />
							</Link>
						</Button>

						<Button
							size="lg"
							variant="outline"
							className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
						>
							<Link href="/contact">Contact Us</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
