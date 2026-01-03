import { useAntiCheat } from "@/hooks/use-anti-cheat";

export default function Round3() {
  useAntiCheat();
  return (
    <div className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl">
      <h1 className="text-3xl font-bold text-white mb-6">Round 3: Web Cloning</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300">Welcome to the final round. Clone the provided website design as accurately as possible.</p>
      </div>
    </div>
  );
}
