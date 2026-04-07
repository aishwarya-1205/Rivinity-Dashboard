import { useState, useRef } from "react";
import {
  Send, Paperclip, Mic, Sparkles, ChevronDown, Plus, X,
  MessageSquare, StickyNote, Layers, HelpCircle, Podcast,
  FileAudio, CalendarCheck, GraduationCap, Swords, Bot, BarChart3,
  BookOpen, Beaker, Globe, Code, Lightbulb, Search, Check
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
  { id: "contextual-chat", icon: MessageSquare, label: "Chat", desc: "Ask about your documents" },
  { id: "smart-notes", icon: StickyNote, label: "SmartNotes", desc: "Auto-generate Cornell notes" },
  { id: "flashcards", icon: Layers, label: "Flashcards", desc: "Spaced repetition cards" },
  { id: "quizzes", icon: HelpCircle, label: "Quizzes", desc: "Interactive quizzes" },
  { id: "ai-podcast", icon: Podcast, label: "AI Podcast", desc: "Learn on the go" },
  { id: "voice-transcribe", icon: FileAudio, label: "Transcribe", desc: "Lecture to notes" },
  { id: "homework-planner", icon: CalendarCheck, label: "Homework", desc: "Smart planning" },
  { id: "exam-lab", icon: GraduationCap, label: "ExamLab", desc: "Simulate exams" },
  { id: "debate", icon: Swords, label: "Debate", desc: "Sharpen arguments" },
  { id: "study-companion", icon: Bot, label: "Companion", desc: "Your AI tutor" },
  { id: "data-analyst", icon: BarChart3, label: "Data Analyst", desc: "Analyze data" },
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

const allTemplates = [
  { icon: Search, label: "Research", desc: "Search and analyze scholarly papers" },
  { icon: Code, label: "Problem Set", desc: "Solve math and programming questions" },
  { icon: Lightbulb, label: "Brainstorm", desc: "Generate essay ideas and outlines" },
  { icon: BookOpen, label: "Reading", desc: "Smart summaries & reading comprehension" },
];

const suggestions = [
  { icon: BookOpen, label: "Explain a concept" },
  { icon: Beaker, label: "Science help" },
  { icon: Code, label: "Math solver" },
  { icon: Lightbulb, label: "Essay ideas" },
  { icon: Globe, label: "History deep-dive" },
];

const topicCards = [
  { title: "Mathematics", desc: "Algebra, Calculus, Statistics & more", gradient: "from-primary to-accent-pink" },
  { title: "Science", desc: "Physics, Chemistry, Biology", gradient: "from-secondary to-accent-purple" },
  { title: "English", desc: "Literature, Grammar, Writing", gradient: "from-accent-pink to-primary" },
  { title: "History", desc: "World History, Civilizations", gradient: "from-accent-purple to-secondary" },
];

interface Props {
  activeFeature: string;
  onFeatureChange: (id: string) => void;
}

const RivinityLMMain = ({ activeFeature, onFeatureChange }: Props) => {
  const [input, setInput] = useState("");
  const [tabs, setTabs] = useState<Tab[]>(defaultTabs);
  const [activeTab, setActiveTab] = useState(defaultTabs[0].id);
  const [promptMode, setPromptMode] = useState("Chat");
  const [responseLength, setResponseLength] = useState("Medium");
  const [showPromptDropdown, setShowPromptDropdown] = useState(false);
  const [showLengthDropdown, setShowLengthDropdown] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const openLabels = new Set(tabs.map((t) => t.label));

  const selectTemplate = (t: (typeof allTemplates)[0]) => {
    setDropdownOpen(false);
    const existing = tabs.find((tab) => tab.label === t.label);
    if (existing) {
      setActiveTab(existing.id);
      return;
    }
    const newTab: Tab = { id: Date.now(), icon: t.icon, label: t.label };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newTab.id);
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

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
                  className="flex items-center border-b border-border/40 rounded-t-2xl overflow-x-auto"
                  style={{ scrollbarWidth: "none" }}
                >
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => { setActiveTab(tab.id); setDropdownOpen(false); }}
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
                    onClick={() => setDropdownOpen(v => !v)} 
                    className={`px-3 py-2 flex items-center gap-1 text-[12px] font-medium transition-all shrink-0 ${
                      dropdownOpen
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground/40 hover:text-muted-foreground/70 hover:bg-muted/60"
                    }`}
                  >
                    <Plus 
                      className="w-3 h-3 transition-transform duration-200" 
                      style={{
                        transform: dropdownOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    />
                  </button>
                </div>

                {/* Inline workspace picker */}
                <div
                  style={{
                    maxHeight: dropdownOpen ? 320 : 0,
                    opacity: dropdownOpen ? 1 : 0,
                    overflowY: dropdownOpen ? "auto" : "hidden",
                    overflowX: "hidden",
                    scrollbarWidth: "none",
                    transition:
                      "max-height 0.25s cubic-bezier(0.4,0,0.2,1), opacity 0.18s ease",
                  } as React.CSSProperties}
                >
                  <div className="px-3 pt-3 pb-1">
                    <p className="text-[10px] font-semibold text-muted-foreground/40 uppercase tracking-widest mb-2">
                      Open mode
                    </p>
                    <div className="grid grid-cols-1 gap-0.5">
                      {allTemplates.map((t) => {
                        const isActive =
                          tabs.find((tab) => tab.label === t.label)?.id === activeTab;
                        const isOpen = openLabels.has(t.label);
                        return (
                          <button
                            key={t.label}
                            onClick={() => selectTemplate(t)}
                            className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-left transition-all duration-100 ${
                              isActive
                                ? "bg-primary/8 text-primary"
                                : "hover:bg-muted/60 text-foreground/80"
                            }`}
                          >
                            <div
                              className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${isActive ? "gradient-accent" : "bg-muted/50"}`}
                            >
                              <t.icon
                                className={`w-3.5 h-3.5 ${isActive ? "text-primary-foreground" : "text-muted-foreground/60"}`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-[12.5px] font-medium leading-tight">
                                {t.label}
                              </p>
                              <p className="text-[10.5px] text-muted-foreground/45 mt-0.5 truncate">
                                {t.desc}
                              </p>
                            </div>
                            {isActive && (
                              <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                            )}
                            {isOpen && !isActive && (
                              <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mx-3 mt-2 mb-0 h-px bg-border/40" />
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
                    if (e.key === "Escape") setDropdownOpen(false);
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
            </div>

            {/* Suggestion chips */}
            <div className="flex gap-2 flex-wrap justify-center mb-5">
              {suggestions.map((s) => (
                <button key={s.label} onClick={() => setInput(s.label)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-[12px] text-muted-foreground font-medium"
                >
                  <s.icon className="w-3 h-3" />{s.label}
                </button>
              ))}
            </div>

            {/* Explore Topics */}
            <div className="w-full max-w-[700px]">
              <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest text-center mb-3">Explore Topics</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {topicCards.map((t) => (
                  <button key={t.title} onClick={() => { setInput(`Teach me about ${t.title}`); }}
                    className="group relative overflow-hidden rounded-2xl p-4 glass border border-glass border-glass-hover transition-all duration-300 hover:shadow-float text-left"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${t.gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity`} />
                    <p className="text-[13px] font-semibold text-foreground/80 relative">{t.title}</p>
                    <p className="text-[10.5px] text-muted-foreground/50 mt-1 relative leading-relaxed line-clamp-2">{t.desc}</p>
                  </button>
                ))}
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
