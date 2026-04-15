import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Send,
  Download,
  RotateCcw,
  RotateCw,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Copy,
  ChevronDown,
  Sparkles,
} from "lucide-react";

const emotions = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😠", label: "Angry" },
  { emoji: "😮", label: "Surprise" },
  { emoji: "🤮", label: "Disgust" },
  { emoji: "😞", label: "Disappointment" },
  { emoji: "😰", label: "Anxious" },
  { emoji: "😌", label: "Calm" },
];

const TextToSpeechView = () => {
  const [text, setText] = useState(
    "Bring your attention to the crown of your head... Notice any sensations there. Slowly let your awareness travel down to your forehead, your eyes, your jaw.\n\nIf you notice any tension, imagine it softening with each breath.\n\nLet this wave of awareness flow down your neck, shoulders, arms, and all the way to your fingertips.",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [hasGenerated, setHasGenerated] = useState(true);
  const [showEmotions, setShowEmotions] = useState(false);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([
    "Disgust",
    "Disappointment",
  ]);
  const [enhanceScript, setEnhanceScript] = useState(false);

  const toggleEmotion = (label: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(label) ? prev.filter((e) => e !== label) : [...prev, label],
    );
  };

  return (
    <div className="max-w-[720px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-foreground/90">
          Text to Speech Playground
        </h2>
        <p className="text-[13px] text-muted-foreground/60 mt-1">
          Convert your text into natural, expressive speech
        </p>
      </div>

      {/* Text editor area */}
      <div className="glass rounded-2xl border border-glass shadow-float overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          rows={10}
          className="w-full bg-transparent text-[15px] leading-relaxed text-foreground/80 placeholder:text-muted-foreground/30 focus:outline-none px-6 pt-5 pb-3 resize-none"
        />

        {/* Generated audio player */}
        {hasGenerated && (
          <div className="mx-8 mb-6 p-6 rounded-xl bg-muted/50 border border-border/30">
            <div className="flex items-center gap-1 mb-3">
              <div className="w-5 h-5 rounded-full gradient-accent flex items-center justify-center">
                <Sparkles className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="text-[12px] text-muted-foreground/70">
                Voice generated successfully. Press play to preview.
              </span>
            </div>

            {/* Waveform visualization */}
            <div className="flex items-center gap-3 mb-3">
              <div className="flex-1 h-10 flex items-center gap-[2px]">
                {Array.from({ length: 60 }).map((_, i) => {
                  const height = Math.random() * 100;
                  const isFilled = (i / 60) * 100 < progress;
                  return (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-colors duration-100 ${isFilled ? "bg-foreground/70" : "bg-foreground/15"}`}
                      style={{ height: `${Math.max(15, height)}%` }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Player controls */}
            <div className="flex items-center gap-3">
              <button
                className="text-muted-foreground/50 hover:text-foreground transition-colors"
                onClick={() => setProgress(Math.max(0, progress - 10))}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-background" />
                ) : (
                  <Play className="w-4 h-4 text-background ml-0.5" />
                )}
              </button>
              <button
                className="text-muted-foreground/50 hover:text-foreground transition-colors"
                onClick={() => setProgress(Math.min(100, progress + 10))}
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Timeline */}
              <div className="flex-1 flex items-center gap-2">
                <span className="text-[11px] text-muted-foreground/50 font-mono">
                  0:40
                </span>
                <div
                  className="flex-1 h-1 rounded-full bg-foreground/10 relative cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    setProgress(((e.clientX - rect.left) / rect.width) * 100);
                  }}
                >
                  <div
                    className="h-full rounded-full bg-foreground/60 transition-all"
                    style={{ width: `${progress}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground shadow-md"
                    style={{
                      left: `${progress}%`,
                      transform: `translate(-50%, -50%)`,
                    }}
                  />
                </div>
                <span className="text-[11px] text-muted-foreground/50 font-mono">
                  1:32
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-all">
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-all">
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-all">
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:bg-red-500/10 hover:text-red-500 transition-all">
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom toolbar */}
        <div className="flex items-center justify-between px-5 pb-4 pt-1">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Selected emotion chips */}
            {selectedEmotions.map((em) => {
              const emotion = emotions.find((e) => e.label === em);
              return (
                <button
                  key={em}
                  onClick={() => toggleEmotion(em)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[12px] font-medium hover:bg-primary/20 transition-colors"
                >
                  {emotion?.emoji} {em.toUpperCase()}
                </button>
              );
            })}

            {/* More emotions */}
            <div className="relative">
              <button
                onClick={() => setShowEmotions(!showEmotions)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-muted/50 text-muted-foreground/50 text-[12px] font-medium hover:bg-muted transition-colors"
              >
                {emotions.length - selectedEmotions.length}+
              </button>
              {showEmotions && (
                <div className="absolute bottom-full mb-2 left-0 z-50 glass-strong rounded-xl border border-glass shadow-float p-3 animate-float-in min-w-[240px]">
                  <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-2">
                    Emotion Tags
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {emotions.map((em) => (
                      <button
                        key={em.label}
                        onClick={() => toggleEmotion(em.label)}
                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all ${selectedEmotions.includes(em.label)
                          ? "bg-primary/15 text-primary"
                          : "bg-muted/50 text-muted-foreground/60 hover:bg-muted"
                          }`}
                      >
                        {em.emoji} {em.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setEnhanceScript(!enhanceScript)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-colors ${enhanceScript
                ? "bg-secondary/15 text-secondary"
                : "bg-muted/50 text-muted-foreground/50 hover:bg-muted"
                }`}
            >
              <Sparkles className="w-3 h-3" />
              ENHANCE SCRIPT
            </button>
          </div>

          <button
            onClick={() => setHasGenerated(true)}
            className="px-5 py-2 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            SEND
          </button>
        </div>
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-muted-foreground/40">
            💎 100,000 Credits Remaining
          </span>
        </div>
        <span className="text-[11px] text-muted-foreground/40">
          {text.length}/5,000 Characters
        </span>
      </div>
    </div>
  );
};

export default TextToSpeechView;
