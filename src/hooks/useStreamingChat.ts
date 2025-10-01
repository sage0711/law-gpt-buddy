import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { localChatAPI } from "@/api/chat";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useStreamingChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearMessages = () => {
    setMessages([]);
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Use local API if OpenAI key is available (development or production)
      const isLocalDev = !!import.meta.env.VITE_OPENAI_API_KEY;

      let response;
      if (isLocalDev) {
        // Use local OpenAI API directly
        response = await localChatAPI(
          [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          import.meta.env.VITE_OPENAI_API_KEY
        );
      } else {
        // Use Supabase Edge Function
        const CHAT_URL = `${
          import.meta.env.VITE_SUPABASE_URL
        }/functions/v1/chat`;
        const {
          data: { session },
        } = await supabase.auth.getSession();

        response = await fetch(CHAT_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "text/event-stream",
            Authorization: `Bearer ${
              session?.access_token ||
              import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
            }`,
          },
          body: JSON.stringify({
            messages: [...messages, userMessage].map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", response.status, errorText);

        // Try to parse error details
        let errorDetails = errorText;
        try {
          const errorJson = JSON.parse(errorText);
          errorDetails = errorJson.openaiError || errorJson.error || errorText;
        } catch (e) {
          // If parsing fails, use the raw error text
        }

        throw new Error(`API Error: ${response.status} - ${errorDetails}`);
      }

      if (!response.body) {
        throw new Error("No response body received");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;

        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;

            if (content) {
              assistantContent += content;

              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1
                      ? { ...m, content: assistantContent }
                      : m
                  );
                }
                return [
                  ...prev,
                  { role: "assistant", content: assistantContent },
                ];
              });
            }
          } catch (e) {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;

          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as
              | string
              | undefined;
            if (content) {
              assistantContent += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant") {
                  return prev.map((m, i) =>
                    i === prev.length - 1
                      ? { ...m, content: assistantContent }
                      : m
                  );
                }
                return [
                  ...prev,
                  { role: "assistant", content: assistantContent },
                ];
              });
            }
          } catch {
            // Ignore JSON parse errors for incomplete chunks
          }
        }
      }
    } catch (error) {
      console.error("Streaming error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { messages, isLoading, sendMessage, setMessages, clearMessages };
};
