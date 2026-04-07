import { useState } from "react";
import { GraduationCap, Clock, Target, Play, Sparkles, ChevronDown, BarChart3, Check } from "lucide-react";

interface ExamTemplate {
  id: string;
  name: string;
  subject: string;
  questions: number;
  duration: string;
  difficulty: string;
}

const templates: ExamTemplate[] = [
  { id: "sat", name: "SAT Practice", subject: "Math + English", questions: 50, duration: "60 min", difficulty: "Medium" },
  { id: "ap-bio", name: "AP Biology", subject: "Biology", questions: 40, duration: "45 min", difficulty: "Hard" },
  { id: "gcse-math", name: "GCSE Mathematics", subject: "Mathematics", questions: 30, duration: "30 min", difficulty: "Medium" },
  { id: "custom", name: "Custom Exam", subject: "Any", questions: 0, duration: "Custom", difficulty: "Custom" },
];

const pastResults = [
  { name: "SAT Math Practice", score: 85, total: 100, date: "2 days ago", grade: "A" },
  { name: "Physics Quiz", score: 18, total: 20, date: "1 week ago", grade: "A+" },
  { name: "AP Chemistry", score: 32, total: 40, date: "2 weeks ago", grade: "B+" },
];

const ExamLabView = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customTopic, setCustomTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [showDiffDropdown, setShowDiffDropdown] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  return (
    <div className="max-w-[750px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground/85">ExamLab</h2>
          <p className="text-[12px] text-muted-foreground/50">Simulate any exam, get instant feedback</p>
        </div>
      </div>

      {/* Exam templates */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {templates.map(t => (
          <button key={t.id} onClick={() => setSelectedTemplate(t.id)}
            className={`text-left p-5 rounded-2xl border transition-all duration-200 ${
              selectedTemplate === t.id ? "glass border-primary/20 shadow-glow-accent" : "glass border-glass hover:shadow-float border-glass-hover"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                selectedTemplate === t.id ? "gradient-accent" : "bg-muted"
              }`}>
                <GraduationCap className={`w-5 h-5 ${selectedTemplate === t.id ? "text-primary-foreground" : "text-muted-foreground/50"}`} />
              </div>
              <div>
                <p className="text-[13px] font-semibold text-foreground/80">{t.name}</p>
                <p className="text-[11px] text-muted-foreground/50">{t.subject}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40"><Target className="w-3 h-3" />{t.questions} Qs</span>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40"><Clock className="w-3 h-3" />{t.duration}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Custom setup */}
      {selectedTemplate && (
        <div className="glass rounded-2xl border border-glass p-5 mb-6 animate-float-in shadow-float">
          <p className="text-[12px] font-semibold text-foreground/70 mb-4">Configure Exam</p>
          <div className="flex gap-3 mb-3">
            <input value={customTopic} onChange={(e) => setCustomTopic(e.target.value)} placeholder="Specific topic or chapter (optional)"
              className="flex-1 bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/20" />
            <div className="relative">
              <button onClick={() => setShowDiffDropdown(!showDiffDropdown)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-muted/30 text-[12px] font-medium text-foreground/70">
                {difficulty} <ChevronDown className="w-3 h-3" />
              </button>
              {showDiffDropdown && (
                <div className="absolute top-full mt-1 right-0 w-28 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                  {["Easy", "Medium", "Hard", "Expert"].map(d => (
                    <button key={d} onClick={() => { setDifficulty(d); setShowDiffDropdown(false); }}
                      className={`w-full px-3 py-2 text-[11px] text-left transition-colors ${d === difficulty ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
                    >{d}</button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={() => setExamStarted(true)}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl gradient-accent text-primary-foreground text-[13px] font-semibold hover:opacity-90 transition-opacity">
            <Play className="w-4 h-4" /> Start Exam
          </button>
        </div>
      )}

      {/* Past results */}
      <div>
        <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-3">Past Results</p>
        <div className="space-y-2">
          {pastResults.map((r, i) => (
            <div key={i} className="glass rounded-xl border border-glass p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                r.grade.startsWith("A") ? "bg-green-500/10" : "bg-amber-500/10"
              }`}>
                <span className={`text-[14px] font-bold ${r.grade.startsWith("A") ? "text-green-600" : "text-amber-600"}`}>{r.grade}</span>
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-foreground/75">{r.name}</p>
                <p className="text-[11px] text-muted-foreground/40">{r.date}</p>
              </div>
              <div className="text-right">
                <p className="text-[14px] font-semibold text-foreground/80">{r.score}/{r.total}</p>
                <div className="w-20 h-1.5 rounded-full bg-muted mt-1">
                  <div className="h-full rounded-full gradient-accent" style={{ width: `${(r.score / r.total) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExamLabView;
