"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "../custom/Spinner";
import { cn } from "@/lib/utils";

type SubmitButtonProps = {
	loading?: boolean;
	className?: string;
} & PropsWithChildren;

const SubmitButton = ({
	children,
	loading = false,
	className,
}: SubmitButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className={cn("w-full", {
				[`${className}`]: !!className,
			})}
			aria-disabled={pending || loading}
			disabled={pending || loading}
		>
			{pending || loading ? <Spinner /> : children}
		</Button>
	);
};

export default SubmitButton;
