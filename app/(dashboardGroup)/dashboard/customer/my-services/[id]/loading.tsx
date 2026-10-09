import { LoaderCircle } from "lucide-react";

export default function MyServicesLoading() {
	return (
		<div className="flex min-h-[60vh] items-center justify-center">
			<LoaderCircle className="size-8 animate-spin text-sky-600" />
		</div>
	);
}