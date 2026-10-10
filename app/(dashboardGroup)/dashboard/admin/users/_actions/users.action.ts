"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type {
    AdminUser,
    ApiResult,
    UserResult,
    UsersListResult,
    UsersMeta,
    UsersQuery,
    UserStatus,
} from "../_types/users.types";

const API_URL = process.env.BACKEND_API_URL;

const DEFAULT_META: UsersMeta = {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
};

async function getAuthHeaders() {
    const cookieStore = await cookies();

    const token =
        cookieStore.get("accessToken")?.value ??
        cookieStore.get("access_token")?.value;

    if (!token) {
        redirect("/login?redirectTo=/dashboard/admin/users");
    }

    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
}

async function apiFetch<T>(
    path: string,
    init?: RequestInit,
): Promise<ApiResult<T>> {
    if (!API_URL) {
        throw new Error("BACKEND_API_URL is not configured.");
    }

    const headers = await getAuthHeaders();

    const response = await fetch(`${API_URL}${path}`, {
        ...init,
        headers: {
            ...headers,
            ...init?.headers,
        },
        cache: "no-store",
    });

    const result = (await response.json()) as ApiResult<T>;

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Something went wrong.");
    }

    return result;
}

export async function getUsers(
    query: UsersQuery = {},
): Promise<UsersListResult> {
    try {
        const params = new URLSearchParams();

        params.set("page", String(query.page ?? 1));
        params.set("limit", String(query.limit ?? 10));

        if (query.searchTerm?.trim()) {
            params.set("searchTerm", query.searchTerm.trim());
        }

        if (query.role && query.role !== "ALL") {
            params.set("role", query.role);
        }

        if (query.status && query.status !== "ALL") {
            params.set("status", query.status);
        }

        params.set("sortOrder", query.sortOrder ?? "desc");

        const result = await apiFetch<AdminUser[]>(
            `/api/v1/admin/users?${params.toString()}`,
        );

        return {
            users: result.data,
            meta: result.meta ?? DEFAULT_META,
            message: result.message,
        };
    } catch (error) {
        return {
            users: [],
            meta: DEFAULT_META,
            error:
                error instanceof Error
                    ? error.message
                    : "Failed to load users.",
        };
    }
}


export async function getUserById(id: string): Promise<UserResult> {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        throw new Error("Please log in to continue.");
    }

    const baseUrl = process.env.BACKEND_API_URL;

    if (!baseUrl) {
        throw new Error("Backend API URL is not configured.");
    }

    const response = await fetch(
        `${baseUrl}/api/v1/admin/users/${encodeURIComponent(id)}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        },
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result?.message || "Failed to fetch user.");
    }

    return {
        user: result.data,
        message: result.message,
    };
}

export async function updateUser(
    id: string,
    payload: { name: string; phone?: string },
): Promise<{ success: boolean; message: string }> {
    try {
        const result = await apiFetch<AdminUser>(
            `/api/v1/admin/users/${encodeURIComponent(id)}`,
            {
                method: "PATCH",
                body: JSON.stringify({
                    name: payload.name.trim(),
                    phone: payload.phone?.trim() || undefined,
                }),
            },
        );

        return {
            success: true,
            message: result.message || "User updated successfully.",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update user.",
        };
    }
}

export async function updateUserStatus(
    id: string,
    status: Extract<UserStatus, "ACTIVE" | "BLOCKED">,
): Promise<{ success: boolean; message: string }> {
    try {
        const result = await apiFetch<AdminUser>(
            `/api/v1/admin/users/${encodeURIComponent(id)}/status`,
            {
                method: "PATCH",
                body: JSON.stringify({ status }),
            },
        );

        return {
            success: true,
            message: result.message || "User status updated successfully.",
        };
    } catch (error) {
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Failed to update user status.",
        };
    }
}