
import Link from "next/link";
import { ArrowLeft, CircleAlert, UserRound } from "lucide-react";

import { getUserById } from "../_actions/users.action";
import UserEditForm from "../_components/user-edit-form";

interface AdminUserEditPageProps {
	params: Promise<{ id: string }>;
}

export default async function AdminUserEditPage({
	params,
}: AdminUserEditPageProps) {
	const { id } = await params;
	const result = await getUserById(id);

	if (!result.user) {
		return (
			<div className="mx-auto w-full max-w-3xl space-y-6 p-4 md:p-6">
				<Link
					href="/dashboard/admin/users"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeft className="size-4" />
					Back to users
				</Link>

				<div className="rounded-xl border bg-card p-6 md:p-8">
					<div className="flex items-start gap-3">
						<CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />

						<div className="space-y-2">
							<h2 className="font-semibold">Unable to load user</h2>
							<p className="text-sm text-muted-foreground">
								{result.error ?? result.message ?? "User not found."}
							</p>

							<Link
								href="/dashboard/admin/users"
								className="inline-flex h-9 items-center rounded-md bg-sky-600 px-4 text-sm font-medium text-white transition-colors hover:bg-sky-700"
							>
								Return to users
							</Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	const user = result.user;

	return (
		<div className="mx-auto w-full max-w-3xl space-y-6 p-4 md:p-6">
			<Link
				href="/dashboard/admin/users"
				className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeft className="size-4" />
				Back to users
			</Link>

			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<div className="flex size-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
						<UserRound className="size-5" />
					</div>

					<div>
						<h1 className="text-2xl font-bold tracking-tight">
							Edit user
						</h1>
						<p className="text-sm text-muted-foreground">
							Update the user's profile information.
						</p>
					</div>
				</div>
			</div>

			<div className="rounded-xl border bg-card p-5 shadow-sm md:p-7">
				<div className="mb-6 border-b pb-4">
					<h2 className="font-semibold">Personal information</h2>
					<p className="mt-1 text-sm text-muted-foreground">
						Edit the user's name and phone number.
					</p>
				</div>

				<UserEditForm key={user.id} user={user} />
			</div>
		</div>
	);
}