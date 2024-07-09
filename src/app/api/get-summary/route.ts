import { getUserMe } from "@/lib/data/services/get-user-me";
import { getAuthToken } from "@/lib/utils";
import { fetchTranscript } from "@/lib/youtube-transcript";
import { NextRequest } from "next/server";

async function generateSummary(text: string) {
	const url: string = process.env.RAPID_API_URL!;

	const headers = new Headers();
	headers.set("X-RapidAPI-Key", process.env.RAPID_API_KEY!);
	headers.set("X-RapidAPI-Host", "chatgpt-42.p.rapidapi.com");
	headers.set("Content-Type", "application/json");

	const options = {
		method: "POST",
		headers: headers,
		body: JSON.stringify({
			messages: [
				{
					role: "user",
					content: text,
				},
			],
			system_prompt: "",
			temperature: 0.9,
			top_k: 5,
			top_p: 0.9,
			max_tokens: 256,
			web_access: false,
		}),
	};

	const response = await fetch(url, options);
	const { result, message } = await response.json();
	if (!result) {
		throw new Error(message);
	}
	console.log({ final_summary: result });
	return result;
}

function transformData(data: any[]) {
	let text = "";

	data.forEach((item) => {
		text += item.text + " ";
	});

	return {
		data: data,
		text: text.trim(),
	};
}

export async function POST(req: NextRequest) {
	const user = await getUserMe();
	const token = await getAuthToken();

	if (!user.ok || !token)
		return new Response(
			JSON.stringify({ data: null, error: "Not authenticated" }),
			{ status: 401 }
		);

	if (user.data.credits < 1)
		return new Response(
			JSON.stringify({
				data: null,
				error: "Insufficient credits",
			}),
			{ status: 402 }
		);

	console.log("FROM OUR ROUTE HANDLER:", req.body);
	const body = await req.json();
	const videoId = body.videoId;

	let transcript: Awaited<ReturnType<typeof fetchTranscript>>;

	try {
		transcript = await fetchTranscript(videoId);
	} catch (error) {
		console.error("Error processing request:", error);
		if (error instanceof Error)
			return new Response(JSON.stringify({ error: error.message }));
		return new Response(JSON.stringify({ error: "Error getting transcript." }));
	}

	const transformedData = transformData(transcript);
	console.log("Transformed Data", transformedData.text);

	let summary: Awaited<ReturnType<typeof generateSummary>>;

	try {
		summary = await generateSummary(transformedData.text);
		return new Response(JSON.stringify({ data: summary, error: null }));
	} catch (error) {
		console.error("Error processing request:", error);
		if (error instanceof Error)
			return new Response(JSON.stringify({ error: error.message }));
		return new Response(JSON.stringify({ error: "Error generating summary." }));
	}
}
