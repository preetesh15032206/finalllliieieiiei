import { AlertTriangle, Shield, Clock, Award } from "lucide-react";
import { useState, useEffect } from "react";

export default function Round1() {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Anti-cheat: Disable right-click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      alert("Security Alert: Right-click is disabled!");
    };
    document.addEventListener('contextmenu', handleContextMenu);

    // Anti-cheat: Disable copy/paste/cut
    const handleCopyPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      alert("Security Alert: Copy/Paste is disabled!");
    };
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);

    // Anti-cheat: Detect tab switching
    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert("Security Alert: Tab switching detected! Refreshing...");
        window.location.reload();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(timer);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="text-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-primary/5 blur-[80px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-wider">
          Round 1: <span className="text-primary glitch-text" data-text="FastTrack Quiz">FastTrack Quiz</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-md shadow-[0_0_15px_rgba(0,240,255,0.2)]">
          <Clock className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-xl font-mono text-primary font-bold tracking-widest">{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quiz Info Panel */}
        <div className="cyber-card backdrop-blur-xl">
          <h2 className="text-2xl text-secondary mb-6 font-bold font-display flex items-center">
             <Shield className="w-6 h-6 mr-3 text-secondary" />
             Challenge Details
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/10 hover:bg-white/5 px-2 rounded transition-colors">
              <span className="text-primary font-bold font-display tracking-wide">Mode</span>
              <span className="text-gray-300 font-mono">Online Quiz</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10 hover:bg-white/5 px-2 rounded transition-colors">
              <span className="text-primary font-bold font-display tracking-wide">Duration</span>
              <span className="text-gray-300 font-mono">30 Minutes</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10 hover:bg-white/5 px-2 rounded transition-colors">
              <span className="text-primary font-bold font-display tracking-wide">Questions</span>
              <span className="text-gray-300 font-mono">25 MCQs</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/10 hover:bg-white/5 px-2 rounded transition-colors">
              <span className="text-primary font-bold font-display tracking-wide">Scoring</span>
              <span className="text-gray-300 font-mono text-right text-sm">+4 Correct / -1 Wrong</span>
            </div>
          </div>
        </div>

        {/* Instructions Panel */}
        <div className="cyber-card backdrop-blur-xl border-destructive/30">
          <h2 className="text-2xl text-destructive mb-6 font-bold font-display flex items-center">
             <AlertTriangle className="w-6 h-6 mr-3 text-destructive animate-pulse" />
             Instructions
          </h2>
          <ul className="space-y-4">
            {[
              "No tab switching allowed - system will detect and refresh",
              "Right-click and copy-paste are disabled",
              "Complete the quiz within the time limit",
              "Certificates awarded to all participants"
            ].map((instruction, i) => (
              <li key={i} className="flex items-start text-gray-300 bg-destructive/5 p-3 rounded border border-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{instruction}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quiz Interface */}
      <div className="cyber-card mt-8 backdrop-blur-xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b border-white/10 pb-6 gap-4">
          <h2 className="text-2xl text-secondary font-bold font-display">Quiz Interface</h2>
          <div className="flex items-center space-x-4">
             <div className="px-3 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-mono text-sm">
                Q: <span className="font-bold text-white">1</span>/25
             </div>
             <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[4%]" style={{ boxShadow: '0 0 10px #00f0ff' }}></div>
             </div>
          </div>
        </div>

        {/* Sample Question */}
        <div className="mb-8">
          <h3 className="text-xl text-white mb-6 font-medium leading-relaxed font-sans">1. What does HTML stand for?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Hyper Transfer Markup Language",
              "High Text Modern Language"
            ].map((option, i) => (
              <label key={i} className="flex items-center p-4 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-primary/10 hover:border-primary/50 transition-all group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-500 mr-4 group-hover:border-primary flex items-center justify-center relative z-10 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_#00f0ff]"></div>
                </div>
                <span className="text-gray-300 group-hover:text-white relative z-10 font-mono text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-white/10">
          <button className="cyber-button bg-gray-800 opacity-50 cursor-not-allowed filter grayscale">Previous</button>
          <button className="cyber-button group">
             Next Question
             <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* Qualification Info */}
      <div className="cyber-card mt-8 backdrop-blur-xl">
        <h2 className="text-2xl text-secondary mb-4 font-bold font-display">Qualification Criteria</h2>
        <p className="text-lg mb-6 text-gray-300 font-light">Top <span className="text-primary font-bold">50%</span> participants qualify for Round 2.</p>
        <div className="cyber-feature-card !text-left flex items-center gap-4">
          <div className="bg-secondary/20 p-3 rounded-full">
            <Award className="w-8 h-8 text-secondary" />
          </div>
          <div>
             <h4 className="text-white font-bold font-display uppercase tracking-wide text-sm mb-1">Certificate Distribution</h4>
             <p className="text-gray-400 text-sm font-mono">Digital certificate provided upon completion</p>
          </div>
        </div>
      </div>
    </div>
  );
}
