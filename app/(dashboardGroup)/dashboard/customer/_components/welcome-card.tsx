import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

type WelcomeCardProps = {
	name: string;
};

export default function WelcomeCard({
	name,
}: WelcomeCardProps) {
	return (
		<section className="rounded-2xl border bg-white p-6 shadow-sm">
			<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
				<div>
					{/* <p className="text-sm font-medium text-sky-600">
						Welcome back
					</p> */}

					<h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
						Welcome, {name}
					</h1>

					<p className="mt-2 text-sm text-slate-500">
						Manage your home service requests from
						your dashboard.
					</p>
				</div>

				<Link href="/dashboard/customer/create-service">
					<Button className="bg-sky-600 hover:bg-sky-700">
						<Plus className="size-4" />
						Create Service
					</Button>
				</Link>
			</div>
		</section>
	);
}