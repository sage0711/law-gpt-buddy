import { useState, useEffect } from "react";
import { AlertCircle, X, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ModernDisclaimerProps {
  className?: string;
  variant?: "footer" | "banner" | "modal";
  onDismiss?: () => void;
}

const ModernDisclaimer = ({
  className,
  variant = "footer",
  onDismiss,
}: ModernDisclaimerProps) => {
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
    // Show a modern "Show Disclaimer" button when dismissed
    if (variant === "footer") {
      return (
        <footer
          className={cn(
            "border-t border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm",
            className
          )}
        >
          <div className="max-w-5xl mx-auto px-6 py-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShow}
              className="h-8 px-3 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <Eye className="h-3 w-3 mr-2" />
              Show Legal Disclaimer
            </Button>
          </div>
        </footer>
      );
    }
    return null;
  }

  const disclaimerContent = (
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
          <AlertCircle className="h-4 w-4 text-white" />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          <strong className="text-gray-900 dark:text-gray-100 font-semibold">
            Legal Disclaimer:
          </strong>{" "}
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
          "h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-all duration-200",
          "hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full",
          isAnimating && "opacity-0 scale-95"
        )}
        title="Dismiss disclaimer"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );

  if (variant === "banner") {
    return (
      <div
        className={cn(
          "border-b border-amber-200 dark:border-amber-800 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
          "transition-all duration-300",
          isAnimating
            ? "opacity-0 -translate-y-full"
            : "opacity-100 translate-y-0",
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">{disclaimerContent}</div>
      </div>
    );
  }

  if (variant === "modal") {
    return (
      <div
        className={cn(
          "fixed inset-0 bg-black/50 backdrop-blur-sm z-50",
          "flex items-center justify-center p-6",
          "transition-all duration-300",
          isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
        )}
      >
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl max-w-lg w-full p-8">
          {disclaimerContent}
          <div className="flex justify-end mt-6 gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              className="rounded-full px-6"
            >
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
        "border-t border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm",
        "transition-all duration-300",
        isAnimating
          ? "opacity-0 -translate-y-full"
          : "opacity-100 translate-y-0",
        className
      )}
    >
      <div className="max-w-5xl mx-auto px-6 py-4">{disclaimerContent}</div>
    </footer>
  );
};

export default ModernDisclaimer;
