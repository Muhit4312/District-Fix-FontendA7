import type { ReactNode } from "react";

type ServiceCardProps = {
	icon: ReactNode;
	title: string;
	description: string;
};

export function ServiceCard({
	icon,
	title,
	description,
}: ServiceCardProps) {
	return (
		<div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition-colors hover:bg-white/15">
			<div className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white">
				{icon}
			</div>

			<div>
				<p className="text-sm font-semibold text-white">{title}</p>

				<p className="text-xs text-sky-100">{description}</p>
			</div>
		</div>
	);
}