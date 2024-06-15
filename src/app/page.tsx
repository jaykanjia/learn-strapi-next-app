import { Button } from "@/components/ui/button";
import { BASE_URL, getHomePageData } from "@/lib/data";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
	parent: ResolvingMetadata
): Promise<Metadata> {
	// fetch data
	const { data } = await getHomePageData();
	const { title, description, image } = data.attributes;
	const { url: imageUrl } = image.data.attributes;

	// optionally access and extend (rather than replace) parent metadata
	const previousImages = (await parent).openGraph?.images || [];

	return {
		title,
		description,
		openGraph: {
			images: [BASE_URL + imageUrl, ...previousImages],
		},
	};
}

export default async function Home() {
	const { data } = await getHomePageData();
	const { title, description, image } = data.attributes;
	const { url: imageUrl } = image.data.attributes;

	console.log({ title, description, imageUrl });

	return (
		<main>
			<section>
				<Button>Hello</Button>
			</section>
		</main>
	);
}
