
"use client";

import { SlidersHorizontal } from "lucide-react";
import type { ServiceType } from "@/types/service-request";

interface JobsFiltersProps {
	value: ServiceType | "";
	onChange: (value: ServiceType | "") => void;
}

export default function JobsFilters({
	value,
	onChange,
}: JobsFiltersProps) {
	return (
		<div className="relative sm:w-52">
			<SlidersHorizontal className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />

			<select
				value={value}
				onChange={(event) => {
					const nextValue = event.target.value;

					if (
						nextValue === "" ||
						nextValue === "PLUMBING" ||
						nextValue === "ELECTRICAL"
					) {
						onChange(nextValue);
					}
				}}
				aria-label="Filter by service type"
				className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pr-3 pl-10 text-base text-slate-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-sm"
			>
				<option value="">All service types</option>
				<option value="PLUMBING">Plumbing</option>
				<option value="ELECTRICAL">Electrical</option>
			</select>
		</div>
	);
}