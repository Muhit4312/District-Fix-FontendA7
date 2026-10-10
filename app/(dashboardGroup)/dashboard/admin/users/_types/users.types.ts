export type UserRole =
	| "CUSTOMER"
	| "PLUMBER"
	| "ELECTRICIAN"
	| "SERVICE_HOLDER"
	| "ADMIN"
	| "SUPER_ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "SUSPENDED";

export type AuthProvider = "CREDENTIALS" | "GOOGLE";

export interface AdminUser {
	id: string;
	name: string;
	email: string;
	phone?: string | null;
	googleId: string | null;
	authProvider: AuthProvider;
	role: UserRole;
	status: UserStatus;
	emailVerified: boolean;
	needPasswordChange: boolean;
	imageUrl: string | null;
	imagePublicId: string | null;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
}

export interface UsersMeta {
	page: number;
	limit: number;
	total: number;
	totalPages: number;
}

export interface UsersQuery {
	page?: number;
	limit?: number;
	searchTerm?: string;
	role?: string;
	status?: string;
	sortOrder?: "asc" | "desc";
}

export interface ApiResult<T> {
	success: boolean;
	statusCode: number;
	message: string;
	data: T;
	meta?: UsersMeta;
}

export interface UsersListResult {
	users: AdminUser[];
	meta: UsersMeta;
	message?: string;
	error?: string;
}

export interface UserResult {
	user: AdminUser | null;
	message?: string;
	error?: string;
}