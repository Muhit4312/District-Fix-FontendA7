
"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { District } from "../_types/districts.types";

interface DistrictDeleteDialogProps {
	district: District | null;
	pending: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => Promise<void>;
}

export function DistrictDeleteDialog({
	district,
	pending,
	onOpenChange,
	onConfirm,
}: DistrictDeleteDialogProps) {
	return (
		<AlertDialog
			open={Boolean(district)}
			onOpenChange={(open) => {
				if (!open && !pending) onOpenChange(false);
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete District?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete{" "}
						<strong>{district?.name}</strong>? Districts with service
						requests cannot be deleted.
					</AlertDialogDescription>
				</AlertDialogHeader>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={pending}>
						Cancel
					</AlertDialogCancel>

					<AlertDialogAction
						disabled={pending || !district}
						className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
						onClick={(event) => {
							event.preventDefault();
							void onConfirm();
						}}
					>
						{pending ? (
							<LoaderCircle className="mr-2 size-4 animate-spin" />
						) : (
							<Trash2 className="mr-2 size-4" />
						)}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
