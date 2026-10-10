
"use client";

import type { District } from "../_types/districts.types";
import { DistrictTableRow } from "./district-table-row";

interface DistrictsTableProps {
	districts: District[];
	onEdit: (district: District) => void;
	onDelete: (district: District) => void;
	onToggleStatus: (district: District) => void;
}

export function DistrictsTable({
	districts,
	onEdit,
	onDelete,
	onToggleStatus,
}: DistrictsTableProps) {
	return (
		<div className="overflow-hidden rounded-xl border bg-card">
			<div className="overflow-x-auto">
				<table className="w-full min-w-[800px] text-left">
					<thead className="border-b bg-muted/40">
						<tr className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
							<th className="px-4 py-3">District</th>
							<th className="px-4 py-3">Division</th>
							<th className="px-4 py-3">Code</th>
							<th className="px-4 py-3">Status</th>
							<th className="px-4 py-3">Requests</th>
							<th className="px-4 py-3 text-right">Actions</th>
						</tr>
					</thead>

					<tbody>
						{districts.length ? (
							districts.map((district) => (
								<DistrictTableRow
									key={district.id}
									district={district}
									onEdit={onEdit}
									onDelete={onDelete}
									onToggleStatus={onToggleStatus}
								/>
							))
						) : (
							<tr>
								<td
									colSpan={6}
									className="px-4 py-12 text-center text-sm text-muted-foreground"
								>
									No districts found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
