
"use client";

import { Wrench, Zap } from "lucide-react";
import type { WorkerType } from "../_types/worker-application";

interface WorkerTypeSelectorProps {
	value: WorkerType;
	onChange: (value: WorkerType) => void;
	disabled?: boolean;
}

const workerTypes: {
	value: WorkerType;
	title: string;
	description: string;
	icon: typeof Wrench;
}[] = [
	{
		value: "PLUMBER",
		title: "Plumber",
		description: "Water pipes, taps, fittings and plumbing repairs.",
		icon: Wrench,
	},
	{
		value: "ELECTRICIAN",
		title: "Electrician",
		description: "Electrical wiring, switches and electrical repairs.",
		icon: Zap,
	},
];

export function WorkerTypeSelector({
	value,
	onChange,
	disabled = false,
}: WorkerTypeSelectorProps) {
	return (
		<div className="grid gap-4 sm:grid-cols-2">
			{workerTypes.map((worker) => {
				const Icon = worker.icon;
				const selected = value === worker.value;

				return (
					<button
						key={worker.value}
						type="button"
						disabled={disabled}
						onClick={() => onChange(worker.value)}
						aria-pressed={selected}
						className={`flex items-start gap-4 rounded-xl border-2 p-5 text-left transition ${
							selected
								? "border-sky-500 bg-sky-50 ring-2 ring-sky-100"
								: "border-slate-200 bg-white hover:border-sky-300 hover:bg-slate-50"
						} disabled:cursor-not-allowed disabled:opacity-60`}
					>
						<span
							className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
								selected
									? "bg-sky-600 text-white"
									: "bg-slate-100 text-slate-600"
							}`}
						>
							<Icon className="size-6" />
						</span>

						<span className="flex-1">
							<span className="flex items-center justify-between gap-2 font-semibold text-slate-900">
								{worker.title}

								{selected && (
									<span className="text-xs font-semibold text-sky-700">
										Selected
									</span>
								)}
							</span>

							<span className="mt-1 block text-sm leading-5 text-slate-500">
								{worker.description}
							</span>
						</span>
					</button>
				);
			})}
		</div>
	);
}
