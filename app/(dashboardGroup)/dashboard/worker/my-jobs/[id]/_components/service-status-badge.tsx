
import { Badge } from "@/components/ui/badge";
import type { ServiceRequestStatus } from "@/types/service-request";

interface ServiceStatusBadgeProps {
status: ServiceRequestStatus;
}

const statusStyles: Record<ServiceRequestStatus, string> = {
PENDING: "border-amber-200 bg-amber-50 text-amber-700",
ASSIGNED: "border-orange-200 bg-orange-50 text-orange-700",
ACCEPTED: "border-blue-200 bg-blue-50 text-blue-700",
IN_PROGRESS: "border-sky-200 bg-sky-50 text-sky-700",
COMPLETED: "border-emerald-200 bg-emerald-50 text-emerald-700",
CANCELLED: "border-gray-200 bg-gray-50 text-gray-700",
REJECTED: "border-red-200 bg-red-50 text-red-700",
};

export function ServiceStatusBadge({
status,
}: ServiceStatusBadgeProps) {
return ( <Badge variant="outline" className={statusStyles[status]}>
{status.replaceAll("_", " ")} </Badge>
);
}
