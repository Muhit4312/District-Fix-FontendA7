import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

export default function WelcomeCard() {
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-sky-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="absolute -right-12 -top-16 -z-10 size-56 rounded-full bg-sky-50" />

      <div className="inline-flex items-center gap-2 rounded-full border border-sky-100 bg-sky-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700">
        <ShieldCheck className="size-4" />
        DistrictFix Management Center
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Welcome back, Administrator!
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
        Manage your service network, review Service Holder
        applications, and keep district-based home services
        running smoothly.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/dashboard/admin/service-holders/applications"
          className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
        >
          <ClipboardCheck className="size-4" />
          Review Applications
          <ArrowRight className="size-4" />
        </Link>

        <Link
          href="/dashboard/admin/users"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
        >
          <Users className="size-4" />
          Manage Users
        </Link>
      </div>
    </section>
  );
}