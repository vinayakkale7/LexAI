import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ShieldCheck, Zap, Bot, ArrowRight, UploadCloud, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);

  const loadingMessages = [
    "Analyzing contract...",
    "Extracting clauses...",
    "Detecting legal risks...",
    "Generating AI insights..."
  ];

  useEffect(() => {
    if (isUploading && file) {
      const interval = setInterval(() => {
        setLoadingMsgIdx((prev) => {
          if (prev < loadingMessages.length - 1) return prev + 1;
          return prev;
        });
      }, 1500);
      
      const uploadDocument = async () => {
        try {
          const formData = new FormData();
          formData.append("file", file);
          
          const response = await fetch("http://localhost:8000/upload", {
            method: "POST",
            body: formData,
          });
          
          if (!response.ok) {
            let errDetail = "Upload failed";
            try {
              const errData = await response.json();
              errDetail = errData.detail || errDetail;
            } catch (e) {
              errDetail = `Upload failed with status ${response.status}`;
            }
            throw new Error(errDetail);
          }
          
          const data = await response.json();
          clearInterval(interval);
          navigate("/workspace", { state: { hasDocument: true, documentData: data } });
        } catch (error) {
          console.error("Upload error:", error);
          clearInterval(interval);
          // Fallback or handle error
          navigate("/workspace", { state: { hasDocument: true, documentData: { filename: file.name, preview: `Error: ${error.message}` } } });
        }
      };

      uploadDocument();

      return () => {
        clearInterval(interval);
      };
    }
  }, [isUploading, file, navigate]);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (uploadedFile) => {
    setFile(uploadedFile);
    setIsUploading(true);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-secondary/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Navbar Placeholder */}
      <header className="container mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl tracking-tight">Lex<span className="text-primary">AI</span></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#security" className="hover:text-white transition-colors">Security</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <Link to="/workspace" className="hover:text-primary transition-colors">Workspace</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-white">Log in</Button>
          <Link to="/workspace">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-4 neon-border">
            <Zap className="w-4 h-4" />
            <span>LexAI 2.0 is now live</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-white/60 leading-tight pb-2">
            AI-Powered Legal Document Intelligence
          </h1>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-light">
            Upload contracts, detect risks, extract clauses, and chat with legal documents using advanced AI.
          </p>
          
          <div className="pt-10 w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              {!isUploading ? (
                <motion.div
                  key="upload-box"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`relative border-2 border-dashed rounded-xl p-8 transition-all duration-300 ease-out bg-card/50 backdrop-blur-sm ${
                    isDragging 
                      ? "border-primary bg-primary/5 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[1.02]" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input 
                    type="file" 
                    id="fileUpload" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    accept=".pdf,.docx,.txt"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) handleFile(e.target.files[0]);
                    }}
                  />
                  <div className="flex flex-col items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 transition-transform group-hover:-translate-y-1">
                      <UploadCloud className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-1">Drag & Drop your document here</h3>
                    <p className="text-sm text-muted-foreground mb-5">or click to browse from your computer</p>
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/80">
                      <span className="bg-muted px-2 py-1 rounded-md border border-border">PDF</span>
                      <span className="bg-muted px-2 py-1 rounded-md border border-border">DOCX</span>
                      <span className="bg-muted px-2 py-1 rounded-md border border-border">TXT</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="uploading-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-border rounded-xl p-8 shadow-sm flex flex-col items-center justify-center relative overflow-hidden h-48"
                >
                  <div className="absolute top-0 left-0 h-1 bg-primary" style={{ width: `${((loadingMsgIdx + 1) / loadingMessages.length) * 100}%`, transition: "width 1.5s ease-in-out" }} />
                  
                  <div className="w-12 h-12 relative flex items-center justify-center mb-5">
                     <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
                     <motion.div 
                       animate={{ rotate: 360 }} 
                       transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                       className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent"
                     />
                     <FileText className="w-5 h-5 text-primary" />
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={loadingMsgIdx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-base font-medium text-foreground"
                    >
                      {loadingMessages[loadingMsgIdx]}
                    </motion.p>
                  </AnimatePresence>
                  
                  <p className="text-xs text-muted-foreground mt-2 truncate max-w-xs">{file?.name}</p>
                </motion.div>
              )}
            </AnimatePresence>
            
            {!isUploading && (
              <div className="mt-6 flex justify-center">
                <Link to="/workspace" state={{ hasDocument: true }}>
                  <Button variant="ghost" className="text-sm text-muted-foreground hover:text-foreground">
                    Skip & try demo <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </motion.div>

        {/* Floating UI Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-20 w-full max-w-5xl relative animate-float"
        >
          <div className="bg-card p-1.5 rounded-xl border border-border shadow-md relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80 pointer-events-none z-10 bottom-0 h-1/2 top-auto" />
             <img 
               src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80" 
               alt="LexAI Dashboard Preview" 
               className="rounded-lg opacity-40 grayscale-[50%] contrast-125 mix-blend-screen"
             />
             <div className="absolute top-10 left-10 bg-card p-3 rounded-lg border border-border shadow-sm flex items-start gap-3 w-60 z-20 hover:-translate-y-0.5 transition-transform">
                <div className="w-8 h-8 rounded-md bg-destructive/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">High Risk Clause</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">Indemnity clause is unusually broad.</p>
                </div>
             </div>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-3">Enterprise AI Capabilities</h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">Analyze contracts in seconds, not hours. LexAI provides human-level intelligence with machine-level speed.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: FileText, title: "Clause Extraction", desc: "Automatically identify and categorize over 50+ standard legal clauses." },
            { icon: ShieldCheck, title: "Risk Highlighting", desc: "Color-coded risk analysis based on your company's playbook." },
            { icon: Bot, title: "Interactive Q&A", desc: "Chat with your documents. Ask questions and get cited answers instantly." }
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-card p-6 rounded-xl border border-border floating-element group shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12 mt-auto relative z-10">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
           <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Bot className="w-5 h-5 text-primary" />
            <span className="font-semibold tracking-tight">Lex<span className="text-primary">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 LexAI Technologies Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
