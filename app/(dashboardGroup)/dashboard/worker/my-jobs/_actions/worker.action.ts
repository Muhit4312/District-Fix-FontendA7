
"use server";

import { cookies } from "next/headers";
import type {
	GetMyAssignedServicesParams,
	JobsMeta,
	JobsResult,
	WorkerAssignedServicesResponse,
} from "@/types/worker";

const emptyMeta: JobsMeta = {
	page: 1,
	limit: 10,
	total: 0,
	totalPages: 0,
};

export async function getMyAssignedServices(
	params: GetMyAssignedServicesParams = {},
): Promise<JobsResult> {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("accessToken")?.value;

		if (!accessToken) {
			return {
				success: false,
				message: "Please log in to view your jobs.",
				data: [],
				meta: emptyMeta,
			};
		}

		const baseUrl = process.env.BACKEND_API_URL;

		if (!baseUrl) {
			throw new Error("BACKEND_API_URL is not configured.");
		}

		const searchParams = new URLSearchParams();

		searchParams.set("page", String(params.page ?? 1));
		searchParams.set("limit", String(params.limit ?? 10));
		searchParams.set("sortBy", params.sortBy ?? "createdAt");
		searchParams.set("sortOrder", params.sortOrder ?? "desc");

		if (params.status) {
			searchParams.set("status", params.status);
		}

		if (params.searchTerm?.trim()) {
			searchParams.set("searchTerm", params.searchTerm.trim());
		}

		if (params.serviceType) {
			searchParams.set("serviceType", params.serviceType);
		}

		const response = await fetch(
			`${baseUrl}/api/v1/worker/assigned-services?${searchParams.toString()}`,
			{
				method: "GET",
				headers: {
					Cookie: `accessToken=${accessToken}`,
					Authorization: `Bearer ${accessToken}`,
				},
				cache: "no-store",
			},
		);

		const result: WorkerAssignedServicesResponse = await response.json();

		if (!response.ok || !result.success) {
			return {
				success: false,
				message: result.message || "Failed to load your jobs.",
				data: [],
				meta: emptyMeta,
			};
		}

		return {
			success: true,
			message: result.message,
			data: result.data.data ?? [],
			meta: {
				page: Number(result.data.meta?.page ?? params.page ?? 1),
				limit: Number(result.data.meta?.limit ?? params.limit ?? 10),
				total: Number(result.data.meta?.total ?? 0),
				totalPages: Number(result.data.meta?.totalPages ?? 0),
			},
		};
	} catch (error) {
		

		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Something went wrong while loading jobs.",
			data: [],
			meta: emptyMeta,
		};
	}
}