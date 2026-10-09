"use server";

import { cookies } from "next/headers";

import type {
	ServiceRequestResponse,
	ServiceRequestStatus,
} from "@/types/service-request";

interface GetOverviewServicesParams {
	status?: ServiceRequestStatus;
	limit?: number;
}

export async function getOverviewServices(
	params: GetOverviewServicesParams = {},
): Promise<ServiceRequestResponse> {
	const searchParams = new URLSearchParams();

	if (params.status) {
		searchParams.set("status", params.status);
	}

	if (params.limit) {
		searchParams.set(
			"limit",
			params.limit.toString(),
		);
	}

	const cookieStore = await cookies();

	const accessToken =
		cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/service-requests/my?${searchParams.toString()}`,
		{
			method: "GET",
			headers: {
				Cookie: `accessToken=${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: ServiceRequestResponse =
		await res.json();

	

	if (!res.ok) {
		throw new Error(
			result?.message ||
			"Failed to fetch overview services",
		);
	}

	return result;
}