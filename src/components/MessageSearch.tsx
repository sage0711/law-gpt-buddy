import { useState, useMemo } from "react";
import { Search, X, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface MessageSearchProps {
  messages: Message[];
  onClose: () => void;
  onJumpToMessage?: (index: number) => void;
}

const MessageSearch = ({
  messages,
  onClose,
  onJumpToMessage,
}: MessageSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return messages
      .map((message, index) => ({ message, index }))
      .filter(({ message }) => message.content.toLowerCase().includes(query));
  }, [messages, searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" && searchResults.length > 0) {
      const result = searchResults[selectedIndex];
      onJumpToMessage?.(result.index);
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    }
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(
      `(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
      "gi"
    );
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl w-full max-w-2xl mt-20">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Search Messages</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search through your conversation..."
              className="pl-10"
              autoFocus
            />
          </div>
          {searchResults.length > 0 && (
            <p className="text-sm text-muted-foreground mt-2">
              {searchResults.length} result
              {searchResults.length !== 1 ? "s" : ""} found
            </p>
          )}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {searchQuery.trim() === "" ? (
            <div className="p-8 text-center text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search through your conversation</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="p-2">
              {searchResults.map((result, index) => (
                <button
                  key={result.index}
                  onClick={() => {
                    onJumpToMessage?.(result.index);
                    onClose();
                  }}
                  className={cn(
                    "w-full text-left p-3 rounded-lg transition-colors",
                    "hover:bg-accent/50 border border-transparent hover:border-border",
                    selectedIndex === index && "bg-accent border-border"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <Badge
                        variant={
                          result.message.role === "user"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {result.message.role === "user" ? "You" : "AI"}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground mb-1">
                        Message {result.index + 1}
                      </p>
                      <p className="text-sm leading-relaxed line-clamp-3">
                        {highlightText(result.message.content, searchQuery)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>Enter Select</span>
              <span>Esc Close</span>
            </div>
            {searchResults.length > 0 && (
              <span>
                {selectedIndex + 1} of {searchResults.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageSearch;
