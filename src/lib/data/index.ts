import { flattenAttributes, getAuthToken, getStrapiURL } from "../utils";
import qs from "qs";

export const BASE_URL = getStrapiURL();

export const fetchData = async (path: string, query?: string) => {
	const authToken = getAuthToken();
	const options = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
	};
	try {
		const url = new URL(path, BASE_URL);
		if (query) url.search = query;

		const response = await fetch(url, {
			...options,
		});

		if (!response.ok) return;

		const data = await response.json();
		const flattenData = flattenAttributes(data);
		// console.dir(
		// 	{ path: path.replace(/\?.*/, ""), flattenData },
		// 	{ depth: null }
		// );

		return flattenData;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error; // or return null;
	}
};

export const getHomePageData = async () => {
	// method 1
	// const homePageQuery = "populate=image,blocks,blocks.image,blocks.link";
	// method 2
	// const homePageQuery =
	// 	"populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[blocks][populate][image][fields][0]=url&populate[blocks][populate][image][fields][1]=alternativeText&populate[blocks][populate][link][populate]=true";
	// method 3
	const homePageQuery = qs.stringify({
		populate: {
			image: {
				fields: ["url", "alternativeText"],
			},
			blocks: {
				populate: {
					image: {
						fields: ["url", "alternativeText"],
					},
					link: {
						populate: true,
					},
					features: {
						populate: true,
					},
				},
			},
		},
	});

	return await fetchData("/api/home-page", homePageQuery);
};

export const getGlobalData = async () => {
	// const globalDataQuery = qs.stringify({
	// 	populate: {
	// 		header: {
	// 			populate: {
	// 				logoText: {
	// 					populate: true,
	// 				},
	// 				ctaButton: {
	// 					populate: true,
	// 				},
	// 			},
	// 		},
	// 		footer: {
	// 			populate: {
	// 				logoText: {
	// 					populate: true,
	// 				},
	// 				socialLinks: {
	// 					populate: true,
	// 				},
	// 			},
	// 		},
	// 	},
	// });
	const globalDataQuery = qs.stringify({
		populate: [
			"header.logoText",
			"header.ctaButton",
			"footer.logoText",
			"footer.socialLinks",
		],
	});

	return await fetchData("/api/global", globalDataQuery);
};

export const getGlobalMetaData = async () => {
	const globalMetaDataQuery = qs.stringify({
		populate: {
			image: {
				fields: ["url", "alternativeText"],
			},
		},
		fields: ["title", "description"],
	});

	return await fetchData("/api/global", globalMetaDataQuery);
};
