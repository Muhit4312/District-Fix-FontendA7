
import { cookies } from "next/headers";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

export async function getSingleApplication(id: string) {
	try {
		const cookieStore = await cookies();

		const accessToken =
			cookieStore.get("accessToken")?.value ??
			cookieStore.get("access_token")?.value;

		if (!accessToken) {
			return {
				success: false,
				message: "Please log in to view this application.",
				data: null,
			};
		}

		if (!BACKEND_API_URL) {
			return {
				success: false,
				message: "Backend API URL is not configured.",
				data: null,
			};
		}

		const response = await fetch(
			`${BACKEND_API_URL}/api/v1/admin/service-holder-applications/${id}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				cache: "no-store",
			},
		);

		const result = await response.json();

		if (!response.ok || !result.success) {
			return {
				success: false,
				message:
					result.message || "Failed to load application details.",
				data: null,
			};
		}

		return {
			success: true,
			message: result.message,
			data: result.data,
		};
	} catch {
		return {
			success: false,
			message: "Something went wrong while loading the application.",
			data: null,
		};
	}
}