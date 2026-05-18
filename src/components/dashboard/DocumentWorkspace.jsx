import { CheckCircle2, Bot, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DocumentWorkspace({ documentData }) {
  const filename = documentData?.filename || "Unknown Document";
  const contentText = documentData?.content || documentData?.preview || "No content available.";

  return (
    <div className="w-full animate-in fade-in zoom-in duration-500">
      
      <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-base font-semibold tracking-tight mb-0.5">{filename}</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Just uploaded</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>Full Document Extracted</span>
            </div>
          </div>
          <Badge className="bg-risk-safe/10 text-risk-safe border-risk-safe/20 hover:bg-risk-safe/20 shadow-none font-medium">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Analyzed
          </Badge>
        </div>

        {/* Scrollable Document Reader */}
        <div className="bg-card rounded-lg border border-border shadow-sm relative flex flex-col overflow-hidden">
          
          {/* Reader Header */}
          <div className="h-12 border-b border-border/50 bg-muted/20 flex items-center px-6 justify-between shrink-0">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="w-4 h-4" />
              Document Reader
            </div>
            <div className="flex items-center gap-2 text-primary/40 pointer-events-none">
              <Bot className="w-4 h-4" />
              <span className="text-[10px] font-semibold tracking-widest uppercase">LexAI Engine</span>
            </div>
          </div>

          {/* Reader Body with Scroll */}
          <div className="overflow-y-auto custom-scrollbar p-8 md:p-12 relative bg-background/30" style={{ maxHeight: 'calc(100vh - 220px)' }}>
            <div className="max-w-3xl mx-auto">
              <div className="text-foreground/90 leading-[1.8] text-[15px] whitespace-pre-wrap font-serif">
                {contentText}
              </div>
            </div>
          </div>
          
        </div>
    </div>
  );
}
