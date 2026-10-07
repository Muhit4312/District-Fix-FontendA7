"use server";

import { redirect } from "next/navigation";

export type ResetPasswordState = {
	success: boolean;
	statusCode?: number;
	message: string;
};

export async function resetPasswordAction(
	_previousState: ResetPasswordState,
	formData: FormData,
): Promise<ResetPasswordState> {
	const email = formData.get("email")?.toString().trim();
	const otp = formData.get("otp")?.toString().trim();
	const newPassword = formData.get("newPassword")?.toString();
	const confirmPassword = formData.get("confirmPassword")?.toString();

	if (!email || !otp || !newPassword || !confirmPassword) {
		throw new Error("Please fill in all required fields.");
	}

	if (newPassword !== confirmPassword) {
		throw new Error("Passwords do not match.");
	}

	const response = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/auth/reset-password`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				otp,
				newPassword,
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
				"Failed to reset password. Please try again.",
		};
	}

	redirect("/login");
}