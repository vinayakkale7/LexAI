import { useState } from "react";
import { Send, Bot, User, Sparkles, Calendar, ShieldAlert, X, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "I've analyzed the NDA. I found 1 high-risk clause regarding indemnification. Would you like me to summarize the key obligations?" }
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div className="relative group">
              <Button 
                onClick={() => setIsOpen(true)}
                className="w-11 h-11 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.15)] bg-background/40 backdrop-blur-xl border border-border hover:border-primary/30 text-muted-foreground hover:text-primary hover:bg-background/60 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-popover text-popover-foreground text-[10px] font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-border shadow-sm">
                Ask LexAI
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sliding Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", boxShadow: "-10px 0 30px rgba(0,0,0,0)" }}
            animate={{ x: 0, boxShadow: "-10px 0 30px rgba(0,0,0,0.1)" }}
            exit={{ x: "100%", boxShadow: "-10px 0 30px rgba(0,0,0,0)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 w-[380px] max-w-[90vw] h-screen border-l border-border bg-card flex flex-col z-50"
          >
            
            {/* Header */}
            <header className="h-14 border-b border-border flex items-center px-4 justify-between shrink-0 bg-background">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center relative">
             <Bot className="w-4 h-4 text-primary" />
             <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-green-500 border border-background shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          </div>
          <div>
              <h3 className="text-sm font-semibold text-foreground">LexAI Assistant</h3>
              <p className="text-[11px] text-primary">Online & analyzing</p>
           </div>
         </div>
         <div className="flex items-center gap-1">
           <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
             <Sparkles className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8 text-muted-foreground hover:text-foreground">
             <X className="w-4 h-4" />
           </Button>
         </div>
       </header>

      {/* Insights / Widgets Area (Scrollable above chat) */}
      <div className="p-3 space-y-3 overflow-y-auto max-h-[40%] border-b border-border custom-scrollbar">
        <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-1">Quick Insights</h4>
        
        {/* Insight Card: Risk Summary */}
        <div className="glass-panel p-2.5 rounded-lg border border-risk-high/20 bg-risk-high/5 floating-element cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-risk-high">
              <ShieldAlert className="w-4 h-4" />
              <span className="text-sm font-semibold">1 Critical Risk</span>
            </div>
            <span className="text-xs bg-risk-high/20 px-2 py-0.5 rounded-full text-risk-high">Clause 4</span>
          </div>
          <p className="text-xs text-white/70">Broad indemnification obligations detected. Recommended to negotiate limits.</p>
        </div>

        {/* Insight Card: Important Dates */}
        <div className="glass-panel p-2.5 rounded-lg border border-border bg-card floating-element cursor-pointer">
          <div className="flex items-center gap-2 text-primary mb-2">
            <Calendar className="w-4 h-4" />
            <span className="text-sm font-semibold">Key Dates</span>
          </div>
          <p className="text-xs text-white/70">Effective Date: <span className="text-white font-medium">May 17, 2026</span></p>
          <p className="text-xs text-white/70 mt-1">Expiration: <span className="text-white font-medium">Perpetual</span></p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
             <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
               msg.role === "assistant" ? "bg-primary/20 text-primary border border-primary/30" : "bg-secondary/20 text-secondary border border-secondary/30"
             }`}>
               {msg.role === "assistant" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
             </div>
             <div className={`px-3 py-2 rounded-xl max-w-[85%] text-sm leading-relaxed ${
               msg.role === "user" 
                ? "bg-muted border border-border text-foreground rounded-tr-sm" 
                : "bg-primary/10 border border-primary/20 text-foreground rounded-tl-sm shadow-sm"
             }`}>
               {msg.content}
             </div>
          </div>
        ))}
        {/* Typing Indicator */}
        <div className="flex gap-3">
           <div className="w-8 h-8 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center shrink-0">
             <Bot className="w-4 h-4" />
           </div>
           <div className="px-3 py-2 rounded-xl bg-muted/50 border border-border rounded-tl-sm flex items-center gap-1.5 w-14">
             <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "0ms" }} />
             <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
             <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "300ms" }} />
           </div>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-border shrink-0 bg-background">
        <div className="relative flex items-center">
           <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Ask about this document..."
             className="w-full bg-card border border-border rounded-lg pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted-foreground shadow-sm"
           />
           <Button size="icon" className="absolute right-1 top-1 h-7 w-7 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md">
             <Send className="w-4 h-4" />
           </Button>
        </div>
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
          {["Summarize obligations", "Find payment terms", "Check jurisdiction"].map((suggestion, i) => (
             <button key={i} className="text-xs whitespace-nowrap bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-lg text-muted-foreground hover:text-white transition-colors">
               {suggestion}
             </button>
          ))}
      </div>
      </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
