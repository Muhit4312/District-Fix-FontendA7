
import type {
	ServiceRequest,
	ServiceRequestStatus,
	ServiceType,
} from "@/types/service-request";

// ==================== Worker Types ====================

export type WorkerStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type WorkerType = "PLUMBER" | "ELECTRICIAN";

export type JobStatus = ServiceRequestStatus;

export type WorkerJobTab =
	| "ALL"
	| "PENDING"
	| "ASSIGNED"
	| "ACCEPTED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "OTHER";

export type JobsMeta = {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
};

// ==================== Worker Profile ====================

export type WorkerProfile = {
	id: string;
	userId: string;
	districtId: string;
	workerType: WorkerType;
	businessName: string | null;
	phone: string;
	address: string;
	experience: string | null;
	bio: string | null;
	status: WorkerStatus;
	approvedAt: string;
	createdAt: string;
	updatedAt: string;

	user: {
		id: string;
		name: string;
		email: string;
		role: string;
		status: string;
		imageUrl: string;
	};

	district: {
		id: string;
		name: string;
		division: string;
		code: string;
		isActive: boolean;
	};
};

export type WorkerProfileResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: WorkerProfile;
};

// ==================== Existing Worker Services ====================


export type WorkerService = ServiceRequest & {
	customer: {
		id: string;
		name: string;
		email: string;
		phone?: string | null;
		imageUrl?: string | null;
	};

	serviceHolder: unknown | null;
};

export type WorkerAssignedServicesResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: {
		data: WorkerService[];
		meta: JobsMeta;
	};
};

export type GetMyAssignedServicesParams = {
	page?: number;
	limit?: number;
	status?: JobStatus;
	searchTerm?: string;
	serviceType?: ServiceType | "";
	sortBy?: string;
	sortOrder?: "asc" | "desc";
};

export type JobsResult = {
	success: boolean;
	message: string;
	data: WorkerService[];
	meta: JobsMeta;
};

export type WorkerJobAction = {
	serviceId: string;
	status: ServiceRequestStatus;
};

// ==================== Worker Profile Update ====================

export type UpdateWorkerProfilePayload = {
	workerType?: WorkerType;
	businessName?: string | null;
	phone?: string;
	address?: string;
	experience?: string | null;
	bio?: string | null;
};

// ==================== Customer Types ====================

export type ServiceCustomer = {
	id: string;
	name: string;
	email: string;
	googleId: string | null;
	authProvider: "CREDENTIALS" | "GOOGLE";
	role: "CUSTOMER";
	status: string;
	emailVerified: boolean;
	needPasswordChange: boolean;
	imageUrl: string;
	imagePublicId: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};

export type WorkerCustomer = {
	id: string;
	name: string;
	email: string;
	googleId: string | null;
	authProvider: "CREDENTIALS" | "GOOGLE";
	role: "CUSTOMER";
	status: "ACTIVE" | "BLOCKED";
	emailVerified: boolean;
	needPasswordChange: boolean;
	imageUrl: string;
	imagePublicId: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};

// ==================== Single Assigned Service Types ====================

export type WorkerDistrict = {
	id: string;
	name: string;
	division: string;
	code: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
};

export type AssignedServiceHolder = {
	id: string;
	name?: string;
	email?: string;
};

export type AssignedService = {
	id: string;
	serviceType: ServiceType;
	serviceName: string;
	description: string;
	address: string;
	phone: string | null;
	serviceCharge: string | null;

	status:
		| "PENDING"
		| "ASSIGNED"
		| "ACCEPTED"
		| "IN_PROGRESS"
		| "COMPLETED"
		| "CANCELLED"
		| "REJECTED";

	cancellationReason: string | null;
	rejectionReason: string | null;

	assignedAt: string | null;
	startedAt: string | null;
	acceptedAt: string | null;
	rejectedAt: string | null;
	completedAt: string | null;
	cancelledAt: string | null;

	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;

	customerId: string;
	districtId: string;
	serviceHolderId: string | null;
	workerId: string | null;
	rejectWorkerId: string | null;

	customer: WorkerCustomer;
	district: WorkerDistrict;
	serviceHolder: AssignedServiceHolder | null;
};

export type SingleAssignedServiceResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: AssignedService;
};

