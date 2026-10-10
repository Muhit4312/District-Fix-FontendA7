
import { MapPinned } from "lucide-react";

export function DistrictsHeader() {
	return (
		<div className="flex items-start gap-3">
			<div className="rounded-xl bg-sky-100 p-3 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
				<MapPinned className="size-6" />
			</div>

			<div>
				<h1 className="text-2xl font-bold tracking-tight">
					District Management
				</h1>
				<p className="mt-1 text-sm text-muted-foreground">
					Manage districts, divisions, codes, and availability.
				</p>
			</div>
		</div>
	);
}
