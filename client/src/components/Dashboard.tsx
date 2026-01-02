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
  Lock,
  User as UserIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Dashboard() {
  const [location] = useLocation();
  const { data: user, isLoading } = useQuery<User>({ 
    queryKey: ["/api/me"],
    retry: false
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/me"], null);
      window.location.href = "/";
    },
  });

  const navItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/" },
    { icon: Users, label: "Team Info", href: "/about" },
    { icon: Terminal, label: "Round 1: Quiz", href: "/round1", access: user?.round1Access },
    { icon: Cpu, label: "Round 2: Debug", href: "/round2", access: user?.round2Access },
    { icon: Code, label: "Round 3: Clone", href: "/round3", access: user?.round3Access },
  ];

  if (isLoading) return <aside className="w-1/4 h-screen border-r border-[rgba(0,240,255,0.1)] bg-[rgba(5,5,16,0.7)] animate-pulse" />;

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
        <div className="text-xs text-gray-400 font-mono tracking-wider flex items-center gap-2">
          SYSTEM_STATUS: <span className="text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]">ONLINE</span>
          {user && (
            <>
              <span className="text-gray-600">|</span>
              <span className="text-primary uppercase">{user.username}</span>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
        {navItems.map((item) => {
          const isActive = location === item.href;
          const isLocked = item.access === "locked";
          const isDisqualified = item.access === "disqualified";
          
          return (
            <Link key={item.href} href={isLocked || isDisqualified ? location : item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer group relative overflow-hidden",
                  isActive
                    ? "bg-[rgba(0,240,255,0.1)] border-primary/50 text-white shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "bg-transparent border-transparent text-gray-400 hover:bg-white/5 hover:text-white hover:border-white/10",
                  (isLocked || isDisqualified) && "opacity-50 cursor-not-allowed grayscale"
                )}
              >
                {isActive && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary shadow-[0_0_10px_#00f0ff]"></div>
                )}
                <item.icon className={cn("w-5 h-5 transition-colors", isActive ? "text-primary" : "text-gray-500 group-hover:text-white")} />
                <span className="font-medium tracking-wide font-display text-sm flex-1">{item.label}</span>
                {isLocked && <Lock className="w-3 h-3 text-gray-500" />}
                {isDisqualified && <span className="text-[10px] text-red-500 font-mono">DQ</span>}
                {isActive && (
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                )}
              </div>
            </Link>
          );
        })}
        
        {user?.role === "admin" && (
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
                  <span className="font-medium tracking-wide font-display text-sm">Admin Panel</span>
                </div>
              </Link>
          </div>
        )}
      </nav>

      {/* Stats/Footer */}
      <div className="mt-auto pt-6 border-t border-[rgba(255,255,255,0.1)]">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
            <div className="text-[10px] text-gray-500 font-mono mb-1">TEAM_ID</div>
            <div className="text-sm font-bold text-secondary font-display truncate">{user?.teamId || "GUEST"}</div>
          </div>
          <div className="bg-[rgba(0,0,0,0.3)] p-3 rounded border border-[rgba(255,255,255,0.05)]">
            <div className="text-[10px] text-gray-500 font-mono mb-1">ROLE</div>
            <div className="text-sm font-bold text-primary font-display uppercase">{user?.role || "NONE"}</div>
          </div>
        </div>
        
        {user ? (
          <button 
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className="w-full flex items-center justify-center gap-2 text-gray-500 hover:text-destructive transition-colors text-sm py-2 font-mono uppercase tracking-widest hover:bg-[rgba(255,0,0,0.05)] rounded disabled:opacity-50"
          >
            <LogOut className="w-4 h-4" />
            <span>{logoutMutation.isPending ? "EXITING..." : "DISCONNECT"}</span>
          </button>
        ) : (
          <Link href="/admin">
            <button className="w-full flex items-center justify-center gap-2 text-primary hover:text-white transition-colors text-sm py-2 font-mono uppercase tracking-widest hover:bg-primary/10 rounded">
              <UserIcon className="w-4 h-4" />
              <span>AUTHENTICATE</span>
            </button>
          </Link>
        )}
      </div>
    </aside>
  );
}
