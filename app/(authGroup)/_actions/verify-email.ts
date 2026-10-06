"use server";

import { logout } from "@/service/logout";
import { redirect } from "next/navigation";

export type VerifyEmailState = {
	success: boolean;
	statusCode?: number;
	message: string;
	data?: null;
};

export async function verifyEmailAction(
	_previousState: VerifyEmailState,
	formData: FormData,
): Promise<VerifyEmailState> {
	const email = formData.get("email")?.toString().trim();
	const otp = formData.get("otp")?.toString().trim();

	if (!email || !otp) {
		throw new Error("Email and OTP are required.");
	}

	const response = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/auth/verify-email`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				otp,
			}),
			cache: "no-store",
		},
	);

	const result = await response.json();

	if (!response.ok || !result.success) {
		return {
			success: false,
			statusCode: result?.statusCode || response.status,
			message:
				result?.message ||
				"Email verification failed. Please try again.",
		};
	}
    logout()
    redirect("/login")


	return result
}