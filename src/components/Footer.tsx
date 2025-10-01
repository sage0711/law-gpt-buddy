import { AlertCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-4 py-1.5">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <AlertCircle className="h-3 w-3 flex-shrink-0 text-amber-500" />
          <p className="leading-tight">
            <strong className="text-card-foreground">Disclaimer:</strong>{" "}
            General information only, not legal advice. Consult a qualified
            lawyer for your case.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
