import { Header } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function DashboardContent({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = await getMe();

    return (
        <div>
            <Header user={user} />
            {children}
        </div>
    );
}