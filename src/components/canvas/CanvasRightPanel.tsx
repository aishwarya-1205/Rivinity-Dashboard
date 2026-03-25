import {
  Brain,
  Zap,
  Globe,
  Layout,
  Database,
  Shield,
  FolderOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFiles } from "../context/FileContext";

const tools = [
  { icon: Globe, label: "Web Search", color: "text-primary" },
  {
    icon: Layout,
    label: "App Builder",
    color: "text-primary",
    route: "/app-builder",
  },
  { icon: Database, label: "Database", color: "text-primary" },
  { icon: Shield, label: "Security", color: "text-primary" },
];

interface CanvasRightPanelProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const CanvasRightPanel = ({ isOpen, onClose }: CanvasRightPanelProps) => {
  const navigate = useNavigate();
  const { files, addFiles, removeFile } = useFiles();
  return (
    <aside
      className={`h-full flex-col py-5 px-3 shrink-0 flex gap-5 overflow-y-auto bg-background  lg:relative fixed top-0 right-0 z-40 shadow-2xl lg:shadow-none transition-all duration-300 ease-in-out ${
        isOpen
          ? "translate-x-0 w-[220px] opacity-100"
          : "translate-x-full lg:translate-x-0 lg:w-0 lg:px-0 lg:opacity-0 pointer-events-none lg:pointer-events-auto"
      }`}
    >
      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Model
        </p>
        <div className="rounded-xl p-3">
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

      <div>
        <p className="text-[10px] font-medium text-muted-foreground/35 uppercase tracking-widest mb-2 px-1">
          Tools
        </p>
        <div className="grid grid-cols-2 gap-1.5">
          {tools.map((t) => (
            <button
              key={t.label}
              onClick={() => t.route && navigate(t.route)}
              className={`glass flex flex-col items-center gap-1.5 p-3 rounded-xl border border-glass border-glass-hover transition-all duration-150 ${t.route ? "cursor-pointer hover:shadow-float" : ""}`}
            >
              <t.icon className={`w-4 h-4 ${t.color}`} />
              <span className="text-[11px] font-medium text-foreground/70">
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div
        className="rounded-xl px-4 py-6 flex flex-col items-center text-center border border-dashed border-border/40 hover:border-primary/40 transition gap-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const dropped = Array.from(e.dataTransfer.files);
          addFiles(dropped);
        }}
      >
        <input
          type="file"
          multiple
          accept=".pdf,.png,.jpg,.jpeg,.txt"
          className="hidden"
          id="fileUpload-canvas"
          onChange={(e) => {
            if (!e.target.files) return;
            addFiles(Array.from(e.target.files));
          }}
        />

        <label
          htmlFor="fileUpload-canvas" // ✅ FIXED
          className="cursor-pointer flex flex-col items-center justify-center w-full"
        >
          <FolderOpen className="w-7 h-7 text-muted-foreground/40 mb-2" />
          <p className="text-[11px] text-muted-foreground/50">
            {files.length === 0
              ? "Drop files or click to upload"
              : "Add more files"}
          </p>
        </label>

        {files.length > 0 && (
          <div className="mt-3 w-full space-y-1">
            {files.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between text-[10px] bg-muted/40 px-2 py-1 rounded"
              >
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button
                  onClick={() => removeFile(i)}
                  className="text-red-400 text-[9px]"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default CanvasRightPanel;
