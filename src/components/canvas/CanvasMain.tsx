import { useState, useRef, useCallback, useEffect } from "react";
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
  ChevronLeft,
  ChevronRight,
  Volume2,
  Pencil,
  BarChart3,
  BookOpen,
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
  { icon: Search, label: "Smart Paper Search" },
  { icon: FileText, label: "Smart Summarization" },
  { icon: Lightbulb, label: "Citation Generator" },
  { icon: BarChart3, label: "Deep Analysis" },
  { icon: BookOpen, label: "Literature Review" },
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
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <button
        title="Good response"
        onClick={() => setLiked(liked === "up" ? null : "up")}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked === "up" ? "text-primary bg-primary/10" : "text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10"}`}
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        title="Bad response"
        onClick={() => setLiked(liked === "down" ? null : "down")}
        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${liked === "down" ? "text-red-400 bg-red-400/10" : "text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10"}`}
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
      <button title="Share" className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
        <Share2 className="w-3.5 h-3.5" />
      </button>
      <button title="Regenerate" className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
      <button title="Read aloud" className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
        <Volume2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

const UserMessageActions = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="flex items-center gap-0.5 mt-1.5 mr-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
      <button title="Edit" className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all">
        <Pencil className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={copy}
        title="Copy"
        className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 transition-all"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-green-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
    </div>
  );
};

const SuggestionsCarousel = ({
  suggestions,
}: {
  suggestions: { icon: React.ElementType; label: string }[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shadow-sm"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-1.5 overflow-x-auto scrollbar-none px-2 justify-center no-scrollbar"
        style={
          {
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        {suggestions.map((s) => (
          <button
            key={s.label}
            style={{ scrollSnapAlign: "center" }}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors text-[11.5px] text-muted-foreground font-medium"
          >
            <s.icon className="w-3 h-3" />
            {s.label}
          </button>
        ))}
      </div>

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-15px] top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shadow-sm"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

const QuickCardsCarousel = ({
  cards,
  onSelect,
  textareaRef,
}: {
  cards: { icon: React.ElementType; title: string; desc: string }[];
  onSelect: (val: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftRef = useRef(0);

  const scroll = (direction: "left" | "right") => {
    if (trackRef.current) {
      const scrollAmount = 300;
      trackRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    setIsMoved(false);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftRef.current = trackRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const delta = x - startX.current;
    if (Math.abs(delta) > 4) setIsMoved(true);
    trackRef.current.scrollLeft = scrollLeftRef.current - delta;
  };
  const stopDrag = () => {
    isDragging.current = false;
  };

  return (
    <div className="w-full relative group">
      <button
        onClick={() => scroll("left")}
        className="absolute left-[-20px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shadow-md"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        className="flex gap-2 overflow-x-auto cursor-grab active:cursor-grabbing select-none no-scrollbar"
        style={
          {
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          } as React.CSSProperties
        }
      >
        {cards.map((c, i) => (
          <button
            key={`${c.title}-${i}`}
            onClick={() => {
              if (!isMoved) {
                onSelect(c.desc);
                setTimeout(() => textareaRef.current?.focus(), 0);
              }
            }}
            className="shrink-0 text-left p-3 rounded-xl glass border border-glass hover:border-glass-hover transition-all duration-200 group flex flex-col items-start gap-2"
            style={{ width: "clamp(160px, 42vw, 220px)" }}
          >
            <c.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
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

      <button
        onClick={() => scroll("right")}
        className="absolute right-[-20px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground opacity-0 group-hover:opacity-100 transition-all shadow-md"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const getTabIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("code") || l.includes("dev") || l.includes("script")) return Code;
  if (l.includes("search") || l.includes("find") || l.includes("look")) return Search;
  if (l.includes("image") || l.includes("pic") || l.includes("draw") || l.includes("gen")) return Image;
  if (l.includes("idea") || l.includes("think") || l.includes("brain")) return Lightbulb;
  if (l.includes("doc") || l.includes("report") || l.includes("file") || l.includes("text")) return FileText;
  return Search;
};

const CanvasMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
        <div className="flex items-center overflow-x-auto scrollbar-none gap-0.5 px-2 py-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium transition-all duration-150 rounded-lg shrink-0 ${activeTab === tab.id ? "bg-muted/60 text-foreground" : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60"}`}
            >
              <tab.icon className="w-3 h-3 shrink-0" />
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
            onClick={() => setIsAddingTab(!isAddingTab)}
            className={`px-3 py-2 flex items-center gap-1 text-[12px] font-medium transition-all shrink-0 ${isAddingTab ? "bg-primary/10 text-primary" : "text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/60"}`}
          >
            <Plus className={`w-3 h-3 transition-transform duration-300 ${isAddingTab ? "rotate-45" : ""}`} />
            <span className="sr-only">New Tab</span>
          </button>
        </div>

        {/* Template Selection Grid */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAddingTab ? "max-h-[400px] opacity-100 border-b border-border/40" : "max-h-0 opacity-0"}`}>
          <div className="p-4 bg-muted/20">
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest px-1">Research Tools</p>
              <div className="flex items-center gap-2">
                <input
                  value={newTabName}
                  onChange={(e) => setNewTabName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && newTabName.trim()) {
                      const tab = { id: Date.now(), icon: getTabIcon(newTabName.trim()), label: newTabName.trim() };
                      setTabs(p => [...p, tab]);
                      setActiveTab(tab.id);
                      setIsAddingTab(false);
                      setNewTabName("");
                    }
                  }}
                  className="bg-background/50 border border-border/40 rounded-lg px-3 py-1 text-[11px] outline-none focus:border-primary/40 w-36 transition-all"
                  placeholder="Custom name..."
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {tabTemplates.map((template) => (
                <button
                  key={template.label}
                  onClick={() => {
                    const tab = { id: Date.now(), icon: template.icon, label: template.label };
                    setTabs(p => [...p, tab]);
                    setActiveTab(tab.id);
                    setIsAddingTab(false);
                  }}
                  className="flex items-center w-full h-11 px-4 rounded-xl border border-transparent hover:border-primary/20 bg-background/0 hover:bg-background/40 hover:shadow-sm transition-all group"
                >
                  <p className="text-[14px] font-medium text-foreground/60 group-hover:text-primary transition-all group-hover:pl-2">{template.label}</p>
                </button>
              ))}
            </div>
          </div>
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
            <button className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg text-[11px] font-medium text-muted-foreground/50 hover:bg-muted/40 transition-all ml-1">
              <span className="w-3.5 h-3.5 rounded-full gradient-accent flex items-center justify-center">
                <Sparkles className="w-2 h-2 text-white" />
              </span>
              arc-1a <ChevronDown className="w-2.5 h-2.5 opacity-60" />
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
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 overflow-y-auto">
        {isEmpty ? (
          <div className="h-full flex flex-col items-center px-4 sm:px-6">
            <div className="flex-[3]" />

            {/* Content block */}
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground/85 text-center leading-tight tracking-tight mb-1">
                What can I help you build?
              </h1>
              <div className="h-0.5 w-12 rounded-full gradient-accent mt-3 mb-4 sm:mb-5" />
              <div className="w-full mb-4">{inputArea}</div>

              <div className="w-full">
                <QuickCardsCarousel
                  cards={quickCards}
                  onSelect={setInput}
                  textareaRef={textareaRef}
                />
              </div>
            </div>

            <div className="flex-[1]" />

            <div className="w-full flex justify-center py-4 shrink-0">
              <p className="text-[10px] text-muted-foreground/30">
                Rivinity can make mistakes. Review generated code before
                deploying.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[700px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`group animate-float-in flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-relaxed ${msg.role === "user" ? "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground" : "rounded-2xl rounded-bl-lg glass border border-glass text-foreground/80"}`}
                >
                  {msg.content}
                </div>
                {msg.role === "ai" && <MessageActions content={msg.content} />}
                {msg.role === "user" && <UserMessageActions content={msg.content} />}
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
