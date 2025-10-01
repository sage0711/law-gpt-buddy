import { Scale, FileText, Users, AlertCircle } from "lucide-react";

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const suggestedPrompts = [
  {
    icon: Scale,
    title: "Personal Injury Claims",
    prompt: "What are the steps to file a personal injury claim in Canada?"
  },
  {
    icon: FileText,
    title: "Compensation Types",
    prompt: "What types of compensation can I claim in a personal injury case?"
  },
  {
    icon: Users,
    title: "Legal Representation",
    prompt: "Do I need a lawyer for my personal injury case?"
  },
  {
    icon: AlertCircle,
    title: "Limitation Periods",
    prompt: "What are the time limits for filing a personal injury claim in Canada?"
  }
];

const WelcomeScreen = ({ onPromptClick }: WelcomeScreenProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
            <Scale className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Canadian Personal Injury Law Assistant
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get detailed answers about personal injury law in Canada. Ask me anything about claims, compensation, legal processes, and your rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedPrompts.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                onClick={() => onPromptClick(item.prompt)}
                className="group text-left p-6 rounded-2xl border border-border bg-card hover:bg-accent/5 hover:border-primary/50 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h3 className="font-semibold text-card-foreground group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.prompt}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
