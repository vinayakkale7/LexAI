import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WorkspacePage from "./pages/WorkspacePage";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
      </Routes>
    </div>
  );
}

export default App;
