import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link, useLocation } from "wouter";
import { ShieldAlert, Lock, ChevronLeft } from "lucide-react";
import { useAntiCheat } from "@/hooks/use-anti-cheat";

export default function Round1() {
  const { data: user, isLoading } = useQuery<User>({ queryKey: ["/api/me"] });
  const [location, setLocation] = useLocation();

  useAntiCheat();

  if (isLoading) return <div className="p-10 animate-pulse">SYNCING SYSTEM...</div>;

  if (!user || (!user.round1Access && user.role !== "admin")) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-white font-display tracking-widest mb-4">ACCESS DENIED</h1>
        <p className="text-gray-400 font-mono text-center max-w-md">
          Round 1 is currently LOCKED for your account. <br />
          Please contact the event organizer for authorization.
        </p>
        <Link href="/">
          <button className="px-8 py-2 bg-primary text-black font-bold rounded mt-8">RETURN TO BASE</button>
        </Link>
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
