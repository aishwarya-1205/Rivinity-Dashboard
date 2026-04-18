import { useState, useRef } from "react";
import {
  Upload,
  Mic,
  Play,
  Pause,
  ArrowRightLeft,
  Download,
  Sparkles,
  User,
  Users,
  CheckCircle,
  ChevronDown,
  Trash2,
  RefreshCw,
} from "lucide-react";

const genderOptions = [
  { id: "male-to-female", label: "Male → Female", from: "♂️", to: "♀️" },
  { id: "female-to-male", label: "Female → Male", from: "♀️", to: "♂️" },
  { id: "neutral", label: "Neutral", from: "⚡", to: "🎭" },
];

const voiceStyles = [
  { id: "natural", label: "Natural", desc: "Authentic & conversational" },
  { id: "professional", label: "Professional", desc: "Corporate & polished" },
  { id: "dramatic", label: "Dramatic", desc: "Theatrical & expressive" },
  { id: "whisper", label: "Whisper", desc: "Soft & intimate" },
  { id: "newscast", label: "Newscast", desc: "Broadcast quality" },
];

const clonedVoices = [
  {
    id: "v1",
    name: "My Voice (Cloned)",
    samples: 3,
    quality: "High",
    created: "2h ago",
  },
  {
    id: "v2",
    name: "Customer Service",
    samples: 5,
    quality: "Premium",
    created: "1d ago",
  },
];

const VoiceCloneView = () => {
  const [activeTab, setActiveTab] = useState<"clone" | "transform">("clone");
  const [selectedGender, setSelectedGender] = useState(genderOptions[0]);
  const [genderDropdownOpen, setGenderDropdownOpen] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(voiceStyles[0]);
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);
  const [uploadedSamples, setUploadedSamples] = useState<string[]>([
    "voice_sample_1.wav",
    "voice_sample_2.wav",
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasResult, setHasResult] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
  const [transformText, setTransformText] = useState(
    "Hello, welcome to our service. We're delighted to assist you today with any questions or concerns.",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pitch and speed sliders
  const [pitch, setPitch] = useState(50);
  const [speed, setSpeed] = useState(50);
  const [stability, setStability] = useState(70);
  const [similarity, setSimilarity] = useState(80);

  const handleClone = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setHasResult(true);
    }, 2000);
  };

  const removeSample = (name: string) => {
    setUploadedSamples((prev) => prev.filter((s) => s !== name));
  };

  return (
    <div className="max-w-[720px] mx-auto space-y-4 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground/90">
            {activeTab === "clone" ? "Voice Cloner" : "Voice Transformer"}
          </h2>
          <p className="text-[12px] text-muted-foreground/60">
            {activeTab === "clone"
              ? "Create high-fidelity digital replicas of any voice"
              : "Transform vocal characteristics with AI precision"}
          </p>
        </div>

        <div className="flex p-1 rounded-xl bg-muted/30 border border-glass/10">
          <button
            onClick={() => setActiveTab("clone")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${activeTab === "clone" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground/60 hover:text-foreground/80"}`}
          >
            Clone
          </button>
          <button
            onClick={() => setActiveTab("transform")}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${activeTab === "transform" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground/60 hover:text-foreground/80"}`}
          >
            Transform
          </button>
        </div>
      </div>

      {activeTab === "clone" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[440px]">
          {/* Upload and Process */}
          <div className="flex flex-col gap-4">
            <div className="glass rounded-2xl border border-glass p-5 flex-1 flex flex-col">
              <h3 className="text-[13px] font-semibold text-foreground/80 mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4 text-primary" />
                Upload Samples
              </h3>

              <div className="flex-1 space-y-2 mb-4 overflow-y-auto pr-1 custom-scrollbar">
                {uploadedSamples.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center border-2 border-dashed border-glass/10 rounded-xl p-4 text-center opacity-60">
                    <Mic className="w-8 h-8 mb-2 text-muted-foreground/30" />
                    <p className="text-[11px]">Upload 1-5 voice recordings</p>
                  </div>
                ) : (
                  uploadedSamples.map((sample) => (
                    <div key={sample} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30 border border-glass/20 group">
                      <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                        <Play className="w-3 h-3" />
                      </div>
                      <span className="text-[12px] text-foreground/70 flex-1 truncate">{sample}</span>
                      <button onClick={() => removeSample(sample)} className="p-1.5 rounded-lg hover:text-destructive opacity-0 group-hover:opacity-100">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-3 border-2 border-dashed border-glass/20 rounded-xl text-center cursor-pointer hover:bg-accent/20 transition-all mb-4"
              >
                <p className="text-[11px] font-medium text-primary">Add New Sample</p>
              </div>
              <input ref={fileInputRef} type="file" accept="audio/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setUploadedSamples(prev => [...prev, file.name]);
              }} />

              <button
                onClick={handleClone}
                disabled={isProcessing || uploadedSamples.length === 0}
                className="w-full py-2.5 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:shadow-glow-accent transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                Process Clone
              </button>
            </div>
          </div>

          {/* Library */}
          <div className="glass rounded-2xl border border-glass p-5 flex flex-col">
            <h3 className="text-[13px] font-semibold text-foreground/80 mb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-secondary" />
              Voice Library
            </h3>
            <div className="flex-1 space-y-2 overflow-y-auto pr-1 custom-scrollbar">
              {clonedVoices.map((v) => (
                <div key={v.id} className="p-3 rounded-xl bg-muted/20 border border-glass/10 hover:bg-muted/40 transition-all group">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[12px] font-medium text-foreground">{v.name}</span>
                    <span className="text-[10px] text-primary/60 font-bold uppercase">{v.quality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-muted-foreground/50">{v.samples} samples · {v.created}</span>
                    <button className="text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">USE THIS</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Transform Settings Card */}
          <div className="glass rounded-2xl border border-glass shadow-float p-5">
            <div className="flex items-center gap-4 mb-4">
              {/* Profile Selector (Gender + Style) */}
              <div className="relative flex-1">
                <button
                  onClick={() => setGenderDropdownOpen(!genderDropdownOpen)}
                  className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-muted border border-glass/20 hover:bg-accent/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[14px]">{selectedGender.from} → {selectedGender.to}</span>
                    <span className="w-px h-3 bg-glass/20" />
                    <span className="text-[12px] font-medium">{selectedStyle.label}</span>
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform ${genderDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {genderDropdownOpen && (
                  <div className="absolute top-full mt-2 left-0 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float p-2 animate-float-in min-w-[280px]">
                    <p className="text-[9px] font-bold text-muted-foreground/40 uppercase tracking-widest px-2 mb-2">Conversion & Style</p>
                    <div className="grid grid-cols-1 gap-1">
                      {genderOptions.map(g => (
                        <button key={g.id} onClick={() => { setSelectedGender(g); setGenderDropdownOpen(false); }} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] transition-all ${g.id === selectedGender.id ? 'bg-primary/20 text-primary' : 'hover:bg-accent/40'}`}>
                          <span>{g.from} {g.to}</span>
                          <span className="flex-1 text-left">{g.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Tuning Popover */}
              <div className="relative">
                <button
                  onClick={() => setStyleDropdownOpen(!styleDropdownOpen)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-[12px] font-medium ${styleDropdownOpen ? 'bg-secondary text-secondary-foreground' : 'bg-muted/30 border-transparent text-muted-foreground/60 hover:bg-muted/50'}`}
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tune Voice
                </button>

                {styleDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float p-4 animate-float-in min-w-[260px]">
                    <div className="space-y-4">
                      {[
                        { label: 'Pitch', value: pitch, set: setPitch },
                        { label: 'Speed', value: speed, set: setSpeed },
                        { label: 'Stability', value: stability, set: setStability },
                        { label: 'Similarity', value: similarity, set: setSimilarity }
                      ].map(s => (
                        <div key={s.label}>
                          <div className="flex justify-between mb-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground/50">{s.label}</span>
                            <span className="text-[10px] font-mono">{s.value}%</span>
                          </div>
                          <input type="range" min="0" max="100" value={s.value} onChange={e => s.set(Number(e.target.value))} className="w-full h-1 accent-primary" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <textarea
              value={transformText}
              onChange={(e) => setTransformText(e.target.value)}
              placeholder="Enter text to speak..."
              rows={3}
              className="w-full bg-transparent border border-glass/10 rounded-xl text-[13px] leading-relaxed text-foreground/80 placeholder:text-muted-foreground/20 focus:outline-none focus:border-primary/30 px-4 py-3 resize-none mb-4"
            />

            <button
              onClick={handleClone}
              disabled={isProcessing}
              className="w-full py-2.5 rounded-xl gradient-accent text-primary-foreground text-[14px] font-semibold hover:shadow-glow-accent transition-all flex items-center justify-center gap-2"
            >
              <ArrowRightLeft className="w-4 h-4" />
              Transform Now
            </button>
          </div>

          {/* Results Area */}
          {hasResult && (
            <div className="glass rounded-2xl border border-glass p-5 animate-float-in">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[12px] font-bold text-foreground/70 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Compare Results
                </span>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground"><Download className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground"><RefreshCw className="w-4 h-4" /></button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Original Sample', playing: isPlayingOriginal, toggle: setIsPlayingOriginal, other: setIsPlaying, gradient: false },
                  { label: 'AI Transformation', playing: isPlaying, toggle: setIsPlaying, other: setIsPlayingOriginal, gradient: true }
                ].map((p, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${p.gradient ? 'bg-primary/5 border-primary/10' : 'bg-muted/30 border-glass/10'}`}>
                    <p className={`text-[9px] uppercase font-bold mb-3 ${p.gradient ? 'text-primary' : 'text-muted-foreground/40'}`}>{p.label}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => { p.toggle(!p.playing); p.other(false); }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${p.playing ? (p.gradient ? 'gradient-accent' : 'bg-foreground/20') : 'bg-foreground/5'}`}
                      >
                        {p.playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                      </button>
                      <div className="flex items-center gap-[1px] h-4 flex-1 opacity-20">
                        {Array.from({ length: 15 }).map((_, j) => <div key={j} className="w-[1.5px] bg-foreground" style={{ height: `${20 + Math.random() * 80}%` }} />)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceCloneView;
