import Link from "next/link";
import { Logo } from "@/components/custom/Logo";
import { Button } from "@/components/ui/button";
import { getUserMe } from "@/lib/data/services/get-user-me";
import LoggedInUser from "./LoggedInUser";
import { SummaryForm } from "@/components/forms/SummaryForm";

interface HeaderProps {
	data: {
		logoText: {
			id: number;
			text: string;
			url: string;
		};
		ctaButton: {
			id: number;
			text: string;
			url: string;
		};
	};
}

const Header = async ({ data }: Readonly<HeaderProps>) => {
	const user = await getUserMe();
	const { logoText, ctaButton } = data;
	return (
		<div className="flex items-center justify-between px-4 py-3 bg-white shadow-md dark:bg-gray-800">
			<Logo text={logoText.text} />
			{user.ok && <SummaryForm />}
			<div className="flex items-center gap-4">
				{user.ok ? (
					<LoggedInUser userData={user.data} />
				) : (
					<Link href={ctaButton.url}>
						<Button>{ctaButton.text}</Button>
					</Link>
				)}
			</div>
		</div>
	);
};

export default Header;
