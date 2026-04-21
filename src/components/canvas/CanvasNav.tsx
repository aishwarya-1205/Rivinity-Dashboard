import { ChevronDown, Settings } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import SettingsModal from "../shared/SettingsModal";

const CanvasNav = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <div className="h-12 flex items-center justify-between px-5 shrink-0">
        <div className="w-20" />

        {/* Model selector */}
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-accent transition-colors duration-150">
          <span className="w-[6px] h-[6px] rounded-full bg-secondary" />
          <span className="text-[13px] font-medium text-foreground/70">Rivinity Core</span>
          <ChevronDown className="w-3 h-3 text-muted-foreground/50" />
        </button>

        {/* Right */}
        <div className="flex items-center gap-1.5">

          <Avatar className="w-7 h-7 rounded-lg">
            <AvatarFallback className="rounded-lg bg-secondary/10 text-secondary text-[10px] font-medium">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
};

export default CanvasNav;
