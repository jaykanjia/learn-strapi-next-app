export const BASE_URL = process.env.base_url || "http://127.0.0.1:1337";

export const getStrapiData = async (path: string) => {
	try {
		const headers = {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.API_TOKEN}`,
			Accept: "application/json",
		};

		const response = await fetch(BASE_URL + path, {
			method: "GET",
			headers: headers,
		});

		if (!response.ok) return;

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getHomePageData = async () => {
	return await getStrapiData("/api/home-page?populate=*");
};
