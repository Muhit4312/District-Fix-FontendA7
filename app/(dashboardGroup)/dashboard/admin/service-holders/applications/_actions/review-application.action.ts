
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";





interface ReviewActionResult {
	success: boolean;
	message: string;
}

async function reviewApplication(
	id: string,
	action: "approve" | "reject",
	rejectionReason?: string,
): Promise<ReviewActionResult> {
	try {
		

		const cookieStore = await cookies();
        const baseUrl = process.env.BACKEND_API_URL;

		const accessToken = cookieStore.get("accessToken")?.value;

		if (!accessToken) {
			return {
				success: false,
				message: "Please log in to continue.",
			};
		}

		const response = await fetch(
			`${baseUrl}/api/v1/admin/service-holder-applications/${id}/${action}`,
			{
				method: "PATCH",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
				...(action === "reject"
					? {
							body: JSON.stringify({
								rejectionReason: rejectionReason?.trim(),
							}),
						}
					: {}),
				cache: "no-store",
			},
		);

		const result = await response.json();

		if (!response.ok || !result.success) {
			return {
				success: false,
				message: result.message || `Failed to ${action} application.`,
			};
		}

		revalidatePath(
			"/dashboard/admin/service-holders/applications",
		);
		revalidatePath(
			`/dashboard/admin/service-holders/applications/${id}`,
		);

		return {
			success: true,
			message:
				result.message ||
				(action === "approve"
					? "Application approved successfully."
					: "Application rejected successfully."),
		};
	} catch {
		return {
			success: false,
			message: "Something went wrong. Please try again.",
		};
	}
}

export async function approveApplicationAction(
	id: string,
): Promise<ReviewActionResult> {
	return reviewApplication(id, "approve");
}

export async function rejectApplicationAction(
	id: string,
	rejectionReason: string,
): Promise<ReviewActionResult> {
	if (rejectionReason.trim().length < 5) {
		return {
			success: false,
			message: "Rejection reason must be at least 5 characters.",
		};
	}

	if (rejectionReason.trim().length > 500) {
		return {
			success: false,
			message: "Rejection reason cannot exceed 500 characters.",
		};
	}

	return reviewApplication(id, "reject", rejectionReason);
}

