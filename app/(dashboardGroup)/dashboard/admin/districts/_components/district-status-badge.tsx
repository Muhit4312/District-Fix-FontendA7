
import { Badge } from "@/components/ui/badge";

interface DistrictStatusBadgeProps {
	isActive: boolean;
}

export function DistrictStatusBadge({
	isActive,
}: DistrictStatusBadgeProps) {
	return (
		<Badge
			variant="outline"
			className={
				isActive
					? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300"
					: "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
			}
		>
			{isActive ? "Active" : "Inactive"}
		</Badge>
	);
}
