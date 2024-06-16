import Link from "next/link";
import StrapiImage from "../custom/StrapiImage";

type HeroSectionProps = {
	id: number;
	__component: string;
	heading: string;
	subHeading: string | null;
	image: ImageProps;
	link: LinkProps;
};

export function HeroSection({ data }: { readonly data: HeroSectionProps }) {
	return (
		<section className="relative h-[600px] overflow-hidden py-0 px-0">
			<StrapiImage
				alt={data.image.alternativeText ?? "Background"}
				className="absolute inset-0 object-cover w-full h-full aspect/16:9"
				src={data.image.url}
				height={1080}
				width={1920}
			/>
			<div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-black bg-opacity-20">
				<h1 className="text-4xl font-bold md:text-5xl lg:text-6xl">
					{data.heading}
				</h1>
				<p className="mt-4 text-lg md:text-xl lg:text-2xl">{data.subHeading}</p>
				<Link
					className="mt-8 inline-flex items-center justify-center px-6 py-3 text-base font-medium text-black bg-white rounded-md shadow hover:bg-gray-100"
					href={data.link?.url}
				>
					{data.link?.text}
				</Link>
			</div>
		</section>
	);
}
