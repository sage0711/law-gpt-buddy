import { cn } from "@/lib/utils";
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { useState } from "react";
import MarkdownContent from "./MarkdownContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  onRegenerate?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const ChatBubble = ({
  role,
  content,
  timestamp,
  onRegenerate,
  onLike,
  onDislike,
}: ChatBubbleProps) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) setDisliked(false);
    onLike?.();
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (!disliked) setLiked(false);
    onDislike?.();
  };

  return (
    <div
      className={cn(
        "group flex w-full mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 mt-1 transition-transform group-hover:scale-105",
          isUser ? "ml-3" : "mr-3"
        )}
      >
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center shadow-sm",
            isUser
              ? "bg-primary/10 border border-primary/20"
              : "bg-gradient-to-br from-primary to-accent shadow-lg"
          )}
        >
          {isUser ? (
            <User className="h-5 w-5 text-primary" />
          ) : (
            <Bot className="h-5 w-5 text-primary-foreground" />
          )}
        </div>
      </div>

      {/* Message Bubble */}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-5 py-4 shadow-sm transition-all duration-300 hover:shadow-md",
          "border border-transparent hover:border-border/50",
          isUser
            ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-lg"
            : "bg-card text-card-foreground rounded-bl-lg border-border/30"
        )}
      >
        {/* Content */}
        <div className="prose prose-sm max-w-none dark:prose-invert">
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words m-0">
              {content}
            </p>
          ) : (
            <MarkdownContent content={content} />
          )}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <div
            className={cn(
              "text-xs mt-2 opacity-70",
              isUser ? "text-primary-foreground/70" : "text-muted-foreground"
            )}
          >
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/20">
          <div className="flex items-center gap-1">
            {!isUser && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={cn(
                    "h-7 w-7 p-0 transition-colors",
                    liked
                      ? "text-green-500 hover:text-green-600"
                      : "text-muted-foreground hover:text-green-500"
                  )}
                >
                  <ThumbsUp className="h-3.5 w-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDislike}
                  className={cn(
                    "h-7 w-7 p-0 transition-colors",
                    disliked
                      ? "text-red-500 hover:text-red-600"
                      : "text-muted-foreground hover:text-red-500"
                  )}
                >
                  <ThumbsDown className="h-3.5 w-3.5" />
                </Button>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {!isUser && onRegenerate && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRegenerate}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5 mr-1" />
                Regenerate
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-7 w-7 p-0 transition-colors hover:text-primary"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
