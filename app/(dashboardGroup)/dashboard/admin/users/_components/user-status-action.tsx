"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoaderCircle, ShieldCheck, ShieldOff } from "lucide-react";
import { updateUserStatus } from "../_actions/users.action";
import type { AdminUser } from "../_types/users.types";

interface UserStatusActionProps {
	user: AdminUser;
}

export default function UserStatusAction({
	user,
}: UserStatusActionProps) {
	const router = useRouter();
	const [pending, startTransition] = useTransition();
	const [confirming, setConfirming] = useState(false);

	const protectedUser = user.role === "SUPER_ADMIN";
	const isActive = user.status === "ACTIVE";
	const nextStatus = isActive ? "BLOCKED" : "ACTIVE";

	function handleStatusChange() {
		startTransition(async () => {
			const result = await updateUserStatus(user.id, nextStatus);

			if (!result.success) {
				toast.error(result.message);
				setConfirming(false);
				return;
			}

			toast.success(result.message);
			setConfirming(false);
			router.refresh();
		});
	}

	if (protectedUser) {
		return (
			<button
				type="button"
				disabled
				title="Super Admin status cannot be changed here"
				className="inline-flex h-8 cursor-not-allowed items-center gap-1.5 rounded-md border px-2.5 text-xs text-muted-foreground opacity-60"
			>
				<ShieldCheck className="size-3.5" />
				Protected
			</button>
		);
	}

	return (
		<div className="flex flex-wrap items-center gap-2">
			{confirming ? (
				<>
					<span className="text-xs text-muted-foreground">
						{isActive ? "Block this user?" : "Activate this user?"}
					</span>

					<button
						type="button"
						disabled={pending}
						onClick={handleStatusChange}
						className="inline-flex h-8 items-center gap-1 rounded-md bg-sky-600 px-2.5 text-xs font-medium text-white hover:bg-sky-700 disabled:opacity-50"
					>
						{pending && <LoaderCircle className="size-3 animate-spin" />}
						Confirm
					</button>

					<button
						type="button"
						disabled={pending}
						onClick={() => setConfirming(false)}
						className="h-8 rounded-md border px-2.5 text-xs hover:bg-muted"
					>
						Cancel
					</button>
				</>
			) : (
				<button
					type="button"
					disabled={pending || user.status === "SUSPENDED"}
					onClick={() => setConfirming(true)}
					title={
						user.status === "SUSPENDED"
							? "Suspended users cannot be changed with this action"
							: undefined
					}
					className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
						isActive
							? "border-red-200 text-red-700 hover:bg-red-50"
							: "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
					}`}
				>
					{pending ? (
						<LoaderCircle className="size-3.5 animate-spin" />
					) : isActive ? (
						<ShieldOff className="size-3.5" />
					) : (
						<ShieldCheck className="size-3.5" />
					)}
					{isActive ? "Block" : "Activate"}
				</button>
			)}
		</div>
	);
}