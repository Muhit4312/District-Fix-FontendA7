
import {
  ClipboardCheck,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";

const benefits = [
  {
    title: "District-based management",
    description:
      "Service requests are organized according to the customer's district.",
    icon: MapPinned,
  },
  {
    title: "Organized requests",
    description:
      "Keep track of your requests and follow their progress.",
    icon: ClipboardCheck,
  },
  {
    title: "Dedicated service workers",
    description:
      "Requests can be assigned to plumbers and electricians.",
    icon: Users,
  },
  {
    title: "A clear process",
    description:
      "Follow a structured workflow from request submission to completion.",
    icon: ShieldCheck,
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 transition-colors duration-300 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:gap-12 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0084D1]">
            Why DistrictFix
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            A better way to manage home services
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
            Getting home repairs should not be complicated.
            DistrictFix brings customers, service holders, and
            service workers into one organized system.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0084D1]/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[#0084D1]/50 sm:p-6"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-[#0084D1]/10 text-[#0084D1] transition-colors duration-300 group-hover:bg-[#0084D1] group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.8} />
                </div>

                <h3 className="mt-4 font-semibold leading-6 text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
