import Link from "next/link";
import { Wrench } from "lucide-react";

type LoginBrandProps = {
	variant: "dark" | "light";
};

export function LoginBrand({ variant }: LoginBrandProps) {
	const isDark = variant === "dark";

	return (
		<Link
			href="/"
			className={`flex w-fit items-center gap-3 ${
				isDark ? "text-white" : "text-slate-900"
			}`}
		>
			<div
				className={`flex size-11 items-center justify-center rounded-xl shadow-lg ${
					isDark
						? "bg-white"
						: "bg-sky-600 shadow-sky-600/20"
				}`}
			>
				<Wrench
					className={`size-5 ${
						isDark ? "text-sky-600" : "text-white"
					}`}
				/>
			</div>

			<div>
				<p className="text-lg font-bold tracking-tight">
					DistrictFix
				</p>

				<p
					className={`text-xs ${
						isDark ? "text-sky-100" : "text-slate-500"
					}`}
				>
					Home Service Management
				</p>
			</div>
		</Link>
	);
}