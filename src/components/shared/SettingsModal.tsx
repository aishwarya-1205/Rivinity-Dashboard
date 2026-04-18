import { useState, useEffect } from "react";
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
  Globe,
  Lock,
  Keyboard,
  Palette,
  Check,
  X,
  Volume2,
  VolumeX,
} from "lucide-react";

type Theme = "light" | "dark" | "system";
type FontSize = "sm" | "md" | "lg";

const Portal = ({ children }: { children: React.ReactNode }) =>
  ReactDOM.createPortal(children, document.body);

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

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: SettingsModalProps) => {
  const savedTheme = (localStorage.getItem("rivinity-theme") as Theme) ?? "system";
  const [theme, setTheme] = useState<Theme>(savedTheme);
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>("md");
  const [language, setLanguage] = useState("English");
  const [activeSection, setActiveSection] = useState("appearance");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleThemeChange = (t: Theme) => {
    setTheme(t);
    applyTheme(t);
  };

  if (!isOpen) return null;

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

  return (
    <Portal>
      <div
        className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
        style={{
          backgroundColor: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          className="bg-white dark:bg-[#0f1224] border border-border/40 shadow-2xl w-full max-w-[640px] h-[540px] rounded-2xl overflow-hidden flex flex-col animate-in scale-in duration-200"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-border/10 flex items-center justify-between shrink-0">
            <div>
              <p className="text-sm font-semibold text-foreground/90">Settings</p>
              <p className="text-[11px] text-muted-foreground/60">Customize your Rivinity experience</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-1 min-h-0">
            {/* Nav */}
            <nav className="w-40 shrink-0 border-r border-border/10 py-3 px-2 flex flex-col gap-0.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12.5px] font-medium transition-all duration-150 text-left ${activeSection === s.id
                      ? "bg-accent/10 dark:bg-accent/20 text-foreground"
                      : "text-muted-foreground/70 hover:text-foreground/80 hover:bg-accent/10"
                    }`}
                >
                  <s.icon className={`w-4 h-4 shrink-0 transition-colors ${activeSection === s.id ? "text-primary" : "text-muted-foreground/50"}`} />
                  {s.label}
                </button>
              ))}
            </nav>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa] dark:bg-[#0a0c1a]/50">
              {activeSection === "appearance" && (
                <>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">Theme</p>
                    <div className="grid grid-cols-3 gap-3">
                      {themeOptions.map((t) => (
                        <button
                          key={t.value}
                          onClick={() => handleThemeChange(t.value)}
                          className={`flex flex-col items-center gap-2 py-4 rounded-xl border transition-all duration-150 ${theme === t.value
                              ? "border-primary/40 bg-white dark:bg-[#1a1c2e] shadow-sm text-foreground ring-1 ring-primary/20"
                              : "border-border/10 bg-white dark:bg-[#1a1c2e]/40 text-muted-foreground/60 hover:border-border/40 hover:text-foreground/80"
                            }`}
                        >
                          <t.icon className={`w-5 h-5 ${theme === t.value ? "text-primary" : "text-muted-foreground/40"}`} />
                          <span className="text-[11px] font-medium">{t.label}</span>
                          {theme === t.value && <Check className="w-3 h-3 text-primary" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">Font Size</p>
                    <div className="flex gap-2">
                      {fontSizes.map((f) => (
                        <button
                          key={f.value}
                          onClick={() => setFontSize(f.value)}
                          className={`flex-1 py-2 rounded-xl border text-[11px] transition-all duration-150 ${fontSize === f.value
                              ? "border-primary/40 bg-white dark:bg-[#1a1c2e] shadow-sm text-foreground font-semibold"
                              : "border-border/10 bg-white dark:bg-[#1a1c2e]/40 text-muted-foreground/60 hover:border-border/40"
                            }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {activeSection === "notifications" && (
                <div className="space-y-4">
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
                </div>
              )}

              {activeSection === "chat" && (
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-3">Language</p>
                    <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-border/20 bg-white dark:bg-[#1a1c2e]">
                      <Globe className="w-3.5 h-3.5 text-muted-foreground/50" />
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="flex-1 bg-transparent text-[12px] text-foreground/80 focus:outline-none"
                      >
                        {["English", "Spanish", "French", "German", "Japanese", "Hindi"].map(l => (
                          <option key={l} className="bg-white dark:bg-[#1a1c2e]">{l}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-border/10 bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-border/30 transition-all text-left">
                    <div className="flex items-center gap-3">
                      <Download className="w-4 h-4 text-muted-foreground/40" />
                      <div>
                        <p className="text-[12px] font-medium text-foreground/80">Export chat history</p>
                        <p className="text-[10px] text-muted-foreground/50">Download as JSON or Markdown</p>
                      </div>
                    </div>
                  </button>
                </div>
              )}

              {activeSection === "shortcuts" && (
                <div className="space-y-1">
                  {shortcuts.map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-border/10 last:border-0">
                      <span className="text-[12px] text-foreground/70">{s.action}</span>
                      <div className="flex items-center gap-1">
                        {s.keys.map((k, j) => (
                          <kbd key={j} className="px-1.5 py-0.5 rounded-md bg-white dark:bg-[#1a1c2e] border border-border/20 text-[9px] font-mono text-muted-foreground/60 shadow-sm">{k}</kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Portal>
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
  <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white/50 dark:bg-white/5 border border-border/10">
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground/50 shrink-0" />
      <div>
        <p className="text-[12px] font-medium text-foreground/90">{label}</p>
        <p className="text-[10px] text-muted-foreground/60">{desc}</p>
      </div>
    </div>
    <button
      onClick={() => onChange(!value)}
      className={`w-9 h-5 rounded-full transition-all duration-200 relative shrink-0 ${value ? "bg-primary/60" : "bg-muted-foreground/20"}`}
    >
      <span
        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${value ? "left-[18px]" : "left-0.5"}`}
      />
    </button>
  </div>
);

export default SettingsModal;
