
"use server";

import { cookies } from "next/headers";
import type {
	DistrictPayload,
	DistrictResponse,
} from "../_types/districts.types";

export async function createDistrict(
	payload: DistrictPayload,
): Promise<DistrictResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/district/create`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Cookie: `accessToken=${accessToken}`,
			},
			body: JSON.stringify(payload),
		},
	);

	const result: DistrictResponse = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to create district");
	}

	return result;
}
