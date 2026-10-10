
import Link from "next/link";
import { ArrowUpRight, Mail, UserRound } from "lucide-react";

import type { AdminUser } from "../_types/users.types";
import UserStatusAction from "./user-status-action";

interface UsersTableProps {
	users: AdminUser[];
}

function getStatusClass(status: AdminUser["status"]) {
	switch (status) {
		case "ACTIVE":
			return "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-950/40 dark:text-emerald-400";
		case "BLOCKED":
			return "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-950/40 dark:text-red-400";
		case "SUSPENDED":
			return "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-950/40 dark:text-amber-400";
		default:
			return "bg-muted text-muted-foreground ring-border";
	}
}

function getRoleClass(role: AdminUser["role"]) {
	switch (role) {
		case "SUPER_ADMIN":
		case "ADMIN":
			return "bg-violet-50 text-violet-700 dark:bg-violet-950/40 dark:text-violet-400";
		case "SERVICE_HOLDER":
			return "bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400";
		case "PLUMBER":
		case "ELECTRICIAN":
			return "bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-400";
		default:
			return "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-400";
	}
}

export default function UsersTable({ users }: UsersTableProps) {
	if (users.length === 0) {
		return (
			<div className="rounded-xl border border-border/80 bg-card px-4 py-14 text-center shadow-sm">
				<div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/50 dark:text-sky-400">
					<UserRound className="size-6" />
				</div>

				<h3 className="mt-4 font-semibold tracking-tight">
					No users found
				</h3>

				<p className="mt-1 text-sm text-muted-foreground">
					Try changing your search term or filters.
				</p>
			</div>
		);
	}

	return (
		<div className="w-full min-w-0 max-w-full overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm">
			<div className="w-full min-w-0 overflow-x-auto">
				<table className="w-full min-w-[800px] text-left text-sm">
					<thead className="border-b border-border/80 bg-sky-50/80 dark:bg-sky-950/30">
						<tr>
							<th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200">
								User
							</th>
							<th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200">
								Role
							</th>
							<th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200">
								Status
							</th>
							<th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-sky-900 dark:text-sky-200">
								Actions
							</th>
						</tr>
					</thead>

					<tbody className="divide-y divide-border/60">
						{users.map((user) => (
							<tr
								key={user.id}
								className="transition-colors hover:bg-sky-50/50 dark:hover:bg-sky-950/20"
							>
								<td className="px-5 py-4">
									<div className="flex items-center gap-3">
										{user.imageUrl ? (
											<img
												src={user.imageUrl}
												alt={user.name || "User avatar"}
												className="size-10 shrink-0 rounded-full border border-border object-cover"
											/>
										) : (
											<div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-sky-100 bg-sky-50 text-sm font-bold text-sky-700 dark:border-sky-900 dark:bg-sky-950/50 dark:text-sky-400">
												{user.name?.trim().charAt(0).toUpperCase() || "U"}
											</div>
										)}

										<div className="min-w-0">
											<p className="max-w-[220px] truncate font-semibold text-foreground">
												{user.name}
											</p>

											<p className="mt-1 flex max-w-[250px] items-center gap-1.5 truncate text-xs text-muted-foreground">
												<Mail className="size-3 shrink-0" />
												<span className="truncate">{user.email}</span>
											</p>
										</div>
									</div>
								</td>

								<td className="px-5 py-4">
									<span
										className={`inline-flex whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-semibold ${getRoleClass(user.role)}`}
									>
										{user.role.replaceAll("_", " ")}
									</span>
								</td>

								<td className="px-5 py-4">
									<span
										className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-semibold ring-1 ring-inset ${getStatusClass(user.status)}`}
									>
										<span className="size-1.5 rounded-full bg-current" />
										{user.status}
									</span>
								</td>

								<td className="px-5 py-4">
									<div className="flex items-center justify-end gap-2">
										<Link
											href={`/dashboard/admin/users/${user.id}`}
											className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-background px-3 text-xs font-semibold transition-colors hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 dark:hover:border-sky-800 dark:hover:bg-sky-950/50 dark:hover:text-sky-400"
										>
											View
											<ArrowUpRight className="size-3.5" />
										</Link>

										<UserStatusAction user={user} />
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
