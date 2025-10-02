import { AlertCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/10">
      <div className="max-w-3xl mx-auto px-2 py-0.5">
        <div className="flex items-center justify-center gap-0.5 text-[8px] text-muted-foreground/70">
          <AlertCircle className="h-2 w-2 flex-shrink-0 text-amber-500/60" />
          <p className="leading-none">
            <strong className="text-card-foreground/80">Disclaimer:</strong> Not
            legal advice. Consult a lawyer.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
