import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Home, Info, Lock, Unlock, Shield, LogOut } from "lucide-react";
import { Link, useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: user, isLoading } = useQuery<User>({ 
    queryKey: ["/api/me"],
    retry: false
  });
  const [location] = useLocation();
  const { toast } = useToast();

  const handleLogout = async () => {
    await apiRequest("POST", "/api/logout");
    queryClient.setQueryData(["/api/me"], null);
    window.location.href = "/";
  };

  if (isLoading) return <aside className="w-64 h-screen border-r bg-black/40 animate-pulse" />;
  if (!user) return null;

  const menuItems = [
    { title: "Home", icon: Home, url: "/" },
    { title: "About", icon: Info, url: "/about" },
    { 
      title: "Round 1", 
      icon: user.round1Access ? Unlock : Lock, 
      url: "/round1", 
      disabled: !user.round1Access && user.role !== "admin",
      status: user.round1Access ? "active" : "locked"
    },
    { 
      title: "Round 2", 
      icon: user.round2Access ? Unlock : Lock, 
      url: "/round2", 
      disabled: !user.round2Access && user.role !== "admin",
      status: user.round2Access ? "active" : "locked"
    },
    { 
      title: "Round 3", 
      icon: user.round3Access ? Unlock : Lock, 
      url: "/round3", 
      disabled: !user.round3Access && user.role !== "admin",
      status: user.round3Access ? "active" : "locked"
    },
  ];

  if (user.role === "admin") {
    menuItems.push({ 
      title: "Admin Panel", 
      icon: Shield, 
      url: "/admin",
      disabled: false,
      status: "active"
    });
  }

  return (
    <aside className="w-64 border-r bg-black/40 backdrop-blur-xl h-screen flex flex-col relative z-20">
      <div className="p-6 border-b border-white/10">
        <h2 className="text-xl font-bold tracking-tighter text-white">
          DECODE & <span className="text-primary">DOMINATE</span>
        </h2>
        <div className="mt-4 space-y-1">
          <p className="text-xs text-gray-400 font-mono">USER: <span className="text-primary uppercase">{user.username}</span></p>
          <p className="text-xs text-gray-400 font-mono">ROLE: <span className="text-primary uppercase">{user.role}</span></p>
          <p className="text-xs text-gray-400 font-mono">TEAM: <span className="text-secondary uppercase">{user.teamId || "GUEST"}</span></p>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <Link key={item.url} href={item.disabled ? location : item.url}>
            <a 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-all border border-transparent",
                location === item.url 
                  ? "bg-primary/10 border-primary/30 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]" 
                  : item.disabled 
                    ? "opacity-50 cursor-not-allowed text-gray-500" 
                    : "hover:bg-white/5 text-gray-400 hover:text-white"
              )}
              onClick={(e) => {
                if (item.disabled) {
                  e.preventDefault();
                  toast({
                    title: "Access Locked",
                    description: "Access Locked by Organizer",
                    variant: "destructive"
                  });
                }
              }}
            >
              <item.icon className={cn("w-4 h-4", location === item.url ? "text-primary" : "")} />
              <span className="text-sm font-medium">{item.title}</span>
              {item.disabled && <Lock className="w-3 h-3 ml-auto text-gray-600" />}
            </a>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md text-gray-500 hover:text-red-500 hover:bg-red-500/10 transition-colors text-xs font-mono tracking-widest uppercase"
        >
          <LogOut className="w-4 h-4" />
          <span>Disconnect</span>
        </button>
      </div>
    </aside>
  );
}
