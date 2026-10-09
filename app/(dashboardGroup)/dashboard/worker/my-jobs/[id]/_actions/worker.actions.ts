"use server";

import { cookies } from "next/headers";
import type { SingleAssignedServiceResponse } from "@/types/worker";

export const getMyAssignedSingleService = async (
    id: string,
): Promise<SingleAssignedServiceResponse> => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;


    if (!accessToken) {
        throw new Error("Please log in to view service details");
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/worker/assigned-services/${id}`,
        {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        },
    );

    const result: SingleAssignedServiceResponse = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to fetch service details");
    }

    return result;


};


const workerServiceAction = async (
    id: string,
    action: "accept" | "start" | "complete",
    serviceCharge?: number,
) => {
    const token = (await cookies()).get("accessToken")?.value;

    if (!token) throw new Error("Please log in.");

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/worker/assigned-services/${id}/${action}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            ...(action === "complete"
                ? { body: JSON.stringify({ serviceCharge }) }
                : {}),
            cache: "no-store",
        },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Action failed.");
    }

    return result;
};

export const acceptServiceAction = async (id: string) =>
	workerServiceAction(id, "accept");

export const startServiceAction = async (id: string) =>
	workerServiceAction(id, "start");

export const completeServiceAction = async (
	id: string,
	serviceCharge: number,
) => workerServiceAction(id, "complete", serviceCharge);
