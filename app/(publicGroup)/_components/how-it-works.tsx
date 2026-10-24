
import {
  ArrowRight,
  ClipboardList,
  MapPin,
  UserCheck,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Choose your district",
    description:
      "Select your district and provide your service address.",
    icon: MapPin,
  },
  {
    number: "02",
    title: "Submit a request",
    description:
      "Tell us what you need and submit your service request.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Get assigned a worker",
    description:
      "Your request can be managed by the responsible service holder.",
    icon: UserCheck,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-slate-50 py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0084D1]">
            How It Works
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Three steps to get started
          </h2>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
            A straightforward process to request home services
            through your district.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-16">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group relative rounded-2xl border-b-2 border-[#0084D1]/20 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#0084D1] hover:shadow-md dark:bg-slate-900"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-[#0084D1]/15 transition-colors group-hover:text-[#0084D1]/30">
                    {step.number}
                  </span>

                  <div className="flex size-12 items-center justify-center rounded-xl bg-[#0084D1]/10 text-[#0084D1] transition-colors group-hover:bg-[#0084D1] group-hover:text-white">
                    <Icon className="size-6" strokeWidth={1.8} />
                  </div>
                </div>

                <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <ArrowRight className="absolute -right-4 top-1/2 z-10 hidden size-8 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-1.5 text-[#0084D1] md:block dark:border-slate-700 dark:bg-slate-900" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
