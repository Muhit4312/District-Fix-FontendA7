"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle, Save } from "lucide-react";
import { updateUser } from "../_actions/users.action";
import type { AdminUser } from "../_types/users.types";

interface UserEditFormProps {
    user: AdminUser;
}

export default function UserEditForm({ user }: UserEditFormProps) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const [name, setName] = useState(user.name ?? "");
    const [phone, setPhone] = useState(user.phone ?? "");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!name.trim()) {
            toast.error("Name is required.");
            return;
        }

        startTransition(async () => {
            const result = await updateUser(user.id, {
                name,
                phone,
            });

            if (!result.success) {
                toast.error(result.message);
                return;
            }

            toast.success(result.message);
            router.refresh();
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="user-name" className="text-sm font-medium">
                    Full name
                </label>
                <input
                    id="user-name"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                    maxLength={100}
                    autoComplete="name"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
            </div>

            <div className="space-y-2">
                <label htmlFor="user-email" className="text-sm font-medium">
                    Email address
                </label>
                <input
                    id="user-email"
                    value={user.email}
                    readOnly
                    className="h-10 w-full cursor-not-allowed rounded-md border bg-muted px-3 text-sm text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground">
                    Email editing is not supported by the current backend endpoint.
                </p>
            </div>

            <div className="space-y-2">
                <label htmlFor="user-phone" className="text-sm font-medium">
                    Phone number
                </label>
                <input
                    id="user-phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    maxLength={20}
                    autoComplete="tel"
                    placeholder="Enter phone number"
                    className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                />
            </div>

            <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
                <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={pending}
                    className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium hover:bg-muted disabled:opacity-50"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={pending}
                    className="inline-flex h-10 items-center gap-2 rounded-md bg-sky-600 px-4 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-50"
                >
                    {pending ? (
                        <LoaderCircle className="size-4 animate-spin" />
                    ) : (
                        <Save className="size-4" />
                    )}
                    {pending ? "Saving..." : "Save changes"}
                </button>
            </div>
        </form>
    );
}