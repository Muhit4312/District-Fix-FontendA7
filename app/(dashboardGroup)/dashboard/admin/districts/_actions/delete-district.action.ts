
"use server";

import { cookies } from "next/headers";
import type { DistrictsActionResult } from "../_types/districts.types";

export async function deleteDistrict(
	id: string,
): Promise<DistrictsActionResult> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/district/${id}`,
		{
			method: "DELETE",
			headers: {
				Cookie: `accessToken=${accessToken}`,
			},
		},
	);

	const result: DistrictsActionResult = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to delete district");
	}

	return result;
}
