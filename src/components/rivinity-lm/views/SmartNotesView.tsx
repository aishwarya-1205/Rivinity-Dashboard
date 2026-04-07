import { useState } from "react";
import { FileText, Sparkles, Download, Share2, Plus, ChevronDown, Check } from "lucide-react";

interface Note {
  id: number;
  title: string;
  cue: string;
  detail: string;
  summary: string;
  date: string;
}

const sampleNotes: Note[] = [
  {
    id: 1, title: "Photosynthesis",
    cue: "What is the equation for photosynthesis?",
    detail: "6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂\n\nPhotosynthesis occurs in two stages:\n1. Light-dependent reactions (in thylakoids)\n2. Calvin Cycle (in stroma)\n\nChlorophyll absorbs red and blue light, reflecting green.",
    summary: "Photosynthesis converts CO₂ and water into glucose using light energy. It has two stages: light-dependent reactions and the Calvin Cycle.",
    date: "Today",
  },
  {
    id: 2, title: "World War II Causes",
    cue: "What led to WWII?",
    detail: "Key causes:\n• Treaty of Versailles (1919) — harsh reparations on Germany\n• Rise of Fascism — Mussolini (Italy), Hitler (Germany)\n• Failure of Appeasement — Munich Agreement 1938\n• Invasion of Poland — September 1, 1939\n• Economic instability — Great Depression effects",
    summary: "WWII was caused by the Treaty of Versailles, rise of fascism, failed appeasement, and economic instability.",
    date: "Yesterday",
  },
];

const SmartNotesView = () => {
  const [notes, setNotes] = useState(sampleNotes);
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0]);
  const [topic, setTopic] = useState("");
  const [generating, setGenerating] = useState(false);
  const [noteStyle, setNoteStyle] = useState("Cornell");
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);

  const generateNote = () => {
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      const newNote: Note = {
        id: Date.now(),
        title: topic,
        cue: `What are the key concepts of ${topic}?`,
        detail: `AI-generated detailed notes on ${topic} will appear here with comprehensive explanations, examples, and key terminology.`,
        summary: `Summary of ${topic}: Core concepts and their interconnections explained concisely.`,
        date: "Just now",
      };
      setNotes(prev => [newNote, ...prev]);
      setSelectedNote(newNote);
      setTopic("");
      setGenerating(false);
    }, 1500);
  };

  return (
    <div className="flex gap-6 h-full">
      {/* Notes list */}
      <div className="w-[240px] shrink-0 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-foreground/80">SmartNotes</h2>
          <div className="relative">
            <button
              onClick={() => setShowStyleDropdown(!showStyleDropdown)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium text-muted-foreground/60 hover:bg-accent/50 transition-colors"
            >
              {noteStyle} <ChevronDown className="w-3 h-3" />
            </button>
            {showStyleDropdown && (
              <div className="absolute top-full mt-1 right-0 w-32 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                {["Cornell", "Outline", "Mind Map", "Summary"].map(s => (
                  <button key={s} onClick={() => { setNoteStyle(s); setShowStyleDropdown(false); }}
                    className={`w-full px-3 py-2 text-[11px] text-left flex items-center justify-between transition-colors ${
                      s === noteStyle ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50"
                    }`}
                  >
                    {s} {s === noteStyle && <Check className="w-3 h-3" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Generate */}
        <div className="glass rounded-xl border border-glass p-3">
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") generateNote(); }}
            placeholder="Enter a topic..."
            className="w-full bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none mb-2"
          />
          <button
            onClick={generateNote}
            disabled={generating}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-medium gradient-accent text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            <Sparkles className="w-3 h-3" />
            {generating ? "Generating..." : "Generate Notes"}
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-1.5">
          {notes.map(n => (
            <button
              key={n.id}
              onClick={() => setSelectedNote(n)}
              className={`w-full text-left px-3 py-3 rounded-xl transition-all duration-150 ${
                selectedNote?.id === n.id
                  ? "glass border border-glass shadow-float"
                  : "hover:bg-accent/50"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-primary/60 shrink-0" />
                <p className="text-[12px] font-medium text-foreground/75 truncate">{n.title}</p>
              </div>
              <p className="text-[10px] text-muted-foreground/40 mt-1 ml-5.5">{n.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Note detail - Cornell style */}
      {selectedNote && (
        <div className="flex-1 glass rounded-2xl border border-glass p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-foreground/85">{selectedNote.title}</h3>
            <div className="flex items-center gap-1.5">
              <button className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
                <Download className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/40 hover:text-muted-foreground/70 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cornell layout */}
          <div className="grid grid-cols-[200px_1fr] gap-px bg-border/40 rounded-xl overflow-hidden">
            <div className="bg-primary/5 p-4">
              <p className="text-[10px] font-semibold text-primary/60 uppercase tracking-wider mb-2">Cue / Questions</p>
              <p className="text-[13px] text-foreground/70 leading-relaxed">{selectedNote.cue}</p>
            </div>
            <div className="bg-background p-4">
              <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2">Notes</p>
              <p className="text-[13px] text-foreground/70 leading-relaxed whitespace-pre-wrap">{selectedNote.detail}</p>
            </div>
          </div>

          <div className="mt-4 bg-accent/30 rounded-xl p-4">
            <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2">Summary</p>
            <p className="text-[13px] text-foreground/70 leading-relaxed">{selectedNote.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartNotesView;
