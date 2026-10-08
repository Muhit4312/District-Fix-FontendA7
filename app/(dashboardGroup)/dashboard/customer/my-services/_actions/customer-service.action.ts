"use server";

import { cookies } from "next/headers";

import type {
	ServiceRequestResponse,
	ServiceRequestStatus,
	ServiceType,
} from "@/types/service-request";

interface GetMyServicesParams {
	page?: number;
	limit?: number;
	searchTerm?: string;
	status?: ServiceRequestStatus;
	serviceType?: ServiceType;
	sortBy?: "createdAt" | "serviceName";
	sortOrder?: "asc" | "desc";
}

export async function getMyServices(
	params: GetMyServicesParams = {},
): Promise<ServiceRequestResponse> {
	const searchParams = new URLSearchParams();

	if (params.page) {
		searchParams.set("page", params.page.toString());
	}

	if (params.limit) {
		searchParams.set("limit", params.limit.toString());
	}

	if (params.searchTerm) {
		searchParams.set("searchTerm", params.searchTerm);
	}

	if (params.status) {
		searchParams.set("status", params.status);
	}

	if (params.serviceType) {
		searchParams.set("serviceType", params.serviceType);
	}

	if (params.sortBy) {
		searchParams.set("sortBy", params.sortBy);
	}

	if (params.sortOrder) {
		searchParams.set("sortOrder", params.sortOrder);
	}

	const cookieStore = await cookies();

	const accessToken =
		cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/service-requests/my?${searchParams.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: ServiceRequestResponse =
		await res.json();

	if (!res.ok) {
		throw new Error(
			result?.message ||
				"Failed to fetch your services",
		);
	}

	return result;
}