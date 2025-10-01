import { AlertCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-2">
        <div className="flex items-start gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 mt-0.5 text-amber-500" />
          <p className="leading-snug">
            <strong className="text-card-foreground">Legal Disclaimer:</strong>{" "}
            This AI assistant provides general information about Canadian
            personal injury law and should not be considered legal advice. For
            specific legal guidance regarding your case, please consult with a
            qualified personal injury lawyer in your province.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
