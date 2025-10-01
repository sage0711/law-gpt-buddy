import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, MicOff, Paperclip, Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ModernChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  maxLength?: number;
  showAttachment?: boolean;
  showVoice?: boolean;
}

const ModernChatInput = ({
  onSend,
  disabled = false,
  placeholder = "Ask about personal injury law in Canada...",
  maxLength = 2000,
  showAttachment = false,
  showVoice = false,
}: ModernChatInputProps) => {
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Voice recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput((prev) => prev + (prev ? " " : "") + transcript);
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
    <div className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6">
      <div className="max-w-5xl mx-auto">
        {/* Status indicators */}
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
            {isComposing && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                <span className="font-medium text-blue-700 dark:text-blue-300">
                  Composing...
                </span>
              </div>
            )}
            {isListening && (
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-medium text-emerald-700 dark:text-emerald-300">
                  Listening...
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              isOverLimit
                ? "text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
            )}
          >
            {characterCount}/{maxLength}
          </div>
        </div>

        {/* Input container */}
        <div className="relative">
          <div
            className={cn(
              "flex items-end gap-4 p-4 rounded-3xl border-2 transition-all duration-300",
              "bg-white dark:bg-gray-800 shadow-lg",
              isFocused
                ? "border-blue-500 shadow-blue-500/20 shadow-xl"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600",
              isOverLimit && "border-red-500 shadow-red-500/20"
            )}
          >
            {/* Attachment button */}
            {showAttachment && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFileUpload}
                disabled={disabled}
                className="h-12 w-12 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <Paperclip className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </Button>
            )}

            {/* Textarea */}
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={maxLength}
                className={cn(
                  "min-h-[60px] max-h-[120px] resize-none border-0 bg-transparent text-base",
                  "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                  "focus-visible:ring-0 focus-visible:ring-offset-0",
                  "pr-12" // Space for voice button
                )}
                style={{ paddingRight: showVoice ? "48px" : "16px" }}
              />

              {/* Voice button overlay */}
              {showVoice && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceToggle}
                  disabled={disabled}
                  className={cn(
                    "absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl transition-all duration-200",
                    isRecording
                      ? "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/25"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
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
              className={cn(
                "h-12 w-12 rounded-2xl transition-all duration-300 shadow-lg",
                "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700",
                "hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5",
                "disabled:opacity-50 disabled:shadow-none disabled:translate-y-0",
                "border-2 border-transparent hover:border-blue-400/50"
              )}
            >
              {disabled ? (
                <Loader2 className="h-5 w-5 animate-spin text-white" />
              ) : (
                <Send className="h-5 w-5 text-white" />
              )}
            </Button>
          </div>

          {/* Helper text */}
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                  Enter
                </kbd>
                to send
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs font-mono">
                  Shift + Enter
                </kbd>
                for new line
              </span>
            </div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <Sparkles className="h-3 w-3" />
              <span className="font-medium">Powered by AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernChatInput;
