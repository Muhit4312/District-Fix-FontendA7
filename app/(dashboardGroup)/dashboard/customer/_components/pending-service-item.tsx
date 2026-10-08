import Link from "next/link";
import {
	ArrowUpRight,
	MapPin,
	Wrench,
} from "lucide-react";

import type { ServiceRequest } from "@/types/service-request";

type PendingServiceItemProps = {
	service: ServiceRequest;
};

export default function PendingServiceItem({
	service,
}: PendingServiceItemProps) {
	return (
		<Link
			href={`/dashboard/customer/services/${service.id}`}
			className="block px-5 py-4 transition hover:bg-slate-50"
		>
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="min-w-0">
					<div className="flex items-center gap-2">
						<div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
							<Wrench className="size-4" />
						</div>

						<div className="min-w-0">
							<h3 className="truncate text-sm font-semibold text-slate-900">
								{service.serviceName}
							</h3>

							<div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
								<MapPin className="size-3.5 shrink-0" />

								<span className="truncate">
									{service.district.name}
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-between gap-4 sm:justify-end">
					<span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
						Pending
					</span>

					<ArrowUpRight className="size-4 text-slate-400" />
				</div>
			</div>
		</Link>
	);
}