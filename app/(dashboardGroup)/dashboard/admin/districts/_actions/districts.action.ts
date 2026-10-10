
"use server";

import { cookies } from "next/headers";
import type { DistrictsResponse } from "../_types/districts.types";

export async function getDistrictOptions(): Promise<DistrictsResponse> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/district/options`,
		{
			method: "GET",
			headers: {
				Cookie: `accessToken=${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: DistrictsResponse = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to fetch district options");
	}

	return result;
}
