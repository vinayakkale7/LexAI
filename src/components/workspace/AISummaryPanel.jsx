import { ShieldCheck, AlertTriangle, SearchCode, FileText, Calendar, DollarSign, ListTodo } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AISummaryPanel({ analysis }) {
  if (!analysis) return null;

  const { summary, risks, key_insights } = analysis;

  const getOverallRiskBadge = (risk) => {
    switch (risk?.toLowerCase()) {
      case "low": return <Badge className="bg-risk-safe/10 text-risk-safe border-risk-safe/20 shadow-none"><ShieldCheck className="w-3 h-3 mr-1" /> Low</Badge>;
      case "medium": return <Badge className="bg-risk-warning/10 text-amber-500 border-risk-warning/30 shadow-none"><SearchCode className="w-3 h-3 mr-1" /> Medium</Badge>;
      case "high": return <Badge className="bg-risk-high/10 text-risk-high border-risk-high/30 shadow-none"><AlertTriangle className="w-3 h-3 mr-1" /> High</Badge>;
      default: return <Badge variant="outline">{risk}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Document Summary Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Document Summary</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg border border-border/50 bg-background/50 flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground font-medium uppercase">Agreement Type</span>
            <span className="text-sm font-semibold flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-primary" /> {summary?.type || "N/A"}</span>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-background/50 flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground font-medium uppercase">Duration</span>
            <span className="text-sm font-semibold flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-primary" /> {summary?.duration || "N/A"}</span>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-background/50 flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground font-medium uppercase">Monthly Rent</span>
            <span className="text-sm font-semibold flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-primary" /> {summary?.rent || "N/A"}</span>
          </div>
          <div className="p-3 rounded-lg border border-border/50 bg-background/50 flex flex-col gap-1">
            <span className="text-[10px] text-muted-foreground font-medium uppercase">Overall Risk</span>
            <span className="text-sm font-semibold">{getOverallRiskBadge(summary?.overall_risk)}</span>
          </div>
        </div>
      </div>

      {/* Key Insights Section */}
      {key_insights && key_insights.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Key Insights</h3>
          <ul className="space-y-2">
            {key_insights.map((insight, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed bg-primary/5 p-3 rounded-lg border border-primary/10">
                <ListTodo className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Risk Overview Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Risk Overview</h3>
        <div className="flex gap-3">
          <div className="flex-1 p-3 rounded-lg border border-risk-high/20 bg-risk-high/5 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-bold text-risk-high">{risks?.high || 0}</span>
            <span className="text-[10px] font-medium uppercase text-risk-high">High Risk</span>
          </div>
          <div className="flex-1 p-3 rounded-lg border border-risk-warning/30 bg-risk-warning/10 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-bold text-amber-500">{risks?.medium || 0}</span>
            <span className="text-[10px] font-medium uppercase text-amber-500">Medium Risk</span>
          </div>
          <div className="flex-1 p-3 rounded-lg border border-risk-safe/20 bg-risk-safe/10 flex flex-col items-center justify-center gap-1">
            <span className="text-2xl font-bold text-risk-safe">{risks?.low || 0}</span>
            <span className="text-[10px] font-medium uppercase text-risk-safe">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
