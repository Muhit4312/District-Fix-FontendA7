
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface ApplicationsFiltersProps {
	searchTerm: string;
	status: string;
}

export default function ApplicationsFilters({
	searchTerm,
	status,
}: ApplicationsFiltersProps) {
	const router = useRouter();

	const [search, setSearch] = useState(searchTerm);
	const [selectedStatus, setSelectedStatus] = useState(status);

	function handleStatusChange(value: string) {
		setSelectedStatus(value);

		const params = new URLSearchParams();

		if (search.trim()) {
			params.set("searchTerm", search.trim());
		}

		if (value !== "ALL") {
			params.set("status", value);
		}

		params.set("page", "1");

		router.push(
			`/dashboard/admin/service-holders/applications?${params.toString()}`,
		);
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const params = new URLSearchParams();

		if (search.trim()) {
			params.set("searchTerm", search.trim());
		}

		if (selectedStatus !== "ALL") {
			params.set("status", selectedStatus);
		}

		params.set("page", "1");

		router.push(
			`/dashboard/admin/service-holders/applications?${params.toString()}`,
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col gap-3 sm:flex-row"
		>
			<div className="relative min-w-0 flex-1">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

				<input
					type="search"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search name or email..."
					className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
				/>
			</div>

			<div className="relative w-full sm:w-56">
				<select
					value={selectedStatus}
					onChange={(e) => handleStatusChange(e.target.value)}
					className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-3 pr-10 text-sm text-slate-700 outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
				>
					<option value="ALL">All statuses</option>
					<option value="PENDING">Pending</option>
					<option value="APPROVED">Approved</option>
					<option value="REJECTED">Rejected</option>
				</select>

				<ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-slate-500" />
			</div>

			<button
				type="submit"
				className="h-11 shrink-0 rounded-xl bg-sky-600 px-5 text-sm font-semibold text-white hover:bg-sky-700"
			>
				Search
			</button>
		</form>
	);
}

