
"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle, Send, X, LoaderCircle } from "lucide-react";
import { sendAIMessage } from "@/service/ai.service";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

export function AIChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: "assistant",
            content:
                "Hello! Welcome to DistrictFix. How can I help you today?",
        },
    ]);

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        const text = message.trim();

        if (!text || isLoading) return;

        setMessages((previous) => [
            ...previous,
            { role: "user", content: text },
        ]);

        setMessage("");
        setIsLoading(true);

        try {
            const result = await sendAIMessage(text);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content: result.data.reply,
                },
            ]);
        } catch (error) {
            console.error("AI chatbot error:", error);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content:
                        "Sorry, something went wrong. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {isOpen && (
                <div className="mb-4 flex h-[min(500px,70vh)] w-[min(360px,calc(100vw-40px))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
                    <div className="flex items-center justify-between bg-[#0084D1] px-4 py-3 text-white">
                        <div>
                            <h2 className="font-semibold">
                                DistrictFix Assistant
                            </h2>
                            <p className="text-xs text-white/80">
                                AI-powered support
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close chatbot"
                            className="rounded-full p-2 transition hover:bg-white/15"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div
                        className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
                        aria-live="polite"
                    >
                        {messages.map((item, index) => (
                            <div
                                key={`${item.role}-${index}`}
                                className={`flex ${
                                    item.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                }`}
                            >
                                <p
                                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm ${
                                        item.role === "user"
                                            ? "rounded-br-sm bg-[#0084D1] text-white"
                                            : "rounded-bl-sm border border-slate-200 bg-white text-slate-800"
                                    }`}
                                >
                                    {item.content}
                                </p>
                            </div>
                        ))}

                        {isLoading && (
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <LoaderCircle
                                    size={16}
                                    className="animate-spin"
                                />
                                Thinking...
                            </div>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 border-t border-slate-200 bg-white p-3"
                    >
                        <input
                            value={message}
                            onChange={(event) =>
                                setMessage(event.target.value)
                            }
                            placeholder="Ask about DistrictFix..."
                            aria-label="Your message"
                            maxLength={2000}
                            disabled={isLoading}
                            className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 outline-none focus:border-[#0084D1] focus:ring-2 focus:ring-[#0084D1]/20 disabled:opacity-60"
                        />

                        <button
                            type="submit"
                            disabled={!message.trim() || isLoading}
                            aria-label="Send message"
                            className="rounded-xl bg-[#0084D1] p-3 text-white transition hover:bg-[#006FB0] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            )}

            <button
                type="button"
                onClick={() => setIsOpen((previous) => !previous)}
                aria-label={isOpen ? "Close chatbot" : "Open chatbot"}
                className="ml-auto flex size-14 items-center justify-center rounded-full bg-[#0084D1] text-white shadow-lg"
            >
                {isOpen ? <X size={25} /> : <MessageCircle size={25} />}
            </button>
        </div>
    );
}
