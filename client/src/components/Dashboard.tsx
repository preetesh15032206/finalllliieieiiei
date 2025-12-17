import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Terminal, 
  Cpu, 
  Code, 
  Shield, 
  Activity,
  LogOut,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: Users, label: "Team Info", href: "/about" },
    { icon: Terminal, label: "Round 1: Quiz", href: "/round1" },
    { icon: Cpu, label: "Round 2: Debug", href: "/round2" },
    { icon: Code, label: "Round 3: Clone", href: "/round3" },
  ];

  return (
    <aside className="w-1/4 h-screen border-r border-[rgba(0,240,255,0.1)] p-6 flex flex-col relative z-20 backdrop-blur-md bg-[rgba(5,5,16,0.7)] shadow-[5px_0_30px_rgba(0,0,0,0.5)]">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-8 h-8 text-primary animate-pulse" />
          <h2 className="text-xl font-bold text-white tracking-tighter font-display">
            DECODE & <span className="text-primary">DOMINATE</span>
          </h2>
        </div>
        <div className="text-xs text-gray-400 font-mono tracking-wider">
          SYSTEM_STATUS: <span className="text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]">ONLINE</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer group relative overflow-hidden",
                  isActive
                    ? "bg-[rgba(0,240,255,0.1)] border-primary/50 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/10"
                )}
              >
                {isActive && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_#00f0ff]"></div>
                )}
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-gray-500 group-hover:text-white")} />
                <span className="font-medium tracking-wide font-display text-sm">{item.label}</span>
                {isActive && (
                  <Activity className="w-4 h-4 ml-auto text-primary animate-pulse" />
                )}
              </div>
            </Link>
          );
        })}
        
        {/* Admin Link (Hidden/Separate) */}
        <div className="pt-4 mt-4 border-t border-white/5">
             <Link href="/admin">
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer group relative overflow-hidden",
                  location === "/admin"
                    ? "bg-red-500/10 border-red-500/50 text-white shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    : "bg-transparent border-transparent text-gray-500 hover:bg-red-500/5 hover:text-red-400 hover:border-red-500/10"
                )}
              >
                <Lock className="w-5 h-5" />
                <span className="font-medium tracking-wide font-display text-sm">Admin Control</span>
              </div>
            </Link>
        </div>
      </nav>

      {/* Stats/Footer */}
      <div className="mt-auto pt-6 border-t border-[rgba(255,255,255,0.1)]">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
            <div className="text-[10px] text-gray-500 font-mono mb-1">SCORE</div>
            <div className="text-xl font-bold text-secondary font-display">000</div>
          </div>
          <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
            <div className="text-[10px] text-gray-500 font-mono mb-1">RANK</div>
            <div className="text-xl font-bold text-primary font-display">#---</div>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-destructive transition-colors text-sm py-2 font-mono uppercase tracking-widest hover:bg-[rgba(255,0,0,0.05)] rounded">
          <LogOut className="w-4 h-4" />
          <span>DISCONNECT</span>
        </button>
      </div>
    </aside>
  );
}
