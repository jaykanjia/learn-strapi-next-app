import { HeroSection } from "@/components/custom/HeroSection";
import { FeatureSection } from "@/components/custom/FeaturesSection";
import { getHomePageData } from "@/lib/data";
import { getStrapiMedia } from "@/lib/utils";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
	// fetch data
	const data = await getHomePageData();

	return {
		title: data.title,
		description: data.description,
		openGraph: {
			images: [getStrapiMedia(data?.image?.url) ?? ""],
		},
	};
}

function blockRenderer(block: any) {
	switch (block.__component) {
		case "layout.hero-section":
			return <HeroSection key={block.id} data={block} />;
		case "layout.features-section":
			return <FeatureSection key={block.id} data={block} />;
		default:
			return null;
	}
}

const Home = async () => {
	const data = await getHomePageData();

	const { blocks } = data;

	if (!blocks) return notFound();

	return <main>{blocks?.map((block: any) => blockRenderer(block))}</main>;
};

export default Home;
