import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const spinnerVariants = cva(
	"aspect-square block rounded-full border-2 border-r-transparent animate-spin",
	{
		variants: {
			variant: {
				default: "border-secondary border-r-transparent",
				secondary: "border-primary border-r-transparent",
			},
			size: {
				default: "w-5",
				sm: "w-4",
				lg: "h-6",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface SpinnerProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof spinnerVariants> {}

const Spinner = ({ className, variant, size, ...props }: SpinnerProps) => {
	return (
		<div
			className={cn(spinnerVariants({ variant, size, className }))}
			{...props}
		></div>
	);
};

export default Spinner;
