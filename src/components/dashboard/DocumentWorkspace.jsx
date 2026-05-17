import { Search, UploadCloud, ChevronDown, CheckCircle2, AlertTriangle, FileText, SearchCode, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DocumentWorkspace() {
  return (
    <div className="w-full">
      
      <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-base font-semibold tracking-tight mb-0.5">Non-Disclosure Agreement_v2.pdf</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Last updated 2 hours ago</span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span>12 Pages</span>
            </div>
          </div>
          <Badge className="bg-risk-safe/10 text-risk-safe border-risk-safe/20 hover:bg-risk-safe/20 shadow-none font-medium">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Analyzed
          </Badge>
        </div>

        {/* Mock PDF Viewer / Document Cards */}
        <div className="bg-card rounded-lg p-6 md:p-8 border border-border min-h-[600px] shadow-sm relative">
          
          {/* Optional Chat Bot Logo Watermark */}
          <div className="absolute top-6 right-6 flex items-center gap-2 text-primary/20 pointer-events-none">
            <Bot className="w-6 h-6" />
            <span className="text-xs font-semibold tracking-widest uppercase">AI Analyzed</span>
          </div>

          <div className="max-w-3xl mt-2">
            <h2 className="text-base font-semibold mb-2 text-foreground">
              1. Definition of Confidential Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              For purposes of this Agreement, "Confidential Information" shall include all information or material that has or could have commercial value or other utility in the business in which Disclosing Party is engaged.
            </p>

            <h2 className="text-base font-semibold mb-2 text-foreground">
              2. Obligations of Receiving Party
            </h2>
            
            {/* Safe Clause */}
            <div className="relative group p-3.5 rounded-lg border border-risk-safe/20 bg-risk-safe/5 mb-6 transition-colors hover:bg-risk-safe/10">
               <div className="absolute -left-[1px] top-4 bottom-4 w-[2px] bg-risk-safe rounded-r-full" />
               <p className="text-foreground/90 leading-relaxed text-sm">
                 Receiving Party shall hold and maintain the Confidential Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party.
               </p>
               <Badge className="absolute -top-2.5 right-3 bg-risk-safe text-white text-[10px] px-1.5 py-0 border-none shadow-sm flex items-center gap-1 font-medium">
                 <CheckCircle2 className="w-3 h-3" /> Safe
               </Badge>
            </div>

            <h2 className="text-base font-semibold mb-2 text-foreground">
              3. Term and Termination
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
              The nondisclosure provisions of this Agreement shall survive the termination of this Agreement and Receiving Party's duty to hold Confidential Information in confidence shall remain in effect until the Confidential Information no longer qualifies as a trade secret or until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this Agreement.
            </p>

            <h2 className="text-base font-semibold mb-2 text-foreground">
              4. Indemnification
            </h2>
            {/* High Risk Clause */}
            <div className="relative group p-3.5 rounded-lg border border-risk-high/30 bg-risk-high/10 mb-6 transition-colors hover:bg-risk-high/20">
               <div className="absolute -left-[1px] top-4 bottom-4 w-[2px] bg-risk-high rounded-r-full" />
               <p className="text-foreground/90 leading-relaxed text-sm">
                 Receiving Party agrees to indemnify, defend, and hold harmless Disclosing Party from and against any and all claims, losses, liabilities, damages, expenses, and costs (including attorneys' fees) arising out of or related to any breach of this Agreement by Receiving Party.
               </p>
               <Badge className="absolute -top-2.5 right-3 bg-risk-high text-white text-[10px] px-1.5 py-0 border-none shadow-sm flex items-center gap-1 font-medium">
                 <AlertTriangle className="w-3 h-3" /> High Risk
               </Badge>
            </div>
            
            <h2 className="text-base font-semibold mb-2 text-foreground">
              5. Governing Law
            </h2>
            {/* Warning Clause */}
            <div className="relative group p-3.5 rounded-lg border border-risk-warning/30 bg-risk-warning/10 mb-6 transition-colors hover:bg-risk-warning/20">
               <div className="absolute -left-[1px] top-4 bottom-4 w-[2px] bg-risk-warning rounded-r-full" />
               <p className="text-foreground/90 leading-relaxed text-sm">
                 This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without giving effect to any principles of conflicts of law.
               </p>
               <Badge className="absolute -top-2.5 right-3 bg-risk-warning text-black text-[10px] px-1.5 py-0 border-none shadow-sm flex items-center gap-1 font-medium">
                 <SearchCode className="w-3 h-3" /> Jurisdiction Alert
               </Badge>
            </div>
            
          </div>
        </div>
    </div>
  );
}
