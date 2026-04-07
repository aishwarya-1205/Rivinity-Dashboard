import { useState } from "react";
import { RotateCcw, ChevronLeft, ChevronRight, Sparkles, Check, X, Shuffle, Layers } from "lucide-react";

interface Flashcard {
  id: number;
  front: string;
  back: string;
  difficulty: "easy" | "medium" | "hard";
  mastered: boolean;
}

const sampleCards: Flashcard[] = [
  { id: 1, front: "What is the powerhouse of the cell?", back: "The mitochondria. It generates most of the cell's ATP through oxidative phosphorylation.", difficulty: "easy", mastered: false },
  { id: 2, front: "Define Newton's Second Law", back: "F = ma (Force equals mass times acceleration). The net force on an object is equal to its mass multiplied by its acceleration.", difficulty: "medium", mastered: false },
  { id: 3, front: "What is the Pythagorean theorem?", back: "a² + b² = c², where c is the hypotenuse of a right triangle and a, b are the other sides.", difficulty: "easy", mastered: true },
  { id: 4, front: "Explain the concept of Supply and Demand", back: "When supply exceeds demand, prices fall. When demand exceeds supply, prices rise. Equilibrium is where supply equals demand.", difficulty: "hard", mastered: false },
  { id: 5, front: "What causes seasons on Earth?", back: "Earth's axial tilt of 23.5° causes different parts of the planet to receive varying amounts of direct sunlight throughout the year.", difficulty: "medium", mastered: false },
];

const FlashcardsView = () => {
  const [cards] = useState(sampleCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);

  const currentCard = cards[currentIndex];
  const progress = ((currentIndex + 1) / cards.length) * 100;

  const next = () => { setFlipped(false); setTimeout(() => setCurrentIndex(i => Math.min(i + 1, cards.length - 1)), 150); };
  const prev = () => { setFlipped(false); setTimeout(() => setCurrentIndex(i => Math.max(i - 1, 0)), 150); };

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground/85">Flashcards</h2>
          <p className="text-[12px] text-muted-foreground/50 mt-0.5">Spaced repetition for better retention</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
            currentCard.difficulty === "easy" ? "bg-green-500/10 text-green-600"
              : currentCard.difficulty === "medium" ? "bg-amber-500/10 text-amber-600"
              : "bg-red-500/10 text-red-600"
          }`}>
            {currentCard.difficulty}
          </span>
          <button className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/40 transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full gradient-accent transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-[11px] text-muted-foreground/50 font-medium">{currentIndex + 1}/{cards.length}</span>
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="relative w-full min-h-[280px] cursor-pointer perspective-1000 mb-6"
      >
        <div className={`w-full min-h-[280px] glass rounded-2xl border border-glass shadow-float p-8 flex flex-col items-center justify-center text-center transition-all duration-300 ${
          flipped ? "bg-primary/5" : ""
        }`}>
          <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-wider mb-4">
            {flipped ? "Answer" : "Question"}
          </p>
          <p className="text-lg font-medium text-foreground/80 leading-relaxed max-w-[500px]">
            {flipped ? currentCard.back : currentCard.front}
          </p>
          <p className="text-[11px] text-muted-foreground/30 mt-6">
            {flipped ? "Click to see question" : "Click to reveal answer"}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button onClick={prev} disabled={currentIndex === 0}
          className="w-10 h-10 rounded-xl glass border border-glass flex items-center justify-center text-muted-foreground/50 hover:text-foreground/70 disabled:opacity-30 transition-all">
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/15 text-[12px] font-medium transition-colors">
          <X className="w-3.5 h-3.5" /> Didn't know
        </button>
        <button onClick={() => setFlipped(!flipped)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass border border-glass text-[12px] font-medium text-foreground/70 hover:shadow-float transition-all">
          <RotateCcw className="w-3.5 h-3.5" /> Flip
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 text-green-600 hover:bg-green-500/15 text-[12px] font-medium transition-colors">
          <Check className="w-3.5 h-3.5" /> Got it!
        </button>

        <button onClick={next} disabled={currentIndex === cards.length - 1}
          className="w-10 h-10 rounded-xl glass border border-glass flex items-center justify-center text-muted-foreground/50 hover:text-foreground/70 disabled:opacity-30 transition-all">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Generate new */}
      <div className="glass rounded-2xl border border-glass p-5">
        <p className="text-[12px] font-semibold text-foreground/70 mb-3">Generate Flashcards</p>
        <div className="flex gap-2">
          <input value={topic} onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g., Organic Chemistry)" className="flex-1 bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/20" />
          <button onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 1500); }}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[12px] font-medium hover:opacity-90 transition-opacity">
            <Sparkles className="w-3.5 h-3.5" />{generating ? "Creating..." : "Generate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsView;
