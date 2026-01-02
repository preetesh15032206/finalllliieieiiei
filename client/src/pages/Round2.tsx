import { Target, Clock, FileText, AlertOctagon, ShieldAlert, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useProctoring } from "@/hooks/use-proctoring";
import { SubmissionModal } from "@/components/SubmissionModal";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link } from "wouter";

export default function Round2() {
  const { data: user } = useQuery<User>({ queryKey: ["/api/me"] });
  const [isSubmissionOpen, setIsSubmissionOpen] = useState(false);
  
  // Anti-cheat mechanisms
  const proctoring = useProctoring({
    enableTabDetection: user?.round2Access === "active",
    enableCopyPasteProtection: user?.round2Access === "active",
    enableRightClickProtection: user?.round2Access === "active",
    enableScreenshotDetection: user?.round2Access === "active",
  });
  const isProtectorEnabled = proctoring.isProtectorEnabled;

  if (!user || user.round2Access !== "active") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
        <ShieldAlert className="w-20 h-20 text-secondary mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-white font-display tracking-widest mb-4 uppercase">Access Restricted</h1>
        <p className="text-gray-400 font-mono text-center max-w-md">
          Round 2 Access Status: <span className="text-secondary font-bold uppercase">{user?.round2Access || "LOCKED"}</span> <br />
          Verification from organizers required to proceed.
        </p>
        <Link href="/">
          <button className="cyber-button-secondary mt-8 px-10 py-2 rounded-lg font-display tracking-widest">BACK TO OVERVIEW</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700">
      <div className="text-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-secondary/5 blur-[80px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-wider">
          Round 2: <span className="text-secondary glitch-text" data-text="Code Debugging">Code Debugging</span>
        </h1>
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-secondary/30 bg-secondary/10 backdrop-blur-md shadow-[0_0_15px_rgba(112,0,255,0.2)]">
          <Clock className="w-5 h-5 text-secondary animate-pulse" />
          <span className="text-xl font-mono text-secondary font-bold tracking-widest">60:00</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Challenge Overview */}
        <div className="cyber-card backdrop-blur-xl">
          <h2 className="text-2xl text-secondary mb-6 font-bold font-display flex items-center">
            <Target className="w-6 h-6 mr-3 text-secondary" />
            Challenge Overview
          </h2>
          <div className="space-y-4">
            <div className="flex items-start bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <Target className="w-6 h-6 text-primary mr-4 mt-1" />
              <div>
                <h4 className="text-primary font-bold mb-1 font-display tracking-wide">Mode</h4>
                <p className="text-gray-400 text-sm">Debugging Competition</p>
              </div>
            </div>
            <div className="flex items-start bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <Clock className="w-6 h-6 text-primary mr-4 mt-1" />
              <div>
                <h4 className="text-primary font-bold mb-1 font-display tracking-wide">Duration</h4>
                <p className="text-gray-400 text-sm">60 Minutes</p>
              </div>
            </div>
            <div className="flex items-start bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
              <FileText className="w-6 h-6 text-primary mr-4 mt-1" />
              <div>
                <h4 className="text-primary font-bold mb-1 font-display tracking-wide">Submission</h4>
                <p className="text-gray-400 text-sm">Submit debugged code as PDF with explanations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Rules */}
        <div className="cyber-card backdrop-blur-xl border-destructive/30">
          <h2 className="text-2xl text-destructive mb-6 font-bold font-display flex items-center">
            <AlertOctagon className="w-6 h-6 mr-3 text-destructive animate-pulse" />
            Rules
          </h2>
          <ul className="space-y-4">
            {[
              "Fix bugs in provided code snippets",
              "PDF submission only - no code files",
              "Screenshot detection enabled",
              "No external help allowed"
            ].map((rule, i) => (
              <li key={i} className="flex items-start bg-destructive/5 p-3 rounded border border-destructive/10">
                <AlertOctagon className="w-5 h-5 text-destructive mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300 text-sm">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code Debugging Interface */}
      <div className="cyber-card mt-8 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-2xl text-secondary font-bold font-display">Debugging Challenge</h2>
           <span className="px-3 py-1 rounded bg-secondary/10 border border-secondary/30 text-secondary font-mono text-xs">
              Snippet #1
           </span>
        </div>

        {/* Buggy Code Sample */}
        <div className="mb-6">
          <h3 className="text-lg text-white mb-3 font-bold font-display flex items-center">
             <span className="w-1.5 h-6 bg-primary mr-3 rounded-sm"></span>
             Buggy Code
          </h3>
          <div className="relative group">
             <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
             <pre className="relative bg-[#0a0c10] p-6 rounded-lg overflow-x-auto font-mono text-sm border border-white/10 leading-relaxed shadow-inner">
              <code>
  <span className="text-gray-500 italic">// Fix the following JavaScript function</span>
  <span className="text-secondary">function</span> <span className="text-yellow-300">calculateSum</span>(<span className="text-orange-300">numbers</span>) {"{"}
      <span className="text-secondary">let</span> total = <span className="text-purple-400">0</span>;
      <span className="text-secondary">for</span> (<span className="text-secondary">let</span> i = <span className="text-purple-400">0</span>; i &lt;= numbers.length; i++) {"{"}
          total += numbers[i];
      {"}"}
      <span className="text-secondary">return</span> total;
  {"}"}
  
  <span className="text-gray-500 italic">// Test case that should return 15</span>
  <span className="text-cyan-300">console</span>.<span className="text-blue-300">log</span>(calculateSum([<span className="text-purple-400">1</span>, <span className="text-purple-400">2</span>, <span className="text-purple-400">3</span>, <span className="text-purple-400">4</span>, <span className="text-purple-400">5</span>]));
              </code>
            </pre>
          </div>
        </div>

        {/* Solution Area */}
        <div>
          <h3 className="text-lg text-white mb-3 font-bold font-display flex items-center">
             <span className="w-1.5 h-6 bg-secondary mr-3 rounded-sm"></span>
             Your Solution
          </h3>
          <textarea
            className="w-full h-40 bg-[#0a0c10] border border-white/10 rounded-lg p-4 font-mono text-sm text-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none shadow-inner placeholder:text-gray-700"
            placeholder="Explain the bug and provide the corrected code..."
          ></textarea>
        </div>

        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <button className="cyber-button bg-gray-800 w-full md:w-auto">Save Progress</button>
          <button 
            onClick={() => setIsSubmissionOpen(true)}
            className="cyber-button bg-green-600/20 border border-green-500 text-green-400 hover:bg-green-600/30 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] w-full md:w-auto"
          >
            Submit PDF Solution
          </button>
        </div>
      </div>

      {/* Anti-Cheat Warning */}
      <div className={`mt-8 p-6 rounded-lg border bg-opacity-10 backdrop-blur-sm transition-colors duration-500 ${isProtectorEnabled ? 'border-red-600/30 bg-red-950/10' : 'border-gray-800 bg-gray-900/50'}`}>
        <div className="flex items-center mb-2">
          <AlertTriangle className={`w-6 h-6 mr-3 ${isProtectorEnabled ? 'text-red-500 animate-pulse' : 'text-gray-500'}`} />
          <h2 className={`text-xl font-bold tracking-wider font-display ${isProtectorEnabled ? 'text-red-500' : 'text-gray-500'}`}>
            ANTI-CHEAT SYSTEM
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <p className="text-gray-400 text-sm">
             {isProtectorEnabled 
               ? "STRICT PROCTORING ACTIVE. Any violation will be logged." 
               : "Standard monitoring enabled. Please follow exam guidelines."}
           </p>
           <div className={`px-4 py-1 border rounded text-center ${isProtectorEnabled ? 'bg-red-900/20 border-red-900/50' : 'bg-gray-800 border-gray-700'}`}>
             <p className={`font-bold font-mono text-xs uppercase tracking-widest ${isProtectorEnabled ? 'text-red-400' : 'text-gray-400'}`}>
                {isProtectorEnabled ? 'MONITORING ACTIVE' : 'SYSTEM READY'}
             </p>
           </div>
        </div>
      </div>

      <SubmissionModal 
        isOpen={isSubmissionOpen}
        onClose={() => setIsSubmissionOpen(false)}
        roundNumber={2}
        type="pdf"
      />
    </div>
  );
}
