"use server";

import { cookies } from "next/headers";

import type {
    WorkerAssignedServicesResponse,
    WorkerProfileResponse,
} from "@/types/worker";

export async function getMyWorkerProfile(): Promise<WorkerProfileResponse> {
    const cookieStore = await cookies();


    const accessToken =
        cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/worker/me`,
        {
            method: "GET",
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        },
    );

    const result: WorkerProfileResponse =
        await res.json();

    

    if (!res.ok) {
        throw new Error(
            result?.message ||
            "Failed to fetch worker profile",
        );
    }

    return result;


}

export async function getMyAssignedServices(): Promise<WorkerAssignedServicesResponse> {
    const cookieStore = await cookies();


    const accessToken =
        cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/worker/assigned-services`,
        {
            method: "GET",
            headers: {
                Cookie: `accessToken=${accessToken}`,
            },
            cache: "no-store",
        },
    );

    const result: WorkerAssignedServicesResponse =
        await res.json();

   

    if (!res.ok) {
        throw new Error(
            result?.message ||
            "Failed to fetch assigned services",
        );
    }

    return result;


}
