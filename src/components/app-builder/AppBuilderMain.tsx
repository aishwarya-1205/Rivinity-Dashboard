import { useState, useRef, useCallback, useEffect } from "react";
import {
  Send,
  Paperclip,
  Mic,
  Sparkles,
  ChevronDown,
  Plus,
  X,
  Layout,
  Smartphone,
  Globe,
  Palette,
  Code2,
  Layers,
  Rocket,
  Component,
  Monitor,
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
  FileText,
  Lightbulb,
} from "lucide-react";

interface Message {
  id: number;
  role: "user" | "ai";
  content: string;
}
interface Tab {
  id: number;
  icon: React.ElementType;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: Layout, label: "App Generator" },
  { id: 2, icon: Smartphone, label: "UI Builder" },
  { id: 3, icon: Globe, label: "Website Creator" },
];

const allTemplates = [
  { icon: Layout, label: "App Generator", desc: "Generate full applications" },
  { icon: Smartphone, label: "UI Builder", desc: "Build UI components" },
  { icon: Globe, label: "Website Creator", desc: "Create landing pages" },
  { icon: Monitor, label: "Dashboard", desc: "Admin panels & analytics" },
  { icon: Component, label: "Component", desc: "Reusable UI pieces" },
  { icon: Layers, label: "SaaS", desc: "Full SaaS boilerplate" },
  { icon: Palette, label: "Design System", desc: "Tokens, colors, typography" },
  { icon: Rocket, label: "Launch Kit", desc: "Deploy-ready starter" },
  { icon: Code2, label: "API Builder", desc: "REST / GraphQL endpoints" },
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

const quickCards = [
  {
    icon: Code2,
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
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
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
  if (l.includes("app") || l.includes("mobile") || l.includes("phone")) return Smartphone;
  if (l.includes("web") || l.includes("site") || l.includes("page")) return Globe;
  if (l.includes("api") || l.includes("code") || l.includes("back") || l.includes("server")) return Code2;
  if (l.includes("dash") || l.includes("admin") || l.includes("panel")) return Monitor;
  if (l.includes("saas") || l.includes("platform")) return Layers;
  if (l.includes("ui") || l.includes("comp") || l.includes("front")) return Component;
  if (l.includes("design") || l.includes("style") || l.includes("color")) return Palette;
  if (l.includes("launch") || l.includes("deploy") || l.includes("start")) return Rocket;
  if (l.includes("doc") || l.includes("text") || l.includes("file") || l.includes("read")) return FileText;
  if (l.includes("idea") || l.includes("plan") || l.includes("think") || l.includes("brain")) return Lightbulb;
  return Layout;
};

const AppBuilderMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openLabels = new Set(tabs.map((t) => t.label));

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
              "I'll help you build that. Let me generate the UI components and architecture for your project.",
          },
        ]),
      700,
    );
  }, [input]);

  const isEmpty = messages.length === 0;

  const inputArea = (
    <div className="w-full max-w-[660px]">
      <div
        className="border border-border/60 rounded-2xl shadow-float input-glow bg-background transition-all duration-200"
        style={{ overflow: "visible" }}
      >
        {/* ── Tab bar ── */}
        <div
          className="flex items-center border-b border-border/40 rounded-t-2xl overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-150 shrink-0 ${
                activeTab === tab.id
                  ? "bg-muted/60 text-foreground"
                  : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60"
              }`}
            >
              <tab.icon className="w-3 h-3 shrink-0" />
              <span className="hidden xs:inline truncate max-w-[90px]">
                {tab.label}
              </span>
              {tabs.length > 1 && (
                <X
                  className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity"
                  onClick={(e) => closeTab(tab.id, e)}
                />
              )}
            </button>
          ))}
          {isAddingTab ? (
            <div className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium rounded-lg bg-muted/60 text-foreground shrink-0 border border-border/40">
              <Plus className="w-3 h-3 shrink-0" />
              <input
                autoFocus
                value={newTabName}
                onChange={(e) => setNewTabName(e.target.value)}
                onBlur={() => {
                  if (newTabName.trim()) {
                    const tabName = newTabName.trim();
                    const tab = { id: Date.now(), icon: getTabIcon(tabName), label: tabName };
                    setTabs(p => [...p, tab]);
                    setActiveTab(tab.id);
                  }
                  setIsAddingTab(false);
                  setNewTabName("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.blur();
                  } else if (e.key === "Escape") {
                    setIsAddingTab(false);
                    setNewTabName("");
                  }
                }}
                className="bg-transparent border-none outline-none focus:outline-none w-24 text-foreground placeholder:text-muted-foreground/40"
                placeholder="Tab name..."
              />
            </div>
          ) : (
            <button
              onClick={() => setIsAddingTab(true)}
              className="px-2 py-1.5 text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/60 rounded-lg transition-all shrink-0"
            >
              <Plus className="w-3 h-3" />
            </button>
          )}
        </div>



        {/* Textarea */}
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
          placeholder="Curious? Ask and dive into building insights"
          rows={2}
          className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-4 pt-3 pb-1 resize-none"
        />

        {/* Toolbar */}
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
                  className={`max-w-[85%] sm:max-w-[75%] px-3 sm:px-4 py-2.5 sm:py-3 text-[13px] sm:text-[14px] leading-relaxed ${msg.role === "user"
                    ? "rounded-2xl rounded-br-lg gradient-accent text-primary-foreground"
                    : "rounded-2xl rounded-bl-lg glass border border-glass text-foreground/80"
                    }`}
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

export default AppBuilderMain;
