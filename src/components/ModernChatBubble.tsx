import { cn } from "@/lib/utils";
import {
  Bot,
  User,
  Copy,
  Check,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import { useState } from "react";
import MarkdownContent from "./MarkdownContent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ModernChatBubbleProps {
  role: "user" | "assistant";
  content: string;
  timestamp?: Date;
  onRegenerate?: () => void;
  onLike?: () => void;
  onDislike?: () => void;
}

const ModernChatBubble = ({
  role,
  content,
  timestamp,
  onRegenerate,
  onLike,
  onDislike,
}: ModernChatBubbleProps) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showActions, setShowActions] = useState(false);

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
        "group flex w-full mb-8 animate-in fade-in slide-in-from-bottom-3 duration-700",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 mt-2 transition-all duration-300",
          isUser ? "ml-4 order-2" : "mr-4 order-1"
        )}
      >
        <div
          className={cn(
            "w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300",
            "group-hover:scale-110 group-hover:shadow-xl",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 border-2 border-blue-200"
              : "bg-gradient-to-br from-emerald-500 to-emerald-600 border-2 border-emerald-200"
          )}
        >
          {isUser ? (
            <User className="h-5 w-5 text-white" />
          ) : (
            <Bot className="h-5 w-5 text-white" />
          )}
        </div>
      </div>

      {/* Message Container */}
      <div
        className={cn(
          "max-w-[85%] transition-all duration-300",
          isUser ? "order-1" : "order-2"
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            "relative rounded-3xl px-6 py-4 shadow-sm transition-all duration-300",
            "border border-transparent backdrop-blur-sm",
            isUser
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-br-lg shadow-blue-500/25"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-lg shadow-gray-200/50 dark:shadow-gray-700/50 border-gray-200 dark:border-gray-700"
          )}
        >
          {/* Content */}
          <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold">
            {isUser ? (
              <p className="text-sm leading-relaxed whitespace-pre-wrap break-words m-0 font-medium">
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
                "text-xs mt-3 opacity-60 font-medium",
                isUser ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
              )}
            >
              {timestamp.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}

          {/* Actions - Always visible on hover */}
          <div
            className={cn(
              "absolute -bottom-2 right-4 transition-all duration-300",
              "opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
            )}
          >
            <div
              className={cn(
                "flex items-center gap-1 px-3 py-2 rounded-full shadow-lg backdrop-blur-md border",
                isUser
                  ? "bg-blue-600/90 border-blue-400/30"
                  : "bg-white/90 dark:bg-gray-800/90 border-gray-200/50 dark:border-gray-700/50"
              )}
            >
              {!isUser && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLike}
                    className={cn(
                      "h-7 w-7 p-0 transition-all duration-200 hover:scale-110",
                      liked
                        ? "text-green-500 hover:text-green-600"
                        : "text-gray-500 hover:text-green-500 dark:text-gray-400"
                    )}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleDislike}
                    className={cn(
                      "h-7 w-7 p-0 transition-all duration-200 hover:scale-110",
                      disliked
                        ? "text-red-500 hover:text-red-600"
                        : "text-gray-500 hover:text-red-500 dark:text-gray-400"
                    )}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </Button>
                </>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={handleCopy}
                    className="cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy message
                      </>
                    )}
                  </DropdownMenuItem>
                  {!isUser && onRegenerate && (
                    <DropdownMenuItem
                      onClick={onRegenerate}
                      className="cursor-pointer"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Regenerate response
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernChatBubble;
