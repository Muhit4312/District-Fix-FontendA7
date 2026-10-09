import { LoaderCircle } from "lucide-react";

export default function WorkerLoading() {
	return (
		<div className="flex min-h-[50vh] items-center justify-center">
			<LoaderCircle className="size-8 animate-spin text-sky-600" />
		</div>
	);
}