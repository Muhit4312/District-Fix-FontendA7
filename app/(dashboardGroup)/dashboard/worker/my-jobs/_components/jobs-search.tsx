
"use client";

import { Search } from "lucide-react";

interface JobsSearchProps {
	value: string;
	onChange: (value: string) => void;
}

export default function JobsSearch({
	value,
	onChange,
}: JobsSearchProps) {
	return (
		<div className="relative min-w-0 flex-1">
			<Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />

			<input
				type="search"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder="Search jobs..."
				aria-label="Search jobs"
				className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-10 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-100 sm:text-sm"
			/>
		</div>
	);
}