
"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { UsersQuery } from "../_types/users.types";

interface UsersSearchFilterProps {
	query: UsersQuery;
	onQueryChange: (query: UsersQuery) => void;
}

export default function UsersSearchFilter({
	query,
	onQueryChange,
}: UsersSearchFilterProps) {
	const [searchTerm, setSearchTerm] = useState(query.searchTerm ?? "");

	useEffect(() => {
		setSearchTerm(query.searchTerm ?? "");
	}, [query.searchTerm]);

	useEffect(() => {
		const currentSearchTerm = query.searchTerm ?? "";

		if (searchTerm === currentSearchTerm) {
			return;
		}

		const timer = setTimeout(() => {
			onQueryChange({
				...query,
				page: 1,
				searchTerm,
			});
		}, 350);

		return () => clearTimeout(timer);
	}, [searchTerm, query, onQueryChange]);

	function updateFilter(
		key: "role" | "status" | "sortOrder",
		value: string,
	) {
		onQueryChange({
			...query,
			page: 1,
			[key]: value,
		});
	}

	function clearFilters() {
		setSearchTerm("");

		onQueryChange({
			...query,
			page: 1,
			limit: query.limit ?? 10,
			searchTerm: "",
			role: "ALL",
			status: "ALL",
			sortOrder: "desc",
		});
	}

	const hasActiveFilters =
		Boolean(searchTerm) ||
		(query.role ?? "ALL") !== "ALL" ||
		(query.status ?? "ALL") !== "ALL" ||
		(query.sortOrder ?? "desc") !== "desc";

	return (
		<section className="rounded-xl border border-border/70 bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5">
			{/* Header */}
			<div className="mb-5 flex items-center justify-between gap-3">
				<div className="flex min-w-0 items-center gap-3">
					<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 dark:bg-sky-950/50 dark:text-sky-400 dark:ring-sky-900">
						<SlidersHorizontal className="size-[18px]" />
					</div>

					<div className="min-w-0">
						<h2 className="font-semibold tracking-tight text-foreground">
							Search and filters
						</h2>

						<p className="mt-0.5 text-xs text-muted-foreground">
							Quickly find and organize users
						</p>
					</div>
				</div>

				{hasActiveFilters && (
					<span className="hidden shrink-0 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 sm:inline-flex dark:bg-sky-950/60 dark:text-sky-300">
						Filters active
					</span>
				)}
			</div>

			{/* Search and filters */}
			<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-6">
				{/* Search input */}
				<div className="group relative min-w-0 sm:col-span-2 xl:col-span-3">
					<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground transition-all duration-300 group-focus-within:scale-110 group-focus-within:text-sky-600 dark:group-focus-within:text-sky-400" />

					<input
						type="search"
						value={searchTerm}
						onChange={(event) => setSearchTerm(event.target.value)}
						placeholder="Search by name or email..."
						aria-label="Search users by name or email"
						className="h-11 w-full min-w-0 rounded-lg border border-border/80 bg-background pl-10 pr-10 text-sm shadow-sm outline-none transition-all duration-300 placeholder:text-muted-foreground/70 hover:border-sky-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:shadow-md focus:shadow-sky-500/5 dark:hover:border-sky-800"
					/>

					{searchTerm && (
						<button
							type="button"
							onClick={() => setSearchTerm("")}
							aria-label="Clear search"
							className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
						>
							<X className="size-3.5" />
						</button>
					)}
				</div>

				{/* Role filter */}
				<Select
					value={query.role ?? "ALL"}
					onValueChange={(value) => updateFilter("role", value)}
				>
					<SelectTrigger className="h-11 w-full min-w-0 rounded-lg border-border/80 bg-background text-sm shadow-sm transition-all duration-200 hover:border-sky-300 data-[state=open]:border-sky-500 data-[state=open]:ring-4 data-[state=open]:ring-sky-500/10 dark:hover:border-sky-800">
						<SelectValue placeholder="All roles" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="ALL">All roles</SelectItem>
						<SelectItem value="CUSTOMER">Customer</SelectItem>
						<SelectItem value="PLUMBER">Plumber</SelectItem>
						<SelectItem value="ELECTRICIAN">Electrician</SelectItem>
						<SelectItem value="SERVICE_HOLDER">
							Service Holder
						</SelectItem>
						<SelectItem value="ADMIN">Admin</SelectItem>
						<SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
					</SelectContent>
				</Select>

				{/* Status filter */}
				<Select
					value={query.status ?? "ALL"}
					onValueChange={(value) => updateFilter("status", value)}
				>
					<SelectTrigger className="h-11 w-full min-w-0 rounded-lg border-border/80 bg-background text-sm shadow-sm transition-all duration-200 hover:border-sky-300 data-[state=open]:border-sky-500 data-[state=open]:ring-4 data-[state=open]:ring-sky-500/10 dark:hover:border-sky-800">
						<SelectValue placeholder="All statuses" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="ALL">All statuses</SelectItem>
						<SelectItem value="ACTIVE">Active</SelectItem>
						<SelectItem value="BLOCKED">Blocked</SelectItem>
						<SelectItem value="SUSPENDED">Suspended</SelectItem>
					</SelectContent>
				</Select>

				{/* Sort order */}
				<Select
					value={query.sortOrder ?? "desc"}
					onValueChange={(value) => updateFilter("sortOrder", value)}
				>
					<SelectTrigger className="h-11 w-full min-w-0 rounded-lg border-border/80 bg-background text-sm shadow-sm transition-all duration-200 hover:border-sky-300 data-[state=open]:border-sky-500 data-[state=open]:ring-4 data-[state=open]:ring-sky-500/10 dark:hover:border-sky-800">
						<SelectValue placeholder="Sort order" />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="desc">Newest first</SelectItem>
						<SelectItem value="asc">Oldest first</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Footer */}
			<div className="mt-4 flex flex-col gap-3 border-t border-border/60 pt-4 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-xs leading-5 text-muted-foreground">
					Search updates automatically as you type.
				</p>

				<button
					type="button"
					onClick={clearFilters}
					disabled={!hasActiveFilters}
					className="inline-flex h-9 items-center justify-center gap-2 self-start rounded-lg border border-border bg-background px-3.5 text-sm font-medium transition-all duration-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 sm:self-auto dark:hover:border-sky-800 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
				>
					<X className="size-3.5" />
					Clear filters
				</button>
			</div>
		</section>
	);
}
