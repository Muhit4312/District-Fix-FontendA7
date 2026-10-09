"use server";

import { cookies } from "next/headers";

export type District = {
	id: string;
	name: string;
	division: string;
	code: string;
	isActive: boolean;
};

type DistrictResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: District[];
};

export async function getActiveDistricts(): Promise<District[]> {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	const res = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/district/options`,
		{
			method: "GET",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: DistrictResponse = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to fetch districts");
	}

	return result.data.filter((district) => district.isActive);
}