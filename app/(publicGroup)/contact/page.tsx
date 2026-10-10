
import type { Metadata } from "next";
import Link from "next/link";
import {
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	ClipboardList,
	Mail,
	MapPin,
	MessageCircle,
	Send,
	ShieldCheck,
	Wrench,
} from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
	title: "Contact Us | DistrictFix",
	description:
		"Contact DistrictFix for help with home services, service requests, and account support.",
};

const contactTopics = [
	{
		icon: MessageCircle,
		title: "General inquiries",
		description:
			"Questions about DistrictFix or how our platform works.",
	},
	{
		icon: ClipboardList,
		title: "Service requests",
		description:
			"Help understanding or managing your home service request.",
	},
	{
		icon: ShieldCheck,
		title: "Account support",
		description:
			"Guidance with your account and using our platform.",
	},
];

export default function ContactPage() {
	return (
		<main className="flex-1 bg-white">
			{/* Hero */}
			<section className="relative isolate overflow-hidden bg-slate-950 px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="pointer-events-none absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-sky-500/15 blur-3xl" />
				<div className="pointer-events-none absolute -bottom-40 -left-24 -z-10 size-96 rounded-full bg-blue-500/10 blur-3xl" />

				<div className="mx-auto max-w-7xl">
					<div className="mx-auto max-w-3xl text-center">
						<div className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-sky-400/20 bg-sky-400/10 text-sky-300">
							<MessageCircle className="size-7" />
						</div>

						<p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-sky-400">
							Contact DistrictFix
						</p>

						<h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
							We&apos;re here to{" "}
							<span className="text-sky-400">help you.</span>
						</h1>

						<p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
							Have a question about home services or need help
							with your request? Get in touch and let us know
							how we can help.
						</p>

						<div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-300">
							<span className="inline-flex items-center gap-2">
								<CheckCircle2 className="size-4 text-sky-400" />
								District-based support
							</span>
							<span className="inline-flex items-center gap-2">
								<CheckCircle2 className="size-4 text-sky-400" />
								Simple service requests
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Contact content */}
			<section className="bg-slate-50 px-5 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
				<div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
					{/* Information */}
					<div>
						<p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
							Get in touch
						</p>

						<h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
							How can we help?
						</h2>

						<p className="mt-4 text-base leading-8 text-slate-600">
							Choose the topic that best matches your question.
							We want to make getting home services simpler
							for you.
						</p>

						<div className="mt-9 space-y-7">
							{contactTopics.map((topic) => {
								const Icon = topic.icon;

								return (
									<div
										key={topic.title}
										className="group flex gap-4"
									>
										<div className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-sky-100 bg-white text-sky-700 shadow-sm transition-colors group-hover:bg-sky-50">
											<Icon className="size-5" />
										</div>

										<div>
											<h3 className="font-bold text-slate-900">
												{topic.title}
											</h3>
											<p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">
												{topic.description}
											</p>
										</div>
									</div>
								);
							})}
						</div>

						<Card className="mt-9 gap-0 rounded-2xl border-sky-100 bg-sky-50/80 py-0 shadow-none">
							<CardContent className="p-5 sm:p-6">
								<div className="flex items-start gap-3">
									<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-700 shadow-sm">
										<MapPin className="size-5" />
									</div>

									<div>
										<h3 className="font-bold text-slate-900">
											Across Bangladesh
										</h3>
										<p className="mt-2 text-sm leading-7 text-slate-600">
											Discover district-based home service
											support through the DistrictFix
											platform.
										</p>
									</div>
								</div>

								<Button
									variant="link"
									className="mt-3 h-auto px-0 font-bold text-sky-700 hover:text-sky-900"
									 
									>
									<Link
										href="/services"
										className="inline-flex items-center gap-2"
									>
										Explore our services
										<ArrowUpRight className="size-4" />
									</Link>
								</Button>
							</CardContent>
						</Card>
					</div>

					{/* Contact form */}
					<Card className="gap-0 rounded-2xl border-slate-200 bg-white py-0 shadow-sm shadow-slate-200/50">
						<CardHeader className="px-5 pt-6 sm:px-8 sm:pt-9">
							<div className="flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700">
								<Mail className="size-6" />
							</div>

							<CardTitle className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
								Send us a message
							</CardTitle>

							<CardDescription className="text-sm leading-7 text-slate-600 sm:text-base">
								Fill out the form and tell us what you need
								help with.
							</CardDescription>
						</CardHeader>

						<CardContent className="px-5 pb-6 sm:px-8 sm:pb-9">
							<form
								action="/contact"
								method="get"
								className="mt-5 space-y-5"
							>
								<div className="grid gap-5 sm:grid-cols-2">
									<div className="space-y-2">
										<Label htmlFor="name">
											Full name
										</Label>
										<Input
											id="name"
											name="name"
											type="text"
											placeholder="Enter your full name"
											autoComplete="name"
											required
											className="h-12 rounded-xl border-slate-200 bg-slate-50/70 focus-visible:ring-sky-500"
										/>
									</div>

									<div className="space-y-2">
										<Label htmlFor="email">
											Email address
										</Label>
										<Input
											id="email"
											name="email"
											type="email"
											placeholder="you@example.com"
											autoComplete="email"
											required
											className="h-12 rounded-xl border-slate-200 bg-slate-50/70 focus-visible:ring-sky-500"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<Label htmlFor="subject">
										Subject
									</Label>

									<Select name="subject" required>
										<SelectTrigger
											id="subject"
											className="h-12 w-full rounded-xl border-slate-200 bg-slate-50/70 focus:ring-sky-500"
										>
											<SelectValue placeholder="Select a topic" />
										</SelectTrigger>

										<SelectContent>
											<SelectItem value="general">
												General inquiry
											</SelectItem>
											<SelectItem value="service-request">
												Service request
											</SelectItem>
											<SelectItem value="account-support">
												Account support
											</SelectItem>
											<SelectItem value="feedback">
												Feedback or suggestion
											</SelectItem>
											<SelectItem value="other">
												Other
											</SelectItem>
										</SelectContent>
									</Select>
								</div>

								<div className="space-y-2">
									<Label htmlFor="message">
										Message
									</Label>

									<Textarea
										id="message"
										name="message"
										placeholder="Tell us how we can help..."
										required
										minLength={10}
										rows={6}
										className="min-h-36 resize-y rounded-xl border-slate-200 bg-slate-50/70 leading-7 focus-visible:ring-sky-500"
									/>

									<p className="text-xs leading-6 text-slate-500">
										Please include enough detail to help
										us understand your question.
									</p>
								</div>

								<Button
									type="submit"
									className="h-12 w-full rounded-xl bg-sky-600 font-bold text-white shadow-lg shadow-sky-600/15 transition-all hover:-translate-y-0.5 hover:bg-sky-700 sm:w-auto"
								>
									Send message
									<Send className="size-4" />
								</Button>

								<p className="text-xs leading-6 text-slate-500">
									Message delivery must be connected to the
									DistrictFix backend before this form can
									send messages.
								</p>
							</form>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Bottom CTA */}
			<section className="bg-white px-5 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8">
				<div className="mx-auto max-w-7xl">
					<div className="relative isolate overflow-hidden rounded-3xl bg-sky-700 px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
						<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-600 via-sky-700 to-blue-900" />
						<div className="pointer-events-none absolute -right-16 -top-24 -z-10 size-64 rounded-full border border-white/10" />

						<div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
							<div className="max-w-2xl">
								<div className="flex items-center gap-2 text-sm font-bold text-sky-100">
									<Wrench className="size-4" />
									DistrictFix
								</div>

								<h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
									Need a home service?
								</h2>

								<p className="mt-3 text-sm leading-7 text-sky-100 sm:text-base">
									Explore our services and get started with
									your next home service request.
								</p>
							</div>

							<Link
								href="/services"
								className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-sky-800 shadow-lg transition-colors hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-sky-700"
							>
								Explore services
								<ArrowRight className="size-4" />
							</Link>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
