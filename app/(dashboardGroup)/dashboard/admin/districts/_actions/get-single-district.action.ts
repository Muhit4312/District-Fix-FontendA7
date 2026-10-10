
"use server";

import { cookies } from "next/headers";
import type { DistrictResponse } from "../_types/districts.types";

export async function getSingleDistrict(
	id: string,
): Promise<DistrictResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/district/${id}`,
		{
			method: "GET",
			headers: {
				Cookie: `accessToken=${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: DistrictResponse = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to fetch district");
	}

	return result;
}
