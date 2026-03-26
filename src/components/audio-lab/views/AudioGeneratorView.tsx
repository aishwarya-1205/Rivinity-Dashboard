import { useState } from "react";
import {
  Play,
  Pause,
  Download,
  RefreshCw,
  Sparkles,
  Search,
  Clock,
  Heart,
  AudioWaveform,
  ChevronDown,
} from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "nature", label: "🌿 Nature" },
  { id: "animals", label: "🐾 Animals" },
  { id: "urban", label: "🏙️ Urban" },
  { id: "music", label: "🎵 Musical" },
  { id: "sci-fi", label: "🚀 Sci-Fi" },
  { id: "horror", label: "👻 Horror" },
  { id: "ambient", label: "🌊 Ambient" },
];

const presets = [
  { id: "rain", label: "Gentle Rain", category: "nature", duration: "8s" },
  { id: "bird", label: "Bird Chirping", category: "animals", duration: "5s" },
  { id: "cat", label: "Cat Purring", category: "animals", duration: "6s" },
  { id: "thunder", label: "Thunder Roll", category: "nature", duration: "10s" },
  {
    id: "footsteps",
    label: "Footsteps on Gravel",
    category: "urban",
    duration: "4s",
  },
  { id: "laser", label: "Laser Beam", category: "sci-fi", duration: "3s" },
  { id: "ocean", label: "Ocean Waves", category: "ambient", duration: "15s" },
  { id: "piano", label: "Piano Chord", category: "music", duration: "4s" },
  { id: "dog", label: "Dog Barking", category: "animals", duration: "3s" },
  { id: "wind", label: "Howling Wind", category: "nature", duration: "12s" },
  { id: "door", label: "Door Creaking", category: "horror", duration: "5s" },
  {
    id: "engine",
    label: "Car Engine Start",
    category: "urban",
    duration: "6s",
  },
];

const AudioGeneratorView = () => {
  const [prompt, setPrompt] = useState("");
  const [duration, setDuration] = useState(5);
  const [influence, setInfluence] = useState(0.3);
  const [activeCategory, setActiveCategory] = useState("all");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSounds, setGeneratedSounds] = useState<
    Array<{ id: string; prompt: string; playing: boolean; liked: boolean }>
  >([
    {
      id: "1",
      prompt: "A gentle rain falling on a tin roof with distant thunder",
      playing: false,
      liked: false,
    },
    {
      id: "2",
      prompt: "Bird chirping in a sunny morning garden",
      playing: false,
      liked: true,
    },
    {
      id: "3",
      prompt: "Cat purring softly near a warm fireplace",
      playing: false,
      liked: false,
    },
  ]);

  const filteredPresets =
    activeCategory === "all"
      ? presets
      : presets.filter((p) => p.category === activeCategory);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedSounds((prev) => [
        { id: Date.now().toString(), prompt, playing: false, liked: false },
        ...prev,
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const togglePlay = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => ({ ...s, playing: s.id === id ? !s.playing : false })),
    );
  };

  const toggleLike = (id: string) => {
    setGeneratedSounds((prev) =>
      prev.map((s) => (s.id === id ? { ...s, liked: !s.liked } : s)),
    );
  };

  return (
    <div className="max-w-[720px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground/90">
            Audio Generator
          </h2>
          <p className="text-[12px] text-muted-foreground/60">
            Generate sound effects from text descriptions
          </p>
        </div>
        
        {/* Preset & Parameters Group */}
        <div className="flex items-center gap-2">
          {/* Presets Popover */}
          <div className="relative">
            <button
              onClick={() => setActiveCategory(activeCategory === "open" ? "all" : "open")}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-transparent hover:bg-muted/50 transition-all text-[11px] font-medium text-muted-foreground/70"
            >
              <AudioWaveform className="w-3.5 h-3.5" />
              Quick Presets
              <ChevronDown className={`w-3 h-3 transition-transform ${activeCategory === "open" ? "rotate-180" : ""}`} />
            </button>
            
            {activeCategory === "open" && (
              <div className="absolute top-full mt-2 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float p-3 animate-float-in min-w-[320px]">
                <div className="flex gap-1.5 flex-wrap mb-3">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id === "all" ? "open" : "open")} // Keep open for now
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all ${c.id === "all" ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground/60 hover:bg-muted"}`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-1.5 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
                  {presets.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setPrompt(p.label);
                        setActiveCategory("all");
                      }}
                      className="glass border border-glass/10 rounded-lg p-2 text-left hover:bg-accent/30 transition-all"
                    >
                      <p className="text-[11px] font-medium text-foreground/70">{p.label}</p>
                      <p className="text-[9px] text-muted-foreground/40">{p.duration}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Settings/Parameters Toggle (simplified as icons for now or just keep it minimal) */}
        </div>
      </div>

      {/* Prompt Card */}
      <div className="glass rounded-2xl border border-glass shadow-float overflow-hidden flex flex-col">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the sound you want to generate... e.g. 'Gentle rain on a tin roof'"
          rows={3}
          className="w-full bg-transparent text-[14px] leading-relaxed text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none px-6 pt-5 pb-2 resize-none"
        />

        {/* Dynamic Controls Bar */}
        <div className="flex items-center justify-between px-5 pb-4 pt-1">
          <div className="flex items-center gap-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/50 uppercase font-bold tracking-tighter">Duration</span>
                <span className="text-[10px] text-foreground/60 font-mono">{duration}s</span>
              </div>
              <input
                type="range"
                min={1}
                max={22}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-24 h-1 accent-primary"
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/50 uppercase font-bold tracking-tighter">Influence</span>
                <span className="text-[10px] text-foreground/60 font-mono">{(influence * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={influence * 100}
                onChange={(e) => setInfluence(Number(e.target.value) / 100)}
                className="w-24 h-1 accent-primary"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="px-6 py-2 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:shadow-glow-accent transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5" />
            )}
            Generate
          </button>
        </div>
      </div>

      {/* Generated sounds - scrollable list */}
      {generatedSounds.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest px-1">
            Library
          </p>
          <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
            {generatedSounds.map((sound) => (
              <div
                key={sound.id}
                className="glass rounded-xl border border-glass p-3 flex items-center gap-4 hover:bg-accent/10 transition-all group"
              >
                <button
                  onClick={() => togglePlay(sound.id)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${sound.playing
                      ? "gradient-accent"
                      : "bg-foreground/5 hover:bg-foreground/10"
                    }`}
                >
                  {sound.playing ? (
                    <Pause className="w-3.5 h-3.5 text-primary-foreground" />
                  ) : (
                    <Play className="w-3.5 h-3.5 text-foreground/70 ml-0.5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p className="text-[12px] text-foreground/75 truncate font-medium">
                    {sound.prompt}
                  </p>
                  <div className="flex items-center gap-[1px] h-3 mt-1.5 opacity-40">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-[2px] rounded-full bg-foreground`}
                        style={{ height: `${20 + Math.random() * 80}%` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleLike(sound.id)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${sound.liked ? "text-pink-500" : "text-muted-foreground/30 hover:text-foreground"}`}
                  >
                    <Heart className={`w-3 h-3 ${sound.liked ? "fill-current" : ""}`} />
                  </button>
                  <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/30 hover:text-foreground">
                    <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioGeneratorView;
