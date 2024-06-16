"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import Spinner from "../custom/Spinner";

type SubmitButtonProps = {
	loading?: boolean;
} & PropsWithChildren;

const SubmitButton = ({ children, loading = false }: SubmitButtonProps) => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			className="w-full"
			aria-disabled={pending || loading}
			disabled={pending || loading}
		>
			{pending || loading ? <Spinner /> : children}
		</Button>
	);
};

export default SubmitButton;
