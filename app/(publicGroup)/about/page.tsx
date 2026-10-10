
import type { Metadata } from "next";
import { AboutHero } from "./_components/about-hero";
import { AboutMissionVision } from "./_components/about-mission-vision";
import { AboutValues } from "./_components/about-values";
import { AboutHowItWorks } from "./_components/about-how-it-works";


export const metadata: Metadata = {
	title: "About Us | DistrictFix",
	description:
		"Learn about DistrictFix and how our district-based home service platform helps coordinate customers and local service professionals.",
};

export default function AboutPage() {
	return (
		<main className="flex-1 bg-white">
			<AboutHero />
			<AboutMissionVision />
			<AboutValues />
			<AboutHowItWorks />
			
		</main>
	);
}
