import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import CanvasTopBar from "@/components/canvas/CanvastopBar";
import CanvasMain from "@/components/canvas/CanvasMain";
import CanvasRightPanel from "@/components/canvas/CanvasRightPanel";
import { PanelLeft } from "lucide-react";

const Index = () => {
  // Open by default on desktop, closed on mobile
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 768,
  );

  return (
    <div className="h-screen flex overflow-hidden">
      {/* ── Mobile overlay backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ──
          Desktop: shrinks/expands inline (pushes content).
          Mobile:  fixed drawer that slides in over content. */}
      <div
        className={`
          shrink-0 transition-all duration-300 ease-in-out overflow-hidden
          md:relative md:z-auto
          fixed inset-y-0 left-0 z-40
        `}
        style={{ width: sidebarOpen ? 260 : 0 }}
      >
        <CanvasSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* ── Middle column ── */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Floating sidebar toggle */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <CanvasTopBar />
        <CanvasMain />
      </div>

      {/* ── Right panel — hidden on mobile & tablet, visible xl+ ── */}
      <CanvasRightPanel />
    </div>
  );
};

export default Index;
