import Link from "next/link";
import {
	ArrowUpRight,
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
			className={`group flex items-start gap-4 rounded-2xl border bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md ${isActive
				? config.activeClass
				: "border-slate-200/80"
				}`}
		>
			<div className="min-w-0 flex-1">
				<p className="text-sm font-medium leading-5 text-slate-500">
					{title}{" "}
					<span className="font-bold text-slate-900">
						({value})
					</span>
				</p>

				<p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors group-hover:text-sky-600">
					View services
					<ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
				</p>
			</div>
		</Link>
	);
}