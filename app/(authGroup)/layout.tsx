import { Header } from "@/components/shared/navbar";
import { getMe } from "@/service/getMe";

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {

    const user = await getMe();
    return (
        <div>
            <Header user={user} ></Header>
            {children}
        </div>
    )

}