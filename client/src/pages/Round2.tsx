import { useAntiCheat } from "@/hooks/use-anti-cheat";

export default function Round2() {
  useAntiCheat();
  return (
    <div className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl">
      <h1 className="text-3xl font-bold text-secondary mb-6">Round 2: Code Debugging</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300">Welcome to the second round. Debug the code and submit your findings.</p>
      </div>
    </div>
  );
}
