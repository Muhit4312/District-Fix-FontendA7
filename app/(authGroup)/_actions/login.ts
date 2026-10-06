"use server";

import { jwtUtils } from "@/utils/jwt";
import { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginState = {
    success: boolean,
    statusCode?: number,
    message: string,
    data?: {
        accessToken: string,
        refreshToken: string
    }
};

export async function loginAction(
    redirectTo: string,
    _previousState: LoginState,
    formData: FormData,
) {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();


    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required.",
        };
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/auth/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
            cache: "no-store",
        },
    );

    const result = await response.json();
    console.log({ result });

    if (!response.ok) {
        return {
            success: false,
            message:
                result?.message ||
                "Invalid email or password.",
        };
    }

    const accessToken = result?.data?.accessToken;
    const refreshToken = result?.data?.refreshToken;

    if (!accessToken) {
        return {
            success: false,
            message: "Login succeeded but access token was not received.",
        };
    }


    if (result.success) {
        const cookieStore = await cookies();

        cookieStore.set("accessToken", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24

        });
        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        });
    }

    const decodedToken = jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET as string) as JwtPayload

    if (
        redirectTo &&
        typeof redirectTo === "string" &&
        redirectTo.startsWith("/") &&
        !redirectTo.startsWith("//")
    ) {
        redirect(redirectTo);
    }

    if (decodedToken && decodedToken.role === "CUSTOMER") {
        redirect("/dashboard/customer");
    } else if (
        decodedToken &&
        (decodedToken.role === "PLUMBER" ||
            decodedToken.role === "ELECTRICIAN")
    ) {
        redirect("/dashboard/worker");
    } else if (decodedToken && decodedToken.role === "SERVICE_HOLDER") {
        redirect("/dashboard/service-holder");
    } else if (
        decodedToken &&
        (decodedToken.role === "ADMIN" ||
            decodedToken.role === "SUPER_ADMIN")
    ) {
        redirect("/dashboard/admin");
    }
    return result
}