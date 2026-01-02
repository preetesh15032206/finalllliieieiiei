import { Clock, GitBranch, Download, Check, X, Shield, ShieldAlert } from "lucide-react";
import { useState } from "react";
import { useProctoring } from "@/hooks/use-proctoring";
import { SubmissionModal } from "@/components/SubmissionModal";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link } from "wouter";

export default function Round3() {
  const { data: user } = useQuery<User>({ queryKey: ["/api/me"] });
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  
  // Anti-cheat mechanisms
  const proctoring = useProctoring({
    enableTabDetection: user?.round3Access === "active",
    enableCopyPasteProtection: user?.round3Access === "active",
    enableRightClickProtection: user?.round3Access === "active",
    enableScreenshotDetection: user?.round3Access === "active",
  });
  const isProtectorEnabled = proctoring.isProtectorEnabled;

  if (!user || user.round3Access !== "active") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
        <ShieldAlert className="w-20 h-20 text-white mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-white font-display tracking-widest mb-4 uppercase">Final Barrier</h1>
        <p className="text-gray-400 font-mono text-center max-w-md">
          Round 3 Status: <span className="text-white font-bold uppercase">{user?.round3Access || "LOCKED"}</span> <br />
          Only qualified participants authorized by admin can enter this round.
        </p>
        <Link href="/">
          <button className="cyber-button-secondary border-white/50 text-white mt-8 px-12 py-2 rounded-lg font-display tracking-widest">RE-ESTABLISH CONNECTION</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="text-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-primary/5 blur-[80px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-wider">
          Round 3: <span className="text-white glitch-text" data-text="Web Cloning">Web Cloning</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          <Clock className="w-5 h-5 text-white animate-pulse" />
          <span className="text-xl font-mono text-white font-bold tracking-widest">90:00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Challenge Info */}
        <div className="cyber-card col-span-2 backdrop-blur-xl">
          <h2 className="text-2xl text-secondary mb-4 font-bold font-display flex items-center">
            <Shield className="w-6 h-6 mr-3 text-secondary" />
            Final Round Challenge
          </h2>
          <p className="text-lg mb-6 text-gray-300 font-light">Recreate the provided website design with pixel-perfect accuracy.</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-6 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-primary font-bold text-xl font-display">90 Minutes</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mt-1">Duration</div>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <GitBranch className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-primary font-bold text-xl font-display">GitHub Only</div>
              <div className="text-xs text-gray-500 uppercase tracking-widest font-mono mt-1">Submission Format</div>
            </div>
          </div>
        </div>

        {/* Assets Download */}
        <div className="cyber-card flex flex-col justify-center backdrop-blur-xl">
          <h2 className="text-2xl text-secondary mb-4 font-bold font-display text-center">Assets</h2>
          <a href="#" className="cyber-button w-full text-center block mb-4 flex items-center justify-center gap-2 group">
            <Download className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            Download Assets
          </a>
          <p className="text-xs text-gray-400 text-center font-mono">Includes design mockups, images, and specifications</p>
        </div>
      </div>

      {/* Evaluation Criteria */}
      <div className="cyber-card mb-8 backdrop-blur-xl">
        <h2 className="text-2xl text-secondary mb-6 font-bold font-display">Evaluation Criteria</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Design accuracy", val: "40%" },
            { label: "Code quality", val: "30%" },
            { label: "Functionality", val: "20%" },
            { label: "Creativity", val: "10%" }
          ].map((item, i) => (
            <div key={i} className="p-4 bg-white/5 rounded-lg border border-white/5 hover:border-primary/20 transition-colors">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-200 font-bold font-display tracking-wide">{item.label}</span>
                <span className="text-primary font-bold text-xl font-mono">{item.val}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full shadow-[0_0_10px_#00f0ff]" style={{ width: item.val }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Guidelines */}
      <div className="cyber-card backdrop-blur-xl">
        <h2 className="text-2xl text-secondary mb-6 font-bold font-display">Submission Guidelines</h2>

        <div className="grid grid-cols-1 gap-8 mb-8">
          <div>
            <h3 className="text-lg text-white mb-4 font-bold flex items-center gap-3">
              <span className="bg-destructive/10 text-destructive p-1.5 rounded border border-destructive/20"><X className="w-4 h-4" /></span> 
              Restrictions
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center bg-destructive/5 p-3 rounded border border-destructive/10">
                 <X className="w-4 h-4 mr-3 text-destructive" /> 
                 <span className="text-sm">No frameworks allowed - Pure HTML/CSS/JS only</span>
              </li>
            </ul>
          </div>
        </div>

        {/* GitHub Submission */}
        <div className="bg-[#0a0c10] p-6 rounded-lg border border-white/10 shadow-inner">
          <h3 className="text-lg text-white mb-4 font-bold font-display flex items-center">
             <GitBranch className="w-5 h-5 mr-2 text-primary" />
             GitHub Submission
          </h3>
          <div className="flex flex-col md:flex-row gap-4">
            <button 
                onClick={() => setIsSubmissionOpen(true)}
                className="cyber-button bg-green-600/20 border border-green-500 text-green-400 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] w-full md:w-auto font-bold tracking-wide"
            >
              Submit Repository
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 font-mono">Make sure repository is public and contains all necessary files</p>
        </div>
      </div>

      <SubmissionModal 
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        roundNumber={3}
        type="repo"
      />
    </div>
  );
}
