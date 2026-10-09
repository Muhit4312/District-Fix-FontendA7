"use client";

import { useState } from "react";
import { Check, LoaderCircle, Wrench, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import type { District } from "../_actions/district.action";
import { createServiceRequest } from "../_actions/create-service.action";

type CreateServiceFormProps = {
	districts: District[];
};

type FormData = {
	serviceType: "PLUMBING" | "ELECTRICAL" | "";
	serviceName: string;
	description: string;
	districtId: string;
	address: string;
	phone: string;
};

const initialFormData: FormData = {
	serviceType: "",
	serviceName: "",
	description: "",
	districtId: "",
	address: "",
	phone: "",
};

export default function CreateServiceForm({
	districts,
}: CreateServiceFormProps) {
	const router = useRouter();

	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const updateField = <K extends keyof FormData>(
		field: K,
		value: FormData[K],
	) => {
		setFormData((previous) => ({
			...previous,
			[field]: value,
		}));
	};

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		const serviceType = formData.serviceType;
		const serviceName = formData.serviceName.trim();
		const description = formData.description.trim();
		const districtId = formData.districtId;
		const address = formData.address.trim();
		const phone = formData.phone.trim();

		if (!serviceType) {
			toast.error("Please select a service type.");
			return;
		}

		if (!serviceName) {
			toast.error("Please enter a service name.");
			return;
		}

		if (serviceName.length < 3) {
			toast.error("Service name must be at least 3 characters.");
			return;
		}

		if (serviceName.length > 100) {
			toast.error("Service name cannot exceed 100 characters.");
			return;
		}

		if (!description) {
			toast.error("Please describe the problem.");
			return;
		}

		if (description.length < 10) {
			toast.error("Description must be at least 10 characters.");
			return;
		}

		if (description.length > 1000) {
			toast.error("Description cannot exceed 1000 characters.");
			return;
		}

		if (!districtId) {
			toast.error("Please select your district.");
			return;
		}

		if (!address) {
			toast.error("Please enter the service address.");
			return;
		}

		if (address.length < 5) {
			toast.error("Address must be at least 5 characters.");
			return;
		}

		if (address.length > 500) {
			toast.error("Address cannot exceed 500 characters.");
			return;
		}

		if (phone && !/^01\d{9}$/.test(phone)) {
			toast.error("Please enter a valid Bangladeshi phone number.");
			return;
		}

		try {
			setIsSubmitting(true);

			await createServiceRequest({
				serviceType,
				serviceName,
				description,
				districtId,
				address,
				phone: phone || undefined,
			});

			toast.success("Service request submitted successfully.");

			setFormData(initialFormData);

			router.push("/dashboard/customer/my-services");
			router.refresh();
		} catch (error) {
			toast.error(
				error instanceof Error
					? error.message
					: "Failed to create service request.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const inputClassName =
		"h-11 rounded-lg border-slate-200 bg-white text-sm shadow-none placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10";

	return (
		<form onSubmit={handleSubmit}>
			<div className="rounded-2xl border border-slate-200 bg-white">
				{/* Header */}
				<div className="border-b border-slate-100 px-5 py-5 sm:px-7">
					<h2 className="text-lg font-semibold text-slate-900">
						Service Request
					</h2>

					<p className="mt-1 text-sm text-slate-500">
						Provide the details below so we can connect you with
						the right professional.
					</p>
				</div>

				{/* Form */}
				<div className="px-5 py-6 sm:px-7 sm:py-8">
					<div className="space-y-7">
						{/* Service Type */}
						<div className="space-y-3">
							<div>
								<Label className="text-sm font-semibold text-slate-800">
									Service Type
									<span className="ml-1 text-red-500">
										*
									</span>
								</Label>

								<p className="mt-1 text-xs text-slate-500">
									Choose the type of service you need.
								</p>
							</div>

							<div className="grid gap-3 sm:grid-cols-2">
								<button
									type="button"
									disabled={isSubmitting}
									onClick={() =>
										updateField(
											"serviceType",
											"PLUMBING",
										)
									}
									className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
										formData.serviceType === "PLUMBING"
											? "border-sky-500 bg-sky-50/60 ring-1 ring-sky-500"
											: "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
									}`}
								>
									<div
										className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
											formData.serviceType === "PLUMBING"
												? "bg-sky-100 text-sky-600"
												: "bg-slate-100 text-slate-500"
										}`}
									>
										<Wrench className="size-4.5" />
									</div>

									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-slate-900">
											Plumbing
										</p>

										<p className="mt-0.5 text-xs text-slate-500">
											Pipes, taps, leaks and more
										</p>
									</div>

									{formData.serviceType === "PLUMBING" && (
										<div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
											<Check className="size-3" />
										</div>
									)}
								</button>

								<button
									type="button"
									disabled={isSubmitting}
									onClick={() =>
										updateField(
											"serviceType",
											"ELECTRICAL",
										)
									}
									className={`flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all ${
										formData.serviceType === "ELECTRICAL"
											? "border-sky-500 bg-sky-50/60 ring-1 ring-sky-500"
											: "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
									}`}
								>
									<div
										className={`flex size-9 shrink-0 items-center justify-center rounded-lg ${
											formData.serviceType ===
											"ELECTRICAL"
												? "bg-sky-100 text-sky-600"
												: "bg-slate-100 text-slate-500"
										}`}
									>
										<Zap className="size-4.5" />
									</div>

									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-slate-900">
											Electrical
										</p>

										<p className="mt-0.5 text-xs text-slate-500">
											Wiring, fans, lights and more
										</p>
									</div>

									{formData.serviceType === "ELECTRICAL" && (
										<div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-sky-600 text-white">
											<Check className="size-3" />
										</div>
									)}
								</button>
							</div>
						</div>

						{/* Service Name */}
						<div className="space-y-2">
							<Label
								htmlFor="serviceName"
								className="text-sm font-semibold text-slate-800"
							>
								Service Name
								<span className="ml-1 text-red-500">*</span>
							</Label>

							<Input
								id="serviceName"
								value={formData.serviceName}
								onChange={(event) =>
									updateField(
										"serviceName",
										event.target.value,
									)
								}
								placeholder="e.g. Kitchen tap repair"
								maxLength={100}
								disabled={isSubmitting}
								className={inputClassName}
							/>
						</div>

						{/* Description */}
						<div className="space-y-2">
							<div className="flex items-center justify-between gap-3">
								<Label
									htmlFor="description"
									className="text-sm font-semibold text-slate-800"
								>
									Description
									<span className="ml-1 text-red-500">
										*
									</span>
								</Label>

								<span className="text-xs text-slate-400">
									{formData.description.length}/1000
								</span>
							</div>

							<Textarea
								id="description"
								value={formData.description}
								onChange={(event) =>
									updateField(
										"description",
										event.target.value,
									)
								}
								placeholder="Describe the problem and any useful details..."
								rows={5}
								maxLength={1000}
								disabled={isSubmitting}
								className="resize-none rounded-lg border-slate-200 bg-white text-sm shadow-none placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"
							/>
						</div>

						{/* Location */}
						<div className="border-t border-slate-100 pt-7">
							<div className="mb-5">
								<h3 className="text-sm font-semibold text-slate-800">
									Service Location
								</h3>

								<p className="mt-1 text-xs text-slate-500">
									Tell us where the service is needed.
								</p>
							</div>

							<div className="grid gap-5 sm:grid-cols-2">
								{/* District */}
								<div className="space-y-2">
									<Label
										htmlFor="district"
										className="text-sm font-semibold text-slate-800"
									>
										District
										<span className="ml-1 text-red-500">
											*
										</span>
									</Label>

									<Select
										value={formData.districtId}
										onValueChange={(value) =>
											updateField(
												"districtId",
												value,
											)
										}
										disabled={
											isSubmitting ||
											districts.length === 0
										}
									>
										<SelectTrigger
											id="district"
											className={`${inputClassName} w-full`}
										>
											<SelectValue
												placeholder={
													districts.length === 0
														? "No districts available"
														: "Select your district"
												}
											/>
										</SelectTrigger>

										<SelectContent>
											{districts.map((district) => (
												<SelectItem
													key={district.id}
													value={district.id}
												>
													{district.name} —{" "}
													{district.division}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>

								{/* Phone */}
								<div className="space-y-2">
									<Label
										htmlFor="phone"
										className="text-sm font-semibold text-slate-800"
									>
										Phone Number
										<span className="ml-1 text-xs font-normal text-slate-400">
											(Optional)
										</span>
									</Label>

									<Input
										id="phone"
										type="tel"
										inputMode="numeric"
										value={formData.phone}
										onChange={(event) =>
											updateField(
												"phone",
												event.target.value,
											)
										}
										placeholder="01XXXXXXXXX"
										maxLength={11}
										disabled={isSubmitting}
										className={inputClassName}
									/>
								</div>
							</div>

							{/* Address */}
							<div className="mt-5 space-y-2">
								<div className="flex items-center justify-between gap-3">
									<Label
										htmlFor="address"
										className="text-sm font-semibold text-slate-800"
									>
										Service Address
										<span className="ml-1 text-red-500">
											*
										</span>
									</Label>

									<span className="text-xs text-slate-400">
										{formData.address.length}/500
									</span>
								</div>

								<Textarea
									id="address"
									value={formData.address}
									onChange={(event) =>
										updateField(
											"address",
											event.target.value,
										)
									}
									placeholder="Enter the full address where the service is needed"
									rows={4}
									maxLength={500}
									disabled={isSubmitting}
									className="resize-none rounded-lg border-slate-200 bg-white text-sm shadow-none placeholder:text-slate-400 focus-visible:border-sky-500 focus-visible:ring-4 focus-visible:ring-sky-500/10"
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Actions */}
				<div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
					<Button
						type="button"
						variant="outline"
						onClick={() =>
							router.push(
								"/dashboard/customer/my-services",
							)
						}
						disabled={isSubmitting}
						className="h-10 rounded-lg border-slate-200 px-5 text-sm font-medium text-slate-600 shadow-none hover:bg-slate-50 hover:text-slate-900"
					>
						Cancel
					</Button>

					<Button
						type="submit"
						disabled={
							isSubmitting || districts.length === 0
						}
						className="h-10 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm hover:bg-sky-700"
					>
						{isSubmitting ? (
							<>
								<LoaderCircle className="size-4 animate-spin" />
								Submitting...
							</>
						) : (
							"Submit Request"
						)}
					</Button>
				</div>
			</div>
		</form>
	);
}