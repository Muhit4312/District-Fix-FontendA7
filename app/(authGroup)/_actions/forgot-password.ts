"use server";

export type ForgotPasswordState = {
	success: boolean;
	statusCode?: number;
	message: string;
	email?: string;
};

export async function forgotPasswordAction(
	_previousState: ForgotPasswordState,
	formData: FormData,
): Promise<ForgotPasswordState> {
	const email = formData.get("email")?.toString().trim();

	if (!email) {
		throw new Error("Email is required.");
	}

	const response = await fetch(
		`${process.env.BACKEND_API_URL}/api/v1/auth/forgot-password`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
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
				"Failed to send verification code. Please try again.",
		};
	}

	return result
}