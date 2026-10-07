import Link from "next/link";
import { Wrench } from "lucide-react";

type LogoProps = {
	variant?: "dark" | "light";
};

export function Logo({ variant = "light" }: LogoProps) {
	const isDark = variant === "dark";

	return (
		<Link
			href="/"
			className={`flex w-fit items-center gap-3 ${
				isDark ? "text-white" : "text-slate-900"
			}`}
		>
			<div
				className={`flex size-10 items-center justify-center rounded-xl shadow-lg ${
					isDark
						? "bg-white shadow-white/10"
						: "bg-sky-600 shadow-sky-600/20"
				}`}
			>
				<Wrench
					className={`size-5 ${
						isDark ? "text-sky-600" : "text-white"
					}`}
				/>
			</div>

			<div className="leading-none">
				<p className="text-lg font-bold tracking-tight">
					District
					<span
						className={
							isDark ? "text-sky-200" : "text-sky-600"
						}
					>
						Fix
					</span>
				</p>

				<p
					className={`mt-1 text-[10px] font-medium uppercase tracking-[0.16em] ${
						isDark ? "text-sky-100" : "text-slate-500"
					}`}
				>
					Home Service Management
				</p>
			</div>
		</Link>
	);
}