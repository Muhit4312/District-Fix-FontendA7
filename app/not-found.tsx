import Link from "next/link";
import { Home, ShieldAlert } from "lucide-react";

export default function NotFound() {
	return (
		<main className="flex min-h-screen items-center justify-center bg-sky-50 px-6">
			<div className="w-full max-w-lg text-center">
				<div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-2xl bg-sky-100">
					<ShieldAlert className="size-10 text-sky-600" />
				</div>

				<p className="text-sm font-semibold uppercase tracking-widest text-sky-600">
					404 Error
				</p>

				<h1 className="mt-2 text-4xl font-bold text-slate-900 sm:text-5xl">
					Page Not Found
				</h1>

				<p className="mx-auto mt-4 max-w-md leading-7 text-slate-600">
					The page you're looking for doesn't exist or you don't
					have permission to access it.
				</p>

				<Link
					href="/"
					className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-sky-600 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
				>
					<Home className="size-4" />
					Back to Home
				</Link>

				<p className="mt-8 text-sm text-slate-500">
					Need help?{" "}
					<Link
						href="/contact"
						className="font-medium text-sky-600 hover:underline"
					>
						Contact DistrictFix
					</Link>
				</p>
			</div>
		</main>
	);
}