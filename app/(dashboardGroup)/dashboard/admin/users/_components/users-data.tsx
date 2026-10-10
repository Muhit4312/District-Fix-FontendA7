
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle, Users } from "lucide-react";
import { getUsers } from "../_actions/users.action";
import type {
	AdminUser,
	UsersMeta,
	UsersQuery,
} from "../_types/users.types";
import UsersSearchFilter from "./users-search-filter";
import UsersTable from "./users-table";
import UsersPagination from "./users-pagination";

interface UsersDataProps {
	initialUsers: AdminUser[];
	initialMeta: UsersMeta;
	initialQuery: UsersQuery;
}

export default function UsersData({
	initialUsers,
	initialMeta,
	initialQuery,
}: UsersDataProps) {
	const [users, setUsers] = useState(initialUsers);
	const [meta, setMeta] = useState(initialMeta);
	const [query, setQuery] = useState(initialQuery);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const requestId = useRef(0);
	const initialRender = useRef(true);

	const handleQueryChange = useCallback((nextQuery: UsersQuery) => {
		setQuery(nextQuery);
	}, []);

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}

		const currentRequest = ++requestId.current;

		async function loadData() {
			setLoading(true);
			setError("");

			const result = await getUsers(query);

			if (currentRequest !== requestId.current) return;

			if (result.error) {
				setError(result.error);
			} else {
				setUsers(result.users);
				setMeta(result.meta);
			}

			setLoading(false);
		}

		void loadData();

		return () => {
			requestId.current++;
		};
	}, [query]);

	return (
		<div className="space-y-6">
			<UsersSearchFilter
				query={query}
				onQueryChange={handleQueryChange}
			/>

			<div className="space-y-4">
				<div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
					<div className="space-y-1.5">
						<div className="flex items-center gap-2">
							<Users className="size-5 text-sky-600 dark:text-sky-400" />
							<h2 className="text-xl font-bold tracking-tight">
								All Users
							</h2>
						</div>
						<p className="text-sm text-muted-foreground">
							Review user profiles, manage account permissions, and monitor user status.
						</p>
					</div>

					<p className="text-sm font-medium text-muted-foreground">
						<span className="font-bold tabular-nums text-sky-600 dark:text-sky-400">
							{meta.total}
						</span>{" "}
						{meta.total === 1 ? "user" : "users"} found
					</p>
				</div>

				<div className="relative min-h-24">
					{loading && (
						<div className="absolute inset-0 z-10 flex items-start justify-center bg-background/60 pt-8 backdrop-blur-[1px]">
							<div className="flex items-center gap-2 rounded-md bg-background px-3 py-2 text-sm text-muted-foreground shadow-sm">
								<LoaderCircle className="size-4 animate-spin text-sky-600" />
								Loading users...
							</div>
						</div>
					)}

					{error ? (
						<div className="rounded-lg border border-red-200 p-4 text-sm text-red-600">
							{error}
							<button
								type="button"
								onClick={() => setQuery({ ...query })}
								className="ml-3 font-semibold underline"
							>
								Retry
							</button>
						</div>
					) : (
						<UsersTable users={users} />
					)}
				</div>

				<UsersPagination
					meta={meta}
					query={query}
					onPageChange={(page) =>
						setQuery((current) => ({ ...current, page }))
					}
				/>
			</div>
		</div>
	);
}
