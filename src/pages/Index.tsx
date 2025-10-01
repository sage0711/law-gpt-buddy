import { useRef, useEffect, useState } from "react";
import ModernChatBubble from "@/components/ModernChatBubble";
import ModernChatInput from "@/components/ModernChatInput";
import ModernWelcomeScreen from "@/components/ModernWelcomeScreen";
import ModernTypingIndicator from "@/components/ModernTypingIndicator";
import ThemeToggle from "@/components/ThemeToggle";
import ConversationSidebar from "@/components/ConversationSidebar";
import ModernDisclaimer from "@/components/ModernDisclaimer";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import MessageSearch from "@/components/MessageSearch";
import { useToast } from "@/hooks/use-toast";
import { useStreamingChat } from "@/hooks/useStreamingChat";
import { Button } from "@/components/ui/button";
import { Scale, Search } from "lucide-react";
import { toast as sonnerToast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  timestamp: number;
}

const Index = () => {
  const { messages, isLoading, sendMessage, setMessages, clearMessages } =
    useStreamingChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [lastUserMessage, setLastUserMessage] = useState<string>("");
  const [showSearch, setShowSearch] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (content: string) => {
    try {
      setLastUserMessage(content);
      await sendMessage(content);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRegenerate = async () => {
    if (!lastUserMessage) return;

    try {
      // Remove the last assistant message
      const newMessages = messages.slice(0, -1);
      setMessages(newMessages);

      // Resend the last user message
      await sendMessage(lastUserMessage);
      sonnerToast.success("Response regenerated");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate response. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLoadConversation = (conversation: Conversation) => {
    setMessages(conversation.messages);
  };

  const handleNewChat = () => {
    clearMessages();
    setLastUserMessage("");
  };

  const handleExport = () => {
    if (messages.length === 0) {
      sonnerToast.error("No conversation to export");
      return;
    }

    const conversationText = messages
      .map(
        (msg) =>
          `${msg.role === "user" ? "You" : "AI Assistant"}:\n${msg.content}\n`
      )
      .join("\n---\n\n");

    const blob = new Blob([conversationText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversation-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    sonnerToast.success("Conversation exported");
  };

  const handleJumpToMessage = (index: number) => {
    const messageElement = document.querySelector(
      `[data-message-index="${index}"]`
    );
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "k":
            e.preventDefault();
            setShowSearch(true);
            break;
          case "n":
            e.preventDefault();
            handleNewChat();
            break;
          case "e":
            e.preventDefault();
            handleExport();
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-blue-900/20">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ConversationSidebar
              currentMessages={messages}
              onLoadConversation={handleLoadConversation}
              onNewChat={handleNewChat}
              onExport={handleExport}
            />
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                PI Law Assistant
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Canadian Personal Injury Law Expert
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="h-8 w-8 p-0"
                title="Search messages (Ctrl+K)"
              >
                <Search className="h-4 w-4" />
              </Button>
            )}
            <KeyboardShortcuts
              onNewChat={handleNewChat}
              onExport={handleExport}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <ModernWelcomeScreen onPromptClick={handleSendMessage} />
        ) : (
          <div className="max-w-5xl mx-auto px-6 py-8">
            {messages.map((message, index) => (
              <ModernChatBubble
                key={index}
                role={message.role}
                content={message.content}
                timestamp={new Date()}
                onRegenerate={
                  message.role === "assistant" &&
                  index === messages.length - 1 &&
                  !isLoading
                    ? handleRegenerate
                    : undefined
                }
              />
            ))}
            {isLoading && <ModernTypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <ModernChatInput onSend={handleSendMessage} disabled={isLoading} />

      {/* Footer */}
      <ModernDisclaimer />

      {/* Message Search Modal */}
      {showSearch && (
        <MessageSearch
          messages={messages}
          onClose={() => setShowSearch(false)}
          onJumpToMessage={handleJumpToMessage}
        />
      )}
    </div>
  );
};

export default Index;
