import { useState } from "react";
import {
  Scale,
  FileText,
  Users,
  AlertCircle,
  Sparkles,
  TrendingUp,
  Clock,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface EnhancedWelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  {
    icon: Scale,
    title: "Personal Injury Claims",
    description: "Step-by-step guide to filing claims",
    prompt: "What are the steps to file a personal injury claim in Canada?",
    category: "Claims Process",
    popular: true,
  },
  {
    icon: FileText,
    title: "Compensation Types",
    description: "Types of damages you can claim",
    prompt: "What types of compensation can I claim in a personal injury case?",
    category: "Compensation",
    popular: false,
  },
  {
    icon: Users,
    title: "Legal Representation",
    description: "When and why you need a lawyer",
    prompt: "Do I need a lawyer for my personal injury case?",
    category: "Legal Help",
    popular: true,
  },
  {
    icon: AlertCircle,
    title: "Limitation Periods",
    description: "Important time limits and deadlines",
    prompt:
      "What are the time limits for filing a personal injury claim in Canada?",
    category: "Deadlines",
    popular: false,
  },
  {
    icon: TrendingUp,
    title: "Settlement Negotiations",
    description: "How to negotiate fair compensation",
    prompt: "How do settlement negotiations work in personal injury cases?",
    category: "Settlements",
    popular: false,
  },
  {
    icon: Shield,
    title: "Insurance Claims",
    description: "Working with insurance companies",
    prompt: "How do I deal with insurance companies in my injury claim?",
    category: "Insurance",
    popular: false,
  },
];

const categories = [
  "All",
  "Claims Process",
  "Compensation",
  "Legal Help",
  "Deadlines",
  "Settlements",
  "Insurance",
];

const EnhancedWelcomeScreen = ({
  onPromptClick,
}: EnhancedWelcomeScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredPrompts =
    selectedCategory === "All"
      ? suggestedPrompts
      : suggestedPrompts.filter(
          (prompt) => prompt.category === selectedCategory
        );

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-6xl w-full space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mb-6 shadow-xl">
            <Scale className="h-10 w-10 text-primary-foreground" />
          </div>
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
              Canadian Personal Injury Law Assistant
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get expert guidance on personal injury law in Canada. Ask
              questions about claims, compensation, legal processes, and your
              rights.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>AI-Powered Legal Guidance</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>24/7 Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span>Privacy Protected</span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full transition-all duration-200"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Prompt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrompts.map((item, index) => {
            const Icon = item.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <button
                  onClick={() => onPromptClick(item.prompt)}
                  className={cn(
                    "w-full text-left p-6 rounded-2xl border border-border bg-card",
                    "hover:bg-accent/5 hover:border-primary/50 transition-all duration-300",
                    "hover:shadow-lg hover:-translate-y-1",
                    "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                    isHovered && "shadow-xl -translate-y-2 scale-[1.02]"
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "p-3 rounded-xl transition-all duration-300",
                        "bg-primary/10 group-hover:bg-primary/20",
                        isHovered && "scale-110"
                      )}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors text-left">
                          {item.title}
                        </h3>
                        {item.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 text-left">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-xs">
                          {item.category}
                        </Badge>
                        <div className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                          Click to ask →
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-4 pt-8 border-t border-border">
          <p className="text-muted-foreground">
            Don't see what you're looking for? Ask me anything about Canadian
            personal injury law.
          </p>
          <Button
            onClick={() =>
              onPromptClick(
                "I have a personal injury case. Can you help me understand my options?"
              )
            }
            className="rounded-full px-8 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-xl"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Start Your Legal Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedWelcomeScreen;
