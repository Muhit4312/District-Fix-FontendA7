"use server";

import { SingleServiceRequestResponse } from "@/types/service-request";
import { cookies } from "next/headers";

export async function getMyService(
	id: string,
): Promise<SingleServiceRequestResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/service-requests/${id}`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: SingleServiceRequestResponse = await res.json();

	if (!res.ok) {
		throw new Error(
			result?.message || "Failed to fetch service details",
		);
	}

	return result;
}