"use client";

import Link from "next/link";

import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
	Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StrapiErrors } from "@/components/custom/StrapiErrors";
import { useFormState } from "react-dom";
import { loginUserAction } from "@/lib/data/actions/auth-actions";
import { ZodErrors } from "@/components/custom/ZodErrors";
import SubmitButton from "./SubmitButton";

const initialState = {
	zodErrors: null,
	strapiErrors: null,
	data: null,
	message: null,
};

const SigninForm = () => {
	const [formState, formAction] = useFormState(loginUserAction, initialState);

	return (
		<div className="w-full max-w-md">
			<form action={formAction}>
				<Card>
					<CardHeader className="space-y-1">
						<CardTitle className="text-3xl font-bold">Sign In</CardTitle>
						<CardDescription>
							Enter your details to sign in to your account
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email / Username</Label>
							<Input
								id="identifier"
								name="identifier"
								type="text"
								placeholder="username or email"
							/>
							<ZodErrors error={formState?.zodErrors?.identifier} />
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								name="password"
								type="password"
								placeholder="password"
							/>
							<ZodErrors error={formState?.zodErrors?.password} />
						</div>
					</CardContent>
					<CardFooter className="flex flex-col">
						<SubmitButton>Sign In</SubmitButton>
						<StrapiErrors error={formState?.strapiErrors} />
					</CardFooter>
				</Card>
				<div className="mt-4 text-center text-sm">
					Don&apos;t have an account?
					<Link className="underline ml-2" href="signup">
						Sign Up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SigninForm;
