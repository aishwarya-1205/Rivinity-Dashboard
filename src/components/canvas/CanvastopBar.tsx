import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Settings,
  Sun,
  Moon,
  Monitor,
  Bell,
  BellOff,
  MessageSquare,
  Trash2,
  Download,
  LogOut,
  ChevronDown,
  Volume2,
  VolumeX,
  Globe,
  Lock,
  Keyboard,
  Palette,
  User,
  Check,
  X,
} from "lucide-react";

type Theme = "light" | "dark" | "system";
type FontSize = "sm" | "md" | "lg";

const Portal = ({ children }: { children: React.ReactNode }) =>
  ReactDOM.createPortal(children, document.body);

const useAnchorRect = (
  ref: React.RefObject<HTMLElement | null>,
  open: boolean,
) => {
  const [rect, setRect] = useState<DOMRect | null>(null);
  useEffect(() => {
    if (open && ref.current) setRect(ref.current.getBoundingClientRect());
  }, [open]);
  return rect;
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else if (theme === "light") root.classList.remove("dark");
  else
    root.classList.toggle(
      "dark",
      window.matchMedia("(prefers-color-scheme: dark)").matches,
    );
  localStorage.setItem("rivinity-theme", theme);
};

export const initTheme = () => {
  const saved = localStorage.getItem("rivinity-theme") as Theme | null;
  applyTheme(saved ?? "system");
};

/* Detect mobile viewport */
const isMobile = () => window.innerWidth < 640;

const CanvasTopBar = () => {
  const savedTheme =
    (localStorage.getItem("rivinity-theme") as Theme) ?? "system";
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(savedTheme);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [language, setLanguage] = useState("English");
  const [activeSection, setActiveSection] = useState("appearance");

  const settingsBtnRef = useRef<HTMLButtonElement>(null);
  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const profilePanelRef = useRef<HTMLDivElement>(null);

  const settingsRect = useAnchorRect(settingsBtnRef, settingsOpen);
  const profileRect = useAnchorRect(profileBtnRef, profileOpen);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !settingsBtnRef.current?.contains(target) &&
        !settingsPanelRef.current?.contains(target)
      )
        setSettingsOpen(false);
      if (
        !profileBtnRef.current?.contains(target) &&
        !profilePanelRef.current?.contains(target)
      )
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const sections = [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "chat", label: "Chat", icon: MessageSquare },
    { id: "privacy", label: "Privacy", icon: Lock },
    { id: "shortcuts", label: "Shortcuts", icon: Keyboard },
  ];

  const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const fontSizes: { value: FontSize; label: string; size: string }[] = [
    { value: "sm", label: "Small", size: "text-xs" },
    { value: "md", label: "Medium", size: "text-sm" },
    { value: "lg", label: "Large", size: "text-base" },
  ];

  const shortcuts = [
    { keys: ["⌘", "K"], action: "Open command palette" },
    { keys: ["⌘", "N"], action: "New chat" },
    { keys: ["⌘", "/"], action: "Toggle sidebar" },
    { keys: ["⌘", "⏎"], action: "Send message" },
    { keys: ["Esc"], action: "Close panel" },
  ];

  /* ── Compute panel position: anchored on desktop, centered sheet on mobile ── */
  const getSettingsStyle = (): React.CSSProperties => {
    if (isMobile()) {
      // Full-width bottom sheet on mobile
      return {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        maxHeight: "85vh",
        borderRadius: "20px 20px 0 0",
        zIndex: 9999,
        overflowY: "auto",
      };
    }
    if (!settingsRect) return { display: "none" };
    return {
      position: "fixed",
      top: settingsRect.bottom + 8,
      right: window.innerWidth - settingsRect.right - 4,
      width: 420,
      zIndex: 9999,
    };
  };

  const getProfileStyle = (): React.CSSProperties => {
    if (isMobile()) {
      return {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        borderRadius: "20px 20px 0 0",
        zIndex: 9999,
      };
    }
    if (!profileRect) return { display: "none" };
    return {
      position: "fixed",
      top: profileRect.bottom + 8,
      right: window.innerWidth - profileRect.right,
      width: 220,
      zIndex: 9999,
    };
  };

  return (
    <>
      <header
        className="flex items-center justify-between px-5 py-3"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-2 pl-9">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">
            Rivinity Core
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          <button
            ref={settingsBtnRef}
            onClick={() => {
              setSettingsOpen((v) => !v);
              setProfileOpen(false);
            }}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 ${
              settingsOpen
                ? "bg-primary/10 text-[#ff7a18]"
                : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-muted"
            }`}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            ref={profileBtnRef}
            onClick={() => {
              setProfileOpen((v) => !v);
              setSettingsOpen(false);
            }}
            className={`w-8 h-8 rounded-xl gradient-accent flex items-center justify-center text-white text-[12px] font-bold transition-all duration-150 hover:opacity-90 ${
              profileOpen ? "ring-2 ring-[#ff7a18]/30 ring-offset-1" : ""
            }`}
          >
            JD
          </button>
        </div>
      </header>

      {/* ── Backdrop for mobile panels ── */}
      {(settingsOpen || profileOpen) && (
        <Portal>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm sm:hidden"
            style={{ zIndex: 9998 }}
            onClick={() => {
              setSettingsOpen(false);
              setProfileOpen(false);
            }}
          />
        </Portal>
      )}

      {/* ── Settings panel ── */}
      {settingsOpen && (settingsRect || isMobile()) && (
        <Portal>
          <div
            ref={settingsPanelRef}
            className="glass-strong border border-glass shadow-float overflow-hidden animate-float-in"
            style={getSettingsStyle()}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>

            {/* Header row with close on mobile */}
            <div className="px-5 pt-4 pb-4 border-b border-border/40 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Settings
                </p>
                <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                  Customize your Rivinity experience
                </p>
              </div>
              <button
                onClick={() => setSettingsOpen(false)}
                className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:bg-muted transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body — stacked on mobile, side-by-side on desktop */}
            <div
              className="flex flex-col sm:flex-row"
              style={{ maxHeight: isMobile() ? "70vh" : undefined }}
            >
              {/* Nav — horizontal scroll on mobile, vertical on desktop */}
              <nav
                className="sm:w-[140px] sm:shrink-0 sm:border-r border-border/40 sm:py-3 sm:px-2 sm:flex-col gap-0.5
                              flex flex-row overflow-x-auto px-4 py-2 border-b sm:border-b-0 scrollbar-none"
              >
                {sections.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150 shrink-0 sm:w-full text-left ${
                      activeSection === s.id
                        ? "bg-[#ff7a18]/10 text-[#ff7a18]"
                        : "text-muted-foreground/60 hover:bg-muted hover:text-foreground/70"
                    }`}
                  >
                    <s.icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="sm:inline">{s.label}</span>
                  </button>
                ))}
              </nav>

              {/* Content */}
              <div
                className="flex-1 p-4 space-y-5 overflow-y-auto"
                style={{ maxHeight: isMobile() ? "55vh" : "340px" }}
              >
                {activeSection === "appearance" && (
                  <>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2.5">
                        Theme
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        {themeOptions.map((t) => (
                          <button
                            key={t.value}
                            onClick={() => handleThemeChange(t.value)}
                            className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border transition-all duration-150 ${
                              theme === t.value
                                ? "border-[#ff7a18]/40 bg-[#ff7a18]/10 text-[#ff7a18]"
                                : "border-border/50 bg-muted/40 text-muted-foreground/60 hover:border-border hover:text-foreground/70"
                            }`}
                          >
                            <t.icon className="w-4 h-4" />
                            <span className="text-[11px] font-medium">
                              {t.label}
                            </span>
                            {theme === t.value && (
                              <Check className="w-2.5 h-2.5" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2.5">
                        Font Size
                      </p>
                      <div className="flex gap-2">
                        {fontSizes.map((f) => (
                          <button
                            key={f.value}
                            onClick={() => setFontSize(f.value)}
                            className={`flex-1 py-2 rounded-lg border text-center transition-all duration-150 ${f.size} ${
                              fontSize === f.value
                                ? "border-[#ff7a18]/40 bg-[#ff7a18]/10 text-[#ff7a18] font-medium"
                                : "border-border/50 bg-muted/40 text-muted-foreground/60 hover:border-border"
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2.5">
                        Accent Color
                      </p>
                      <div className="flex gap-2">
                        {[
                          "#ff7a18",
                          "#6c63ff",
                          "#10b981",
                          "#ef4444",
                          "#3b82f6",
                        ].map((color, i) => (
                          <button
                            key={i}
                            style={{ backgroundColor: color }}
                            className={`w-7 h-7 rounded-full transition-transform hover:scale-110 ${i === 0 ? "ring-2 ring-offset-2 ring-[#ff7a18]/60" : ""}`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {activeSection === "notifications" && (
                  <>
                    <ToggleRow
                      icon={notifications ? Bell : BellOff}
                      label="Push notifications"
                      desc="Get notified when AI responds"
                      value={notifications}
                      onChange={setNotifications}
                    />
                    <ToggleRow
                      icon={sounds ? Volume2 : VolumeX}
                      label="Sound effects"
                      desc="Play sounds on send / receive"
                      value={sounds}
                      onChange={setSounds}
                    />
                  </>
                )}

                {activeSection === "chat" && (
                  <>
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground/50 uppercase tracking-wider mb-2.5">
                        Language
                      </p>
                      <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-border/50 bg-muted/40">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground/50" />
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="flex-1 bg-transparent text-[12px] text-foreground/80 focus:outline-none"
                        >
                          {[
                            "English",
                            "Spanish",
                            "French",
                            "German",
                            "Japanese",
                            "Hindi",
                          ].map((l) => (
                            <option key={l}>{l}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-border/50 bg-muted/40 hover:bg-muted transition-colors text-left">
                        <Download className="w-3.5 h-3.5 text-muted-foreground/60" />
                        <div>
                          <p className="text-[12px] font-medium text-foreground/80">
                            Export chat history
                          </p>
                          <p className="text-[10px] text-muted-foreground/40">
                            Download as JSON or Markdown
                          </p>
                        </div>
                      </button>
                      <button className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-colors text-left">
                        <Trash2 className="w-3.5 h-3.5 text-red-500/70" />
                        <div>
                          <p className="text-[12px] font-medium text-red-500/80">
                            Clear all conversations
                          </p>
                          <p className="text-[10px] text-muted-foreground/40">
                            This action cannot be undone
                          </p>
                        </div>
                      </button>
                    </div>
                  </>
                )}

                {activeSection === "privacy" && (
                  <>
                    <ToggleRow
                      icon={Lock}
                      label="Save chat history"
                      desc="Store conversations on server"
                      value={true}
                      onChange={() => {}}
                    />
                    <ToggleRow
                      icon={Globe}
                      label="Usage analytics"
                      desc="Help improve Rivinity"
                      value={false}
                      onChange={() => {}}
                    />
                  </>
                )}

                {activeSection === "shortcuts" && (
                  <div className="space-y-1.5">
                    {shortcuts.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                      >
                        <span className="text-[12px] text-foreground/70">
                          {s.action}
                        </span>
                        <div className="flex items-center gap-1">
                          {s.keys.map((k, j) => (
                            <kbd
                              key={j}
                              className="px-1.5 py-0.5 rounded-md bg-muted border border-border/60 text-[10px] font-mono text-muted-foreground/70"
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* ── Profile dropdown ── */}
      {profileOpen && (profileRect || isMobile()) && (
        <Portal>
          <div
            ref={profilePanelRef}
            className="glass-strong border border-glass shadow-float overflow-hidden animate-float-in"
            style={getProfileStyle()}
          >
            {/* Mobile drag handle */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/20" />
            </div>

            <div className="px-4 py-4 border-b border-border/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center text-white text-sm font-bold shrink-0">
                  JD
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">
                    John Doe
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 truncate">
                    john@rivinity.ai
                  </p>
                </div>
              </div>
              <button
                onClick={() => setProfileOpen(false)}
                className="sm:hidden w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:bg-muted transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2 space-y-0.5">
              {[
                { icon: User, label: "View profile" },
                { icon: Settings, label: "Account settings" },
                { icon: Download, label: "Export data" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-foreground/70 hover:bg-muted hover:text-foreground transition-all duration-150"
                >
                  <item.icon className="w-3.5 h-3.5 text-muted-foreground/50" />
                  {item.label}
                </button>
              ))}
              <div className="h-px bg-border/40 my-1" />
              <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-red-500/70 hover:bg-red-500/10 hover:text-red-500 transition-all duration-150">
                <LogOut className="w-3.5 h-3.5" />
                Sign out
              </button>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

const ToggleRow = ({
  icon: Icon,
  label,
  desc,
  value,
  onChange,
}: {
  icon: React.ElementType;
  label: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between gap-4">
    <div className="flex items-center gap-2.5">
      <Icon className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
      <div>
        <p className="text-[12px] font-medium text-foreground/80">{label}</p>
        <p className="text-[10px] text-muted-foreground/40">{desc}</p>
      </div>
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`w-9 h-5 rounded-full transition-all duration-200 relative shrink-0 ${value ? "bg-[#ff7a18]" : "bg-muted-foreground/20"}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${value ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  </div>
);

export default CanvasTopBar;
