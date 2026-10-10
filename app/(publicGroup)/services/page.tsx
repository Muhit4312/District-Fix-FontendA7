
import type { Metadata } from "next";
import { ServicesHero } from "./_components/services-hero";
import { ServicesList } from "./_components/services-list";
import { ServicesCta } from "./_components/services-cta";
import { HowToRequest } from "./_components/how-to-request";



export const metadata: Metadata = {
	title: "Home Services | DistrictFix",
	description:
		"Explore plumbing and electrical home services through DistrictFix.",
};

export default function ServicesPage() {
	return (
		<main className="flex-1 bg-white">
			<ServicesHero />
			<ServicesList />
            <HowToRequest />
			<ServicesCta />
		</main>
	);
}
