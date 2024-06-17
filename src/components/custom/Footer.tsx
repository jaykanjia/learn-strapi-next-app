import Link from "next/link";
import { Logo } from "@/components/custom/Logo";
import { TwitterIcon, YoutubeIcon, GithubIcon } from "@/components/icons";

interface SocialLink {
	id: number;
	text: string;
	url: string;
}

interface FooterProps {
	data: {
		logoText: {
			id: number;
			text: string;
			url: string;
		};
		text: string;
		socialLinks: SocialLink[];
	};
}

function selectSocialIcon(url: string) {
	if (url.includes("youtube")) return <YoutubeIcon className="h-6 w-6" />;
	if (url.includes("twitter")) return <TwitterIcon className="h-6 w-6" />;
	if (url.includes("github")) return <GithubIcon className="h-6 w-6" />;
	return null;
}

export function Footer({ data }: Readonly<FooterProps>) {
	const { logoText, socialLinks, text } = data;
	return (
		<footer className="dark bg-gray-900 text-white py-8">
			<div className="mx-auto flex flex-col gap-4 md:flex-row items-center justify-between">
				<Logo dark text={logoText.text} />
				<p className="text-sm text-gray-300">{text}</p>
				<div className="flex items-center space-x-4">
					{socialLinks &&
						socialLinks?.map((link) => {
							return (
								<Link
									key={link.id}
									className="text-white hover:text-gray-300"
									href={link.url}
								>
									{selectSocialIcon(link.url)}
									<span className="sr-only">Visit us at {link.text}</span>
								</Link>
							);
						})}
				</div>
			</div>
		</footer>
	);
}
