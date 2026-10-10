
"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import type {
	District,
	DistrictPayload,
} from "../_types/districts.types";


import { DistrictsStats } from "./districts-stats";
import { DistrictsToolbar } from "./districts-toolbar";
import { DistrictsTable } from "./districts-table";
import { DistrictFormDialog } from "./district-form-dialog";
import { DistrictDeleteDialog } from "./district-delete-dialog";
import { updateDistrict } from "../_actions/update-district.action";
import { createDistrict } from "../_actions/create-district.action";
import { deleteDistrict } from "../_actions/delete-district.action";

interface DistrictsManagerProps {
	initialDistricts: District[];
}

export function DistrictsManager({
	initialDistricts,
}: DistrictsManagerProps) {
	const [districts, setDistricts] = useState(initialDistricts);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("ALL");
	const [page, setPage] = useState(1);

	const [formOpen, setFormOpen] = useState(false);
	const [editingDistrict, setEditingDistrict] = useState<District | null>(null);
	const [deletingDistrict, setDeletingDistrict] = useState<District | null>(null);
	const [pending, setPending] = useState(false);

	const pageSize = 8;

	const filteredDistricts = useMemo(() => {
		const query = search.trim().toLowerCase();

		return districts
			.filter((district) => {
				const matchesSearch = [
					district.name,
					district.division,
					district.code,
				].some((value) => value.toLowerCase().includes(query));

				const matchesStatus =
					status === "ALL" ||
					(status === "ACTIVE" && district.isActive) ||
					(status === "INACTIVE" && !district.isActive);

				return matchesSearch && matchesStatus;
			})
			.sort((a, b) => a.name.localeCompare(b.name));
	}, [districts, search, status]);

	const totalPages = Math.max(
		1,
		Math.ceil(filteredDistricts.length / pageSize),
	);
	const currentPage = Math.min(page, totalPages);

	const paginatedDistricts = filteredDistricts.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize,
	);

	function openCreateDialog() {
		setEditingDistrict(null);
		setFormOpen(true);
	}

	function openEditDialog(district: District) {
		setEditingDistrict(district);
		setFormOpen(true);
	}

	async function handleSave(payload: DistrictPayload) {
		setPending(true);

		try {
			const result = editingDistrict
				? await updateDistrict(editingDistrict.id, payload)
				: await createDistrict(payload);

			if (!result.success) {
				toast.error(result.message);
				return;
			}

			if (!result.data) {
				toast.error("The server did not return the saved district.");
				return;
			}

			const savedDistrict = result.data;

			setDistricts((current) =>
				editingDistrict
					? current.map((district) =>
							district.id === editingDistrict.id
								? { ...district, ...savedDistrict }
								: district,
						)
					: [...current, savedDistrict],
			);

			toast.success(result.message);
			setFormOpen(false);
			setEditingDistrict(null);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to save district.",
			);
		} finally {
			setPending(false);
		}
	}

	async function handleDelete() {
		if (!deletingDistrict) return;

		setPending(true);

		try {
			const result = await deleteDistrict(deletingDistrict.id);

			if (!result.success) {
				toast.error(result.message);
				return;
			}

			setDistricts((current) =>
				current.filter((district) => district.id !== deletingDistrict.id),
			);

			toast.success(result.message);
			setDeletingDistrict(null);
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to delete district.",
			);
		} finally {
			setPending(false);
		}
	}

	async function handleToggleStatus(district: District) {
		const nextStatus = !district.isActive;

		setPending(true);

		try {
			const result = await updateDistrict(district.id, {
				isActive: nextStatus,
			});

			if (!result.success) {
				toast.error(result.message);
				return;
			}

			setDistricts((current) =>
				current.map((item) =>
					item.id === district.id
						? { ...item, ...(result.data ?? {}), isActive: nextStatus }
						: item,
				),
			);

			toast.success(nextStatus ? "District activated." : "District deactivated.");
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : "Failed to update status.",
			);
		} finally {
			setPending(false);
		}
	}

	return (
		<div className="space-y-6">
			<DistrictsStats districts={districts} />

			<section className="space-y-4 rounded-xl border bg-card p-4 sm:p-6">
				<div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
					<div>
						<h2 className="text-lg font-semibold">All Districts</h2>
						<p className="text-sm text-muted-foreground">
							{filteredDistricts.length} district(s) found
						</p>
					</div>

					<Button
						onClick={openCreateDialog}
						className="bg-sky-600 hover:bg-sky-700"
					>
						<Plus className="mr-2 size-4" />
						Add District
					</Button>
				</div>

				<DistrictsToolbar
					search={search}
					onSearchChange={(value) => {
						setSearch(value);
						setPage(1);
					}}
					status={status}
					onStatusChange={(value) => {
						setStatus(value);
						setPage(1);
					}}
				/>

				<DistrictsTable
					districts={paginatedDistricts}
					onEdit={openEditDialog}
					onDelete={setDeletingDistrict}
					onToggleStatus={(district) => void handleToggleStatus(district)}
				/>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<p className="text-sm text-muted-foreground">
						Page {currentPage} of {totalPages}
					</p>

					<div className="flex gap-2">
						<Button
							variant="outline"
							size="sm"
							disabled={currentPage <= 1}
							onClick={() => setPage((value) => Math.max(1, value - 1))}
						>
							Previous
						</Button>
						<Button
							variant="outline"
							size="sm"
							disabled={currentPage >= totalPages}
							onClick={() =>
								setPage((value) => Math.min(totalPages, value + 1))
							}
						>
							Next
						</Button>
					</div>
				</div>
			</section>

			<DistrictFormDialog
				open={formOpen}
				onOpenChange={setFormOpen}
				district={editingDistrict}
				pending={pending}
				onSubmit={handleSave}
			/>

			<DistrictDeleteDialog
				district={deletingDistrict}
				pending={pending}
				onOpenChange={(open) => {
					if (!open) setDeletingDistrict(null);
				}}
				onConfirm={handleDelete}
			/>
		</div>
	);
}
