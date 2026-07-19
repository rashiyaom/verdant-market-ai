// Server-only helper for calling the Lovable AI Gateway directly with fetch.
// Kept minimal so we can send raw multimodal chat-completions payloads.

const GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

export async function callGatewayChat(body: Record<string, unknown>) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) throw new Error("Missing LOVABLE_API_KEY");
  const res = await fetch(GATEWAY_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Lovable-API-Key": key,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
    if (res.status === 402) throw new Error("AI credits exhausted. Please add credits in workspace settings.");
    throw new Error(`AI gateway error ${res.status}: ${text.slice(0, 300)}`);
  }
  return (await res.json()) as {
    choices: { message: { content: string } }[];
  };
}
