import { useState } from "react";
import { Brain, Zap, Volume2, Mic, AudioWaveform, Users, History, Star, ChevronDown } from "lucide-react";

const voices = [
  { id: "sarah", name: "Sarah", desc: "Warm & professional", avatar: "S" },
  { id: "jonathan", name: "Jonathan", desc: "Powerful & persuasive", avatar: "J" },
  { id: "yolanda", name: "Yolanda", desc: "Calm & friendly", avatar: "Y" },
  { id: "george", name: "George", desc: "Deep & authoritative", avatar: "G" },
  { id: "lily", name: "Lily", desc: "Bright & energetic", avatar: "L" },
];

interface Props {
  activeFeature: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const AudioLabRightPanel = ({ activeFeature, isOpen, onClose }: Props) => {
  const [selectedVoice, setSelectedVoice] = useState(voices[0]);
  const [voiceDropdownOpen, setVoiceDropdownOpen] = useState(false);

  const showVoiceSelector = activeFeature === "text-to-speech" || activeFeature === "voice-clone";

  return (
    <aside
      className={`h-full flex-col py-6 px-4 shrink-0 flex gap-6 overflow-y-auto bg-background/50 backdrop-blur-md lg:relative fixed top-0 right-0 z-40 shadow-2xl lg:shadow-none transition-all duration-300 ease-in-out ${isOpen
          ? "translate-x-0 w-[260px] opacity-100"
          : "translate-x-full lg:translate-x-0 lg:w-0 lg:px-0 lg:opacity-0 pointer-events-none lg:pointer-events-auto"
        }`}
    >
      {/* Model */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">AI Model</p>
        <div className="glass rounded-2xl p-4 border border-glass shadow-float">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center">
              <Brain className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Melody Evo</p>
              <p className="text-[11px] text-muted-foreground/60">v2.0 · Audio AI</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3 h-3 text-primary" />
            <span className="text-[11px] text-muted-foreground/60">Low latency · Online</span>
          </div>
        </div>
      </div>

      {/* Voice Selector */}
      {showVoiceSelector && (
        <div>
          <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">Selected Voice</p>
          <div className="relative">
            <button
              onClick={() => setVoiceDropdownOpen(!voiceDropdownOpen)}
              className="w-full glass rounded-2xl p-4 border border-glass shadow-float text-left hover:shadow-glow-accent transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-foreground/10 flex items-center justify-center text-sm font-semibold text-foreground/70">
                    {selectedVoice.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{selectedVoice.name}</p>
                    <p className="text-[11px] text-muted-foreground/60">{selectedVoice.desc}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground/50 transition-transform duration-200 ${voiceDropdownOpen ? "rotate-180" : ""}`} />
              </div>
            </button>

            {voiceDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in">
                {voices.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setSelectedVoice(v);
                      setVoiceDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${v.id === selectedVoice.id
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                      }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center text-xs font-semibold text-foreground/70">
                      {v.avatar}
                    </div>
                    <div>
                      <p className="text-[13px] font-medium">{v.name}</p>
                      <p className="text-[11px] text-muted-foreground/50">{v.desc}</p>
                    </div>
                    {v.id === selectedVoice.id && (
                      <Star className="w-3 h-3 text-primary ml-auto fill-primary" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Generations */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-3 px-1">Recent</p>
        <div className="space-y-2">
          {[
            { label: "Welcome greeting", time: "2m ago", icon: Volume2 },
            { label: "Meeting transcript", time: "1h ago", icon: Mic },
            { label: "Rain ambience", time: "3h ago", icon: AudioWaveform },
          ].map((item) => (
            <button
              key={item.label}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-accent/50 transition-colors text-left"
            >
              <item.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-foreground/70 truncate">{item.label}</p>
                <p className="text-[10px] text-muted-foreground/40">{item.time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Credits */}
      <div className="mt-auto">
        <div className="glass rounded-2xl p-4 border border-glass">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[11px] font-medium text-foreground/70">Credits Remaining</p>
            <p className="text-[11px] font-semibold text-primary">8,450</p>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full rounded-full gradient-accent" style={{ width: "84.5%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground/40 mt-2">84,500 / 100,000 characters used</p>
        </div>
      </div>
    </aside>
  );
};

export default AudioLabRightPanel;
