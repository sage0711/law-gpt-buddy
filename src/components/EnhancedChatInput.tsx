import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, Paperclip, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface EnhancedChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  showAttachment?: boolean;
  showVoice?: boolean;
}

const EnhancedChatInput = ({ 
  onSend, 
  disabled = false, 
  placeholder = "Ask about personal injury law in Canada...",
  maxLength = 2000,
  showAttachment = false,
  showVoice = false
}: EnhancedChatInputProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Voice recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
        setIsListening(false);
        setIsRecording(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        setIsRecording(false);
        toast.error("Speech recognition failed");
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        setIsRecording(false);
      };
    }
  }, []);

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

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      toast.error("Speech recognition not supported");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setIsListening(false);
    } else {
      setIsRecording(true);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleFileUpload = () => {
    toast.info("File upload feature coming soon!");
  };

  const characterCount = input.length;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="border-t border-border bg-card/50 backdrop-blur-sm p-4">
      <div className="max-w-4xl mx-auto">
        {/* Character count and status */}
        <div className="flex items-center justify-between mb-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            {isComposing && (
              <span className="flex items-center gap-1">
                <Loader2 className="h-3 w-3 animate-spin" />
                Composing...
              </span>
            )}
            {isListening && (
              <span className="flex items-center gap-1 text-primary">
                <div className="h-2 w-2 bg-primary rounded-full animate-pulse" />
                Listening...
              </span>
            )}
          </div>
          <span className={cn(
            isOverLimit && "text-red-500"
          )}>
            {characterCount}/{maxLength}
          </span>
        </div>

        {/* Input container */}
        <div className="relative flex gap-3 items-end">
          {/* Attachment button */}
          {showAttachment && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFileUpload}
              disabled={disabled}
              className="h-12 w-12 rounded-xl border border-border hover:bg-accent transition-colors"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
          )}

          {/* Textarea */}
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
              placeholder={placeholder}
              disabled={disabled}
              maxLength={maxLength}
              className={cn(
                "min-h-[60px] max-h-[120px] resize-none rounded-2xl border-border focus-visible:ring-primary transition-all",
                "pr-12", // Space for voice button
                isOverLimit && "border-red-500 focus-visible:ring-red-500"
              )}
              style={{ paddingRight: showVoice ? '48px' : '16px' }}
            />
            
            {/* Voice button overlay */}
            {showVoice && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleVoiceToggle}
                disabled={disabled}
                className={cn(
                  "absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg transition-colors",
                  isRecording 
                    ? "bg-red-500 text-white hover:bg-red-600" 
                    : "hover:bg-accent"
                )}
              >
                {isRecording ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>

          {/* Send button */}
          <Button
            onClick={handleSubmit}
            disabled={disabled || !input.trim() || isOverLimit}
            size="icon"
            className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:shadow-none"
          >
            {disabled ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Helper text */}
        <div className="mt-2 text-xs text-muted-foreground">
          Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Enter</kbd> to send, <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Shift + Enter</kbd> for new line
        </div>
      </div>
    </div>
  );
};

export default EnhancedChatInput;
