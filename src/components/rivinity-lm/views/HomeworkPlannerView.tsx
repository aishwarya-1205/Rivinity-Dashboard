import { useState } from "react";
import { CalendarCheck, Plus, Clock, AlertTriangle, Check, Sparkles, ChevronDown, MessageSquare } from "lucide-react";

interface Task {
  id: number;
  title: string;
  subject: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in-progress" | "done";
  aiSuggestion?: string;
}

const sampleTasks: Task[] = [
  { id: 1, title: "Calculus Problem Set #5", subject: "Mathematics", dueDate: "Tomorrow", priority: "high", status: "in-progress", aiSuggestion: "Start with problems 1-5, they build on each other. Budget 45 mins." },
  { id: 2, title: "Essay: Climate Change Impact", subject: "English", dueDate: "In 3 days", priority: "medium", status: "pending", aiSuggestion: "Create an outline first. Focus on 3 key arguments." },
  { id: 3, title: "Lab Report: Titration", subject: "Chemistry", dueDate: "Next week", priority: "low", status: "pending" },
  { id: 4, title: "History Reading Ch. 12", subject: "History", dueDate: "Today", priority: "high", status: "done" },
];

const priorityColors = { high: "text-red-500 bg-red-500/10", medium: "text-amber-500 bg-amber-500/10", low: "text-green-500 bg-green-500/10" };
const statusColors = { pending: "bg-muted text-muted-foreground/60", "in-progress": "bg-primary/10 text-primary", done: "bg-green-500/10 text-green-600" };

const HomeworkPlannerView = () => {
  const [tasks, setTasks] = useState(sampleTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [askingAI, setAskingAI] = useState(false);

  const toggleStatus = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: t.status === "done" ? "pending" : "done" } : t));
  };

  return (
    <div className="max-w-[750px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground/85">Homework Planner</h2>
          <p className="text-[12px] text-muted-foreground/50">AI-powered smart planning & assistance</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl gradient-accent text-primary-foreground text-[12px] font-medium hover:opacity-90 transition-opacity">
          <Plus className="w-3.5 h-3.5" /> Add Task
        </button>
      </div>

      {/* Add task */}
      {showAdd && (
        <div className="glass rounded-2xl border border-glass p-5 mb-6 animate-float-in shadow-float">
          <div className="flex gap-3 mb-3">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="What's the assignment?"
              className="flex-1 bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/20" />
            <input value={newSubject} onChange={(e) => setNewSubject(e.target.value)} placeholder="Subject"
              className="w-[140px] bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/20" />
          </div>
          <div className="flex items-center justify-between">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-primary bg-primary/10 hover:bg-primary/15 transition-colors">
              <Sparkles className="w-3 h-3" /> AI Plan This
            </button>
            <button onClick={() => {
              if (newTitle) {
                setTasks(prev => [...prev, { id: Date.now(), title: newTitle, subject: newSubject || "General", dueDate: "Set date", priority: "medium", status: "pending" }]);
                setNewTitle(""); setNewSubject(""); setShowAdd(false);
              }
            }} className="px-4 py-2 rounded-xl bg-foreground text-background text-[12px] font-medium hover:opacity-80 transition-opacity">Save</button>
          </div>
        </div>
      )}

      {/* Tasks list */}
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id}
            className={`glass rounded-xl border border-glass p-4 transition-all duration-200 hover:shadow-float ${task.status === "done" ? "opacity-60" : ""}`}
          >
            <div className="flex items-start gap-3">
              <button onClick={() => toggleStatus(task.id)}
                className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${
                  task.status === "done" ? "bg-green-500 border-green-500" : "border-muted-foreground/20 hover:border-primary/40"
                }`}>
                {task.status === "done" && <Check className="w-3 h-3 text-white" />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className={`text-[13px] font-medium ${task.status === "done" ? "line-through text-muted-foreground/40" : "text-foreground/80"}`}>{task.title}</p>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${priorityColors[task.priority]}`}>{task.priority}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-muted-foreground/50">{task.subject}</span>
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground/40"><Clock className="w-3 h-3" />{task.dueDate}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${statusColors[task.status]}`}>{task.status}</span>
                </div>
                {task.aiSuggestion && task.status !== "done" && (
                  <div className="mt-2 flex items-start gap-2 bg-primary/5 rounded-lg p-2.5">
                    <Sparkles className="w-3 h-3 text-primary mt-0.5 shrink-0" />
                    <p className="text-[11px] text-foreground/60 leading-relaxed">{task.aiSuggestion}</p>
                  </div>
                )}
              </div>
              <button onClick={() => setSelectedTask(task)}
                className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/30 hover:text-muted-foreground/60 transition-colors shrink-0">
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* AI help area */}
      {selectedTask && selectedTask.status !== "done" && (
        <div className="mt-6 glass rounded-2xl border border-glass p-5 animate-float-in shadow-float">
          <p className="text-[12px] font-semibold text-foreground/70 mb-2">AI Assistant — {selectedTask.title}</p>
          <p className="text-[11px] text-muted-foreground/50 mb-3">Stuck? Ask AI for help with this assignment.</p>
          <div className="flex gap-2">
            <input placeholder="What part are you stuck on?" className="flex-1 bg-muted/30 rounded-xl px-4 py-2.5 text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none" />
            <button className="px-4 py-2 rounded-xl gradient-accent text-primary-foreground text-[12px] font-medium hover:opacity-90 transition-opacity">Help me</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkPlannerView;
