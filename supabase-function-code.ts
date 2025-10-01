// Copy this entire code to your Supabase Edge Function
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
  "Access-Control-Max-Age": "86400",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log("Request received:", req.method, req.url);
    console.log("Request headers:", Object.fromEntries(req.headers.entries()));

    // Validate request method
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let messages;
    try {
      const body = await req.json();
      console.log("Request body received:", JSON.stringify(body, null, 2));
      messages = body.messages;
      console.log("Messages received:", messages?.length || 0);

      if (!messages || !Array.isArray(messages)) {
        throw new Error("Messages array is required");
      }
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return new Response(
        JSON.stringify({
          error: "Invalid request body",
          details: parseError.message,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get OpenAI API key from environment (use different name to avoid Lovable conflict)
    const OPENAI_API_KEY =
      Deno.env.get("CUSTOM_OPENAI_API_KEY") || Deno.env.get("OPENAI_API_KEY");

    console.log("OpenAI API key exists:", !!OPENAI_API_KEY);
    console.log("Environment variables:", Object.keys(Deno.env.toObject()));

    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      return new Response(
        JSON.stringify({
          error: "OpenAI API key is not configured",
          availableEnvVars: Object.keys(Deno.env.toObject()),
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const requestBody = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert AI assistant specializing in Canadian personal injury law. Your role is to provide detailed, accurate, and helpful information about personal injury claims, compensation, legal processes, and rights in Canada.

Key responsibilities:
- Provide clear explanations of Canadian personal injury law concepts
- Explain the claims process step-by-step
- Discuss different types of compensation available
- Explain limitation periods and important deadlines
- Provide information about when legal representation is beneficial
- Discuss provincial variations in personal injury law when relevant

Important guidelines:
- Always clarify that you provide general information, not legal advice
- Recommend consulting with a qualified personal injury lawyer for specific cases
- Be empathetic and understanding when discussing injuries and claims
- Provide detailed, comprehensive answers
- Use clear language while maintaining legal accuracy
- Reference specific Canadian laws and regulations when relevant`,
        },
        ...messages,
      ],
      stream: true,
      max_completion_tokens: 2000,
    };

    console.log("Sending request to OpenAI with", messages.length, "messages");
    console.log("OpenAI request body:", JSON.stringify(requestBody, null, 2));

    // Add retry logic for rate limiting
    let response;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // If rate limited, wait and retry
      if (response.status === 429) {
        retryCount++;
        console.log(`Rate limited, retrying ${retryCount}/${maxRetries}...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount));
        continue;
      }

      // If other error, break and handle normally
      break;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("OpenAI API error:", response.status, errorText);
      return new Response(
        JSON.stringify({
          error: "Failed to get AI response",
          openaiError: errorText,
          status: response.status,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log("Streaming response from OpenAI");

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in chat function:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
