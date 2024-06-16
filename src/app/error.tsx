"use client";

import { BugIcon } from "@/components/icons";
import { useEffect } from "react";

const ErrorPage = ({ error }: { error: Error & { digest?: string } }) => {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900">
			<div className="space-y-4">
				<BugIcon className="h-24 w-24 text-pink-500 dark:text-pink-400" />
				<h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
					Oops! Something went wrong.
				</h1>
				<p className="text-lg text-gray-700 dark:text-gray-300">
					This is an error page. Please try again later.
				</p>
				<p className="text-pink-800 italic">{error.message}</p>
			</div>
		</div>
	);
};

export default ErrorPage;
