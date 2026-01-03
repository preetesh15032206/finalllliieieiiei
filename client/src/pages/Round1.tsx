import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link } from "wouter";
import { ShieldAlert, ChevronLeft, Lock, LogIn } from "lucide-react";
import { useAntiCheat } from "@/hooks/use-anti-cheat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Round1() {
  const { data: user, isLoading } = useQuery<User>({ queryKey: ["/api/me"] });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  useAntiCheat();

  const authMutation = useMutation({
    mutationFn: async () => {
      // Re-verify password for this specific round entry
      const res = await apiRequest("POST", "/api/login", { 
        username: user?.username, 
        password 
      });
      return res.json();
    },
    onSuccess: () => {
      if (user?.round1Access || user?.role === "admin") {
        setIsAuthenticated(true);
        toast({ title: "Authorized", description: "Identity verified. Round 1 unlocked." });
      } else {
        toast({ 
          title: "Access Denied", 
          description: "Admin has not approved access for this round.",
          variant: "destructive"
        });
      }
    },
    onError: () => {
      toast({ 
        title: "Auth Failed", 
        description: "Invalid credentials.",
        variant: "destructive"
      });
    }
  });

  if (isLoading) return <div className="p-10 animate-pulse">SYNCING SYSTEM...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
        <div className="w-full max-w-md p-8 border border-primary/30 rounded-lg bg-black/40 backdrop-blur-xl">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-display tracking-wider uppercase">Round 1 Identity Verification</h1>
            <p className="text-gray-400 font-mono text-sm mt-2">Enter credentials to unlock round content</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            authMutation.mutate();
          }} className="space-y-6">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-black/50 border-white/10 focus:border-primary text-white font-mono text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={authMutation.isPending}
              className="w-full bg-primary hover:bg-primary/80 text-black font-bold tracking-widest font-display h-12"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {authMutation.isPending ? "VERIFYING..." : "UNLOCK ROUND"}
            </Button>
            <Link href="/">
              <button type="button" className="w-full text-gray-500 hover:text-white text-xs uppercase font-mono mt-4">
                Cancel
              </button>
            </Link>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl">
      <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-3xl font-bold text-primary">Round 1: FastTrack Quiz</h1>
        <Link href="/">
          <button className="text-gray-500 hover:text-white flex items-center gap-2 text-xs uppercase font-mono tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        </Link>
      </div>
      
      <div className="prose prose-invert max-w-none mb-10">
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-md mb-6">
          <h3 className="text-primary font-display uppercase tracking-widest text-sm mb-2">Competition Rules</h3>
          <ul className="text-xs space-y-1 text-gray-400 font-mono">
            <li>• DO NOT SWITCH TABS (Monitored)</li>
            <li>• RIGHT-CLICK DISABLED</li>
            <li>• SCREENSHOT ATTEMPTS LOGGED</li>
          </ul>
        </div>
        <p className="text-gray-300">Welcome to the first round. Please wait for the organizer to start the quiz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-50 grayscale pointer-events-none">
        <div className="p-6 border border-white/5 rounded bg-white/5">
          <h3 className="text-white font-bold mb-4">Sample Question 1</h3>
          <div className="space-y-2">
            <div className="p-3 border border-white/10 rounded">Option A</div>
            <div className="p-3 border border-white/10 rounded">Option B</div>
          </div>
        </div>
      </div>
    </div>
  );
}
