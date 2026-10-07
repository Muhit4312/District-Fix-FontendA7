export type UserRole =
    | "CUSTOMER"
    | "PLUMBER"
    | "ELECTRICIAN"
    | "SERVICE_HOLDER"
    | "ADMIN"
    | "SUPER_ADMIN";

export type UserStatus = "ACTIVE" | "BLOCKED" | "DELETED";

export type AuthProvider = "CREDENTIALS" | "GOOGLE";

export type UserProfile = {
    id: string;
    avatar: string | null;
    phone: string | null;
    bio: string | null;
    address: string | null;
    createdAt: string;
    updatedAt: string;
    userId: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    googleId: string | null;
    authProvider: AuthProvider;
    role: UserRole;
    status: UserStatus;
    emailVerified: boolean;
    needPasswordChange: boolean;
    imageUrl: string;
    imagePublicId: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    profile: UserProfile;
};

export type UserResponse = {
    success: boolean;
    statusCode: number;
    message: string;
    data: User;
};