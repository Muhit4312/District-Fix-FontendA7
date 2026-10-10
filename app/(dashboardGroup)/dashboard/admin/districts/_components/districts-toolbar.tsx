
"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface DistrictsToolbarProps {
	search: string;
	onSearchChange: (value: string) => void;
	status: string;
	onStatusChange: (value: string) => void;
}

export function DistrictsToolbar({
	search,
	onSearchChange,
	status,
	onStatusChange,
}: DistrictsToolbarProps) {
	return (
		<div className="flex flex-col gap-3 sm:flex-row">
			<div className="relative flex-1">
				<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					value={search}
					onChange={(event) => onSearchChange(event.target.value)}
					placeholder="Search district, division, or code..."
					className="pl-9"
				/>
			</div>

			<Select value={status} onValueChange={onStatusChange}>
				<SelectTrigger className="w-full sm:w-44">
					<SelectValue placeholder="Filter status" />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="ALL">All districts</SelectItem>
					<SelectItem value="ACTIVE">Active only</SelectItem>
					<SelectItem value="INACTIVE">Inactive only</SelectItem>
				</SelectContent>
			</Select>

			{(search || status !== "ALL") && (
				<Button
					type="button"
					variant="outline"
					onClick={() => {
						onSearchChange("");
						onStatusChange("ALL");
					}}
				>
					<X className="mr-2 size-4" />
					Clear
				</Button>
			)}
		</div>
	);
}
