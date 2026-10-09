import {
	BriefcaseBusiness,
	Building2,
	ClipboardList,
	CreditCard,
	FileCheck2,
	LayoutDashboard,
	MapPin,
	PlusCircle,
	Settings,
	ShieldCheck,
	Star,
	Users,
	Wrench,
} from "lucide-react";

export const sideMenuItems = {
	CUSTOMER: [
		{
			title: "Overview",
			href: "/dashboard/customer",
			icon: LayoutDashboard,
		},
		{
			title: "My Services",
			href: "/dashboard/customer/my-services",
			icon: ClipboardList,
		},
		{
			title: "Create Service",
			href: "/dashboard/customer/create-service",
			icon: PlusCircle,
		},
		{
			title: "Payments",
			href: "/dashboard/customer/payment",
			icon: CreditCard,
		},
		// {
		// 	title: "Reviews",
		// 	href: "/dashboard/customer/reviews",
		// 	icon: Star,
		// },
	],

	PLUMBER: [
		{
			title: "Overview",
			href: "/dashboard/worker",
			icon: LayoutDashboard,
		},
		{
			title: "My Jobs",
			href: "/dashboard/worker/my-jobs",
			icon: BriefcaseBusiness,
		},
		{
			title: "Active Jobs",
			href: "/dashboard/worker/active",
			icon: Wrench,
		},
		{
			title: "Completed Jobs",
			href: "/dashboard/worker/completed",
			icon: FileCheck2,
		},
	],

	ELECTRICIAN: [
		{
			title: "Overview",
			href: "/dashboard/worker",
			icon: LayoutDashboard,
		},
		{
			title: "My Jobs",
			href: "/dashboard/worker/my-jobs",
			icon: BriefcaseBusiness,
		},
		{
			title: "Active Jobs",
			href: "/dashboard/worker/active",
			icon: Wrench,
		},
		{
			title: "Completed Jobs",
			href: "/dashboard/worker/completed",
			icon: FileCheck2,
		},
	],

	SERVICE_HOLDER: [
		{
			title: "Overview",
			href: "/dashboard/service-holder",
			icon: LayoutDashboard,
		},
		{
			title: "Service Requests",
			href: "/dashboard/service-holder/requests",
			icon: ClipboardList,
		},
		{
			title: "Assignments",
			href: "/dashboard/service-holder/assignments",
			icon: FileCheck2,
		},
		{
			title: "Workers",
			href: "/dashboard/service-holder/workers",
			icon: Users,
		},
	],

	ADMIN: [
		{
			title: "Overview",
			href: "/dashboard/admin",
			icon: LayoutDashboard,
		},
		{
			title: "Users",
			href: "/dashboard/admin/users",
			icon: Users,
		},
		{
			title: "Districts",
			href: "/dashboard/admin/districts",
			icon: MapPin,
		},
		{
			title: "Service Holders",
			href: "/dashboard/admin/service-holders",
			icon: Building2,
		},
		{
			title: "Service Holders Applications",
			href: "/dashboard/admin/service-holders/applications",
			icon: FileCheck2,
		},
		
	],

	SUPER_ADMIN: [
		{
			title: "Overview",
			href: "/dashboard/admin",
			icon: LayoutDashboard,
		},
		{
			title: "Users",
			href: "/dashboard/admin/users",
			icon: Users,
		},
		{
			title: "Districts",
			href: "/dashboard/admin/districts",
			icon: MapPin,
		},
		{
			title: "Service Holders",
			href: "/dashboard/admin/service-holders",
			icon: Building2,
		},
		{
			title: "Service Holders Applications",
			href: "/dashboard/admin/service-holders/applications",
			icon: FileCheck2,
		},
		{
			title: "Admin Management",
			href: "/dashboard/admin/admins",
			icon: ShieldCheck,
		},
	],
} as const;

export const roleLabel = {
	CUSTOMER: "Customer",
	PLUMBER: "Plumber",
	ELECTRICIAN: "Electrician",
	SERVICE_HOLDER: "Service Holder",
	ADMIN: "Admin",
	SUPER_ADMIN: "Super Admin",
} as const;