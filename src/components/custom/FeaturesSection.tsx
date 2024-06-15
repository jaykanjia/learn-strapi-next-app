type FeaturesSectionProps = {
	id: number;
	__component: string;
	title: string;
	description: string;
	features: FeatureProps[];
};

type FeatureProps = {
	id: number;
	heading: string;
	subHeading: string;
	icon: "CLOCK_ICON" | "CHECK_ICON" | "CLOUD_ICON";
};

function getIcon(name: string) {
	switch (name) {
		case "CLOCK_ICON":
			return <ClockIcon className="w-12 h-12 mb-4 text-gray-900" />;
		case "CHECK_ICON":
			return <CheckIcon className="w-12 h-12 mb-4 text-gray-900" />;
		case "CLOUD_ICON":
			return <CloudIcon className="w-12 h-12 mb-4 text-gray-900" />;
		default:
			return null;
	}
}

const FeatureCard = ({ feature }: { feature: FeatureProps }) => {
	return (
		<div className="flex flex-col items-center text-center">
			{getIcon(feature.icon)}
			<h2 className="mb-4 text-2xl font-bold">{feature.heading}</h2>
			<p className="text-gray-500">{feature.subHeading}</p>
		</div>
	);
};

export function FeatureSection({
	data,
}: {
	readonly data: FeaturesSectionProps;
}) {
	return (
		<div className="flex-1">
			<section className="container px-4 py-6 mx-auto md:px-6 lg:py-24">
				<div className="grid gap-8 md:grid-cols-3">
					{data?.features?.map((feature) => (
						<FeatureCard key={feature.id} feature={feature} />
					))}
				</div>
			</section>
		</div>
	);
}

function CheckIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}

function ClockIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="10" />
			<polyline points="12 6 12 12 16 14" />
		</svg>
	);
}

function CloudIcon(props: any) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
		</svg>
	);
}
