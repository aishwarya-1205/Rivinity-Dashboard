import { useState, useRef, useCallback } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  Code,
  FileText,
  Lightbulb,
  Search,
  Image,
  ChevronDown,
  Plus,
  X,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Share2,
  RotateCcw,
  Check,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}
interface Tab {
  id: number;
  icon: typeof Search;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: Search, label: "Smart Paper Search" },
  { id: 2, icon: FileText, label: "Smart Summarization" },
  { id: 3, icon: Lightbulb, label: "Citation Generator" },
];
const tabTemplates = [
  { icon: Search, label: "Research" },
  { icon: Code, label: "Code Gen" },
  { icon: FileText, label: "Report" },
  { icon: Lightbulb, label: "Brainstorm" },
];
const suggestions = [
  { icon: Code, label: "Write code" },
  { icon: Search, label: "Research" },
  { icon: FileText, label: "Summarize" },
  { icon: Image, label: "Generate" },
  { icon: Lightbulb, label: "Brainstorm" },
];
const quickCards = [
  {
    icon: Code,
    title: "Build an API",
    desc: "RESTful endpoint with auth and validation",
  },
  {
    icon: FileText,
    title: "Write docs",
    desc: "Clean technical docs for any codebase",
  },
  {
    icon: Lightbulb,
    title: "Architect a system",
    desc: "Scalable patterns and data models",
  },
];

const MessageActions = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<"up" | "down" | null>(null);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-0.5 mt-1.5 ml-1">
      <button
        onClick={copy}
        title="Copy"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground/60 hover:bg-muted/50 transition-all"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <button
        onClick={() => setLiked(liked === "up" ? null : "up")}
        title="Like"
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked === "up" ? "text-primary bg-primary/10" : "text-muted-foreground/40 hover:text-foreground/60 hover:bg-muted/50"}`}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setLiked(liked === "down" ? null : "down")}
        title="Dislike"
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked === "down" ? "text-red-400 bg-red-400/10" : "text-muted-foreground/40 hover:text-foreground/60 hover:bg-muted/50"}`}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
      <button
        title="Regenerate"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground/60 hover:bg-muted/50 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
      <button
        title="Share"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-foreground/60 hover:bg-muted/50 transition-all"
      >
        <Share2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const CanvasMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addTab = () => {
    const t = tabTemplates[tabs.length % tabTemplates.length];
    const tab: Tab = { id: Date.now(), icon: t.icon, label: t.label };
    setTabs((p) => [...p, tab]);
    setActiveTab(tab.id);
  };
  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex((t) => t.id === id);
    if (activeTab === id) setActiveTab((tabs[idx + 1] || tabs[idx - 1]).id);
    setTabs((p) => p.filter((t) => t.id !== id));
  };
  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setMessages((p) => [...p, { id: Date.now(), role: "user", content: text }]);
    setInput("");
    setTimeout(() => textareaRef.current?.focus(), 50);
    setTimeout(
      () =>
        setMessages((p) => [
          ...p,
          {
            id: Date.now() + 1,
            role: "ai",
            content:
              "I'd be happy to help with that. Let me analyze your request and provide a comprehensive, well-structured solution.",
          },
        ]),
      700,
    );
  }, [input]);

  const isEmpty = messages.length === 0;

  const inputArea = (
    <div className="w-full max-w-[660px]">
      <div className="border border-border/60 rounded-2xl shadow-float input-glow transition-all duration-200 overflow-hidden bg-background">
        {/* Tabs — scrollable on mobile */}
        <div className="flex items-center border-b border-border/40 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-150 border-r border-border/30 shrink-0 ${
                activeTab === tab.id
                  ? "bg-background text-foreground"
                  : "bg-muted/30 text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <tab.icon className="w-3 h-3 shrink-0" />
              {/* Hide label text on very small screens, show icon only */}
              <span className="truncate hidden xs:inline">{tab.label}</span>
              {tabs.length > 1 && (
                <X
                  className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                  onClick={(e) => closeTab(tab.id, e)}
                />
              )}
            </button>
          ))}
          <button
            onClick={addTab}
            className="px-3 py-2 text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/30 transition-all shrink-0"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Curious? Ask and dive into scholarly insights"
          rows={2}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-4 pt-3 pb-1 resize-none"
        />

        <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
          <div className="flex items-center gap-0.5">
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all">
              <Paperclip className="w-3.5 h-3.5" />
            </button>
            <button className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all">
              <Mic className="w-3.5 h-3.5" />
            </button>
            {/* Hide model selector on tiny screens */}
            <button className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium text-muted-foreground/50 hover:bg-muted/40 transition-all ml-1">
              <span className="w-3.5 h-3.5 rounded-full gradient-accent flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-primary-foreground" />
              </span>
              arc-1a
              <ChevronDown className="w-2.5 h-2.5 opacity-60" />
            </button>
          </div>
          <button
            onClick={handleSend}
            className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
          >
            <Send className="w-3 h-3 text-background" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center px-4 sm:px-6">
            <div className="w-full max-w-[660px] flex flex-col items-center">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full gradient-accent opacity-80 animate-orb mb-3 shadow-glow-accent" />

              <p className="text-[10px] text-muted-foreground/40 tracking-widest uppercase mb-2">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>

              {/* Heading: smaller on mobile */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground/85 text-center leading-tight tracking-tight mb-1">
                What can I help you build?
              </h1>

              <div className="h-0.5 w-12 rounded-full gradient-accent mt-3 mb-4 sm:mb-5" />

              <div className="w-full mb-3">{inputArea}</div>

              {/* Suggestion chips — wrap nicely on mobile */}
              <div className="flex gap-1.5 flex-wrap justify-center mb-4 sm:mb-5">
                {suggestions.map((s) => (
                  <button
                    key={s.label}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-[11px] sm:text-[11.5px] text-muted-foreground font-medium"
                  >
                    <s.icon className="w-3 h-3" />
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Quick cards: 1 col on mobile, 3 on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full">
                {quickCards.map((c) => (
                  <button
                    key={c.title}
                    onClick={() => {
                      setInput(c.desc);
                      setTimeout(() => textareaRef.current?.focus(), 0);
                    }}
                    className="text-left p-3 rounded-xl glass border border-glass hover:border-glass-hover transition-all duration-200 group flex sm:flex-col items-start gap-3 sm:gap-0"
                  >
                    <c.icon className="w-4 h-4 text-primary/70 sm:mb-2 group-hover:text-primary transition-colors shrink-0" />
                    <div>
                      <p className="text-[12.5px] font-medium text-foreground/80">
                        {c.title}
                      </p>
                      <p className="text-[11px] text-muted-foreground/50 mt-0.5 leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-[10px] text-muted-foreground/30 mt-4">
                Rivinity can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        ) : (
          /* Messages: narrower padding on mobile */
          <div className="w-full max-w-[700px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`animate-float-in flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground"
                      : "rounded-2xl rounded-bl-lg glass border border-glass text-foreground/80"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "ai" && <MessageActions content={msg.content} />}
              </div>
            ))}
          </div>
        )}
      </div>

      {!isEmpty && (
        <div className="px-3 sm:px-6 pb-3 sm:pb-4 pt-2 flex justify-center shrink-0 border-t border-border/30">
          {inputArea}
        </div>
      )}
    </div>
  );
};

export default CanvasMain;
