export type DistrictStatus = "ACTIVE" | "INACTIVE";

export interface District {
	id: string;
	name: string;
	division: string;
	code: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	serviceRequests?: DistrictServiceRequest[];
}

export interface DistrictServiceRequest {
	id: string;
	serviceType: "PLUMBING" | "ELECTRICAL";
	serviceName: string;
	description: string;
	address: string;
	phone: string | null;
	serviceCharge: string | null;
	status:
		| "PENDING"
		| "ASSIGNED"
		| "IN_PROGRESS"
		| "COMPLETED"
		| "CANCELLED";
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface DistrictPayload {
	name: string;
	division: string;
	code: string;
	isActive?: boolean;
}

export interface DistrictsActionResult<T = undefined> {
	success: boolean;
	message: string;
	data?: T;
}

export interface DistrictsResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: District[];
}

export interface DistrictResponse {
	success: boolean;
	statusCode: number;
	message: string;
	data: District;
}