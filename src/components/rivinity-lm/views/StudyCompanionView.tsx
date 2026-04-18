import { useState } from "react";
import { Bot, Send, Sparkles, Target, Flame, Trophy, BookOpen, Brain, Copy, ThumbsUp, ThumbsDown, Share2, RotateCcw, Volume2, Pencil, Check } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}

const StudyCompanionView = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "ai", content: "Hey! 👋 I'm your study companion. I'll help you stay focused, understand concepts, and track your progress. What are you studying today?" },
  ]);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };
  
  const [streak, setStreak] = useState(7);
  const [level, setLevel] = useState(12);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: "ai",
        content: "That's a great topic to focus on! Let me help you break it down into manageable chunks. I recommend starting with the fundamentals and building up. Would you like me to create a quick study plan or dive right into explaining the concept?"
      }]);
    }, 1000);
  };

  return (
    <div className="max-w-[750px] mx-auto flex gap-6 h-full">
      {/* Chat area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center gap-3 mb-4 shrink-0">
          <div className="w-10 h-10 rounded-2xl gradient-accent flex items-center justify-center shadow-glow-accent">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-foreground/80">Study Companion</p>
            <p className="text-[11px] text-muted-foreground/50">Your personalized AI tutor</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {messages.map(msg => (
            <div key={msg.id} className={`group flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
                <div className={`max-w-[100%] px-4 py-3 text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground"
                  : "rounded-2xl rounded-bl-lg glass border border-glass text-foreground/75"
              }`}>{msg.content}</div>
                {msg.role === "ai" && (
                  <div className="flex items-center gap-1 mt-1 ml-1 text-muted-foreground/40">
                    <button onClick={() => copy(msg.content, msg.id)} title="Copy" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button title="Good response" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button title="Bad response" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                    <button title="Share" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button title="Regenerate" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <button title="Read aloud" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                {msg.role === "user" && (
                  <div className="flex items-center gap-0.5 mt-1 mr-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground/40">
                    <button title="Edit" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => copy(msg.content, msg.id)} title="Copy" className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors hover:text-red-500">
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="flex gap-2 mb-3 shrink-0 flex-wrap">
          {["Explain this simply", "Give me a quiz", "Create flashcards", "Summarize"].map(q => (
            <button key={q} onClick={() => { setInput(q); }}
              className="px-3 py-1.5 rounded-full bg-muted/50 text-[11px] font-medium text-muted-foreground/60 hover:text-foreground/70 hover:bg-muted/70 transition-colors">
              {q}
            </button>
          ))}
        </div>

        <div className="shrink-0">
          <div className="flex items-center gap-2 glass rounded-2xl border border-glass px-4 py-3 input-glow">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
              placeholder="Ask your companion anything..." className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none" />
            <button onClick={handleSend} className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity">
              <Send className="w-3.5 h-3.5 text-background" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats sidebar */}
      <div className="w-[180px] shrink-0 hidden lg:flex flex-col gap-4">
        <div className="glass rounded-2xl border border-glass p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-primary" />
            <p className="text-[12px] font-semibold text-foreground/70">Streak</p>
          </div>
          <p className="text-3xl font-bold text-foreground/85">{streak}</p>
          <p className="text-[10px] text-muted-foreground/40">days in a row</p>
        </div>

        <div className="glass rounded-2xl border border-glass p-4">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-4 h-4 text-amber-500" />
            <p className="text-[12px] font-semibold text-foreground/70">Level</p>
          </div>
          <p className="text-3xl font-bold text-foreground/85">{level}</p>
          <div className="h-1.5 rounded-full bg-muted mt-2">
            <div className="h-full rounded-full gradient-accent" style={{ width: "65%" }} />
          </div>
          <p className="text-[10px] text-muted-foreground/40 mt-1">650/1000 XP</p>
        </div>

        <div className="glass rounded-2xl border border-glass p-4">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-secondary" />
            <p className="text-[12px] font-semibold text-foreground/70">Goals</p>
          </div>
          <div className="space-y-2">
            {[
              { label: "Daily study", done: true },
              { label: "5 flashcards", done: true },
              { label: "1 quiz", done: false },
            ].map(g => (
              <div key={g.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${g.done ? "bg-green-500" : "bg-muted"}`} />
                <span className={`text-[11px] ${g.done ? "text-foreground/60 line-through" : "text-foreground/60"}`}>{g.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyCompanionView;
