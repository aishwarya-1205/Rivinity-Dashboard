import { useState, useRef } from "react";
import {
  Mic,
  MicOff,
  Upload,
  FileAudio,
  Copy,
  Download,
  Clock,
  Globe,
  ChevronDown,
  Trash2,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  History,
} from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Spanish", flag: "🇪🇸" },
  { code: "fr", label: "French", flag: "🇫🇷" },
  { code: "de", label: "German", flag: "🇩🇪" },
  { code: "ja", label: "Japanese", flag: "🇯🇵" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "ar", label: "Arabic", flag: "🇸🇦" },
  { code: "id", label: "Indonesian", flag: "🇮🇩" },
];

const sampleTranscript = [
  {
    speaker: "Speaker 1",
    text: "Welcome to the customer in a friendly and calm tone.",
    time: "0:00",
    color: "text-primary",
  },
  {
    speaker: "Speaker 1",
    text: "Sound professional, warm, and reassuring, like a helpful support agent who is happy to assist.",
    time: "0:04",
    color: "text-primary",
  },
  {
    speaker: "Speaker 2",
    text: "Speak clearly with a natural pace, not too fast and not too slow.",
    time: "0:09",
    color: "text-secondary",
  },
  {
    speaker: "Speaker 1",
    text: "Thank you for reaching out. I'm here to help you with any questions or concerns you might have today.",
    time: "0:14",
    color: "text-primary",
  },
];

const SpeechToTextView = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasTranscript, setHasTranscript] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [diarize, setDiarize] = useState(true);
  const [uploadedFile, setUploadedFile] = useState<string | null>(
    "meeting_recording.wav",
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeMode, setActiveMode] = useState<"record" | "upload">("upload");
  const [activeSpeechIndex, setActiveSpeechIndex] = useState(0);
  const [showFullHistory, setShowFullHistory] = useState(false);

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setHasTranscript(true);
    } else {
      setIsRecording(true);
      setHasTranscript(false);
      // Simulate recording time
      const interval = setInterval(() => {
        setRecordingTime((t) => {
          if (t >= 10) {
            clearInterval(interval);
            setIsRecording(false);
            setHasTranscript(true);
            return 0;
          }
          return t + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (s: number) =>
    `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="max-w-[720px] mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground/90">
            Speech to Text
          </h2>
          <p className="text-[12px] text-muted-foreground/60">
            Transcribe audio with speaker detection
          </p>
        </div>

        {/* Settings Popover */}
        <div className="relative">
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/30 border border-transparent hover:bg-muted/50 transition-all text-[11px] font-medium text-muted-foreground/70"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>
              {selectedLanguage.flag} {selectedLanguage.label}
            </span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
            <span>{diarize ? "Diarization On" : "Diarization Off"}</span>
            <ChevronDown
              className={`w-3 h-3 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {langDropdownOpen && (
            <div className="absolute top-full mt-2 right-0 z-50 glass-strong rounded-xl border border-glass shadow-float overflow-hidden animate-float-in min-w-[200px] p-2">
              <p className="text-[10px] font-medium text-muted-foreground/50 uppercase tracking-widest mb-2 px-2">
                Transcription Settings
              </p>
              <div className="space-y-1 mb-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang);
                    }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-colors ${
                      lang.code === selectedLanguage.code
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    }`}
                  >
                    <span>{lang.flag}</span> {lang.label}
                  </button>
                ))}
              </div>
              <div className="border-t border-glass/10 pt-2 px-2">
                <button
                  onClick={() => setDiarize(!diarize)}
                  className="w-full flex items-center justify-between text-[11px] font-medium text-foreground/70 hover:text-foreground transition-colors"
                >
                  Speaker Detection
                  <div
                    className={`w-7 h-4 rounded-full relative transition-colors ${diarize ? "bg-primary" : "bg-muted-foreground/20"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${diarize ? "left-3.5" : "left-0.5"}`}
                    />
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Input Card */}
      <div className="glass rounded-2xl border border-glass shadow-float p-3 relative overflow-hidden">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-muted/30 border border-glass/10 w-fit mb-6 mx-auto">
          <button
            onClick={() => setActiveMode("upload")}
            className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${activeMode === "upload" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground/60 hover:text-foreground/80"}`}
          >
            Upload File
          </button>
          <button
            onClick={() => setActiveMode("record")}
            className={`px-4 py-1.5 rounded-lg text-[12px] font-medium transition-all ${activeMode === "record" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground/60 hover:text-foreground/80"}`}
          >
            Live Record
          </button>
        </div>

        {activeMode === "record" ? (
          <div className="flex flex-col items-center py-4">
            <button
              onClick={toggleRecording}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                isRecording
                  ? "bg-destructive/15 shadow-[0_0_40px_rgba(239,68,68,0.2)] animate-pulse"
                  : "glass border border-glass hover:shadow-glow-accent"
              }`}
            >
              {isRecording ? (
                <MicOff className="w-5 h-5 text-destructive" />
              ) : (
                <Mic className="w-5 h-5 text-primary" />
              )}
            </button>
            <p className="text-[12px] text-foreground/70 mt-4 font-medium">
              {isRecording ? "Listening..." : "Click to Start"}
            </p>
            {isRecording && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[12px] text-destructive font-mono">
                  {formatTime(recordingTime)}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="py-2">
            {uploadedFile ? (
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 border border-glass/20 group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <FileAudio className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-foreground truncate">
                    {uploadedFile}
                  </p>
                  <p className="text-[11px] text-muted-foreground/50">
                    WAV · 1:32
                  </p>
                </div>
                <button
                  onClick={() => setUploadedFile(null)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground/30 hover:text-destructive hover:bg-destructive/10 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-glass/20 rounded-xl p-10 text-center cursor-pointer hover:border-primary/30 hover:bg-accent/20 transition-all group"
              >
                <Upload className="w-7 h-7 text-muted-foreground/20 mx-auto mb-3 group-hover:text-primary/40 transition-colors" />
                <p className="text-[13px] text-foreground/70 font-medium">
                  Drop audio file or click to upload
                </p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setUploadedFile(file.name);
              }}
            />
          </div>
        )}

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setHasTranscript(true)}
            disabled={activeMode === "upload" && !uploadedFile}
            className="px-6 py-2.5 rounded-xl gradient-accent text-primary-foreground text-[14px] font-semibold hover:shadow-glow-accent transition-all disabled:opacity-50"
          >
            Transcribe Now
          </button>
        </div>
      </div>

      {/* Dynamic Transcription Carousel */}
      {hasTranscript && (
        <div className="glass rounded-2xl border border-glass shadow-float overflow-hidden animate-float-in flex flex-col">
          <div className="px-5 py-3 bg-muted/20 border-b border-glass/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-[12px] font-semibold text-foreground/70">
                Transcription Focus
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="relative">
                <button
                  onClick={() => setShowFullHistory(!showFullHistory)}
                  className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all flex items-center gap-1.5"
                >
                  <History className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-bold">FULL SCRIPT</span>
                </button>
                {showFullHistory && (
                  <div className="absolute bottom-full right-0 mb-2 z-50 glass-strong rounded-xl border border-glass shadow-float p-3 animate-float-in min-w-[320px] max-h-[300px] overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase mb-3">
                      Full Transcript History
                    </p>
                    <div className="space-y-4">
                      {sampleTranscript.map((s, i) => (
                        <div key={i} className="flex gap-3">
                          <span
                            className={`text-[9px] font-bold uppercase shrink-0 w-12 ${s.color}`}
                          >
                            {s.speaker}
                          </span>
                          <p className="text-[11px] text-foreground/70 leading-relaxed">
                            {s.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <span className="w-px h-3 bg-glass/20 mx-1" />
              <button className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all">
                <Copy className="w-3.5 h-3.5" />
              </button>
              <button className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-accent/50 transition-all">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="p-6 flex items-center gap-6">
            <button
              disabled={activeSpeechIndex === 0}
              onClick={() => setActiveSpeechIndex((prev) => prev - 1)}
              className="w-10 h-10 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground disabled:opacity-20 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 flex flex-col items-center text-center py-4">
              <div
                className={`px-2.5 py-1 rounded-full bg-accent/20 border border-glass/10 mb-4 inline-block`}
              >
                <span
                  className={`text-[10px] uppercase font-black tracking-widest ${sampleTranscript[activeSpeechIndex].color}`}
                >
                  {sampleTranscript[activeSpeechIndex].speaker}
                </span>
                <span className="text-[10px] text-muted-foreground/40 ml-2 font-mono">
                  {sampleTranscript[activeSpeechIndex].time}
                </span>
              </div>
              <p className="text-[16px] text-foreground/80 leading-relaxed font-medium max-w-[480px]">
                "{sampleTranscript[activeSpeechIndex].text}"
              </p>
            </div>

            <button
              disabled={activeSpeechIndex === sampleTranscript.length - 1}
              onClick={() => setActiveSpeechIndex((prev) => prev + 1)}
              className="w-10 h-10 rounded-full glass border border-glass flex items-center justify-center text-muted-foreground/40 hover:text-foreground disabled:opacity-20 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Indicator Dots */}
          <div className="flex justify-center gap-1.5 pb-6">
            {sampleTranscript.map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-all duration-300 ${i === activeSpeechIndex ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/20"}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechToTextView;
