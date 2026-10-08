import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ServiceStatCardProps = {
    title: string;
    value: number;
    href: string;
    icon: LucideIcon;
    iconClassName: string;
};

export default function ServiceStatCard({
    title,
    value,
    href,
    icon: Icon,
    iconClassName,
}: ServiceStatCardProps) {
    return (
        <Link
	href={href}
	className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white px-5 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
>
	<div
		className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconClassName}`}
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
	</div>

	<div className="flex size-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors group-hover:bg-slate-50 group-hover:text-slate-600">
		<ArrowUpRight className="size-4" />
	</div>
</Link>
    );
}