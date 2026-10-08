import { Header } from "@/components/shared/navbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getMe } from "@/service/getMe";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardTopbar from "./dashboard-topbar";


export default async function DashboardContent({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getMe();

	return (
		<div className="min-h-screen bg-slate-50">
			{/* Public Navbar */}
			<Header user={user} />

			{/* Dashboard Area */}
			<SidebarProvider>
				<DashboardSidebar user={user.data} />

				<SidebarInset>
					<DashboardTopbar user={user.data} />

					<main className="min-h-[calc(100vh-8rem)] w-full overflow-x-hidden p-4 sm:p-5 md:p-6 lg:p-8">
						<div className="mx-auto w-full max-w-7xl">
							{children}
						</div>
					</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	);
}