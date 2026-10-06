"use server";

import { redirect } from "next/navigation";

export type RegisterState = {
	success: boolean;
	statusCode?: number;
	message: string;
	data?: null;
};

export async function registerAction(
	_previousState: RegisterState,
	formData: FormData,
): Promise<RegisterState> {
	const name = formData.get("name")?.toString().trim();
	const email = formData.get("email")?.toString().trim();
	const password = formData.get("password")?.toString();
	const confirmPassword = formData.get("confirmPassword")?.toString();

	if (!name || !email || !password || !confirmPassword) {
		throw new Error("Please fill in all required fields.");
	}

	if (password !== confirmPassword) {
		throw new Error("Passwords do not match.");
	}

	const response = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/auth/register`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
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
				"Registration failed. Please try again.",
		};
	}

	redirect(`/verify-email?email=${encodeURIComponent(email)}`);
}