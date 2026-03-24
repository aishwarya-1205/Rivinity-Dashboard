import {
  Sparkles,
  Plus,
  MessageSquare,
  Bookmark,
  Clock,
  X,
} from "lucide-react";

const conversations = [
  { id: 1, title: "Build a REST API endpoint", time: "2m ago" },
  { id: 2, title: "Design system architecture", time: "1h ago" },
  { id: 3, title: "Optimize database queries", time: "3h ago" },
  { id: 4, title: "React component patterns", time: "Yesterday" },
  { id: 5, title: "Auth flow implementation", time: "Yesterday" },
];

const saved = [
  { id: 6, title: "ML pipeline docs", time: "2d ago" },
  { id: 7, title: "Deployment checklist", time: "5d ago" },
];

interface CanvasSidebarProps {
  onClose?: () => void;
}

const CanvasSidebar = ({ onClose }: CanvasSidebarProps) => {
  return (
    <aside
      className="w-[260px] h-full flex flex-col shrink-0"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRight: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "4px 0 32px rgba(0,0,0,0.12), inset -1px 0 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo row */}
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground tracking-tight text-[17px]">
            Rivinity
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-foreground/70 hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* New Chat */}
      <div className="px-4 mb-4">
        <button className="w-full h-9 rounded-full gradient-accent text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-3">
        <div className="mb-5">
          <div className="flex items-center gap-1.5 px-2 mb-1.5">
            <MessageSquare className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">
              Conversations
            </span>
          </div>
          {conversations.map((c) => (
            <button
              key={c.id}
              className="w-full text-left px-3 py-2 rounded-xl transition-colors duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <p className="text-[13px] text-foreground/70 truncate">
                {c.title}
              </p>
              <p className="text-[11px] text-muted-foreground/40 mt-0.5">
                {c.time}
              </p>
            </button>
          ))}
        </div>

        <div className="mb-5">
          <div className="flex items-center gap-1.5 px-2 mb-1.5">
            <Bookmark className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-[10px] font-medium text-muted-foreground/40 uppercase tracking-widest">
              Saved
            </span>
          </div>
          {saved.map((c) => (
            <button
              key={c.id}
              className="w-full text-left px-3 py-2 rounded-xl transition-colors duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(0,0,0,0.04)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <p className="text-[13px] text-foreground/70 truncate">
                {c.title}
              </p>
              <p className="text-[11px] text-muted-foreground/40 mt-0.5">
                {c.time}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="px-5 py-4"
        style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
          <Clock className="w-3 h-3" />
          <span>7 chats this week</span>
        </div>
      </div>
    </aside>
  );
};

export default CanvasSidebar;
