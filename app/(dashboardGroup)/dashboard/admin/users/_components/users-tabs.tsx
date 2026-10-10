import {
	Activity,
	ShieldCheck,
	Users,
	UserRoundCheck,
} from "lucide-react";
import type { AdminUser } from "../_types/users.types";

interface UsersTabsProps {
	users: AdminUser[];
	total: number;
}

export default function UsersTabs({ users, total }: UsersTabsProps) {
	const active = users.filter((user) => user.status === "ACTIVE").length;
	const blocked = users.filter((user) => user.status === "BLOCKED").length;
	const staff = users.filter(
		(user) =>
			user.role === "ADMIN" ||
			user.role === "SUPER_ADMIN" ||
			user.role === "SERVICE_HOLDER",
	).length;

	const items = [
		{
			label: "Total users",
			value: total,
			icon: Users,
			color: "text-sky-700",
			bg: "bg-sky-100",
		},
		{
			label: "Active on this page",
			value: active,
			icon: UserRoundCheck,
			color: "text-emerald-700",
			bg: "bg-emerald-100",
		},
		{
			label: "Blocked on this page",
			value: blocked,
			icon: ShieldCheck,
			color: "text-red-700",
			bg: "bg-red-100",
		},
		{
			label: "Admin / service holders",
			value: staff,
			icon: Activity,
			color: "text-violet-700",
			bg: "bg-violet-100",
		},
	];

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{items.map((item) => {
				const Icon = item.icon;

				return (
					<div
						key={item.label}
						className="rounded-xl border bg-card p-5 shadow-sm"
					>
						<div className="flex items-center justify-between">
							<p className="text-sm text-muted-foreground">{item.label}</p>
							<div
								className={`flex size-10 items-center justify-center rounded-lg ${item.bg} ${item.color}`}
							>
								<Icon className="size-5" />
							</div>
						</div>

						<p className="mt-3 text-2xl font-bold">{item.value}</p>
					</div>
				);
			})}
		</div>
	);
}