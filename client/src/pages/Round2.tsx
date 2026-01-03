import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link } from "wouter";
import { ShieldAlert, ChevronLeft, Lock, LogIn } from "lucide-react";
import { useAntiCheat } from "@/hooks/use-anti-cheat";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Round2() {
  const { data: user, isLoading } = useQuery<User>({ queryKey: ["/api/me"] });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  useAntiCheat();

  const authMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/login", { 
        username: user?.username, 
        password 
      });
      return res.json();
    },
    onSuccess: () => {
      if (user?.round2Access || user?.role === "admin") {
        setIsAuthenticated(true);
        toast({ title: "Authorized", description: "Identity verified. Round 2 unlocked." });
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
        <div className="w-full max-w-md p-8 border border-secondary/30 rounded-lg bg-black/40 backdrop-blur-xl">
          <div className="text-center mb-8">
            <Lock className="w-16 h-16 text-secondary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-display tracking-wider uppercase">Round 2 Identity Verification</h1>
            <p className="text-gray-400 font-mono text-sm mt-2">Enter credentials to unlock round content</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            authMutation.mutate();
          }} className="space-y-6">
            <Input
              type="password"
              placeholder="Confirm Password"
              className="bg-black/50 border-white/10 focus:border-secondary text-white font-mono text-center"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <Button 
              type="submit" 
              disabled={authMutation.isPending}
              className="w-full bg-secondary hover:bg-secondary/80 text-white font-bold tracking-widest font-display h-12"
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
        <h1 className="text-3xl font-bold text-secondary">Round 2: Code Debugging</h1>
        <Link href="/">
          <button className="text-gray-500 hover:text-white flex items-center gap-2 text-xs uppercase font-mono tracking-widest">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        </Link>
      </div>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300">Welcome to the second round. Debug the code and submit your findings.</p>
      </div>
    </div>
  );
}
