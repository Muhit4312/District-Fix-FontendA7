
import Link from "next/link";
import {
	ArrowUpRight,
	Building2,
	FileCheck2,
	MapPin,
	ShieldCheck,
	Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface AdminActionsProps {
	role: "ADMIN" | "SUPER_ADMIN";
}

interface AdminAction {
	title: string;
	href: string;
	icon: LucideIcon;
	color: string;
	iconBg: string;
}

const basePath = "/dashboard/admin";

const adminActions: AdminAction[] = [
	{
		title: "Applications",
		href: `${basePath}/service-holders/applications`,
		icon: FileCheck2,
		color: "text-sky-700",
		iconBg: "bg-sky-100",
	},
	{
		title: "Users",
		href: `${basePath}/users`,
		icon: Users,
		color: "text-violet-700",
		iconBg: "bg-violet-100",
	},
	{
		title: "Districts",
		href: `${basePath}/districts`,
		icon: MapPin,
		color: "text-emerald-700",
		iconBg: "bg-emerald-100",
	},
	{
		title: "Service Holders",
		href: `${basePath}/service-holders`,
		icon: Building2,
		color: "text-amber-700",
		iconBg: "bg-amber-100",
	},
];

export default function AdminActions({ role }: AdminActionsProps) {
	const actions: AdminAction[] =
		role === "SUPER_ADMIN"
			? [
					...adminActions,
					{
						title: "Admin Management",
						href: `${basePath}/admins`,
						icon: ShieldCheck,
						color: "text-rose-700",
						iconBg: "bg-rose-100",
					},
				]
			: adminActions;

	return (
		<section className="space-y-5">
			<div className="flex items-end justify-between">
				<div>
					<p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
						Workspace
					</p>
					<h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
						Quick Access
					</h2>
				</div>

				<span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500">
					{actions.length} sections
				</span>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{actions.map((action) => {
					const Icon = action.icon;

					return (
						<Link
							key={action.title}
							href={action.href}
							className="group relative flex min-h-32 items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-900/5"
						>
							<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 to-blue-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

							<div
								className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${action.iconBg} ${action.color} transition-transform duration-300 group-hover:scale-110`}
							>
								<Icon className="size-5" strokeWidth={2} />
							</div>

							<div className="min-w-0 flex-1">
								<h3 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-sky-700">
									{action.title}
								</h3>
								<p className="mt-1.5 text-xs text-slate-400">
									Manage section
								</p>
							</div>

							<div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-all duration-300 group-hover:bg-sky-600 group-hover:text-white">
								<ArrowUpRight className="size-4" />
							</div>
						</Link>
					);
				})}
			</div>
		</section>
	);
}