"use server";

import { cookies } from "next/headers";

type CreatePaymentResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: {
		paymentId: string;
		bkashPaymentId: string | null;
		paymentUrl: string | null;
	};
};

export async function createPayment(serviceRequestId: string) {
	const cookieStore = await cookies();
	const accessToken = cookieStore.get("accessToken")?.value;

	if (!accessToken) {
		throw new Error("You are not authenticated");
	}

	const backendUrl = process.env.BACKEND_API_URL;

	if (!backendUrl) {
		throw new Error("BACKEND_API_URL is not configured");
	}

	const res = await fetch(
		`${backendUrl}/api/v1/payment/create/${serviceRequestId}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			cache: "no-store",
		},
	);

	const result: CreatePaymentResponse = await res.json();

	if (!res.ok) {
		throw new Error(result?.message || "Failed to create payment");
	}

	if (!result.data?.paymentUrl) {
		throw new Error("Payment URL was not provided");
	}

	return result.data;
}