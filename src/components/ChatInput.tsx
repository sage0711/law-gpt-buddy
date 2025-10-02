import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-card px-2 py-1">
      <div className="max-w-3xl mx-auto">
        <div className="flex gap-1 items-center">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about personal injury law in Canada..."
            className="min-h-[32px] max-h-[100px] resize-none rounded border-border focus-visible:ring-1 focus-visible:ring-primary text-xs py-1 px-2 leading-tight"
            disabled={disabled}
          />
          <Button
            onClick={handleSubmit}
            disabled={disabled || !input.trim()}
            size="icon"
            className="h-[32px] w-[32px] rounded bg-primary hover:bg-primary/90 disabled:opacity-50 flex-shrink-0"
          >
            <Send className="h-3 w-3" />
          </Button>
        </div>
        <div className="text-center mt-0.5">
          <span className="text-[9px] text-muted-foreground/70">
            Enter to send • Shift+Enter for new line
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
