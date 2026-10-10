import { HeroSection } from "./_components/hero-section";
import { HomeCta } from "./_components/home-cta";
import { HowItWorks } from "./_components/how-it-works";
import { ServicesSection } from "./_components/services-section";
import { WhyChooseUs } from "./_components/why-choose-us";



export default function HomePage() {
	return (
		<>
			<HeroSection />
			<ServicesSection />
			<HowItWorks />
			<WhyChooseUs />
			<HomeCta />
		</>
	);
}
