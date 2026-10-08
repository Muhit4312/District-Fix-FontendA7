import Link from "next/link";
import {
	CheckCircle2,
	Clock3,
	Files,
	LoaderCircle,
} from "lucide-react";

type ServiceStatCardProps = {
	title: string;
	value: number;
	href: string;
	iconType:
		| "all"
		| "pending"
		| "inProgress"
		| "completed";
	isActive?: boolean;
};

const cardStyles = {
	all: {
		icon: Files,
		iconClass:
			"bg-slate-100 text-slate-600",
		activeClass:
			"border-slate-300 bg-slate-50",
	},

	pending: {
		icon: Clock3,
		iconClass:
			"bg-amber-50 text-amber-600",
		activeClass:
			"border-amber-200 bg-amber-50/40",
	},

	inProgress: {
		icon: LoaderCircle,
		iconClass:
			"bg-sky-50 text-sky-600",
		activeClass:
			"border-sky-200 bg-sky-50/40",
	},

	completed: {
		icon: CheckCircle2,
		iconClass:
			"bg-emerald-50 text-emerald-600",
		activeClass:
			"border-emerald-200 bg-emerald-50/40",
	},
};

export default function ServiceStatCard({
	title,
	value,
	href,
	iconType,
	isActive = false,
}: ServiceStatCardProps) {
	const config = cardStyles[iconType];
	const Icon = config.icon;

	return (
		<Link
			href={href}
			className={`group flex items-start gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${
				isActive
					? config.activeClass
					: "border-slate-200/80"
			}`}
		>
			<div
				className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${config.iconClass}`}
			>
				<Icon className="size-5" />
			</div>

			<div className="min-w-0 flex-1">
				<p className="text-sm font-medium leading-5 text-slate-500">
					{title}
				</p>

				<p className="mt-0.5 text-2xl font-bold leading-7 tracking-tight text-slate-900">
					{value}
				</p>

				<p className="mt-1 text-xs text-slate-400 transition-colors group-hover:text-slate-500">
					View services
				</p>
			</div>
		</Link>
	);
}