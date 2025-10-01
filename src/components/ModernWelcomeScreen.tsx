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
  ArrowRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ModernWelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  {
    icon: Scale,
    title: "Personal Injury Claims",
    description: "Complete guide to filing and managing your claim",
    prompt: "What are the steps to file a personal injury claim in Canada?",
    category: "Claims Process",
    popular: true,
    gradient: "from-blue-500 to-purple-600",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  {
    icon: FileText,
    title: "Compensation Types",
    description: "Understanding different types of damages",
    prompt: "What types of compensation can I claim in a personal injury case?",
    category: "Compensation",
    popular: false,
    gradient: "from-emerald-500 to-teal-600",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/30",
  },
  {
    icon: Users,
    title: "Legal Representation",
    description: "When and why you need professional help",
    prompt: "Do I need a lawyer for my personal injury case?",
    category: "Legal Help",
    popular: true,
    gradient: "from-amber-500 to-orange-600",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
  },
  {
    icon: AlertCircle,
    title: "Limitation Periods",
    description: "Critical deadlines you need to know",
    prompt:
      "What are the time limits for filing a personal injury claim in Canada?",
    category: "Deadlines",
    popular: false,
    gradient: "from-red-500 to-pink-600",
    iconBg: "bg-red-100 dark:bg-red-900/30",
  },
  {
    icon: TrendingUp,
    title: "Settlement Negotiations",
    description: "Maximizing your compensation through negotiation",
    prompt: "How do settlement negotiations work in personal injury cases?",
    category: "Settlements",
    popular: false,
    gradient: "from-indigo-500 to-blue-600",
    iconBg: "bg-indigo-100 dark:bg-indigo-900/30",
  },
  {
    icon: Shield,
    title: "Insurance Claims",
    description: "Navigating insurance company interactions",
    prompt: "How do I deal with insurance companies in my injury claim?",
    category: "Insurance",
    popular: false,
    gradient: "from-violet-500 to-purple-600",
    iconBg: "bg-violet-100 dark:bg-violet-900/30",
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

const ModernWelcomeScreen = ({ onPromptClick }: ModernWelcomeScreenProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const filteredPrompts =
    selectedCategory === "All"
      ? suggestedPrompts
      : suggestedPrompts.filter(
          (prompt) => prompt.category === selectedCategory
        );

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 animate-in fade-in duration-1000">
      <div className="max-w-7xl w-full space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 mb-8 shadow-2xl shadow-blue-500/25">
            <Scale className="h-12 w-12 text-white" />
          </div>

          {/* Title */}
          <div className="space-y-6">
            <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 dark:from-gray-100 dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight">
              Canadian Personal Injury
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Law Assistant
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium">
              Get instant, expert guidance on personal injury law in Canada. Ask
              questions about claims, compensation, legal processes, and your
              rights.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200/50 dark:border-blue-700/50">
              <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                AI-Powered
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-200/50 dark:border-emerald-700/50">
              <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                24/7 Available
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50">
              <Shield className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Privacy Protected
              </span>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "rounded-full px-6 py-2 transition-all duration-300 font-medium",
                selectedCategory === category
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800 border-gray-200 dark:border-gray-700"
              )}
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
                    "w-full text-left p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800",
                    "hover:border-transparent transition-all duration-500 ease-out",
                    "hover:shadow-2xl hover:-translate-y-2",
                    "focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:ring-offset-2",
                    isHovered && "shadow-2xl -translate-y-2 scale-[1.02]",
                    `hover:bg-gradient-to-br hover:from-white hover:to-gray-50 dark:hover:from-gray-800 dark:hover:to-gray-750`
                  )}
                >
                  {/* Card Content */}
                  <div className="space-y-6">
                    {/* Icon and Popular Badge */}
                    <div className="flex items-start justify-between">
                      <div
                        className={cn(
                          "p-4 rounded-2xl transition-all duration-500",
                          item.iconBg,
                          isHovered && "scale-110 rotate-3"
                        )}
                      >
                        <Icon
                          className={cn(
                            "h-8 w-8",
                            `text-${item.gradient
                              .split(" ")[0]
                              .replace(
                                "from-",
                                ""
                              )}-600 dark:text-${item.gradient
                              .split(" ")[0]
                              .replace("from-", "")}-400`
                          )}
                        />
                      </div>
                      {item.popular && (
                        <Badge className="bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-lg">
                          Popular
                        </Badge>
                      )}
                    </div>

                    {/* Title and Description */}
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Category and CTA */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="text-xs font-medium border-gray-300 dark:border-gray-600"
                      >
                        {item.category}
                      </Badge>
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <span>Ask now</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center space-y-6 pt-12 border-t border-gray-200 dark:border-gray-700">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Ready to get started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Don't see what you're looking for? Ask me anything about Canadian
              personal injury law.
            </p>
          </div>
          <Button
            onClick={() =>
              onPromptClick(
                "I have a personal injury case. Can you help me understand my options?"
              )
            }
            className="group rounded-2xl px-12 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 hover:-translate-y-1"
          >
            <Sparkles className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
            Start Your Legal Consultation
            <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernWelcomeScreen;
