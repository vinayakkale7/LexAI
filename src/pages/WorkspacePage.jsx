import DocumentWorkspace from "@/components/dashboard/DocumentWorkspace";
import AIAssistant from "@/components/dashboard/AIAssistant";
import { Bot, Download, Bell, UploadCloud, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

export default function WorkspacePage() {
  const location = useLocation();
  const hasDocument = location.state?.hasDocument || false;
  const documentData = location.state?.documentData || null;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden relative">
      {/* Background Ambience & Noise */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div className="absolute inset-0 bg-noise opacity-[0.015]" />
         <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 blur-[200px] rounded-full mix-blend-screen" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 blur-[200px] rounded-full mix-blend-screen" />
      </div>

      {/* Top Navigation Bar */}
      <header className="h-14 border-b border-border bg-background/80 backdrop-blur-md z-20 flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-bold text-lg tracking-tight">Lex<span className="text-primary">AI</span></span>
          </Link>
          <div className="w-[1px] h-4 bg-border" />
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Workspace</span>
            {hasDocument ? (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium text-foreground">{documentData?.filename || "Uploaded Document"}</span>
              </>
            ) : (
              <>
                <span className="text-muted-foreground">/</span>
                <span className="font-medium text-foreground">Recent</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
             <Bell className="w-4 h-4" />
          </Button>
          <Button size="sm" variant="outline" className="h-8">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary cursor-pointer hover:bg-primary/20 transition-colors border border-primary/20">
            JD
          </div>
        </div>
      </header>

      {/* Secondary Workspace Navigation */}
      <div className="h-12 border-b border-border/50 bg-background/40 backdrop-blur-md z-10 flex items-center px-6 gap-6 shrink-0">
         <div className="flex items-center gap-1">
            {["Recent", "Contracts", "NDA", "Employment"].map((tab, i) => (
               <button key={i} className={`text-xs px-2.5 py-1.5 rounded transition-colors ${i === 0 ? "bg-transparent text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}>
                  {tab}
               </button>
            ))}
            <div className="w-[1px] h-3 bg-border mx-2" />
            <button className="text-muted-foreground hover:text-foreground hover:bg-muted/50 p-1.5 rounded-md transition-colors">
               <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M7.49991 1.00018C7.77605 1.00018 7.99991 1.22404 7.99991 1.50018V7.00018H13.4999C13.7761 7.00018 14.0001 7.22404 14.0001 7.50018C14.0001 7.77632 13.7761 8.00018 13.4999 8.00018H7.99991V13.5002C7.99991 13.7763 7.77605 14.0002 7.49991 14.0002C7.22377 14.0002 6.99991 13.7763 6.99991 13.5002V8.00018H1.49991C1.22377 8.00018 0.999908 7.77632 0.999908 7.50018C0.999908 7.22404 1.22377 7.00018 1.49991 7.00018H6.99991V1.50018C6.99991 1.22404 7.22377 1.00018 7.49991 1.00018Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
            </button>
         </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex overflow-y-auto z-10 custom-scrollbar justify-center px-4 py-8 relative">
         {!hasDocument ? (
           <div className="flex flex-col items-center w-full max-w-2xl mt-8 animate-in fade-in zoom-in duration-700">
             
             <div className="text-center mb-10">
               <h2 className="text-xl font-semibold tracking-tight mb-2 text-foreground">Start analyzing a legal document</h2>
               <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed">
                 Upload a contract to extract clauses, detect risks, and generate AI-powered legal insights.
               </p>
             </div>

             <Link to="/" className="w-full max-w-xl mx-auto block group">
               <div className="w-full h-64 rounded-2xl bg-card/10 backdrop-blur-md border border-dashed border-border/60 flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 hover:border-primary/30 hover:bg-card/20 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                 
                 <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                 
                 <div className="w-14 h-14 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center mb-5 shadow-sm group-hover:scale-105 group-hover:bg-primary/10 group-hover:border-primary/20 transition-all duration-500">
                   <UploadCloud className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                 </div>
                 
                 <Button variant="secondary" size="sm" className="pointer-events-none h-8 px-4 text-xs font-medium bg-muted/60 backdrop-blur-md border border-border/50 text-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300">
                   Select a File
                 </Button>
                 
                 <p className="text-[10px] text-muted-foreground/60 mt-4 font-medium tracking-wide">
                   PDF, DOCX, TXT UP TO 50MB
                 </p>
               </div>
             </Link>
             
             {/* Recent Activity Context */}
             <div className="w-full max-w-xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Recent Activity</h3>
               </div>
               <div className="space-y-2">
                 {[1, 2].map((i) => (
                   <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border/40 bg-card/10 hover:bg-card/30 transition-colors cursor-pointer group">
                     <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded bg-muted/30 flex items-center justify-center border border-border/40 group-hover:border-primary/20 transition-colors">
                         <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                       </div>
                       <div>
                         <p className="text-sm font-medium text-foreground">Vendor_Agreement_Acme_{i}.pdf</p>
                         <p className="text-xs text-muted-foreground mt-0.5">Analyzed 2 days ago</p>
                       </div>
                     </div>
                     <span className="text-[10px] font-medium bg-risk-safe/10 text-risk-safe px-2 py-0.5 rounded border border-risk-safe/20">Safe</span>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         ) : (
           <div className="w-full max-w-4xl">
              <DocumentWorkspace documentData={documentData} />
           </div>
         )}
      </main>

      <AIAssistant />
    </div>
  );
}
