import { Copy, RotateCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  isAssistant?: boolean;
}

const MessageActions = ({ content, onRegenerate, isAssistant }: MessageActionsProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleCopy}
        className="h-7 w-7 hover:bg-accent/50"
        aria-label="Copy message"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-green-600" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
      {isAssistant && onRegenerate && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onRegenerate}
          className="h-7 w-7 hover:bg-accent/50"
          aria-label="Regenerate response"
        >
          <RotateCw className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default MessageActions;

