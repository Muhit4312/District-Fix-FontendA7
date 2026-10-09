"use server";

import { cookies } from "next/headers";

export interface OverviewApplication {
	id: string;
	status: string;
	createdAt: string;
	user?: {
		name?: string;
		email?: string;
	};
	district?: {
		name?: string;
	};
}

interface ApplicationsResponse {
	success: boolean;
	message: string;
	data: OverviewApplication[];
	meta?: {
		page?: number;
		limit?: number;
		total?: number;
		totalPage?: number;
	};
}

export async function getOverviewApplications(): Promise<ApplicationsResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	if (!accessToken) {
		throw new Error("Please log in to continue.");
	}

	const baseUrl = process.env.BACKEND_API_URL;

	if (!baseUrl) {
		throw new Error("Backend API URL is not configured.");
	}

	const searchParams = new URLSearchParams({
		page: "1",
		limit: "5",
	});

	const response = await fetch(
		`${baseUrl}/api/v1/admin/service-holder-applications?${searchParams.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: ApplicationsResponse = await response.json();

	if (!response.ok) {
		throw new Error(
			result?.message || "Failed to fetch applications.",
		);
	}

	return result;
}