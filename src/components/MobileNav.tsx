import { useState } from "react";
import { Menu, X, Search, MessageSquare, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onSearch?: () => void;
  onNewChat?: () => void;
  onExport?: () => void;
  hasMessages?: boolean;
}

const MobileNav = ({
  onSearch,
  onNewChat,
  onExport,
  hasMessages = false,
}: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      icon: Search,
      label: "Search Messages",
      onClick: () => {
        onSearch?.();
        setIsOpen(false);
      },
      disabled: !hasMessages,
    },
    {
      icon: Plus,
      label: "New Chat",
      onClick: () => {
        onNewChat?.();
        setIsOpen(false);
      },
    },
    {
      icon: Download,
      label: "Export Chat",
      onClick: () => {
        onExport?.();
        setIsOpen(false);
      },
      disabled: !hasMessages,
    },
  ];

  return (
    <div className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-semibold">PI Law Assistant</span>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 py-4">
              <div className="space-y-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={index}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start gap-3 h-10",
                        item.disabled && "opacity-50 cursor-not-allowed"
                      )}
                      onClick={item.onClick}
                      disabled={item.disabled}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Canadian Personal Injury Law Expert
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
