import { useState, useEffect } from "react";
import { CheckCircle2, Bot, FileText, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import AISummaryPanel from "@/components/workspace/AISummaryPanel";
import LegalInsights from "@/components/workspace/LegalInsights";
import ClauseHighlights from "@/components/workspace/ClauseHighlights";

export default function DocumentWorkspace({ documentData }) {
  const filename = documentData?.filename || "Unknown Document";
  const contentText = documentData?.content || documentData?.preview || "No content available.";
  
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!contentText || contentText === "No content available.") {
      setIsAnalyzing(false);
      return;
    }

    const fetchAnalysis = async () => {
      setAnalysis(null);
      setError(null);
      setIsAnalyzing(true);
      try {
        const response = await fetch("http://localhost:8000/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: contentText })
        });
        
        if (!response.ok) {
          throw new Error("Failed to analyze document.");
        }
        
        const data = await response.json();
        setAnalysis(data);
      } catch (err) {
        console.error(err);
        setError("AI Analysis failed. Please try again later.");
      } finally {
        setIsAnalyzing(false);
      }
    };

    fetchAnalysis();
  }, [contentText]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row gap-6 animate-in fade-in zoom-in duration-500">
      
      {/* Left Column: Reader */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between mb-4 shrink-0">
            <div>
              <h1 className="text-base font-semibold tracking-tight mb-0.5 truncate">{filename}</h1>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Just uploaded</span>
                <span className="w-1 h-1 rounded-full bg-border" />
                <span>Full Document Extracted</span>
              </div>
            </div>
            {!isAnalyzing && !error && (
              <Badge className="bg-risk-safe/10 text-risk-safe border-risk-safe/20 shadow-none font-medium">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                AI Analyzed
              </Badge>
            )}
        </div>

        {/* Scrollable Document Reader */}
        <div className="bg-card rounded-lg border border-border shadow-sm relative flex flex-col overflow-hidden flex-1">
            <div className="h-12 border-b border-border/50 bg-muted/20 flex items-center px-6 justify-between shrink-0">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <FileText className="w-4 h-4" />
                Document Reader
              </div>
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12 relative bg-background/30">
              <div className="max-w-3xl mx-auto">
                <div className="text-foreground/90 leading-[1.8] text-[15px] whitespace-pre-wrap font-serif">
                  {analysis?.clauses ? (
                    <ClauseHighlights contentText={contentText} clauses={analysis.clauses} />
                  ) : (
                    contentText
                  )}
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Right Column: AI Insights */}
      <div className="w-full lg:w-[450px] shrink-0 flex flex-col pt-0 lg:pt-[52px]">
        <div className="bg-card rounded-lg border border-border shadow-sm flex flex-col overflow-hidden flex-1 max-h-full">
            <div className="h-12 border-b border-border/50 bg-primary/5 flex items-center px-6 justify-between shrink-0">
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Bot className="w-4 h-4" />
                AI Dashboard
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
              {isAnalyzing ? (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 min-h-[200px]">
                  <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
                  <p className="text-sm font-medium">Analyzing document with AI...</p>
                </div>
              ) : error ? (
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm text-center">
                  {error}
                </div>
              ) : analysis ? (
                <div className="space-y-8 pb-4">
                  <AISummaryPanel analysis={analysis} />
                  <div className="h-px w-full bg-border/50" />
                  <LegalInsights clauses={analysis.clauses} />
                </div>
              ) : null}
            </div>
        </div>
      </div>
    </div>
  );
}
