export default function AuthLayout({
	children,
}: {
	readonly children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900">
			{children}
		</section>
	);
}
