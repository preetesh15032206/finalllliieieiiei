import { useQuery } from "@tanstack/react-query";
import { User } from "@shared/schema";
import { Link } from "wouter";
import { ShieldAlert, ChevronLeft } from "lucide-react";
import { useAntiCheat } from "@/hooks/use-anti-cheat";

export default function Round2() {
  const { data: user, isLoading } = useQuery<User>({ queryKey: ["/api/me"] });

  useAntiCheat();

  if (isLoading) return <div className="p-10 animate-pulse">SYNCING SYSTEM...</div>;

  if (!user || (!user.round2Access && user.role !== "admin")) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center animate-in fade-in duration-700">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold text-white font-display tracking-widest mb-4">ACCESS DENIED</h1>
        <p className="text-gray-400 font-mono text-center max-w-md">
          Round 2 is currently LOCKED for your account. <br />
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
