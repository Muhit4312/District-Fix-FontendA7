"use server";

import { cookies } from "next/headers";

export interface Application {
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
	data: Application[];
	meta?: {
		page?: number;
		limit?: number;
		total?: number;
		totalPage?: number;
	};
}

interface ApplicationFilters {
	page?: number;
	limit?: number;
	searchTerm?: string;
	status?: string;
}

export async function getApplications(
	filters: ApplicationFilters = {},
): Promise<ApplicationsResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;
	const baseUrl = process.env.BACKEND_API_URL;
	

	if (!accessToken) {
		throw new Error("Please log in to continue.");
	}

	if (!baseUrl) {
		throw new Error("Backend API URL is not configured.");
	}

	const params = new URLSearchParams({
		page: String(filters.page ?? 1),
		limit: String(filters.limit ?? 10),
	});

	if (filters.searchTerm?.trim()) {
		params.set("searchTerm", filters.searchTerm.trim());
	}

	if (filters.status && filters.status !== "ALL") {
		params.set("status", filters.status);
	}

	

	const response = await fetch(
		`${baseUrl}/api/v1/admin/service-holder-applications?${params.toString()}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: ApplicationsResponse = await response.json();

	if (!response.ok || !result.success) {
		throw new Error(result.message || "Failed to fetch applications.");
	}

	return result;
}