import { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DismissibleDisclaimerProps {
  className?: string;
  variant?: "footer" | "banner" | "modal";
  onDismiss?: () => void;
}

const DismissibleDisclaimer = ({
  className,
  variant = "footer",
  onDismiss,
}: DismissibleDisclaimerProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check localStorage for dismissed state
  useEffect(() => {
    const dismissed = localStorage.getItem("legal-disclaimer-dismissed");
    if (dismissed === "true") {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsAnimating(true);

    // Store dismissal in localStorage
    localStorage.setItem("legal-disclaimer-dismissed", "true");

    // Animate out
    setTimeout(() => {
      setIsVisible(false);
      setIsAnimating(false);
      onDismiss?.();
    }, 300);
  };

  const handleShow = () => {
    setIsVisible(true);
    localStorage.removeItem("legal-disclaimer-dismissed");
  };

  if (!isVisible) {
    // Show a small "Show Disclaimer" button when dismissed
    if (variant === "footer") {
      return (
        <footer
          className={cn(
            "border-t border-border bg-card/30 backdrop-blur-sm",
            className
          )}
        >
          <div className="max-w-4xl mx-auto px-4 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShow}
              className="h-6 px-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              <AlertCircle className="h-3 w-3 mr-1" />
              Show Legal Disclaimer
            </Button>
          </div>
        </footer>
      );
    }
    return null;
  }

  const disclaimerContent = (
    <div className="flex items-start gap-3">
      <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5 text-amber-500" />
      <div className="flex-1">
        <p className="text-xs leading-relaxed text-muted-foreground">
          <strong className="text-card-foreground">Legal Disclaimer:</strong>{" "}
          This AI assistant provides general information about Canadian personal
          injury law and should not be considered legal advice. For specific
          legal guidance regarding your case, please consult with a qualified
          personal injury lawyer in your province. Information provided may not
          reflect the most recent legal developments.
        </p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleDismiss}
        className={cn(
          "h-6 w-6 p-0 text-muted-foreground hover:text-foreground transition-all",
          "hover:bg-background/50 rounded-full",
          isAnimating && "opacity-0 scale-95"
        )}
        title="Dismiss disclaimer"
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "border-b border-border bg-amber-50 dark:bg-amber-950/20",
          "transition-all duration-300",
          isAnimating
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">{disclaimerContent}</div>
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
          "flex items-center justify-center p-4",
          "transition-all duration-300",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        <div className="bg-card border border-border rounded-lg shadow-lg max-w-lg w-full p-6">
          {disclaimerContent}
          <div className="flex justify-end mt-4 gap-2">
            <Button variant="outline" size="sm" onClick={handleDismiss}>
              I Understand
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Default footer variant
  return (
    <footer
      className={cn(
        "border-t border-border bg-card/30 backdrop-blur-sm",
        "transition-all duration-300",
        isAnimating
          ? "opacity-0 -translate-y-full"
          : "opacity-100 translate-y-0",
        className
      )}
    >
      <div className="max-w-4xl mx-auto px-4 py-3">{disclaimerContent}</div>
    </footer>
  );
};

export default DismissibleDisclaimer;
