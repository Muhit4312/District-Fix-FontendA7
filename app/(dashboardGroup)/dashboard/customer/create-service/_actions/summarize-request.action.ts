
"use server";

type SummarizeRequestResponse = {
    success: boolean;
    message: string;
    data?: {
        summary: string;
    };
};

export async function summarizeRequestAction(description: string) {
    try {
        const apiUrl = process.env.BACKEND_API_URL;

        if (!apiUrl) {
            return {
                success: false,
                message: "API URL is not configured.",
            };
        }

        const response = await fetch(
            `${apiUrl}/api/v1/ai/summarize-request`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ description }),
                cache: "no-store",
            },
        );

        const result =
            (await response.json()) as SummarizeRequestResponse;

        if (!response.ok || !result.success || !result.data?.summary) {
            return {
                success: false,
                message: result.message || "Failed to generate summary.",
            };
        }

        return {
            success: true,
            summary: result.data.summary,
        };
    } catch {
        return {
            success: false,
            message: "Failed to connect to the server.",
        };
    }
}
