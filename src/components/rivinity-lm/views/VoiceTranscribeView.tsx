import { useState } from "react";
import { Mic, Upload, FileAudio, Clock, Search, Download, Languages, Sparkles } from "lucide-react";

interface Transcript {
  id: number;
  title: string;
  duration: string;
  date: string;
  speakers: number;
  segments: { speaker: string; time: string; text: string }[];
}

const sampleTranscript: Transcript = {
  id: 1, title: "Biology Lecture - Cell Division", duration: "45:12", date: "Today",
  speakers: 2,
  segments: [
    { speaker: "Professor", time: "00:00", text: "Today we're going to discuss mitosis and meiosis, the two fundamental types of cell division." },
    { speaker: "Professor", time: "02:15", text: "Mitosis produces two identical daughter cells. It occurs in somatic cells for growth and repair." },
    { speaker: "Student", time: "05:30", text: "How does meiosis differ from mitosis in terms of the end result?" },
    { speaker: "Professor", time: "06:00", text: "Great question. Meiosis produces four genetically unique haploid cells. This is essential for sexual reproduction and genetic diversity." },
  ]
};

const VoiceTranscribeView = () => {
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState<Transcript | null>(sampleTranscript);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("English");
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const filteredSegments = transcript?.segments.filter(s =>
    s.text.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery
  );

  return (
    <div className="max-w-[750px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground/85">Voice Transcribe</h2>
          <p className="text-[12px] text-muted-foreground/50">Convert recordings into organized study materials</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button onClick={() => setRecording(!recording)}
          className={`flex items-center gap-3 p-5 rounded-2xl border transition-all duration-200 ${
            recording ? "bg-red-500/10 border-red-500/30" : "glass border-glass hover:shadow-float border-glass-hover"
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${recording ? "bg-red-500" : "gradient-accent"}`}>
            <Mic className={`w-5 h-5 ${recording ? "text-white animate-pulse" : "text-primary-foreground"}`} />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-semibold text-foreground/80">{recording ? "Recording..." : "Record Live"}</p>
            <p className="text-[11px] text-muted-foreground/50">{recording ? "Tap to stop" : "Start recording a lecture"}</p>
          </div>
        </button>

        <button className="flex items-center gap-3 p-5 rounded-2xl glass border border-glass hover:shadow-float border-glass-hover transition-all duration-200">
          <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center">
            <Upload className="w-5 h-5 text-secondary" />
          </div>
          <div className="text-left">
            <p className="text-[13px] font-semibold text-foreground/80">Upload Audio</p>
            <p className="text-[11px] text-muted-foreground/50">MP3, WAV, M4A supported</p>
          </div>
        </button>
      </div>

      {/* Transcript */}
      {transcript && (
        <div className="glass rounded-2xl border border-glass p-6 shadow-float">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FileAudio className="w-4 h-4 text-primary" />
              <div>
                <p className="text-[14px] font-semibold text-foreground/80">{transcript.title}</p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground/40"><Clock className="w-3 h-3" />{transcript.duration}</span>
                  <span className="text-[10px] text-muted-foreground/40">{transcript.speakers} speakers</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language */}
              <div className="relative">
                <button onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium text-muted-foreground/60 hover:bg-accent/50 transition-colors"
                >
                  <Languages className="w-3.5 h-3.5" />{language}
                </button>
                {showLangDropdown && (
                  <div className="absolute top-full mt-1 right-0 w-32 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in z-50">
                    {["English", "Spanish", "French", "German", "Hindi", "Chinese"].map(l => (
                      <button key={l} onClick={() => { setLanguage(l); setShowLangDropdown(false); }}
                        className={`w-full px-3 py-2 text-[11px] text-left transition-colors ${l === language ? "bg-accent text-foreground" : "text-muted-foreground hover:bg-accent/50"}`}
                      >{l}</button>
                    ))}
                  </div>
                )}
              </div>
              <button className="p-2 rounded-lg hover:bg-accent/50 text-muted-foreground/40 transition-colors"><Download className="w-4 h-4" /></button>
              <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[11px] font-medium gradient-accent text-primary-foreground hover:opacity-90 transition-opacity">
                <Sparkles className="w-3 h-3" />Smart Notes
              </button>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-muted/30 rounded-xl px-3 py-2 mb-4">
            <Search className="w-3.5 h-3.5 text-muted-foreground/40" />
            <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transcript..." className="flex-1 bg-transparent text-[12px] text-foreground placeholder:text-muted-foreground/40 focus:outline-none" />
          </div>

          {/* Segments */}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {filteredSegments?.map((seg, i) => (
              <div key={i} className="flex gap-3 p-3 rounded-xl hover:bg-accent/30 transition-colors">
                <div className="shrink-0">
                  <span className="text-[10px] font-mono text-muted-foreground/40">{seg.time}</span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-primary/70 mb-1">{seg.speaker}</p>
                  <p className="text-[13px] text-foreground/70 leading-relaxed">{seg.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceTranscribeView;
