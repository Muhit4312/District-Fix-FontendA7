
import { getMyService } from "./_actions/customer-single-service.action";
import CancelServiceDialog from "./_components/cancel-service-dialog";
import ServiceHeader from "./_components/service-header";
import ServiceInfo from "./_components/service-info";
import ServicePayment from "./_components/service-payment";
import ServiceTimeline from "./_components/service-timeline";

type ServiceDetailsPageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function ServiceDetailsPage({
    params,
}: ServiceDetailsPageProps) {
    const { id } = await params;

    const serviceResponse = await getMyService(id);
    const service = serviceResponse.data;

    return (
        <div className="space-y-6">
            <ServiceHeader service={service} />
            <ServicePayment service={service} />

            <ServiceInfo service={service} />

            <ServiceTimeline service={service} />
            
        </div>
    );
}