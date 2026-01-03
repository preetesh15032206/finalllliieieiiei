import { Clock, Award, Users, ChevronRight, Play, Lock, ShieldAlert } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { cn } from "@/lib/utils";

export default function Home() {
  const { data: user } = useQuery<User>({ queryKey: ["/api/me"] });

  const getStatusBadge = (access: boolean) => {
    if (access) return <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded border border-green-500/30">ENABLED</span>;
    return <span className="text-[10px] bg-gray-500/20 text-gray-500 px-2 py-0.5 rounded border border-gray-500/30">LOCKED</span>;
  };

  const isAccessible = (access: boolean) => access || user?.role === "admin";

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-10 text-center relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full -z-10"></div>
         <h1 
          className="text-6xl md:text-7xl font-black mb-4 text-white tracking-tight font-display" 
        >
          DECODE AND DOMINATE <span className="text-primary">2.0</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
          {user ? `Welcome back, team ${user.teamName}` : "The ultimate coding battleground where logic meets creativity."}
        </p>
      </div>

      {!user && (
        <div className="p-12 border border-primary/50 rounded-lg bg-black/40 backdrop-blur-xl text-center mb-8">
          <ShieldAlert className="w-16 h-16 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-4 font-display">AUTHENTICATION REQUIRED</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">Please log in through the Admin Panel using your provided credentials to access competition rounds.</p>
          <Link href="/admin">
            <button className="px-10 py-3 bg-primary text-black font-bold rounded-md hover:bg-primary/80 transition-all">LOGIN TO SYSTEM</button>
          </Link>
        </div>
      )}

      <div className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl mb-8">
        <h2 className="text-3xl text-secondary mb-4 font-bold font-display flex items-center">
          <span className="w-2 h-8 bg-secondary mr-4 rounded-sm shadow-[0_0_10px_#7000ff]"></span>
          About the Event
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed font-light">
          Decode & Dominate is KIITFEST's premier coding competition where programmers battle through three intense rounds of challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 border border-white/5 rounded-lg bg-white/5 text-center group">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
               <Clock className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">3 Rounds</h3>
            <p className="text-gray-400 text-sm">Quiz → Debugging → Web Cloning</p>
          </div>
          <div className="p-6 border border-white/5 rounded-lg bg-white/5 text-center group">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(112,0,255,0.3)]">
               <Award className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">Certificates</h3>
            <p className="text-gray-400 text-sm">For all participants + Winners</p>
          </div>
          <div className="p-6 border border-white/5 rounded-lg bg-white/5 text-center group">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
               <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">Team Event</h3>
            <p className="text-gray-400 text-sm">Compete with the best coders</p>
          </div>
        </div>
      </div>

      <div className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl">
        <h2 className="text-3xl text-secondary mb-10 font-bold font-display flex items-center">
          <span className="w-2 h-8 bg-secondary mr-4 rounded-sm shadow-[0_0_10px_#7000ff]"></span>
          Event Timeline
        </h2>
        <div className="relative pl-4">
          <div className="absolute left-[39px] top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30"></div>
          <div className="space-y-8 relative z-10">
            <TimelineItem 
              num="1" 
              title="Round 1 - FastTrack Quiz" 
              details="25 Questions | 30 Minutes"
              access={user?.round1Access ?? false}
              href="/round1"
              isAccessible={isAccessible(user?.round1Access ?? false)}
              statusBadge={getStatusBadge(user?.round1Access ?? false)}
              color="primary"
            />
            <TimelineItem 
              num="2" 
              title="Round 2 - Code Debugging" 
              details="60 Minutes | PDF Submission"
              access={user?.round2Access ?? false}
              href="/round2"
              isAccessible={isAccessible(user?.round2Access ?? false)}
              statusBadge={getStatusBadge(user?.round2Access ?? false)}
              color="secondary"
            />
            <TimelineItem 
              num="3" 
              title="Round 3 - Web Cloning" 
              details="90 Minutes | GitHub Submission"
              access={user?.round3Access ?? false}
              href="/round3"
              isAccessible={isAccessible(user?.round3Access ?? false)}
              statusBadge={getStatusBadge(user?.round3Access ?? false)}
              color="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({ num, title, details, isAccessible, href, statusBadge, color }: any) {
  const colorClass = color === "primary" ? "border-primary text-primary" : color === "secondary" ? "border-secondary text-secondary" : "border-white text-white";
  const shadowClass = color === "primary" ? "shadow-[0_0_20px_rgba(0,240,255,0.4)]" : color === "secondary" ? "shadow-[0_0_20px_rgba(112,0,255,0.4)]" : "shadow-[0_0_20px_rgba(255,255,255,0.4)]";

  return (
    <div className={cn("flex items-center group relative", !isAccessible && "opacity-50")}>
      <div className={cn("w-16 h-16 rounded-full bg-black border-2 mr-6 flex items-center justify-center z-20 transition-all", 
        isAccessible ? `${colorClass} ${shadowClass} group-hover:scale-110` : "border-gray-800 text-gray-700")}>
        <span className="font-bold font-display text-2xl">{num}</span>
      </div>
      <div className="flex-1 p-6 border border-white/5 rounded-lg bg-white/5 transition-all">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className={cn("text-xl font-bold font-display transition-colors", isAccessible ? "text-white" : "text-gray-500")}>{title}</h3>
              {statusBadge}
            </div>
            <p className="text-gray-400 text-sm font-mono">{details}</p>
          </div>
          <Link href={isAccessible ? href : "#"}>
            <button className={cn("px-6 py-2 rounded-md font-bold text-sm flex items-center gap-2 transition-all", 
              isAccessible ? "bg-primary text-black hover:bg-primary/80" : "bg-gray-800 text-gray-500 cursor-not-allowed")}>
              {isAccessible ? "Start" : <Lock className="w-4 h-4" />} <ChevronRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
