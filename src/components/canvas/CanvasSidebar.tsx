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
    <aside className="w-[260px] h-full flex flex-col shrink-0 bg-background">
      <div className="px-5 pt-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl gradient-accent flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground tracking-tight text-[17px]">
            Rivinity
          </span>
        </div>
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground/50 hover:text-foreground/70 transition-all lg:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="px-4 mb-4">
        <button className="w-full h-9 rounded-full gradient-accent text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

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
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors duration-150"
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
              className="w-full text-left px-3 py-2 rounded-xl hover:bg-muted/50 transition-colors duration-150"
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

      <div className="px-5 py-4">
        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/40">
          <Clock className="w-3 h-3" />
          <span>7 chats this week</span>
        </div>
      </div>
    </aside>
  );
};

export default CanvasSidebar;
