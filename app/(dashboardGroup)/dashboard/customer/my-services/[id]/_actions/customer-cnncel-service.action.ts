"use server"

import { cookies } from "next/headers";

export async function cancelMyService(
	id: string,
	cancellationReason: string,
) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/service-requests/${id}/cancel`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				cancellationReason,
			}),
		},
	);

	const result = await res.json();

	if (!res.ok) {
		throw new Error(
			result?.message || "Failed to cancel service request",
		);
	}

	return result;
}