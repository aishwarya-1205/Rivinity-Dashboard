import { useState } from "react";
import { BarChart3, Upload, Send, Table, PieChart, TrendingUp, Download, Sparkles, FileSpreadsheet } from "lucide-react";

const sampleInsights = [
  { label: "Average Score", value: "78.5%", change: "+3.2%", positive: true },
  { label: "Total Records", value: "1,247", change: "", positive: true },
  { label: "Missing Data", value: "2.1%", change: "-0.5%", positive: true },
  { label: "Outliers", value: "15", change: "+3", positive: false },
];

const DataAnalystView = () => {
  const [query, setQuery] = useState("");
  const [hasData, setHasData] = useState(true);
  const [activeChart, setActiveChart] = useState<"bar" | "pie" | "line">("bar");

  return (
    <div className="max-w-[950px] mx-auto h-full flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div>
          <h2 className="text-lg font-semibold text-foreground/85">Data Analyst</h2>
          <p className="text-[12px] text-muted-foreground/50">Upload data, ask questions, get insights</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl glass border border-glass text-[12px] font-medium text-foreground/70 hover:shadow-float transition-all">
          <Upload className="w-3.5 h-3.5" /> Upload CSV/Excel
        </button>
      </div>

      {hasData && (
        <div className="flex gap-5 flex-1 min-h-0">
          <div className="flex-[4] flex flex-col min-h-0">
            {/* Quick insights */}
            <div className="grid grid-cols-2 gap-3 mb-5 shrink-0">
              {sampleInsights.map(i => (
                <div key={i.label} className="glass rounded-xl border border-glass p-4">
                  <p className="text-[10px] text-muted-foreground/40 mb-1">{i.label}</p>
                  <p className="text-lg font-bold text-foreground/85">{i.value}</p>
                  {i.change && (
                    <p className={`text-[10px] font-medium mt-0.5 ${i.positive ? "text-green-500" : "text-red-500"}`}>{i.change}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="glass rounded-2xl border border-glass p-5 shadow-float flex-1 flex flex-col min-h-0 mb-5">
              <div className="flex items-center justify-between mb-4 shrink-0">
                <p className="text-[12px] font-semibold text-foreground/70">Visualization</p>
                <div className="flex items-center gap-1">
                  {([
                    { key: "bar" as const, icon: BarChart3 },
                    { key: "pie" as const, icon: PieChart },
                    { key: "line" as const, icon: TrendingUp },
                  ]).map(c => (
                    <button key={c.key} onClick={() => setActiveChart(c.key)}
                      className={`p-2 rounded-lg transition-colors ${activeChart === c.key ? "bg-primary/10 text-primary" : "text-muted-foreground/40 hover:bg-accent/50"}`}
                    >
                      <c.icon className="w-4 h-4" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated chart */}
              <div className="flex-1 flex items-end gap-2 px-2 pb-2">
                {[65, 45, 78, 92, 58, 84, 71, 88, 95, 62, 76, 83].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <div className="w-full rounded-t-lg gradient-accent transition-all duration-300 hover:opacity-80"
                      style={{ height: `${v}%` }} />
                    <span className="text-[9px] text-muted-foreground/30 shrink-0">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-[5] flex flex-col min-h-0">
            {/* Data table preview */}
            <div className="glass rounded-2xl border border-glass p-5 shadow-float flex-1 flex flex-col min-h-0 mb-5">
              <div className="flex items-center justify-between mb-3 shrink-0">
                <div className="flex items-center gap-2">
                  <Table className="w-4 h-4 text-muted-foreground/50" />
                  <p className="text-[12px] font-semibold text-foreground/70">Data Preview</p>
                </div>
                <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] text-muted-foreground/50 hover:bg-accent/50 transition-colors">
                  <Download className="w-3 h-3" /> Export
                </button>
              </div>
              <div className="overflow-y-auto flex-1 min-h-0 pr-2 custom-scrollbar">
                <table className="w-full text-[12px]">
                  <thead className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                    <tr className="border-b border-border/40">
                      {["Student", "Math", "Science", "English", "Average"].map(h => (
                        <th key={h} className="text-left py-2 px-3 text-muted-foreground/50 font-semibold bg-glass">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Alex K.", "92", "85", "78", "85"],
                      ["Sarah M.", "88", "91", "94", "91"],
                      ["James L.", "76", "82", "70", "76"],
                      ["Emma R.", "95", "88", "92", "92"],
                      ["Oliver T.", "82", "89", "85", "85"],
                      ["Sophia W.", "91", "95", "88", "91"],
                      ["William D.", "84", "78", "82", "81"],
                      ["Isabella C.", "89", "86", "91", "88"],
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-border/20 hover:bg-accent/30 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="py-2.5 px-3 text-foreground/65">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Query */}
      <div className="glass rounded-2xl border border-glass p-4 shadow-float shrink-0 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-primary shrink-0" />
          <input value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about your data (e.g., 'What's the average math score?')"
            className="flex-1 bg-transparent text-[13px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none" />
          <button className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center hover:opacity-80 transition-opacity shrink-0">
            <Send className="w-3.5 h-3.5 text-background" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataAnalystView;
