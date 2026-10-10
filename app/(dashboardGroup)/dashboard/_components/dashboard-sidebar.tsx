"use client";

import {
	Home,
	LogOut,
	Settings,
	User,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
	roleLabel,
	sideMenuItems,
} from "../_config/sidebar-menu-items";
import { logout } from "@/service/logout";

type UserRole =
	| "CUSTOMER"
	| "PLUMBER"
	| "ELECTRICIAN"
	| "SERVICE_HOLDER"
	| "ADMIN"
	| "SUPER_ADMIN";

type DashboardUser = {
	name: string;
	email: string;
	role: UserRole;
	imageUrl?: string | null;
};

type DashboardSidebarProps = {
	user: DashboardUser;
};

export default function DashboardSidebar({
	user,
}: DashboardSidebarProps) {
	const pathname = usePathname();
	const router = useRouter();

	const items = sideMenuItems[user.role];

	const handleNavigation = (href: string) => {
		router.push(href);
	};

	const handleLogout = async () => {
		try {
			await logout();
			router.replace("/login");
			router.refresh();
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	return (
		<Sidebar className="top-16 h-[calc(100vh-4rem)] border-r">
			<SidebarHeader className="border-b">
				<div className="flex items-center gap-3 px-2 py-4">
					{/* <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white shadow-sm">
						<Home className="size-5" />
					</div> */}

					<div className="min-w-0">
						<h1 className="truncate text-lg font-bold text-slate-900">
							DistrictFix
						</h1>

						<p className="truncate text-xs text-slate-500">
							{roleLabel[user.role]} Dashboard
						</p>
					</div>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						{roleLabel[user.role]} Panel
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => {
								const Icon = item.icon;

								const isActive =
									pathname === item.href ||
									pathname.startsWith(`${item.href}/`);

								return (
									<SidebarMenuItem key={item.href}>
										<SidebarMenuButton
											isActive={isActive}
											tooltip={item.title}
											onClick={() =>
												handleNavigation(item.href)
											}
										>
											<Icon className="size-4" />

											<span>{item.title}</span>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>
						Account
					</SidebarGroupLabel>

					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									tooltip="Settings"
									onClick={() =>
										router.push(
											"/dashboard/settings",
										)
									}
								>
									<Settings className="size-4" />

									<span>Settings</span>
								</SidebarMenuButton>
								<SidebarMenuButton
									tooltip="Profile"
									onClick={() =>
										router.push(
											"/dashboard/profile",
										)
									}
								>
									<User className="size-4" />

									<span>Profile</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-t">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Logout"
							onClick={() => handleLogout()}
						>
							<LogOut className="size-4" />

							<span>Logout</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}