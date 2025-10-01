import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  PanelLeftClose, 
  PanelLeft, 
  MessageSquarePlus, 
  Trash2,
  Download,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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

interface ConversationSidebarProps {
  currentMessages: Message[];
  onLoadConversation: (conversation: Conversation) => void;
  onNewChat: () => void;
  onExport: () => void;
}

const ConversationSidebar = ({ 
  currentMessages, 
  onLoadConversation, 
  onNewChat,
  onExport 
}: ConversationSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);

  // Load conversations from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("conversations");
    if (saved) {
      setConversations(JSON.parse(saved));
    }
  }, []);

  // Save current conversation when messages change
  useEffect(() => {
    if (currentMessages.length > 0) {
      const title = currentMessages[0]?.content.slice(0, 50) || "New Conversation";
      const conversation: Conversation = {
        id: currentConversationId || Date.now().toString(),
        title,
        messages: currentMessages,
        timestamp: Date.now(),
      };

      setConversations((prev) => {
        const existing = prev.findIndex((c) => c.id === conversation.id);
        let updated;
        if (existing >= 0) {
          updated = [...prev];
          updated[existing] = conversation;
        } else {
          updated = [conversation, ...prev];
        }
        localStorage.setItem("conversations", JSON.stringify(updated));
        return updated;
      });

      if (!currentConversationId) {
        setCurrentConversationId(conversation.id);
      }
    }
  }, [currentMessages, currentConversationId]);

  const handleNewChat = () => {
    setCurrentConversationId(null);
    onNewChat();
    toast.success("New conversation started");
  };

  const handleLoadConversation = (conversation: Conversation) => {
    setCurrentConversationId(conversation.id);
    onLoadConversation(conversation);
    toast.success("Conversation loaded");
  };

  const handleDeleteClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversationToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    if (conversationToDelete) {
      const updated = conversations.filter((c) => c.id !== conversationToDelete);
      setConversations(updated);
      localStorage.setItem("conversations", JSON.stringify(updated));
      
      if (conversationToDelete === currentConversationId) {
        handleNewChat();
      }
      
      toast.success("Conversation deleted");
      setShowDeleteDialog(false);
      setConversationToDelete(null);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-lg hover:bg-accent transition-colors"
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <PanelLeftClose className="h-5 w-5" />
        ) : (
          <PanelLeft className="h-5 w-5" />
        )}
      </Button>

      <div
        className={cn(
          "fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-lg">Conversations</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="hover:bg-accent"
          >
            <PanelLeftClose className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-4 space-y-2">
          <Button
            onClick={handleNewChat}
            className="w-full justify-start gap-2"
            variant="outline"
          >
            <MessageSquarePlus className="h-4 w-4" />
            New Conversation
          </Button>
          <Button
            onClick={onExport}
            className="w-full justify-start gap-2"
            variant="outline"
            disabled={currentMessages.length === 0}
          >
            <Download className="h-4 w-4" />
            Export Current Chat
          </Button>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-2">
            {conversations.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No conversations yet
              </p>
            ) : (
              conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => handleLoadConversation(conversation)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-all hover:bg-accent/50 group",
                    currentConversationId === conversation.id && "bg-accent/30 border border-primary/30"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate mb-1">
                        {conversation.title}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(conversation.timestamp)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {conversation.messages.length} messages
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => handleDeleteClick(conversation.id, e)}
                      className="opacity-0 group-hover:opacity-100 h-7 w-7 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this conversation? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ConversationSidebar;

