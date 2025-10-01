import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";

interface KeyboardShortcutsProps {
  onNewChat?: () => void;
  onExport?: () => void;
}

const KeyboardShortcuts = ({ onNewChat, onExport }: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K - New chat
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onNewChat?.();
      }
      
      // Ctrl/Cmd + E - Export chat
      if ((e.ctrlKey || e.metaKey) && e.key === "e") {
        e.preventDefault();
        onExport?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNewChat, onExport]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-lg hover:bg-accent transition-colors"
          aria-label="Keyboard shortcuts"
        >
          <Keyboard className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
          <DialogDescription>
            Speed up your workflow with these keyboard shortcuts
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">New conversation</span>
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded">
              Ctrl + K
            </kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Export conversation</span>
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded">
              Ctrl + E
            </kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Send message</span>
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded">
              Enter
            </kbd>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">New line in message</span>
            <kbd className="px-2 py-1 text-xs font-semibold bg-muted border border-border rounded">
              Shift + Enter
            </kbd>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;

