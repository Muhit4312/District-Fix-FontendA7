import { Users } from "lucide-react";

export default function UsersHeader() {
	return (
		<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<div className="flex items-center gap-2">
					<div className="flex size-10 items-center justify-center rounded-xl bg-sky-100 text-sky-700">
						<Users className="size-5" />
					</div>

					<h1 className="text-2xl font-bold tracking-tight">
						User Management
					</h1>
				</div>

				<p className="mt-2 text-sm text-muted-foreground">
					Manage users, review account details, and update account status.
				</p>
			</div>
		</div>
	);
}