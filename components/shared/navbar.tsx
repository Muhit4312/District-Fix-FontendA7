"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    ArrowRight,
    House,
    LogOut,
    Menu,
    Phone,
    ShieldCheck,
    UserRound,
    X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { logout } from "@/service/logout";
import { UserResponse } from "@/types/user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Logo } from "./logo";

const navLinks = [
    {
        label: "Home",
        href: "/",
        icon: House,
    },
    {
        label: "About Us",
        href: "/about",
    },
    {
        label: "Services",
        href: "/services",
    },
    
    {
        label: "Contact Us",
        href: "/contact",
        icon: Phone,
    },
];

const dashboardByRole = {
    CUSTOMER: "/dashboard/customer",
    PLUMBER: "/dashboard/worker",
    ELECTRICIAN: "/dashboard/worker",
    SERVICE_HOLDER: "/dashboard/service-holder",
    ADMIN: "/dashboard/admin",
    SUPER_ADMIN: "/dashboard/admin",
} as const;

export function Header({ user }: { user?: UserResponse }) {
    const pathname = usePathname();
    const router = useRouter();

    const [mobileOpen, setMobileOpen] = useState(false);

    const currentUser = user?.success ? user.data : undefined;

    const isLoggedIn = Boolean(currentUser);

    const dashboardUrl = currentUser
        ? dashboardByRole[currentUser.role]
        : "/login";

    const userName = currentUser?.name || "User";
    const userEmail = currentUser?.email || "";

    const userAvatar =
        currentUser?.profile?.avatar || currentUser?.imageUrl || "";

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    const handleMobileClose = () => {
        setMobileOpen(false);
    };

    const handleLogout = async () => {
        try {
            await logout();

            handleMobileClose();

            toast.success("Logged out successfully");

            router.push("/login");
            router.refresh();
        } catch {
            toast.error("Failed to logout. Please try again.");
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
            <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
                {/* Logo */}

                <Logo variant="light"></Logo>

                {/* Desktop Navigation */}

                <div className="hidden items-center gap-1 lg:flex">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                                    active
                                        ? "text-sky-600"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                }`}
                            >
                                {Icon && <Icon className="size-4" />}

                                {link.label}

                                {active && (
                                    <span className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-sky-600" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Desktop Actions */}

                <div className="hidden items-center gap-3 lg:flex">
                    {isLoggedIn ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-3 outline-none transition-colors hover:border-sky-200 hover:bg-sky-50">
                                <div className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-sky-100">
                                    {userAvatar ? (
                                        <img
                                            src={userAvatar}
                                            alt={userName}
                                            className="size-full object-cover"
                                        />
                                    ) : (
                                        <UserRound className="size-4 text-sky-600" />
                                    )}
                                </div>

                                <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
                                    {userName}
                                </span>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent
                                align="end"
                                className="w-72 rounded-xl border-slate-200 p-2 shadow-xl"
                            >
                                {/* User Information */}

                                <DropdownMenuLabel className="px-3 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100">
                                            {userAvatar ? (
                                                <img
                                                    src={userAvatar}
                                                    alt={userName}
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                <UserRound className="size-5 text-sky-600" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {userName}
                                            </p>

                                            <p className="truncate text-xs font-normal text-slate-500">
                                                {userEmail}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>

                                <DropdownMenuSeparator />

                                {/* Profile */}

                                <Link
                                    href="/profile"
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600"
                                >
                                    <UserRound className="size-4" />
                                    Profile
                                </Link>

                                {/* Dashboard */}

                                <Link
                                    href={dashboardUrl}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600"
                                >
                                    <House className="size-4" />
                                    Dashboard
                                </Link>

                                {/* Logout */}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                >
                                    <LogOut className="size-4" />
                                    Logout
                                </button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="inline-flex h-10 items-center gap-2 rounded-lg border border-sky-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                            >
                                <UserRound className="size-4" />
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="group inline-flex h-10 items-center gap-2 rounded-lg bg-sky-600 px-5 text-sm font-semibold text-white shadow-sm shadow-sky-600/20 transition-all hover:bg-sky-700 hover:shadow-md hover:shadow-sky-600/20"
                            >
                                Get Started
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}

                <button
                    type="button"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="flex size-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition-colors hover:bg-slate-50 hover:text-sky-600 lg:hidden"
                    aria-label={mobileOpen ? "Close menu" : "Open menu"}
                >
                    {mobileOpen ? (
                        <X className="size-5" />
                    ) : (
                        <Menu className="size-5" />
                    )}
                </button>
            </nav>

            {/* Mobile Navigation */}

            {mobileOpen && (
                <div className="border-t border-slate-200 bg-white lg:hidden">
                    <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
                        <div className="space-y-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                const active = isActive(link.href);

                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={handleMobileClose}
                                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                                            active
                                                ? "bg-sky-50 text-sky-600"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                        }`}
                                    >
                                        {Icon && (
                                            <Icon className="size-4" />
                                        )}

                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="mt-4 border-t border-slate-100 pt-4">
                            {isLoggedIn ? (
                                <div className="space-y-2">
                                    {/* User Info */}

                                    <div className="mb-2 flex items-center gap-3 rounded-lg bg-sky-50 px-4 py-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                                            {userAvatar ? (
                                                <img
                                                    src={userAvatar}
                                                    alt={userName}
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                <UserRound className="size-5 text-sky-600" />
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-semibold text-slate-900">
                                                {userName}
                                            </p>

                                            <p className="truncate text-xs text-slate-500">
                                                {userEmail}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Profile */}

                                    <Link
                                        href="/profile"
                                        onClick={handleMobileClose}
                                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600"
                                    >
                                        <UserRound className="size-4" />
                                        Profile
                                    </Link>

                                    {/* Dashboard */}

                                    <Link
                                        href={dashboardUrl}
                                        onClick={handleMobileClose}
                                        className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-sky-50 hover:text-sky-600"
                                    >
                                        <House className="size-4" />
                                        Dashboard
                                    </Link>

                                    {/* Logout */}

                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                                    >
                                        <LogOut className="size-4" />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-3">
                                    <Link
                                        href="/login"
                                        onClick={handleMobileClose}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-sky-200 hover:bg-sky-50 hover:text-sky-600"
                                    >
                                        <UserRound className="size-4" />
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={handleMobileClose}
                                        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-sky-700"
                                    >
                                        Get Started
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}