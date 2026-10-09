
interface JobsPaginationProps {
	page: number;
	meta: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
	loading: boolean;
	onPageChange: (page: number) => void;
}

export default function JobsPagination({
	page,
	meta,
	loading,
	onPageChange,
}: JobsPaginationProps) {
	if (meta.totalPages <= 1) {
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-5 sm:flex-row">
			<p className="text-sm text-slate-500">
				Page {meta.page} of {meta.totalPages} · {meta.total} jobs
			</p>

			<div className="flex items-center gap-2">
				<button
					type="button"
					disabled={page <= 1 || loading}
					onClick={() => onPageChange(page - 1)}
					className="min-h-10 rounded-xl border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Previous
				</button>

				<button
					type="button"
					disabled={page >= meta.totalPages || loading}
					onClick={() => onPageChange(page + 1)}
					className="min-h-10 rounded-xl bg-sky-600 px-4 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Next
				</button>
			</div>
		</div>
	);
}