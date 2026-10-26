
"use server";

export const sendAIMessage = async (message: string) => {
    const text = message.trim();

    if (!text) {
        throw new Error("Message is required.");
    }

    const response = await fetch(
        `${process.env.BACKEND_API_URL}/api/v1/ai/chat`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message: text }),
            cache: "no-store",
        },
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(
            result.message || "Unable to get an AI response.",
        );
    }

    return result;
};
