
export type WorkerType = "PLUMBER" | "ELECTRICIAN";


export type WorkerApplicationStatusType =
	| "PENDING"
	| "APPROVED"
	| "REJECTED";

export interface DistrictOption {
	id: string;
	name: string;
	division: string;
	code: string;
	isActive: boolean;
	createdAt?: string;
	updatedAt?: string;
}

export interface WorkerApplication {
	id: string;
	workerType: WorkerType;
	businessName: string | null;
	phone: string;
	address: string;
	experience: string | null;
	description: string | null;
	status: WorkerApplicationStatusType;
	rejectionReason: string | null;
	reviewedAt: string | null;
	createdAt: string;
	updatedAt: string;
	userId: string;
	districtId: string;
	reviewedById: string | null;
	district: DistrictOption;
	reviewer: {
		id: string;
		name: string;
		email: string;
	} | null;
}

export interface ActionResult<T> {
	success: boolean;
	message: string;
	data?: T;
}

export interface CreateWorkerApplicationPayload {
	workerType: WorkerType;
	phone: string;
	address: string;
	districtId: string;
	businessName?: string;
	experience?: string;
	description?: string;
}