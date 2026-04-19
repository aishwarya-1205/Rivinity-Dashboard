import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasTopBar from "@components/canvas/CanvasTopBar";
import CanvasMain from "@/components/canvas/CanvasMain";
import CanvasRightPanel from "@/components/canvas/CanvasRightPanel";
import { PanelLeft } from "lucide-react";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );
  const [rightPanelOpen, setRightPanelOpen] = useState(
    () => window.innerWidth >= 1024,
  );

  return (
    <div className="h-screen flex bg-background overflow-hidden relative">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {rightPanelOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          onClick={() => setRightPanelOpen(false)}
        />
      )}

      <div
        className="shrink-0 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-40 lg:relative lg:inset-auto lg:z-auto"
        style={{
          width: sidebarOpen ? 260 : 0,
          overflow: sidebarOpen ? "visible" : "hidden",
        }}
      >
        <CanvasSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Middle column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative transition-all duration-300">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200"
          aria-label="Toggle sidebar"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <CanvasTopBar
          rightPanelOpen={rightPanelOpen}
          setRightPanelOpen={setRightPanelOpen}
        />

        <div className="flex-1 min-h-0 relative">
          <CanvasMain />
        </div>
      </div>

      {/* ── Right panel ── */}
      <CanvasRightPanel
        isOpen={rightPanelOpen}
        onClose={() => setRightPanelOpen(false)}
      />
    </div>
  );
};

export default Index;
