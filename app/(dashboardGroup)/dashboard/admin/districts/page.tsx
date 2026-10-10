import { getDistrictOptions } from "./_actions/districts.action";
import { DistrictsManager } from "./_components/district-manager";
import { DistrictsHeader } from "./_components/districts-header";


export default async function DistrictsPage() {
	const result = await getDistrictOptions();

	return (
		<div className="space-y-6 p-4 sm:p-6 lg:p-8">
			<DistrictsHeader />

			{result.success && result.data ? (
				<DistrictsManager initialDistricts={result.data} />
			) : (
				<div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
					<h2 className="font-semibold text-destructive">
						Unable to load districts
					</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						{result.message}
					</p>
				</div>
			)}
		</div>
	);
}
