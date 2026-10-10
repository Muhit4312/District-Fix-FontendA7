
import { Map, MapPinOff, MapPinned } from "lucide-react";
import type { District } from "../_types/districts.types";

interface DistrictsStatsProps {
	districts: District[];
}

export function DistrictsStats({ districts }: DistrictsStatsProps) {
	const active = districts.filter((district) => district.isActive).length;
	const inactive = districts.length - active;

	const stats = [
		{ label: "Total Districts", value: districts.length, icon: MapPinned },
		{ label: "Active Districts", value: active, icon: Map },
		{ label: "Inactive Districts", value: inactive, icon: MapPinOff },
	];

	return (
		<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
			{stats.map(({ label, value, icon: Icon }) => (
				<div key={label} className="rounded-xl border bg-card p-5">
					<div className="flex items-center justify-between">
						<p className="text-sm text-muted-foreground">{label}</p>
						<Icon className="size-5 text-sky-600" />
					</div>
					<p className="mt-3 text-3xl font-bold">{value}</p>
				</div>
			))}
		</div>
	);
}
