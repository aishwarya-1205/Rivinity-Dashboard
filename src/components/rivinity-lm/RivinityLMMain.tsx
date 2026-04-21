import { useState, useRef } from "react";
import {
  Send, Paperclip, Mic, Sparkles, ChevronDown, Plus, X,
  MessageSquare, StickyNote, Layers, HelpCircle, Podcast,
  FileAudio, CalendarCheck, GraduationCap, Swords, Bot, BarChart3,
  BookOpen, Beaker, Globe, Code, Lightbulb, Search, Check, ChevronLeft, ChevronRight
} from "lucide-react";
import ContextualChatView from "./views/ContextualChatView";
import SmartNotesView from "./views/SmartNotesView";
import FlashcardsView from "./views/FlashcardsView";
import QuizzesView from "./views/QuizzesView";
import AIPodcastView from "./views/AIPodcastView";
import VoiceTranscribeView from "./views/VoiceTranscribeView";
import HomeworkPlannerView from "./views/HomeworkPlannerView";
import ExamLabView from "./views/ExamLabView";
import DebateView from "./views/DebateView";
import StudyCompanionView from "./views/StudyCompanionView";
import DataAnalystView from "./views/DataAnalystView";

const features = [
  { id: "contextual-chat", icon: MessageSquare, label: "Document Research", desc: "Collaborate with your study files" },
  { id: "smart-notes", icon: StickyNote, label: "Cornell Study Notes", desc: "Auto-structured lecture notes" },
  { id: "flashcards", icon: Layers, label: "Repetition Flashcards", desc: "Spaced learning system" },
  { id: "quizzes", icon: HelpCircle, label: "Practice Exam Lab", desc: "Test your comprehension" },
  { id: "ai-podcast", icon: Podcast, label: "AI Podcast Producer", desc: "Audio learning on the go" },
  { id: "voice-transcribe", icon: FileAudio, label: "Voice Lecture Sync", desc: "Convert speech to text" },
  { id: "debate", icon: Swords, label: "Mock Debate Trainer", desc: "Sharpen critical thinking" },
  { id: "study-companion", icon: Bot, label: "AI Study Tutor", desc: "24/7 personalized guidance" },
];

interface Tab {
  id: number;
  icon: typeof Search;
  label: string;
}

const defaultTabs: Tab[] = [
  { id: 1, icon: BookOpen, label: "Study Session" },
  { id: 2, icon: Beaker, label: "Research Lab" },
  { id: 3, icon: Globe, label: "Explore Topics" },
];

const topicCards = [
  { icon: Code, title: "Computer Science", desc: "Algorithms & Systems" },
  { icon: Lightbulb, title: "Philosophy", desc: "Ethics & Logic" },
  { icon: BookOpen, title: "Literature", desc: "Analysis & History" },
  { icon: Globe, title: "World History", desc: "Events & Cultures" },
];

const TopicCardsCarousel = ({
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

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const getTabIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("code") || l.includes("dev") || l.includes("program") || l.includes("soft")) return Code;
  if (l.includes("math") || l.includes("calc") || l.includes("stat")) return BarChart3;
  if (l.includes("science") || l.includes("chem") || l.includes("phys") || l.includes("bio")) return Beaker;
  if (l.includes("history") || l.includes("world") || l.includes("geo")) return Globe;
  if (l.includes("lit") || l.includes("book") || l.includes("read") || l.includes("write")) return BookOpen;
  if (l.includes("phil") || l.includes("logic") || l.includes("idea")) return Lightbulb;
  if (l.includes("study") || l.includes("learn") || l.includes("school")) return GraduationCap;
  if (l.includes("chat") || l.includes("talk") || l.includes("ask")) return MessageSquare;
  if (l.includes("note") || l.includes("write") || l.includes("draft")) return StickyNote;
  if (l.includes("exam") || l.includes("quiz") || l.includes("test")) return HelpCircle;
  return Search;
};

const RivinityLMMain = ({ activeFeature, onFeatureChange }: Props) => {
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [promptMode, setPromptMode] = useState("Chat");
  const [responseLength, setResponseLength] = useState("Medium");
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);
  const [showLengthDropdown, setShowLengthDropdown] = useState(false);
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabName, setNewTabName] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const closeTab = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length <= 1) return;
    const idx = tabs.findIndex(t => t.id === id);
    if (activeTab === id) {
      const next = tabs[idx + 1] || tabs[idx - 1];
      setActiveTab(next.id);
    }
    setTabs(prev => prev.filter(t => t.id !== id));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onFeatureChange("contextual-chat");
    setInput("");
  };

  const renderView = () => {
    switch (activeFeature) {
      case "contextual-chat": return <ContextualChatView />;
      case "smart-notes": return <SmartNotesView />;
      case "flashcards": return <FlashcardsView />;
      case "quizzes": return <QuizzesView />;
      case "ai-podcast": return <AIPodcastView />;
      case "voice-transcribe": return <VoiceTranscribeView />;
      case "homework-planner": return <HomeworkPlannerView />;
      case "exam-lab": return <ExamLabView />;
      case "debate": return <DebateView />;
      case "study-companion": return <StudyCompanionView />;
      case "data-analyst": return <DataAnalystView />;
      default: return null;
    }
  };

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });

  if (activeFeature !== "landing") {
    return (
      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <div className="flex-1 overflow-hidden px-6 py-4">
          <div className="animate-float-in h-full">{renderView()}</div>
        </div>
      </div>
    );
  }

  // Landing page
  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="h-full flex flex-col items-center px-4 sm:px-6">
          <div className="flex-[3] min-h-[20px]" />

          <div className="w-full max-w-[740px] flex flex-col items-center">
            {/* Orb */}
            <div className="w-10 h-10 rounded-full gradient-accent opacity-80 animate-orb mb-3 shadow-glow-accent" />

            <p className="text-[10px] text-muted-foreground/40 tracking-widest uppercase mb-2">{today}</p>

            <h1 className="text-3xl sm:text-4xl font-semibold text-foreground/85 text-center leading-tight tracking-tight">
              What'd you like to
              <br className="hidden sm:block" />
              {" "}learn today?
            </h1>

            <div className="h-0.5 w-16 rounded-full gradient-accent mt-3 mb-5" />

            {/* Input */}
            <div className="w-full max-w-[680px] mb-4">
              <div
                className="border border-border/60 rounded-2xl shadow-float input-glow transition-all duration-200 bg-background"
                style={{ overflow: "visible" }}
              >
                {/* Tabs */}
                <div
                  className="flex items-center rounded-t-2xl overflow-x-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group relative flex items-center gap-1.5 px-3 py-2 text-[12px] font-medium transition-all duration-150 shrink-0 ${activeTab === tab.id
                        ? "bg-muted/60 text-foreground"
                        : "text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/60"
                        }`}
                    >
                      <tab.icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden xs:inline truncate max-w-[90px]">{tab.label}</span>
                      {tabs.length > 1 && (
                        <X
                          className="w-2.5 h-2.5 shrink-0 opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity ml-1"
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
                  </button>
                </div>

                {/* Feature Selection Grid */}
                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isAddingTab ? "max-h-[500px] opacity-100 border-b border-border/40" : "max-h-0 opacity-0"}`}>
                  <div className="p-5 bg-muted/20">
                    <p className="text-[11px] font-bold text-muted-foreground/40 uppercase tracking-widest px-1 mb-4">Study Tools & Modes</p>
                    <div className="flex flex-col gap-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {features.map((feature) => (
                        <button
                          key={feature.id}
                          onClick={() => {
                            const newTab = { id: Date.now(), icon: feature.icon, label: feature.label, featureId: feature.id };
                            setTabs(p => [...p, newTab]);
                            setActiveTab(newTab.id);
                            setIsAddingTab(false);
                          }}
                          className="flex flex-col items-start justify-center w-full px-4 py-3 rounded-xl border border-transparent hover:border-primary/20 bg-background/0 hover:bg-background/40 hover:shadow-sm transition-all group min-h-[50px]"
                        >
                          <p className="text-[14px] font-semibold text-foreground/60 group-hover:text-primary transition-all group-hover:pl-2">{feature.label}</p>
                          <p className="text-[11px] text-muted-foreground/30 group-hover:text-muted-foreground/50 transition-all group-hover:pl-2">{feature.desc}</p>
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
                  placeholder="Ask me to teach you anything..."
                  rows={2}
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none px-5 pt-4 pb-1 resize-none"
                />

                {/* Controls bar */}
                <div className="flex items-center justify-between px-3 pb-3 pt-1">
                  <div className="flex items-center gap-1">
                    {/* Prompt Mode */}
                    <div className="relative">
                      <button
                        onClick={() => { setShowPromptDropdown(!showPromptDropdown); setShowLengthDropdown(false); }}
                        className="flex flex-col px-3 py-1.5 rounded-lg text-left hover:bg-muted/40 transition-all"
                      >
                        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Prompt Mode</span>
                        <span className="text-[12px] font-semibold text-foreground/70 flex items-center gap-1">
                          {promptMode} <ChevronDown className="w-3 h-3 opacity-50" />
                        </span>
                      </button>
                      {showPromptDropdown && (
                        <div className="absolute top-full mt-1 left-0 w-36 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                          {["Chat", "Deep Dive", "Quick Answer", "Tutorial"].map((m) => (
                            <button key={m} onClick={() => { setPromptMode(m); setShowPromptDropdown(false); }}
                              className={`w-full px-4 py-2 text-[12px] text-left transition-colors ${m === promptMode ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"}`}
                            >{m}</button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="w-px h-6 bg-border/30" />

                    {/* File upload */}
                    <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-muted/40 transition-all">
                      <Paperclip className="w-3.5 h-3.5 text-muted-foreground/40" />
                      <div className="text-left">
                        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider block">Add files</span>
                        <span className="text-[12px] font-medium text-foreground/60">Click or drop</span>
                      </div>
                    </button>

                    <div className="w-px h-6 bg-border/30" />

                    {/* Response Length */}
                    <div className="relative">
                      <button
                        onClick={() => { setShowLengthDropdown(!showLengthDropdown); setShowPromptDropdown(false); }}
                        className="flex flex-col px-3 py-1.5 rounded-lg text-left hover:bg-muted/40 transition-all"
                      >
                        <span className="text-[9px] text-muted-foreground/40 uppercase tracking-wider">Response Length</span>
                        <span className="text-[12px] font-semibold text-foreground/70 flex items-center gap-1">
                          {responseLength} <ChevronDown className="w-3 h-3 opacity-50" />
                        </span>
                      </button>
                      {showLengthDropdown && (
                        <div className="absolute top-full mt-1 left-0 w-36 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                          {["Short", "Medium", "Long", "Detailed"].map((l) => (
                            <button key={l} onClick={() => { setResponseLength(l); setShowLengthDropdown(false); }}
                              className={`w-full px-4 py-2 text-[12px] text-left transition-colors ${l === responseLength ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent/50"}`}
                            >{l}</button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="w-px h-6 bg-border/30" />

                    <button className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/35 hover:text-muted-foreground/60 hover:bg-muted/40 transition-all">
                      <Mic className="w-[15px] h-[15px]" />
                    </button>
                  </div>

                  <button onClick={handleSend} className="w-9 h-9 rounded-full bg-foreground flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity">
                    <Send className="w-3.5 h-3.5 text-background" />
                  </button>
                </div>
              </div>

              <div className="w-full mt-4">
                <TopicCardsCarousel
                  cards={topicCards}
                  onSelect={setInput}
                  textareaRef={textareaRef}
                />
              </div>
            </div>



          </div>

          <div className="flex-[1] min-h-[20px]" />

          <div className="w-full flex justify-center py-4 shrink-0">
            <p className="text-[10px] text-muted-foreground/30">
              RivinityLM can make mistakes. Cross-check crucial information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RivinityLMMain;
