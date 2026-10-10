
"use server";

import { cookies } from "next/headers";
import { ActionResult, CreateWorkerApplicationPayload, DistrictOption, WorkerApplication } from "../_types/worker-application";

const API_URL = process.env.BACKEND_API_URL;

interface ApiResponse<T> {
	success: boolean;
	statusCode?: number;
	message: string;
	data: T;
	meta?: {
		page: number;
		limit: number;
		total: number;
		totalPages: number;
	};
}

async function getAuthHeaders(): Promise<HeadersInit> {
	const cookieStore = await cookies();

	const accessToken =
		cookieStore.get("accessToken")?.value ??
		cookieStore.get("access_token")?.value;

	if (!accessToken) {
		throw new Error("Please log in to continue.");
	}

	return {
		Authorization: `Bearer ${accessToken}`,
		"Content-Type": "application/json",
	};
}

async function parseResponse<T>(
	response: Response,
): Promise<ApiResponse<T>> {
	const result = (await response.json()) as ApiResponse<T>;

	if (!response.ok || !result.success) {
		throw new Error(
			result.message || "Something went wrong.",
		);
	}

	return result;
}

export async function getMyWorkerApplications(): Promise<
	ActionResult<WorkerApplication[]>
> {
	try {
		if (!API_URL) {
			throw new Error("Backend API URL is not configured.");
		}

		const response = await fetch(
			`${API_URL}/api/v1/worker-applications/my-applications`,
			{
				method: "GET",
				headers: await getAuthHeaders(),
				cache: "no-store",
			},
		);

		const result =
			await parseResponse<WorkerApplication[]>(response);

		return {
			success: true,
			message: result.message,
			data: result.data,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to load applications.",
			data: [],
		};
	}
}

export async function getActiveDistricts(): Promise<
	ActionResult<DistrictOption[]>
> {
	try {
		if (!API_URL) {
			throw new Error("Backend API URL is not configured.");
		}

		const response = await fetch(
			`${API_URL}/api/v1/district/options?limit=100`,
			{
				method: "GET",
				headers: await getAuthHeaders(),
				cache: "no-store",
			},
		);

		const result = await parseResponse<
			DistrictOption[] | { data: DistrictOption[] }
		>(response);

		const districts = Array.isArray(result.data)
			? result.data
			: result.data.data;

		return {
			success: true,
			message: result.message,
			data: districts.filter((district) => district.isActive),
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to load districts.",
			data: [],
		};
	}
}



export async function createWorkerApplication(
	payload: CreateWorkerApplicationPayload,
): Promise<ActionResult<WorkerApplication>> {
	try {
		if (!API_URL) {
			throw new Error("Backend API URL is not configured.");
		}

		const response = await fetch(
			`${API_URL}/api/v1/worker-applications/apply`,
			{
				method: "POST",
				headers: await getAuthHeaders(),
				body: JSON.stringify({
					workerType: payload.workerType,
					phone: payload.phone.trim(),
					address: payload.address.trim(),
					districtId: payload.districtId,
					businessName:
						payload.businessName?.trim() || undefined,
					experience:
						payload.experience?.trim() || undefined,
					description:
						payload.description?.trim() || undefined,
				}),
				cache: "no-store",
			},
		);

		const result =
			await parseResponse<WorkerApplication>(response);

		return {
			success: true,
			message: result.message,
			data: result.data,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to submit application.",
		};
	}
}



export async function updateMyWorkerApplication(
	id: string,
	payload: CreateWorkerApplicationPayload,
): Promise<ActionResult<WorkerApplication>> {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("accessToken")?.value;

		if (!accessToken) {
			return {
				success: false,
				message: "Your session has expired. Please log in again.",
			};
		}

		const response = await fetch(
			`${process.env.BACKEND_API_URL}/api/v1/worker-applications/my-application/${id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${accessToken}`,
				},
				body: JSON.stringify(payload),
				cache: "no-store",
			},
		);

		const result = await response.json();

		if (!response.ok || !result.success) {
			return {
				success: false,
				message: result.message || "Failed to update application.",
			};
		}

		return {
			success: true,
			message: result.message || "Application updated successfully.",
			data: result.data,
		};
	} catch {
		return {
			success: false,
			message: "Something went wrong while updating the application.",
		};
	}
}

export async function deleteMyWorkerApplication(
	id: string,
): Promise<ActionResult<null>> {
	try {
		const cookieStore = await cookies();
		const accessToken = cookieStore.get("accessToken")?.value;

		if (!accessToken) {
			return {
				success: false,
				message: "Your session has expired. Please log in again.",
			};
		}

		const response = await fetch(
			`${process.env.BACKEND_API_URL}/api/v1/worker-applications/my-application/${id}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
				cache: "no-store",
			},
		);

		const result = await response.json();

		if (!response.ok || !result.success) {
			return {
				success: false,
				message: result.message || "Failed to delete application.",
			};
		}

		return {
			success: true,
			message: result.message || "Application deleted successfully.",
			data: null,
		};
	} catch {
		return {
			success: false,
			message: "Something went wrong while deleting the application.",
		};
	}
}

export async function getMyWorkerApplication(
	id: string,
): Promise<ActionResult<WorkerApplication>> {
	try {
		if (!API_URL) {
			throw new Error("Backend API URL is not configured.");
		}

		const response = await fetch(
			`${API_URL}/api/v1/worker-applications/my-application/${id}`,
			{
				method: "GET",
				headers: await getAuthHeaders(),
				cache: "no-store",
			},
		);

		const result =
			await parseResponse<WorkerApplication>(response);

		return {
			success: true,
			message: result.message,
			data: result.data,
		};
	} catch (error) {
		return {
			success: false,
			message:
				error instanceof Error
					? error.message
					: "Failed to load application.",
		};
	}
}
