import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import MarkdownContent from "./MarkdownContent";
import MessageActions from "./MessageActions";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  onRegenerate?: () => void;
}

const ChatMessage = ({ role, content, onRegenerate }: ChatMessageProps) => {
  const isUser = role === "user";
  
  return (
    <div className={cn(
      "flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500 group",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3 mt-1">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Bot className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      )}
      <div className={cn(
        "max-w-[75%] rounded-2xl px-4 py-3 shadow-sm transition-all",
        isUser 
          ? "bg-[hsl(var(--chat-user))] text-[hsl(var(--chat-user-foreground))] rounded-br-md" 
          : "bg-[hsl(var(--chat-assistant))] text-[hsl(var(--chat-assistant-foreground))] border border-border rounded-bl-md"
      )}>
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        ) : (
          <MarkdownContent content={content} />
        )}
        <div className="mt-2 flex justify-end">
          <MessageActions 
            content={content} 
            onRegenerate={onRegenerate}
            isAssistant={!isUser}
          />
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 ml-3 mt-1">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
