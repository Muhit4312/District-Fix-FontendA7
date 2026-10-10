
import { AlertCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getUsers } from "./_actions/users.action";
import UsersHeader from "./_components/users-header";
import UsersData from "./_components/users-data";
import UsersTabs from "./_components/users-tabs";
import type { UsersQuery } from "./_types/users.types";

interface PageProps {
	searchParams: Promise<Record<string, string | string[] | undefined>>;
}

function getSingleValue(value: string | string[] | undefined) {
	return Array.isArray(value) ? value[0] : value;
}

export default async function AdminUsersPage({
	searchParams,
}: PageProps) {
	const params = await searchParams;

	const rawPage = Number(getSingleValue(params.page) ?? "1");
	const rawLimit = Number(getSingleValue(params.limit) ?? "10");

	const page = Number.isFinite(rawPage)
		? Math.max(1, Math.floor(rawPage))
		: 1;

	const limit = [10, 20, 50].includes(rawLimit) ? rawLimit : 10;

	const role = getSingleValue(params.role) ?? "ALL";
	const status = getSingleValue(params.status) ?? "ALL";
	const sortValue = getSingleValue(params.sortOrder);
	const sortOrder = sortValue === "asc" ? "asc" : "desc";

	const query: UsersQuery = {
		page,
		limit,
		searchTerm: getSingleValue(params.searchTerm)?.trim() ?? "",
		role,
		status,
		sortOrder,
	};

	const result = await getUsers(query);

	return (
		<div className="space-y-6 p-4 sm:p-6 lg:p-8">
			<UsersHeader />

			{result.error ? (
				<div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-800">
					<div className="flex items-start gap-3">
						<AlertCircle className="mt-0.5 size-5 shrink-0" />

						<div className="flex-1">
							<h2 className="font-semibold">Unable to load users</h2>

							<p className="mt-1 text-sm">{result.error}</p>

							<p className="mt-2 text-xs text-red-700/80">
								Check your API URL, login session, and backend response.
							</p>
						</div>

						<Link
							href="/dashboard/admin/users"
							className="inline-flex items-center gap-1 rounded-md border border-red-200 px-3 py-2 text-sm hover:bg-red-100"
						>
							<RefreshCw className="size-3.5" />
							Retry
						</Link>
					</div>
				</div>
			) : (
				<>
					<UsersTabs
						users={result.users}
						total={result.meta.total}
					/>

					<UsersData
						initialUsers={result.users}
						initialMeta={result.meta}
						initialQuery={query}
					/>
				</>
			)}
		</div>
	);
}
