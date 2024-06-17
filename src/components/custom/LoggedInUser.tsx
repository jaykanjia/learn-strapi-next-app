import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

interface AuthUserProps {
	username: string;
	email: string;
}

const LoggedInUser = ({ userData }: { readonly userData: AuthUserProps }) => {
	return (
		<div className="flex gap-2">
			<Link
				href="/dashboard/account"
				className="font-semibold hover:text-primary"
			>
				{userData.username}
			</Link>
			<LogoutButton />
		</div>
	);
};

export default LoggedInUser;
