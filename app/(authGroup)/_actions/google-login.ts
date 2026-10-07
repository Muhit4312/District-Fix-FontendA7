"use server";

import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type GoogleLoginState = {
    success: boolean;
    statusCode?: number;
    message: string;
    data?: {
        accessToken: string;
        refreshToken: string;
    };
};

export async function googleLoginAction(
    idToken: string,
): Promise<GoogleLoginState> {
    if (!idToken) {
        return {
            success: false,
            message: "Google ID token is required.",
        };
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/auth/google`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idToken,
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
                "Google login failed. Please try again.",
        };
    }

    const accessToken = result?.data?.accessToken;
    const refreshToken = result?.data?.refreshToken;

    if (!accessToken || !refreshToken) {
        return {
            success: false,
            message:
                "Google login succeeded but authentication tokens were not received.",
        };
    }

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24,
    });

    cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
    });

    const decodedToken = jwtUtils.verifyToken(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string,
    ) as JwtPayload;

    if (decodedToken.role === "CUSTOMER") {
        redirect("/dashboard/customer");
    }

    if (
        decodedToken.role === "PLUMBER" ||
        decodedToken.role === "ELECTRICIAN"
    ) {
        redirect("/dashboard/worker");
    }

    if (decodedToken.role === "SERVICE_HOLDER") {
        redirect("/dashboard/service-holder");
    }

    if (
        decodedToken.role === "ADMIN" ||
        decodedToken.role === "SUPER_ADMIN"
    ) {
        redirect("/dashboard/admin");
    }

    return {
        success: false,
        message: "Invalid user role.",
    };
}