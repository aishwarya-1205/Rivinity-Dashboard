import { useState } from "react";
import { Swords, Send, User, Bot, ThumbsUp, ThumbsDown, RotateCcw, Sparkles, Timer, Copy, Share2, Volume2, Pencil, Check } from "lucide-react";

interface DebateMessage {
  id: number;
  role: "user" | "ai";
  content: string;
  score?: number;
  feedback?: string;
}

const debateTopics = [
  "Should AI replace teachers in classrooms?",
  "Is social media more harmful than beneficial?",
  "Should college education be free?",
  "Is space exploration worth the cost?",
  "Should voting be mandatory?",
];

const DebateView = () => {
  const [started, setStarted] = useState(false);
  const [topic, setTopic] = useState("");
  const [stance, setStance] = useState<"for" | "against">("for");
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [input, setInput] = useState("");
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const startDebate = (t: string) => {
    setTopic(t);
    setStarted(true);
    setMessages([{
      id: 1, role: "ai",
      content: `Welcome to the debate! The topic is: "${t}"\n\nYou are arguing ${stance === "for" ? "FOR" : "AGAINST"} this proposition. I will take the opposing side.\n\nPlease make your opening statement. You have ${totalRounds} rounds. Make your argument compelling!`,
    }]);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: DebateMessage = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1, role: "ai",
        content: "That's an interesting point, but I'd argue that the evidence suggests otherwise. Studies show that the implementation challenges far outweigh the theoretical benefits you've described. Furthermore, the practical implications on existing infrastructure would be significant.",
        score: 7,
        feedback: "Good argument structure. Try adding specific data points to strengthen your case."
      }]);
      setRound(r => r + 1);
    }, 1500);
  };

  if (!started) {
    return (
      <div className="max-w-[600px] mx-auto h-full flex flex-col justify-center min-h-0">
        <div className="text-center mb-6 shrink-0 mt-4">
          <div className="w-16 h-16 rounded-2xl gradient-accent mx-auto mb-4 flex items-center justify-center shadow-glow-accent">
            <Swords className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-xl font-semibold text-foreground/85 mb-2">AI Debate Arena</h2>
          <p className="text-[13px] text-muted-foreground/50">Sharpen your critical thinking and argumentation skills</p>
        </div>

        {/* Topic selection */}
        <div className="glass rounded-2xl border border-glass p-5 mb-5 shadow-float flex-1 flex flex-col min-h-0">
          <p className="text-[12px] font-semibold text-foreground/70 mb-3 shrink-0">Choose a Topic</p>
          <div className="space-y-2 mb-4 overflow-y-auto pr-2 flex-1 min-h-0 custom-scrollbar">
            {debateTopics.map(t => (
              <button key={t} onClick={() => setTopic(t)}
                className={`w-full text-left px-4 py-3 rounded-xl text-[13px] transition-all shrink-0 ${
                  topic === t ? "glass border border-primary/20 shadow-glow-accent text-foreground/80 font-medium" : "text-muted-foreground/60 hover:bg-accent/50"
                }`}
              >{t}</button>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground/40 mb-2 shrink-0">Or enter your own:</p>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="Enter a debate topic..."
            className="w-full bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none shrink-0" />
        </div>

        {/* Stance */}
        <div className="glass rounded-2xl border border-glass p-4 mb-5 shadow-float shrink-0">
          <p className="text-[12px] font-semibold text-foreground/70 mb-3">Your Stance</p>
          <div className="flex gap-3">
            {(["for", "against"] as const).map(s => (
              <button key={s} onClick={() => setStance(s)}
                className={`flex-1 py-2.5 rounded-xl text-[13px] font-semibold capitalize transition-all ${
                  stance === s ? "gradient-accent text-primary-foreground" : "bg-muted/50 text-muted-foreground/60 hover:bg-muted/70"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        <button onClick={() => topic && startDebate(topic)} disabled={!topic}
          className="w-full py-3.5 rounded-xl gradient-accent text-primary-foreground text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0 mb-4">
          Start Debate
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[700px] mx-auto flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <div className="flex items-center gap-3">
          <Swords className="w-4 h-4 text-primary" />
          <span className="text-[13px] font-medium text-foreground/70 truncate max-w-[300px]">{topic}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] text-muted-foreground/50"><Timer className="w-3 h-3" />Round {round}/{totalRounds}</span>
          <button onClick={() => { setStarted(false); setMessages([]); setRound(1); }}
            className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/40 transition-colors"><RotateCcw className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 custom-scrollbar min-h-0">
        {messages.map(msg => (
          <div key={msg.id} className={`group flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`max-w-[100%] ${msg.role === "user"
              ? "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground px-5 py-3"
              : "rounded-2xl rounded-bl-lg glass border border-glass px-5 py-4"
            }`}>
              <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              {msg.feedback && (
                <div className="mt-3 pt-3 border-t border-glass">
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-semibold text-primary/70">Score: {msg.score}/10</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground/60">{msg.feedback}</p>
                </div>
              )}
              </div>
              {msg.role === "ai" && (
                <div className="flex items-center gap-1 mt-1 ml-1 text-muted-foreground/40">
                  <button onClick={() => copy(msg.content, msg.id)} title="Copy" className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors hover:text-muted-foreground/70">
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button title="Good response" className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors hover:text-muted-foreground/70">
                    <ThumbsUp className="w-3.5 h-3.5" />
                  </button>
                  <button title="Bad response" className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors hover:text-muted-foreground/70">
                    <ThumbsDown className="w-3.5 h-3.5" />
                  </button>
                  <button title="Share" className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors hover:text-muted-foreground/70">
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button title="Regenerate" className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors hover:text-muted-foreground/70">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button title="Read aloud" className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors hover:text-muted-foreground/70">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              {msg.role === "user" && (
                <div className="flex items-center gap-1 mt-1 mr-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity text-primary-foreground/60">
                  <button title="Edit" className="p-1 rounded-md hover:bg-accent/20 transition-colors hover:text-primary-foreground">
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => copy(msg.content, msg.id)} title="Copy" className="p-1 rounded-md hover:bg-accent/20 transition-colors hover:text-primary-foreground">
                    {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="shrink-0 pb-2">
        <div className="flex items-center gap-2 glass rounded-2xl border border-glass px-4 py-3 input-glow">
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Make your argument..." className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none" />
          <button onClick={handleSend} className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity">
            <Send className="w-3.5 h-3.5 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DebateView;
