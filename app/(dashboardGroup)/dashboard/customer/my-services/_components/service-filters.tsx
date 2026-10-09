"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

import type { ServiceType } from "@/types/service-request";

type ServiceFiltersProps = {
	searchTerm: string;
	serviceType?: ServiceType;
};

export default function ServiceFilters({
	searchTerm,
	serviceType,
}: ServiceFiltersProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [search, setSearch] = useState(searchTerm);

	const handleSubmit = (
		event: FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const params = new URLSearchParams(
			searchParams.toString(),
		);

		if (search.trim()) {
			params.set(
				"searchTerm",
				search.trim(),
			);
		} else {
			params.delete("searchTerm");
		}

		params.delete("page");

		router.push(
			`/dashboard/customer/my-services?${params.toString()}`,
		);
	};

	const handleServiceTypeChange = (
		value: string,
	) => {
		const params = new URLSearchParams(
			searchParams.toString(),
		);

		if (value === "ALL") {
			params.delete("serviceType");
		} else {
			params.set("serviceType", value);
		}

		params.delete("page");

		router.push(
			`/dashboard/customer/my-services?${params.toString()}`,
		);
	};

	const handleClear = () => {
		setSearch("");

		const params = new URLSearchParams(
			searchParams.toString(),
		);

		params.delete("searchTerm");
		params.delete("serviceType");
		params.delete("page");

		router.push(
			params.toString()
				? `/dashboard/customer/my-services?${params.toString()}`
				: "/dashboard/customer/my-services",
		);
	};

	const hasFilters =
		Boolean(searchTerm) || Boolean(serviceType);

	return (
		// <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
		// 	<form
		// 		onSubmit={handleSubmit}
		// 		className="flex flex-col gap-3 md:flex-row"
		// 	>
		// 		<div className="relative min-w-0 flex-1">
		// 			<Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

		// 			<input
		// 				type="text"
		// 				value={search}
		// 				onChange={(event) =>
		// 					setSearch(event.target.value)
		// 				}
		// 				placeholder="Search services..."
		// 				className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
		// 			/>
		// 		</div>

		// 		<div className="relative md:w-48">
		// 			<SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

		// 			<select
		// 				value={serviceType ?? "ALL"}
		// 				onChange={(event) =>
		// 					handleServiceTypeChange(
		// 						event.target.value,
		// 					)
		// 				}
		// 				className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm font-bold text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
		// 			>
		// 				<option value="ALL">
		// 					All Service Types
		// 				</option>

		// 				<option value="PLUMBING">
		// 					Plumbing
		// 				</option>

		// 				<option value="ELECTRICAL">
		// 					Electrical
		// 				</option>
		// 			</select>

		// 			<svg
		// 				className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
		// 				viewBox="0 0 20 20"
		// 				fill="currentColor"
		// 				aria-hidden="true"
		// 			>
		// 				<path
		// 					fillRule="evenodd"
		// 					d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z"
		// 					clipRule="evenodd"
		// 				/>
		// 			</svg>
		// 		</div>

		// 		<button
		// 			type="submit"
		// 			className="h-10 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700"
		// 		>
		// 			Search
		// 		</button>

		// 		{hasFilters && (
		// 			<button
		// 				type="button"
		// 				onClick={handleClear}
		// 				className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
		// 			>
		// 				<X className="size-4" />
		// 				Clear
		// 			</button>
		// 		)}
		// 	</form>
		// </div>

		<div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-3 md:flex-row"
			>
				<div className="relative min-w-0 flex-1 md:max-w-xl">
					<Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

					<input
						type="text"
						value={search}
						onChange={(event) =>
							setSearch(event.target.value)
						}
						placeholder="Search services..."
						className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
					/>
				</div>

				<div className="relative md:w-56 lg:w-64">
					<SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

					<select
						value={serviceType ?? "ALL"}
						onChange={(event) =>
							handleServiceTypeChange(event.target.value)
						}
						className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-9 text-sm font-bold text-slate-700 outline-none transition focus:border-sky-400 focus:bg-white focus:ring-2 focus:ring-sky-100"
					>
						<option value="ALL">
							All Service Types
						</option>

						<option value="PLUMBING">
							Plumbing
						</option>

						<option value="ELECTRICAL">
							Electrical
						</option>
					</select>

					<svg
						className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fillRule="evenodd"
							d="M5.23 7.21a.75.75 0 1 1 1.06-.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1-1.06-.02Z"
							clipRule="evenodd"
						/>
					</svg>
				</div>

				<button
					type="submit"
					className="h-10 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-700"
				>
					Search
				</button>

				{hasFilters && (
					<button
						type="button"
						onClick={handleClear}
						className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-4 text-sm font-medium text-red-600 transition hover:border-red-200 hover:bg-red-100 hover:text-red-700"
					>
						<X className="size-4" />
						Clear
					</button>
				)}
			</form>
		</div>
	);
}