import { useAntiCheat } from "@/hooks/use-anti-cheat";

export default function Round1() {
  useAntiCheat();
  return (
    <div className="p-8 border border-white/10 rounded-lg bg-black/40 backdrop-blur-xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Round 1: FastTrack Quiz</h1>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300">Welcome to the first round. Please wait for the organizer to start the quiz.</p>
      </div>
    </div>
  );
}
