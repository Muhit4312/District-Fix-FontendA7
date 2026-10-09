import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileSearch,
  MapPin,
  RefreshCw,
  UserRound,
} from "lucide-react";
import { getOverviewApplications } from "../_actions/get-overview-applications";


const statusStyles: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-600/20",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  REJECTED: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default async function AdminApplications() {
  const result = await getOverviewApplications();
  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <FileSearch className="size-5" />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              Service Holder Applications
            </h2>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Review recently submitted applications.
          </p>
        </div>

        <Link
          href="/dashboard/admin/service-holders/applications"
          className="inline-flex items-center gap-2 self-start text-sm font-semibold text-sky-700 transition hover:text-sky-800 sm:self-auto"
        >
          Manage all
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {!result.success ? (
        <div className="p-8 text-center">
          <RefreshCw className="mx-auto size-7 text-slate-400" />

          <p className="mt-3 font-medium text-slate-800">
            Applications could not be loaded
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {result.message}
          </p>

          <Link
            href="/dashboard/admin/service-holders/applications"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
          >
            Open applications page
            <ArrowRight className="size-4" />
          </Link>
        </div>
      ) : result.data.length === 0 ? (
        <div className="px-5 py-12 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <FileSearch className="size-6" />
          </div>

          <h3 className="mt-4 font-semibold text-slate-900">
            No applications yet
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            New Service Holder applications will appear here.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100">
          {result.data.map((application) => {
            const status = application.status.toUpperCase();
            const badgeStyle =
              statusStyles[status] ??
              "bg-slate-100 text-slate-600 ring-slate-500/10";

            return (
              <article
                key={application.id}
                className="p-5 transition hover:bg-slate-50/70 sm:px-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-700">
                      <UserRound className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-slate-900">
                        {application.user?.name || "Unnamed applicant"}
                      </h3>

                      <p className="mt-1 truncate text-sm text-slate-500">
                        {application.user?.email || "No email provided"}
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="size-3.5" />
                          {application.district?.name ||
                            "District not specified"}
                        </span>

                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="size-3.5" />
                          {formatDate(application.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-between gap-3 sm:justify-end">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${badgeStyle}`}
                    >
                      {status.replaceAll("_", " ")}
                    </span>

                    <Link
                      href="/dashboard/admin/service-holders/applications"
                      aria-label={`Review application from ${application.user?.name || "applicant"}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-sky-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
                    >
                      Review
                      <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}