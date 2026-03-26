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
  PanelRight,
} from "lucide-react";
import SettingsModal from "../shared/SettingsModal";

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

export const initTheme = () => {
  const saved = localStorage.getItem("rivinity-theme") as Theme | null;
  applyTheme(saved ?? "system");
};

interface CanvasTopBarProps {
  rightPanelOpen?: boolean;
  setRightPanelOpen?: (open: boolean) => void;
}

const CanvasTopBar = ({
  rightPanelOpen,
  setRightPanelOpen,
}: CanvasTopBarProps) => {
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

  const profileBtnRef = useRef<HTMLButtonElement>(null);
  const profilePanelRef = useRef<HTMLDivElement>(null);
  const settingsModalRef = useRef<HTMLDivElement>(null);

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

  // Close profile on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !profileBtnRef.current?.contains(target) &&
        !profilePanelRef.current?.contains(target)
      )
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close settings on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSettingsOpen(false);
        setProfileOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  // Prevent body scroll when settings open
  useEffect(() => {
    document.body.style.overflow = settingsOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [settingsOpen]);

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
    <>
      <header
        className="flex items-center justify-between px-5 py-3 pr-4"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          background: "rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="flex items-center gap-2 pl-9">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground/80">
            Rivinity Core
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRightPanelOpen?.(!rightPanelOpen)}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-150 mr-1 ${
              rightPanelOpen
                ? "bg-primary/10 text-[#ff7a18]"
                : "text-muted-foreground/50 hover:text-foreground/70 hover:bg-muted"
            }`}
          >
            <PanelRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setSettingsOpen(true);
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
            }}
            className={`w-8 h-8 rounded-xl gradient-accent flex items-center justify-center text-white text-[12px] font-bold transition-all duration-150 hover:opacity-90 ${
              profileOpen ? "ring-2 ring-[#ff7a18]/30 ring-offset-1" : ""
            }`}
          >
            JD
          </button>
        </div>
      </header>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />

      {/* Profile dropdown  */}
      {profileOpen && (
        <Portal>
          <div
            ref={profilePanelRef}
            className="glass-strong border border-glass shadow-float overflow-hidden animate-float-in"
            style={{
              position: "fixed",
              top:
                (profileBtnRef.current?.getBoundingClientRect().bottom ?? 0) +
                8,
              right:
                window.innerWidth -
                (profileBtnRef.current?.getBoundingClientRect().right ?? 0),
              width: 220,
              zIndex: 9999,
            }}
          >
            <div className="px-4 py-4 border-b border-border/40 flex items-center gap-3">
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

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.95) } to { opacity: 1; transform: scale(1) } }
      `}</style>
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
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-muted-foreground/50 shrink-0" />
      <div>
        <p className="text-[13px] font-medium text-foreground/80">{label}</p>
        <p className="text-[11px] text-muted-foreground/40">{desc}</p>
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
