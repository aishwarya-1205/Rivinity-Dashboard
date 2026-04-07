import { useState } from "react";
import { HelpCircle, Check, X, Lightbulb, ChevronRight, Trophy, RotateCcw, Sparkles } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  hint: string;
  explanation: string;
}

const sampleQuiz: Question[] = [
  {
    id: 1, question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1,
    hint: "It's named after the Roman god of war.",
    explanation: "Mars appears red due to iron oxide (rust) on its surface. It's the fourth planet from the Sun."
  },
  {
    id: 2, question: "What is the chemical symbol for Gold?",
    options: ["Go", "Gd", "Au", "Ag"], correct: 2,
    hint: "It comes from the Latin word 'Aurum'.",
    explanation: "Au comes from 'Aurum', the Latin word for gold. Silver's symbol Ag comes from 'Argentum'."
  },
  {
    id: 3, question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1,
    hint: "He was born in Stratford-upon-Avon.",
    explanation: "William Shakespeare wrote Romeo and Juliet around 1594-1596. It's one of his earliest tragedies."
  },
];

const QuizzesView = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [completed, setCompleted] = useState(false);

  const question = sampleQuiz[currentQ];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    setShowExplanation(true);
    if (idx === question.correct) setScore(s => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ >= sampleQuiz.length - 1) { setCompleted(true); return; }
    setCurrentQ(q => q + 1);
    setSelected(null); setShowHint(false); setShowExplanation(false); setAnswered(false);
  };

  const restart = () => {
    setCurrentQ(0); setSelected(null); setShowHint(false); setShowExplanation(false);
    setAnswered(false); setScore(0); setCompleted(false);
  };

  if (completed) {
    const pct = Math.round((score / sampleQuiz.length) * 100);
    return (
      <div className="max-w-[500px] mx-auto text-center py-12">
        <div className="w-20 h-20 rounded-full gradient-accent mx-auto mb-6 flex items-center justify-center shadow-glow-accent">
          <Trophy className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground/85 mb-2">Quiz Complete!</h2>
        <p className="text-[14px] text-muted-foreground/60 mb-6">You scored {score} out of {sampleQuiz.length} ({pct}%)</p>
        <div className="flex items-center justify-center gap-3 mb-8">
          {sampleQuiz.map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full ${i < score ? "bg-green-500" : "bg-red-400"}`} />
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={restart} className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-glass text-[13px] font-medium hover:shadow-float transition-all">
            <RotateCcw className="w-4 h-4" /> Retry
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity">
            <Sparkles className="w-4 h-4" /> New Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[600px] mx-auto">
      {/* Progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-primary" />
          <span className="text-[13px] font-medium text-foreground/70">Question {currentQ + 1} of {sampleQuiz.length}</span>
        </div>
        <span className="text-[12px] font-semibold text-primary">Score: {score}</span>
      </div>

      <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-8">
        <div className="h-full rounded-full gradient-accent transition-all duration-300" style={{ width: `${((currentQ + 1) / sampleQuiz.length) * 100}%` }} />
      </div>

      {/* Question */}
      <div className="glass rounded-2xl border border-glass p-6 mb-6 shadow-float">
        <p className="text-[16px] font-medium text-foreground/85 leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {question.options.map((opt, i) => {
          let style = "glass border border-glass hover:shadow-float hover:border-glass-hover";
          if (answered) {
            if (i === question.correct) style = "bg-green-500/10 border border-green-500/30";
            else if (i === selected) style = "bg-red-500/10 border border-red-500/30";
            else style = "glass border border-glass opacity-50";
          }
          return (
            <button key={i} onClick={() => handleSelect(i)} disabled={answered}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-left transition-all duration-200 ${style}`}
            >
              <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[12px] font-bold shrink-0 ${
                answered && i === question.correct ? "bg-green-500 text-white" :
                answered && i === selected ? "bg-red-500 text-white" :
                "bg-muted text-muted-foreground/60"
              }`}>
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-[14px] text-foreground/75">{opt}</span>
              {answered && i === question.correct && <Check className="w-4 h-4 text-green-600 ml-auto" />}
              {answered && i === selected && i !== question.correct && <X className="w-4 h-4 text-red-500 ml-auto" />}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      {!answered && (
        <button onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-medium text-amber-600 bg-amber-500/10 hover:bg-amber-500/15 transition-colors mb-4"
        >
          <Lightbulb className="w-3.5 h-3.5" /> {showHint ? question.hint : "Show Hint"}
        </button>
      )}

      {/* Explanation */}
      {showExplanation && (
        <div className="glass rounded-xl border border-glass p-4 mb-6 animate-float-in">
          <p className="text-[10px] font-semibold text-primary/60 uppercase tracking-wider mb-2">Explanation</p>
          <p className="text-[13px] text-foreground/70 leading-relaxed">{question.explanation}</p>
        </div>
      )}

      {answered && (
        <div className="flex justify-end">
          <button onClick={nextQuestion} className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-accent text-primary-foreground text-[13px] font-medium hover:opacity-90 transition-opacity">
            {currentQ < sampleQuiz.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizzesView;
