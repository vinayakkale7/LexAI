import { ShieldCheck, AlertTriangle, SearchCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function LegalInsights({ clauses }) {
  if (!clauses || clauses.length === 0) return null;

  const getRiskColor = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low": return "bg-risk-safe/10 text-risk-safe border-risk-safe/20";
      case "medium": return "bg-risk-warning/10 text-amber-500 border-risk-warning/30";
      case "high": return "bg-risk-high/10 text-risk-high border-risk-high/30";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low": return <ShieldCheck className="w-3 h-3 mr-1" />;
      case "medium": return <SearchCode className="w-3 h-3 mr-1" />;
      case "high": return <AlertTriangle className="w-3 h-3 mr-1" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Clause Breakdown</h3>
      {clauses.map((clause, idx) => (
        <div key={idx} className="p-4 rounded-lg border border-border/50 bg-background/50 hover:bg-muted/20 transition-colors">
          <div className="flex items-start justify-between mb-2 gap-4">
            <h4 className="text-sm font-semibold text-foreground">{clause.title}</h4>
            <Badge className={`px-2 py-0 h-5 text-[10px] font-semibold border shadow-none shrink-0 ${getRiskColor(clause.risk)}`}>
              {getRiskIcon(clause.risk)}
              {clause.risk}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">{clause.content}</p>
        </div>
      ))}
    </div>
  );
}
