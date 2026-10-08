import { getMe } from "@/service/getMe";

import { getOverviewServices } from "../_actions/customer-service.action";

import PendingServices from "./pending-services";
import ServiceStatistics from "./service-statistics";
import WelcomeCard from "./welcome-card";

export default async function CustomerOverview() {
	const [
		userResponse,
		allServicesResponse,
		pendingResponse,
		inProgressResponse,
		completedResponse,
	] = await Promise.all([
		getMe(),

		getOverviewServices({
			limit: 1,
		}),

		getOverviewServices({
			status: "PENDING",
			limit: 3,
		}),

		getOverviewServices({
			status: "IN_PROGRESS",
			limit: 1,
		}),

		getOverviewServices({
			status: "COMPLETED",
			limit: 1,
		}),
	]);

	const user = userResponse?.data;

	const statistics = {
		all: allServicesResponse?.data?.meta.total ?? 0,
		pending: pendingResponse?.data?.meta.total ?? 0,
		inProgress:
			inProgressResponse?.data?.meta.total ?? 0,
		completed:
			completedResponse?.data?.meta.total ?? 0,
	};

	const pendingServices =
		pendingResponse?.data?.data ?? [];

	return (
		<div className="space-y-6">
			<WelcomeCard
				name={user?.name ?? "Customer"}
			/>

			<ServiceStatistics
				statistics={statistics}
			/>

			<PendingServices
				services={pendingServices}
			/>
		</div>
	);
}