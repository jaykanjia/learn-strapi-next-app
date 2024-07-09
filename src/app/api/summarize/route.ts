import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { getUserMe } from "@/lib/data/services/get-user-me";
import { getAuthToken } from "@/lib/data/services/get-token";
import { NextRequest } from "next/server";
import { fetchTranscript } from "@/lib/youtube-transcript";

const TEMPLATE = `
INSTRUCTIONS: 
  For the this {text} complete the following steps.
  Generate the title for based on the content provided
  Summarize the following content and include 5 key topics, writing in first person using normal tone of voice.
  
  Write a youtube video description
    - Include heading and sections.  
    - Incorporate keywords and key takeaways

  Generate bulleted list of key points and benefits

  Return possible and best recommended key words
`;

async function generateSummary(content: string, template: string) {
	const prompt = PromptTemplate.fromTemplate(template);

	console.log({ content });
	console.log({ template });
	console.log({ prompt });

	const model = new ChatOpenAI({
		openAIApiKey: process.env.OPENAI_API_KEY,
		modelName: process.env.OPENAI_MODEL ?? "gpt-4-turbo-preview",
		temperature: process.env.OPENAI_TEMPERATURE
			? parseFloat(process.env.OPENAI_TEMPERATURE)
			: 0.7,
		maxTokens: process.env.OPENAI_MAX_TOKENS
			? parseInt(process.env.OPENAI_MAX_TOKENS)
			: 4000,
	});

	const outputParser = new StringOutputParser();
	const chain = prompt.pipe(model).pipe(outputParser);

	try {
		const summary = await chain.invoke({ text: content });
		console.log({ summary });

		return summary;
	} catch (error) {
		console.log({ error });

		if (error instanceof Error)
			return new Response(JSON.stringify({ error: error.message }));
		return new Response(
			JSON.stringify({ error: "Failed to generate summary." })
		);
	}
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
		summary = await generateSummary(transformedData.text, TEMPLATE);
		return new Response(JSON.stringify({ data: summary, error: null }));
	} catch (error) {
		console.error("Error processing request:", error);
		if (error instanceof Error)
			return new Response(JSON.stringify({ error: error.message }));
		return new Response(JSON.stringify({ error: "Error generating summary." }));
	}
}
