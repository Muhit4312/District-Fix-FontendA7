
"use server";

import { cookies } from "next/headers";
import type {
	DistrictPayload,
	DistrictResponse,
} from "../_types/districts.types";

export async function updateDistrict(
	id: string,
	payload: Partial<DistrictPayload>,
): Promise<DistrictResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/district/${id}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Cookie: `accessToken=${accessToken}`,
			},
			body: JSON.stringify(payload),
		},
	);

	const result: DistrictResponse = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to update district");
	}

	return result;
}
