
"use client";

import { useEffect, useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { District, DistrictPayload } from "../_types/districts.types";

interface DistrictFormDialogProps {
	open: boolean;
	district: District | null;
	pending: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (payload: DistrictPayload) => Promise<void>;
}

export function DistrictFormDialog({
	open,
	district,
	pending,
	onOpenChange,
	onSubmit,
}: DistrictFormDialogProps) {
	const [name, setName] = useState("");
	const [division, setDivision] = useState("");
	const [code, setCode] = useState("");
	const [isActive, setIsActive] = useState(true);

	useEffect(() => {
		if (!open) return;

		setName(district?.name ?? "");
		setDivision(district?.division ?? "");
		setCode(district?.code ?? "");
		setIsActive(district?.isActive ?? true);
	}, [open, district]);

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		await onSubmit({
			name: name.trim(),
			division: division.trim(),
			code: code.trim().toUpperCase(),
			isActive,
		});
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>
						{district ? "Edit District" : "Create District"}
					</DialogTitle>
					<DialogDescription>
						Enter the district information below.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="district-name">District Name</Label>
						<Input
							id="district-name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							placeholder="e.g. Barguna"
							required
							maxLength={100}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="district-division">Division</Label>
						<Input
							id="district-division"
							value={division}
							onChange={(event) => setDivision(event.target.value)}
							placeholder="e.g. Barisal"
							required
							maxLength={100}
						/>
					</div>

					<div className="space-y-2">
						<Label htmlFor="district-code">District Code</Label>
						<Input
							id="district-code"
							value={code}
							onChange={(event) =>
								setCode(event.target.value.toUpperCase())
							}
							placeholder="e.g. BRG"
							required
							maxLength={20}
						/>
					</div>

					<label className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							checked={isActive}
							onChange={(event) => setIsActive(event.target.checked)}
							className="size-4 accent-sky-600"
						/>
						District is active
					</label>

					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							disabled={pending}
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>

						<Button
							type="submit"
							disabled={pending}
							className="bg-sky-600 hover:bg-sky-700"
						>
							{pending && (
								<LoaderCircle className="mr-2 size-4 animate-spin" />
							)}
							{district ? "Save Changes" : "Create District"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
