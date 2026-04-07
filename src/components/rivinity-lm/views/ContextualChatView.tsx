import { useState } from "react";
import { Send, Paperclip, Sparkles, Loader2, BookOpen, Lightbulb, Copy, ThumbsUp, ThumbsDown } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
  thinking?: boolean;
  topics?: string[];
}

const ContextualChatView = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "user", content: "Explain quantum entanglement in simple terms" },
    {
      id: 2, role: "ai",
      content: "Quantum entanglement is a phenomenon where two particles become interconnected in such a way that the quantum state of one particle instantly influences the state of the other, regardless of the distance between them.\n\nImagine you have two magic coins. When you flip one and it lands on heads, the other one — no matter where it is in the universe — will instantly land on tails. That's the basic idea behind entanglement.\n\nKey points:\n• **Non-locality**: The effect happens faster than light\n• **Measurement dependence**: The states are undefined until observed\n• **No information transfer**: Despite the instant correlation, you can't use it to send messages faster than light\n\nEinstein famously called it \"spooky action at a distance\" because it seemed to violate relativity.",
      topics: ["Quantum Physics", "Wave Functions", "EPR Paradox"],
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    const thinkingMsg: Message = { id: Date.now() + 1, role: "ai", content: "", thinking: true };
    setMessages(prev => [...prev, thinkingMsg]);
    setTimeout(() => {
      setMessages(prev => prev.map(m => m.thinking
        ? { ...m, thinking: false, content: "That's a great follow-up question! Let me break it down for you with clear examples and analogies to make it easy to understand." }
        : m
      ));
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-[800px] mx-auto">
      <div className="flex gap-6 flex-1 min-h-0">
        {/* Important Topics */}
        <div className="w-[180px] shrink-0 hidden lg:block">
          <p className="text-[11px] font-semibold text-foreground/70 mb-3">Important Topics</p>
          {messages.filter(m => m.topics).map(m => (
            <div key={m.id} className="space-y-1.5 mb-4">
              {m.topics!.map(t => (
                <button key={t} className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-medium text-muted-foreground/60 hover:text-foreground/70 hover:bg-accent/50 transition-colors">
                  {t}
                </button>
              ))}
            </div>
          ))}
          {messages.filter(m => m.topics).length === 0 && (
            <p className="text-[11px] text-muted-foreground/40">No flashcards yet</p>
          )}
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] ${msg.role === "user"
                ? "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground px-5 py-3"
                : "rounded-2xl rounded-bl-lg glass border border-glass px-5 py-4"
              }`}>
                {msg.thinking ? (
                  <div className="flex items-center gap-2 text-muted-foreground/60">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-[13px]">Thinking...</span>
                  </div>
                ) : (
                  <>
                    <div className="text-[14px] leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                    {msg.role === "ai" && !msg.thinking && (
                      <div className="flex items-center gap-1 mt-3 pt-3 border-t border-glass">
                        <button className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground/40 hover:text-muted-foreground/70">
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground/40 hover:text-muted-foreground/70">
                          <ThumbsUp className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-accent/50 transition-colors text-muted-foreground/40 hover:text-muted-foreground/70">
                          <ThumbsDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="pt-4 pb-2 shrink-0">
        <div className="flex items-center gap-2 glass rounded-2xl border border-glass px-4 py-3 input-glow">
          <button className="text-muted-foreground/40 hover:text-muted-foreground/60 transition-colors">
            <Paperclip className="w-4 h-4" />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
            placeholder="Ask a follow-up question or request more examples..."
            className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none"
          />
          <button onClick={handleSend} className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity">
            <Send className="w-3.5 h-3.5 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContextualChatView;
