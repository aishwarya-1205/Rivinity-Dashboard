import { useState } from "react";
import CanvasSidebar from "@/components/canvas/CanvasSidebar";
import AudioLabMain from "@/components/audio-lab/AudioLabMain";
import AudioLabRightPanel from "@/components/audio-lab/AudioLabRightPanel";
import CanvasTopBar from "@/components/canvas/CanvastopBar";
import { PanelLeft } from "lucide-react";

const AudioLab = () => {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => window.innerWidth >= 1024,
  );
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState<string>("text-to-speech");

  return (
    <div className="h-screen flex overflow-hidden">
      <div
        className="shrink-0 transition-all duration-300 ease-in-out overflow-hidden"
        style={{ width: sidebarOpen ? 260 : 0 }}
      >
        <CanvasSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0 relative">
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200"
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <CanvasTopBar
          rightPanelOpen={rightPanelOpen}
          setRightPanelOpen={setRightPanelOpen}
        />

        <div className="flex-1 flex min-h-0 relative">
          <AudioLabMain
            activeFeature={activeFeature}
            onFeatureChange={setActiveFeature}
          />
          <AudioLabRightPanel
            activeFeature={activeFeature}
            isOpen={rightPanelOpen}
            onClose={() => setRightPanelOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioLab;
