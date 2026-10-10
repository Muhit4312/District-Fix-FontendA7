
"use client";

import { MoreHorizontal, Pencil, Power, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { District } from "../_types/districts.types";
import { DistrictStatusBadge } from "./district-status-badge";

interface DistrictTableRowProps {
	district: District;
	onEdit: (district: District) => void;
	onDelete: (district: District) => void;
	onToggleStatus: (district: District) => void;
}

export function DistrictTableRow({
	district,
	onEdit,
	onDelete,
	onToggleStatus,
}: DistrictTableRowProps) {
	const requestCount =
		district.serviceRequests?.filter((request) => !request.deletedAt)
			.length ?? 0;

	return (
		<tr className="border-b hover:bg-muted/40">
			<td className="px-4 py-4">
				<p className="font-medium">{district.name}</p>
				<p className="mt-1 text-xs text-muted-foreground">
					{district.id}
				</p>
			</td>

			<td className="px-4 py-4 text-sm">{district.division}</td>

			<td className="px-4 py-4">
				<span className="rounded-md bg-muted px-2.5 py-1 font-mono text-xs font-semibold">
					{district.code}
				</span>
			</td>

			<td className="px-4 py-4">
				<DistrictStatusBadge isActive={district.isActive} />
			</td>

			<td className="px-4 py-4 text-sm">{requestCount}</td>

			<td className="px-4 py-4 text-right">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button type="button" variant="ghost" size="icon">
							<MoreHorizontal className="size-4" />
							<span className="sr-only">District actions</span>
						</Button>
					</DropdownMenuTrigger>

					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => onEdit(district)}>
							<Pencil className="mr-2 size-4" />
							Edit
						</DropdownMenuItem>

						<DropdownMenuItem
							onClick={() => onToggleStatus(district)}
						>
							<Power className="mr-2 size-4" />
							{district.isActive ? "Deactivate" : "Activate"}
						</DropdownMenuItem>

						<DropdownMenuItem
							className="text-destructive focus:text-destructive"
							onClick={() => onDelete(district)}
						>
							<Trash2 className="mr-2 size-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</td>
		</tr>
	);
}
