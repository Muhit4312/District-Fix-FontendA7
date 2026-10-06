import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { jwtUtils } from "./utils/jwt";
import jwt from "jsonwebtoken";
import { getNewAccessToken } from "./service/getAccessToken";

const AUTH_ROUTES = ["/login", "/register", "/verify-email", "/forgot-password", "/reset-password"]
const PUBLIC_ROUTES = [...AUTH_ROUTES, "/", "/about", "/services", "/contact", "/privacy-policy", "/terms-of-service",];

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const cookieStore = await cookies()

    let accessToken = request.cookies.get('accessToken')?.value
    const refreshToken = request.cookies.get('refreshToken')?.value

    let decodedAccessToken = accessToken ? jwtUtils.verifyToken(accessToken, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload : null

    const decodedRefreshToken = refreshToken ? jwtUtils.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET!) as jwt.JwtPayload : null

    if (decodedRefreshToken && !decodedAccessToken) {
        const result = await getNewAccessToken()
        if (result.success) {
            const newAccessToken = result.data.accessToken

            cookieStore.set("accessToken", newAccessToken, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24

            });

            accessToken = newAccessToken
            decodedAccessToken = jwtUtils.verifyToken(accessToken!, process.env.JWT_ACCESS_SECRET!) as jwt.JwtPayload
        }
    }

    let userRole = null

    if (!decodedAccessToken) {
        cookieStore.delete("accessToken")
    }
    if (decodedAccessToken && decodedAccessToken.role) {
        userRole = decodedAccessToken.role
    }

    if (accessToken && AUTH_ROUTES.includes(path)) {
        if (userRole === "ADMIN" || userRole === "SUPER_ADMIN") {
            return NextResponse.redirect(
                new URL("/dashboard/admin", request.url),
            );
        } else if (userRole === "PLUMBER") {
            return NextResponse.redirect(
                new URL("/dashboard/worker", request.url),
            );
        } else if (userRole === "ELECTRICIAN") {
            return NextResponse.redirect(
                new URL("/dashboard/worker", request.url),
            );
        } else if (userRole === "SERVICE_HOLDER") {
            return NextResponse.redirect(
                new URL("/dashboard/service-holder", request.url),
            );
        } else if (userRole === "CUSTOMER") {
            return NextResponse.redirect(
                new URL("/dashboard/customer", request.url),
            );
        } else {
            return NextResponse.redirect(
                new URL("/login", request.url),
            );
        }
    }

    const isPublicRoute = PUBLIC_ROUTES.some((route) => path === route || path.startsWith(route + '/'))

    if (!accessToken && !isPublicRoute) {

        const loginUrl = new URL('/login', request.url)

        loginUrl.searchParams.set("redirectTo", path)

        return NextResponse.redirect(loginUrl)
    }


    const isCustomerRoute =
        path === "/dashboard/customer" ||
        path.startsWith("/dashboard/customer/");

    const isWorkerRoute =
        path === "/dashboard/worker" ||
        path.startsWith("/dashboard/worker/");

    const isServiceHolderRoute =
        path === "/dashboard/service-holder" ||
        path.startsWith("/dashboard/service-holder/");

    const isAdminRoute =
        path === "/dashboard/admin" ||
        path.startsWith("/dashboard/admin/");

    if (isCustomerRoute && userRole !== "CUSTOMER") {
        return NextResponse.redirect(
            new URL("/not-found", request.url),
        );
    }

    if (
        isWorkerRoute &&
        userRole !== "PLUMBER" &&
        userRole !== "ELECTRICIAN"
    ) {
        return NextResponse.redirect(
            new URL("/not-found", request.url),
        );
    }

    if (
        isServiceHolderRoute &&
        userRole !== "SERVICE_HOLDER"
    ) {
        return NextResponse.redirect(
            new URL("/not-found", request.url),
        );
    }

    if (
        isAdminRoute &&
        userRole !== "ADMIN" &&
        userRole !== "SUPER_ADMIN"
    ) {
        return NextResponse.redirect(
            new URL("/not-found", request.url),
        );
    }




    return NextResponse.next()
}


export const config = {
    matcher: [
        '/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',
    ]
}