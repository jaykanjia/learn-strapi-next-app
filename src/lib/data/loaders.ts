import { BASE_URL, fetchData } from ".";

export async function getSummaries() {
	return await fetchData(`${BASE_URL}/api/summaries`);
}

export async function getSummaryById(summaryId: string) {
	return await fetchData(`${BASE_URL}/api/summaries/${summaryId}`);
}
