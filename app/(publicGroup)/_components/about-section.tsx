
import Link from "next/link";
import {
    ArrowUpRight,
    CheckCircle2,
    ShieldCheck,
    Users,
} from "lucide-react";
import Image from "next/image";

const benefits = [
    "District-based service coordination",
    "Dedicated plumbing and electrical support",
    "Organized service request management",
];

export function AboutSection() {
    return (
        <section
            id="about"
            className="overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    {/* Image */}
                    <div className="group relative isolate">
                        <div className="relative h-[320px] overflow-hidden rounded-2xl bg-slate-950 sm:h-[400px] lg:h-[460px]">
                            <Image
                                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85"
                                alt="Professional electrician working on an electrical installation"
                                fill
                                unoptimized
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw"
                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Black overlay */}
                            <div className="absolute inset-0 bg-black/45" />

                            {/* Dark gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30" />

                            {/* Blue lighting */}
                            <div className="pointer-events-none absolute -right-12 top-10 size-56 rounded-full bg-sky-500/30 blur-[80px]" />

                            <div className="pointer-events-none absolute bottom-16 left-10 size-40 rounded-full bg-blue-600/25 blur-[70px]" />

                            {/* Image label */}
                            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/15 bg-black/50 p-4 text-white backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-sky-500/20 text-sky-300">
                                        <ShieldCheck className="size-6" />
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            Service You Can Rely On
                                        </p>
                                        <p className="mt-1 text-sm text-slate-300">
                                            Your home, our priority
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <span className="h-0.5 w-8 bg-sky-600" />
                            <p className="text-sm font-bold uppercase tracking-[0.18em] text-sky-700">
                                About DistrictFix
                            </p>
                        </div>

                        <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-slate-950 sm:text-4xl lg:text-[42px]">
                            Home Services,
                            <span className="block text-sky-600">
                                Made Simple.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
                            DistrictFix makes it easier to request plumbing
                            and electrical services through a district-based
                            system that connects customers with an organized
                            service team.
                        </p>

                        <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                            From submitting a request to coordinating the
                            right professional, we aim to make home
                            maintenance more convenient and manageable.
                        </p>

                        {/* Benefits */}
                        <ul className="mt-6 space-y-3">
                            {benefits.map((benefit) => (
                                <li
                                    key={benefit}
                                    className="flex items-start gap-3 text-sm font-medium leading-6 text-slate-700 sm:text-base"
                                >
                                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-600" />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Bottom action */}
                        <div className="mt-8 flex flex-wrap items-center gap-5">
                            <Link
                                href="/about"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 text-sm font-semibold text-white transition hover:bg-sky-700"
                            >
                                Discover Our Story
                                <ArrowUpRight className="size-4" />
                            </Link>

                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Users className="size-5 text-sky-600" />
                                <span>Customer-focused approach</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}