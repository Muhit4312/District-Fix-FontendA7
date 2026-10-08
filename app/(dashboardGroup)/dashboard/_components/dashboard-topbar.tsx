"use client";

import {
	Bell,
	ChevronDown,
} from "lucide-react";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@/components/ui/avatar";

import {
	SidebarTrigger,
} from "@/components/ui/sidebar";

type DashboardTopbarProps = {
	user: {
		name: string;
		email: string;
		imageUrl?: string | null;
	};
};

export default function DashboardTopbar({
	user,
}: DashboardTopbarProps) {
	const initials = user.name
		.split(" ")
		.map((name) => name.charAt(0))
		.slice(0, 2)
		.join("")
		.toUpperCase();

	return (
		<header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white/95 px-4 backdrop-blur sm:px-6">
			<div className="flex items-center gap-3">
				<SidebarTrigger />

				<div className="h-6 w-px bg-slate-200" />

				<div>
					<h2 className="text-sm font-semibold text-slate-900 sm:text-base">
						Dashboard
					</h2>

					<p className="hidden text-xs text-slate-500 sm:block">
						Manage your DistrictFix services
					</p>
				</div>
			</div>

			<div className="flex items-center gap-2 sm:gap-4">
				<button
					type="button"
					className="relative flex size-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
				>
					<Bell className="size-5" />

					<span className="absolute right-2 top-2 size-1.5 rounded-full bg-sky-600" />
				</button>

				<div className="hidden h-7 w-px bg-slate-200 sm:block" />

				<div className="flex items-center gap-2">
					<Avatar className="size-9 border border-slate-200">
						<AvatarImage
							src={user.imageUrl ?? ""}
							alt={user.name}
						/>

						<AvatarFallback className="bg-sky-100 font-semibold text-sky-700">
							{initials}
						</AvatarFallback>
					</Avatar>

					<div className="hidden min-w-0 md:block">
						<p className="max-w-32 truncate text-sm font-semibold text-slate-800">
							{user.name}
						</p>

						<p className="max-w-40 truncate text-xs text-slate-500">
							{user.email}
						</p>
					</div>

					<ChevronDown className="hidden size-4 text-slate-400 md:block" />
				</div>
			</div>
		</header>
	);
}
