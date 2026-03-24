import {
  Brain,
  Zap,
  Globe,
  FileCode,
  Database,
  Shield,
  FolderOpen,
} from "lucide-react";

const tools = [
  { icon: Globe, label: "Web Search", color: "text-primary" },
  { icon: FileCode, label: "Code Gen", color: "text-accent-purple" },
  { icon: Database, label: "Database", color: "text-accent-purple" },
  { icon: Shield, label: "Security", color: "text-primary" },
];

const glassCard: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.09)",
  borderRadius: "12px",
};

const CanvasRightPanel = () => {
  return (
    <aside
      className="w-[220px] h-full flex-col py-5 px-3 shrink-0 hidden xl:flex gap-5 overflow-y-auto"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.03) 100%)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "inset 1px 0 0 rgba(255,255,255,0.04), -4px 0 24px rgba(0,0,0,0.15)",
      }}
    >
      {/* Model */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Model
        </p>
        <div style={glassCard} className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg gradient-accent flex items-center justify-center shrink-0">
              <Brain className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-[12.5px] font-medium text-foreground leading-tight">
                Rivinity Core
              </p>
              <p className="text-[10px] text-muted-foreground/45">
                v2.4 · 128k ctx
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-2.5 h-2.5 text-primary" />
            <span className="text-[10px] text-muted-foreground/45">
              Fast inference · Online
            </span>
          </div>
        </div>
      </div>

      {/* Tools */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Tools
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <button
              key={t.label}
              style={glassCard}
              className="flex flex-col items-center gap-1 p-2.5 transition-all duration-150"
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.09)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
              }
            >
              <t.icon className={`w-3.5 h-3.5 ${t.color}`} />
              <span className="text-[10.5px] font-medium text-foreground/55">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Context */}
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Context
        </p>
        <div
          style={glassCard}
          className="p-4 flex flex-col items-center text-center"
        >
          <FolderOpen className="w-6 h-6 text-muted-foreground/20 mb-1" />
          <p className="text-[10.5px] text-muted-foreground/35">
            No files attached
          </p>
          <p className="text-[10px] text-muted-foreground/25 mt-0.5">
            Drop files for context
          </p>
        </div>
      </div>
    </aside>
  );
};

export default CanvasRightPanel;
