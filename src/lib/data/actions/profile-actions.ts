"use server";

import QueryString from "qs";
import { mutateData } from "../services/mutate-data";
import { flattenAttributes } from "@/lib/utils";

export const updateUserProfileAction = async (
	userId: string,
	prevState: any,
	formData: FormData
) => {
	const rawData = Object.fromEntries(formData);

	const query = QueryString.stringify({
		populate: "*",
	});

	const payload = {
		firstName: rawData.firstName,
		lastName: rawData.lastName,
		bio: rawData.bio,
	};

	console.log("############################");
	console.log(payload);
	console.log("############################");

	const responseData = await mutateData(
		"PUT",
		`/api/users/${userId}?${query}`,
		payload
	);

	if (!responseData) {
		return {
			...prevState,
			strapiErrors: null,
			message: "Ops! Something went wrong. Please try again.",
		};
	}

	if (responseData.error) {
		return {
			...prevState,
			strapiErrors: responseData.error,
			message: "Failed to Update.",
		};
	}

	const flattenedData = flattenAttributes(responseData);

	return {
		...prevState,
		message: "Profile Updated",
		data: flattenedData,
		strapiError: null,
	};
};
