export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white">
            <div className="w-full max-w-xs px-6">
                <div className="mb-5 flex justify-center">
                    <div className="size-9 animate-pulse rounded-xl bg-sky-100" />
                </div>

                <div className="space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-slate-100" />
                    <div className="mx-auto h-3 w-4/5 animate-pulse rounded-full bg-slate-100" />
                    <div className="mx-auto h-3 w-3/5 animate-pulse rounded-full bg-slate-100" />
                </div>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Loading...
                </p>
            </div>
        </main>
    );
}