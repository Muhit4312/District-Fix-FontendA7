
"use client";

import type { UsersMeta, UsersQuery } from "../_types/users.types";

interface UsersPaginationProps {
	meta: UsersMeta;
	query: UsersQuery;
	onPageChange: (page: number) => void;
}

export default function UsersPagination({
	meta,
	onPageChange,
}: UsersPaginationProps) {
	const currentPage = meta.page;
	const totalPages = meta.totalPages;

	const start =
		meta.total === 0 ? 0 : (currentPage - 1) * meta.limit + 1;

	const end = Math.min(currentPage * meta.limit, meta.total);

	return (
		<div className="flex flex-col gap-4 border-t border-border/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
			<p className="text-sm text-muted-foreground">
				Showing{" "}
				<span className="font-semibold text-foreground">{start}</span>
				{"–"}
				<span className="font-semibold text-foreground">{end}</span> of{" "}
				<span className="font-semibold text-foreground">{meta.total}</span>{" "}
				users
			</p>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage <= 1}
					className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm font-medium transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 disabled:pointer-events-none disabled:opacity-40 dark:hover:border-sky-800 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
				>
					Previous
				</button>

				<span className="min-w-24 text-center text-sm text-muted-foreground">
					Page{" "}
					<span className="font-semibold text-foreground">
						{currentPage}
					</span>{" "}
					of {Math.max(totalPages, 1)}
				</span>

				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage >= totalPages || totalPages === 0}
					className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm font-medium transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 disabled:pointer-events-none disabled:opacity-40 dark:hover:border-sky-800 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
				>
					Next
				</button>
			</div>
		</div>
	);
}
