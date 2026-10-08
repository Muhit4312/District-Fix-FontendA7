import Link from "next/link";
import {
	ChevronLeft,
	ChevronRight,
} from "lucide-react";

type ServicePaginationProps = {
	currentPage: number;
	totalPages: number;
	searchTerm?: string;
	status?: string;
	serviceType?: string;
};

function createPageNumbers(
	currentPage: number,
	totalPages: number,
) {
	const pages: (number | "...")[] = [];

	if (totalPages <= 5) {
		for (let page = 1; page <= totalPages; page++) {
			pages.push(page);
		}

		return pages;
	}

	pages.push(1);

	if (currentPage > 3) {
		pages.push("...");
	}

	const start = Math.max(2, currentPage - 1);
	const end = Math.min(
		totalPages - 1,
		currentPage + 1,
	);

	for (let page = start; page <= end; page++) {
		pages.push(page);
	}

	if (currentPage < totalPages - 2) {
		pages.push("...");
	}

	pages.push(totalPages);

	return pages;
}

export default function ServicePagination({
	currentPage,
	totalPages,
	searchTerm,
	status,
	serviceType,
}: ServicePaginationProps) {
	const pages = createPageNumbers(
		currentPage,
		totalPages,
	);

	const createHref = (page: number) => {
		const params = new URLSearchParams();

		if (page > 1) {
			params.set("page", page.toString());
		}

		if (searchTerm) {
			params.set("searchTerm", searchTerm);
		}

		if (status) {
			params.set("status", status);
		}

		if (serviceType) {
			params.set("serviceType", serviceType);
		}

		return `/dashboard/customer/my-services${
			params.toString()
				? `?${params.toString()}`
				: ""
		}`;
	};

	return (
		<div className="flex items-center justify-center gap-1 pt-2">
			{currentPage > 1 ? (
				<Link
					href={createHref(currentPage - 1)}
					className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
					aria-label="Previous page"
				>
					<ChevronLeft className="size-4" />
				</Link>
			) : (
				<span className="flex size-9 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-300">
					<ChevronLeft className="size-4" />
				</span>
			)}

			{pages.map((page, index) =>
				page === "..." ? (
					<span
						key={`ellipsis-${index}`}
						className="flex size-9 items-center justify-center text-sm text-slate-400"
					>
						...
					</span>
				) : (
					<Link
						key={page}
						href={createHref(page)}
						className={`flex size-9 items-center justify-center rounded-lg text-sm font-medium transition ${
							page === currentPage
								? "bg-sky-600 text-white shadow-sm"
								: "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
						}`}
					>
						{page}
					</Link>
				),
			)}

			{currentPage < totalPages ? (
				<Link
					href={createHref(currentPage + 1)}
					className="flex size-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
					aria-label="Next page"
				>
					<ChevronRight className="size-4" />
				</Link>
			) : (
				<span className="flex size-9 items-center justify-center rounded-lg border border-slate-100 bg-slate-50 text-slate-300">
					<ChevronRight className="size-4" />
				</span>
			)}
		</div>
	);
}