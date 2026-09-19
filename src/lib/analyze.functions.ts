import { createServerFn } from "@tanstack/react-start";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText, Output } from "ai";
import { z } from "zod";
import { createLovableAiGatewayRunIdFetch } from "./ai-gateway.server";
import { FACE_SHAPE_IDS } from "./face-shapes";

const Input = z.object({
  image: z.string().min(32), // data URL
});

const ResultSchema = z.object({
  isFace: z.boolean(),
  message: z.string(),
  perceivedGender: z.enum(["men", "women", "unknown"]),
  observations: z.array(z.string()),
  probabilities: z.array(
    z.object({
      shape: z.enum(FACE_SHAPE_IDS as [string, ...string[]]),
      probability: z.number(),
    }),
  ),
});

export type AnalysisResult = z.infer<typeof ResultSchema>;

export const analyzeFace = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<AnalysisResult> => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const runIdFetch = createLovableAiGatewayRunIdFetch();
    const lovable = createOpenAI({
      baseURL: "https://ai.gateway.lovable.dev/v1",
      apiKey: key,
      headers: { "Lovable-API-Key": key, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
      fetch: runIdFetch.fetch,
    });

    const result = streamText({
      model: lovable.responses("openai/gpt-6-astra"),
      output: Output.object({ schema: ResultSchema }),
      providerOptions: {
        openai: {
          forceReasoning: true,
          reasoningEffort: "low",
          reasoningSummary: "auto",
          store: false,
          include: ["reasoning.encrypted_content"],
        },
      },
      instructions: [
        "You are a face-shape analyst for a hairstyle recommendation app.",
        "Judge the geometry only: face length vs width, forehead width, cheekbone width, jaw width and chin shape.",
        `Return a probability for EVERY one of these shape ids: ${FACE_SHAPE_IDS.join(", ")}.`,
        "Probabilities must be numbers from 0 to 100 and sum to about 100.",
        "perceivedGender is only used to pick which hairstyle list to show first; use 'unknown' if unsure.",
        "If the image has no clearly visible human face, set isFace to false, give all-zero probabilities and explain why in message.",
        "Never comment on attractiveness, ethnicity, age or identity. Do not attempt to identify the person.",
      ].join(" "),
      messages: [

        {
          role: "user",
          content: [
            { type: "text", text: "Analyse this face and return the shape probabilities." },
            { type: "image", image: data.image },
          ],
        },
      ],
    });

    return await result.output;
  });
