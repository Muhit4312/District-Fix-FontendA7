"use server";

import { cookies } from "next/headers";

type CreateServicePayload = {
	serviceType: "PLUMBING" | "ELECTRICAL";
	serviceName: string;
	description: string;
	address: string;
	phone?: string;
	districtId: string;
};

export async function createServiceRequest(
	payload: CreateServicePayload,
) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	if (!accessToken) {
		throw new Error("You are not authenticated");
	}

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/service-requests/create`,
		{
			method: "POST",
			headers: {
				Cookie: `accessToken=${accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
			cache: "no-store",
		},
	);

	const result = await res.json();

	if (!res.ok) {
		throw new Error(
			result?.message || "Failed to create service request",
		);
	}

	return result;
}