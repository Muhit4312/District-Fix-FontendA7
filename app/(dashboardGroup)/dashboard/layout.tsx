import { Suspense } from "react";
import DashboardContent from "./_components/dashboard-content";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Suspense fallback={<DashboardLoading />}>
            <DashboardContent>{children}</DashboardContent>
        </Suspense>
    );
}

function DashboardLoading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50">
            <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                    <span className="size-2.5 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.3s]" />
                    <span className="size-2.5 animate-bounce rounded-full bg-sky-500 [animation-delay:-0.15s]" />
                    <span className="size-2.5 animate-bounce rounded-full bg-sky-500" />
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                    Loading DistrictFix
                </p>
            </div>
        </main>
    );
}