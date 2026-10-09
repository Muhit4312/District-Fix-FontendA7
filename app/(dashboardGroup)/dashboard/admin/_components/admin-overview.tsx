import { getMe } from "@/service/getMe";
import AdminActions from "./admin-actions";
import WelcomeCard from "./admin-welcome";
import ApplicationsOverview from "./applications-overview";
import PendingApplications from "./pending-applications";




export default async function AdminOverview() {
	const result = await getMe();
    
	const user = result.data

	return (
		<div className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
			<WelcomeCard />

			<AdminActions role={user.role} />

			<PendingApplications />
		</div>
	);
}