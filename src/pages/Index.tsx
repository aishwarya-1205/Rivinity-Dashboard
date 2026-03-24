import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasTopBar from "@/components/canvas/CanvastopBar";
import CanvasMain from "@/components/canvas/CanvasMain";
import CanvasRightPanel from "@/components/canvas/CanvasRightPanel";
import { PanelLeft } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 768,
  );

  return (
    // ✅ overflow-hidden removed from root — was clipping panel shadows
    // overflow-hidden moved to the middle column only so content still clips correctly
    <div className="h-screen flex">
      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar wrapper
          ✅ overflow-hidden removed — was clipping the box-shadow
          Instead we clip with max-width: 0 when closed so content is hidden
          but shadow can still paint outside its box */}
      <div
        className="shrink-0 transition-all duration-300 ease-in-out md:relative md:z-auto fixed inset-y-0 left-0 z-40"
        style={{
          width: sidebarOpen ? 260 : 0,
          // Clip content without clipping shadows by using clip-path only when closed
          overflow: sidebarOpen ? "visible" : "hidden",
        }}
      >
        <CanvasSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Middle column — overflow-hidden here keeps content clipped without affecting panels */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <CanvasTopBar />
        <CanvasMain />
      </div>

      {/* Right panel */}
      <CanvasRightPanel />
    </div>
  );
};

export default Index;
