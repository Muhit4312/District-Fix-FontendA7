export type ServiceRequestStatus =
	| "PENDING"
	| "ASSIGNED"
	| "ACCEPTED"
	| "IN_PROGRESS"
	| "COMPLETED"
	| "CANCELLED"
	| "REJECTED";

export type ServiceType =
	| "PLUMBING"
	| "ELECTRICAL";

export type District = {
	id: string;
	name: string;
	division: string;
	code: string;
	isActive: boolean;
};

export type PaymentStatus =
	| "PENDING"
	| "COMPLETED"
	| "FAILED"
	| "CANCELLED";

export type PaymentMethod = "BKASH";

export type Payment = {
	id: string;
	amount: string;
	currency: string;
	status: PaymentStatus;
	paymentMethod: PaymentMethod;
	paidAt: string | null;
};

export type ServiceRequest = {
	id: string;
	serviceType: ServiceType;
	serviceName: string;
	description: string;
	address: string;
	phone: string | null;
	serviceCharge: string | null;
	status: ServiceRequestStatus;

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

	district: District;
	payment: Payment | null;
};

export type ServiceMeta = {
	page: number;
	limit: number;
	total: number;
	totalPage: number;
};

export type ServiceRequestResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: {
		data: ServiceRequest[];
		meta: ServiceMeta;
	};
};

export type SingleServiceRequestResponse = {
	success: boolean;
	statusCode: number;
	message: string;
	data: ServiceRequest;
};
