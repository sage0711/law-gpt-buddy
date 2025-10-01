// Local/production API route for chat functionality
export async function localChatAPI(messages: any[], apiKey: string) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo", // Using gpt-3.5-turbo for better compatibility
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
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("OpenAI API error:", response.status, errorText);

    // Parse error details for better debugging
    let errorMessage = `OpenAI API error: ${response.status}`;
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.error?.message) {
        errorMessage += ` - ${errorJson.error.message}`;
      } else {
        errorMessage += ` - ${errorText}`;
      }
    } catch (e) {
      errorMessage += ` - ${errorText}`;
    }

    throw new Error(errorMessage);
  }

  return response;
}
