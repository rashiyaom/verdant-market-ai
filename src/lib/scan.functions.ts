import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ScanInput = z.object({
  imageDataUrl: z.string().startsWith("data:image/"),
  cropHint: z.string().max(120).optional(),
});

export type ScanResult = {
  crop: string;
  healthy: boolean;
  disease: string;
  confidence: number; // 0-100
  severity: "None" | "Mild" | "Moderate" | "Severe";
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  summary: string;
};

const SYSTEM = `You are an expert agronomist and plant pathologist. You analyze photos of crop leaves or plants and diagnose diseases. Be precise, avoid guessing when unsure — say the plant looks healthy if no symptoms are visible. Only respond as strict JSON matching the requested schema. No prose outside JSON.`;

export const scanCrop = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => ScanInput.parse(raw))
  .handler(async ({ data }): Promise<ScanResult> => {
    const { callGatewayChat } = await import("./ai-gateway.server");

    const schemaInstructions = `Return JSON with exactly these keys:
{
  "crop": string,                 // best guess of the crop/plant species
  "healthy": boolean,
  "disease": string,              // "None" if healthy, else the disease name
  "confidence": number,           // 0-100 integer
  "severity": "None"|"Mild"|"Moderate"|"Severe",
  "symptoms": string[],           // 2-5 short bullet phrases visible in the image
  "causes": string[],             // 2-4 likely causes
  "treatment": string[],          // 3-5 concrete steps a farmer can take
  "prevention": string[],         // 3-5 preventive actions
  "summary": string               // one sentence, plain language
}`;

    const userText = `Analyze this plant photo${data.cropHint ? ` (farmer says it is: ${data.cropHint})` : ""}. Diagnose any disease and respond with the JSON described. ${schemaInstructions}`;

    const res = await callGatewayChat({
      model: "google/gemini-3.5-flash",
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content: [
            { type: "text", text: userText },
            { type: "image_url", image_url: { url: data.imageDataUrl } },
          ],
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = res.choices?.[0]?.message?.content ?? "{}";
    let parsed: ScanResult;
    try {
      const cleaned = content.replace(/^```json\n?|\n?```$/g, "").trim();
      parsed = JSON.parse(cleaned) as ScanResult;
    } catch {
      throw new Error("Model returned an unreadable response. Please try again.");
    }
    return parsed;
  });
