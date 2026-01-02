import { Clock, Award, Users, ChevronRight, Play, Lock, ShieldAlert } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: user } = useQuery<User>({ queryKey: ["/api/me"] });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "active": return <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">ENABLED</span>;
      case "disqualified": return <span className="text-[10px] bg-red-500/20 text-red-500 px-2 py-0.5 rounded border border-red-500/30">DISQUALIFIED</span>;
      default: return <span className="text-[10px] bg-gray-500/20 text-gray-500 px-2 py-0.5 rounded border border-gray-500/30">LOCKED</span>;
    }
  };

  const isAccessible = (status?: string) => status === "active" || user?.role === "admin";

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-10 text-center relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full -z-10"></div>
         <h1 
          className="text-6xl md:text-7xl font-black mb-4 text-white glitch-text tracking-tight font-display" 
          data-text="DECODE AND DOMINATE 2.0"
        >
          DECODE AND DOMINATE <span className="text-primary">2.0</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
          {user ? `Welcome back, team ${user.teamName}` : "The ultimate coding battleground where logic meets creativity."}
        </p>
      </div>

      {!user && (
        <div className="cyber-card mb-8 border-primary/50 text-center p-12">
          <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-4 font-display">AUTHENTICATION REQUIRED</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Please log in through the Admin Panel using your provided credentials to access competition rounds.</p>
          <Link href="/admin">
            <button className="cyber-button px-10 py-3">LOGIN TO SYSTEM</button>
          </Link>
        </div>
      )}

      <div className="cyber-card mb-8 backdrop-blur-xl">
        <h2 className="text-3xl text-secondary mb-4 font-bold font-display flex items-center">
          <span className="w-2 h-8 bg-secondary mr-4 rounded-sm shadow-[0_0_10px_#7000ff]"></span>
          About the Event
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed font-light">
          Decode & Dominate is KIITFEST's premier coding competition where programmers battle through three intense rounds of challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="cyber-feature-card group cursor-default">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
               <Clock className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">3 Rounds</h3>
            <p className="text-gray-400 text-sm">Quiz → Debugging → Web Cloning</p>
          </div>
          <div className="cyber-feature-card group cursor-default">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors shadow-[0_0_15px_rgba(112,0,255,0.3)]">
               <Award className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">Certificates</h3>
            <p className="text-gray-400 text-sm">For all participants + Winners</p>
          </div>
          <div className="cyber-feature-card group cursor-default">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
               <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">Team Event</h3>
            <p className="text-gray-400 text-sm">Compete with the best coders</p>
          </div>
        </div>
      </div>

      <div className="cyber-card backdrop-blur-xl">
        <h2 className="text-3xl text-secondary mb-10 font-bold font-display flex items-center">
          <span className="w-2 h-8 bg-secondary mr-4 rounded-sm shadow-[0_0_10px_#7000ff]"></span>
          Event Timeline
        </h2>
        <div className="relative pl-4">
          <div className="absolute left-[39px] top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30"></div>
          <div className="space-y-8 relative z-10">
            
            {/* Round 1 */}
            <div className={cn("flex items-center group relative", !isAccessible(user?.round1Access) && "opacity-50")}>
              <div className={cn("w-16 h-16 rounded-full bg-black border-2 mr-6 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300", 
                isAccessible(user?.round1Access) ? "border-primary shadow-[0_0_20px_rgba(0,240,255,0.4)]" : "border-gray-800")}>
                <span className={cn("font-bold font-display text-2xl", isAccessible(user?.round1Access) ? "text-primary" : "text-gray-700")}>1</span>
              </div>
              <div className="flex-1 cyber-feature-card !text-left !p-6 hover:!translate-y-0 hover:!scale-[1.01] transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl text-primary font-bold font-display group-hover:text-white transition-colors">Round 1 - FastTrack Quiz</h3>
                      {getStatusBadge(user?.round1Access || "locked")}
                    </div>
                    <p className="text-gray-400 text-sm font-mono">25 Questions | 30 Minutes</p>
                  </div>
                  <Link href={isAccessible(user?.round1Access) ? "/round1" : "#"}>
                    <button className={cn("cyber-button text-sm py-2 px-6 flex items-center gap-2", !isAccessible(user?.round1Access) && "cursor-not-allowed grayscale")}>
                      {isAccessible(user?.round1Access) ? "Start" : <Lock className="w-4 h-4" />} <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Round 2 */}
            <div className={cn("flex items-center group relative", !isAccessible(user?.round2Access) && "opacity-50")}>
              <div className={cn("w-16 h-16 rounded-full bg-black border-2 mr-6 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300",
                isAccessible(user?.round2Access) ? "border-secondary shadow-[0_0_20px_rgba(112,0,255,0.4)]" : "border-gray-800")}>
                <span className={cn("font-bold font-display text-2xl", isAccessible(user?.round2Access) ? "text-secondary" : "text-gray-700")}>2</span>
              </div>
              <div className="flex-1 cyber-feature-card !text-left !p-6 hover:!translate-y-0 hover:!scale-[1.01] transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl text-secondary font-bold font-display group-hover:text-white transition-colors">Round 2 - Code Debugging</h3>
                      {getStatusBadge(user?.round2Access || "locked")}
                    </div>
                    <p className="text-gray-400 text-sm font-mono">60 Minutes | PDF Submission</p>
                  </div>
                   <Link href={isAccessible(user?.round2Access) ? "/round2" : "#"}>
                    <button className={cn("cyber-button-secondary text-sm py-2 px-6 flex items-center gap-2", !isAccessible(user?.round2Access) && "cursor-not-allowed grayscale")}>
                       {isAccessible(user?.round2Access) ? "Enter" : <Lock className="w-4 h-4" />} <Play className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Round 3 */}
            <div className={cn("flex items-center group relative", !isAccessible(user?.round3Access) && "opacity-50")}>
              <div className={cn("w-16 h-16 rounded-full bg-black border-2 mr-6 flex items-center justify-center z-20 group-hover:scale-110 transition-transform duration-300",
                isAccessible(user?.round3Access) ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]" : "border-gray-800")}>
                <span className={cn("font-bold font-display text-2xl", isAccessible(user?.round3Access) ? "text-white" : "text-gray-700")}>3</span>
              </div>
              <div className="flex-1 cyber-feature-card !text-left !p-6 hover:!translate-y-0 hover:!scale-[1.01] transition-all">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl text-gray-300 group-hover:text-primary font-bold font-display transition-colors">Round 3 - Web Cloning</h3>
                      {getStatusBadge(user?.round3Access || "locked")}
                    </div>
                    <p className="text-gray-400 text-sm font-mono">90 Minutes | GitHub Submission</p>
                  </div>
                   <Link href={isAccessible(user?.round3Access) ? "/round3" : "#"}>
                    <button className={cn("cyber-button-secondary text-sm py-2 px-6 flex items-center gap-2", !isAccessible(user?.round3Access) && "cursor-not-allowed grayscale")}>
                       {isAccessible(user?.round3Access) ? "Final" : <Lock className="w-4 h-4" />} <Play className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
