import { Clock, Award, Users, ChevronRight, Check, Play } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-10 text-center relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/10 blur-[100px] rounded-full -z-10"></div>
         <h1 
          className="text-6xl md:text-7xl font-black mb-4 text-white glitch-text tracking-tight font-display" 
          data-text="DECODE AND DOMINATE 2.0"
        >
          DECODE AND DOMINATE <span className="text-primary">2.0</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
          The ultimate coding battleground where logic meets creativity.
        </p>
      </div>

      <div className="cyber-card mb-8 backdrop-blur-xl">
        <h2 className="text-3xl text-secondary mb-4 font-bold font-display flex items-center">
          <span className="w-2 h-8 bg-secondary mr-4 rounded-sm shadow-[0_0_10px_#7000ff]"></span>
          About the Event
        </h2>
        <p className="text-lg mb-6 text-gray-300 leading-relaxed font-light">
          Decode & Dominate is KIITFEST's premier coding competition where programmers battle through three intense rounds of challenges.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="cyber-feature-card group cursor-default">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
               <Clock className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">3 Rounds</h3>
            <p className="text-gray-400 text-sm">Quiz → Debugging → Web Cloning</p>
          </div>
          <div className="cyber-feature-card group cursor-default">
            <div className="bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors shadow-[0_0_15px_rgba(112,0,255,0.3)]">
               <Award className="w-8 h-8 text-secondary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">Certificates</h3>
            <p className="text-gray-400 text-sm">For all participants + Winners</p>
          </div>
          <div className="cyber-feature-card group cursor-default">
            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.3)]">
               <Users className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            </div>
            <h3 className="text-xl text-white mb-2 font-bold font-display">Team Event</h3>
            <p className="text-gray-400 text-sm">Compete with the best coders</p>
          </div>
        </div>
      </div>

      <div className="cyber-card backdrop-blur-xl">
        <h2 className="text-3xl text-secondary mb-10 font-bold font-display flex items-center">
          <span className="w-2 h-8 bg-secondary mr-4 rounded-sm shadow-[0_0_10px_#7000ff]"></span>
          Event Timeline
        </h2>
        <div className="relative pl-4">
          <div className="absolute left-[39px] top-0 h-full w-0.5 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30"></div>
          <div className="space-y-8 relative z-10">
            
            {/* Round 1 */}
            <div className="flex items-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-primary mr-6 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)] z-20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary font-bold font-display text-2xl">1</span>
              </div>
              <div className="flex-1 cyber-feature-card !text-left !p-6 hover:!translate-y-0 hover:!scale-[1.01] transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl text-primary font-bold font-display mb-1 group-hover:text-white transition-colors">Round 1 - FastTrack Quiz</h3>
                    <p className="text-gray-400 text-sm font-mono">25 Questions | 30 Minutes</p>
                  </div>
                  <Link href="/round1">
                    <button className="cyber-button text-sm py-2 px-6 flex items-center gap-2 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]">
                      Start <ChevronRight className="w-4 h-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Round 2 */}
            <div className="flex items-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-secondary mr-6 flex items-center justify-center shadow-[0_0_20px_rgba(112,0,255,0.4)] z-20 group-hover:scale-110 transition-transform duration-300">
                <span className="text-secondary font-bold font-display text-2xl">2</span>
              </div>
              <div className="flex-1 cyber-feature-card !text-left !p-6 hover:!translate-y-0 hover:!scale-[1.01] transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl text-secondary font-bold font-display mb-1 group-hover:text-white transition-colors">Round 2 - Code Debugging</h3>
                    <p className="text-gray-400 text-sm font-mono">60 Minutes | PDF Submission</p>
                  </div>
                   <Link href="/round2">
                    <button className="cyber-button-secondary text-sm py-2 px-6 opacity-80 hover:opacity-100 flex items-center gap-2 rounded-lg font-display tracking-wider uppercase">
                       Locked <Play className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Round 3 */}
            <div className="flex items-center group relative">
              <div className="w-16 h-16 rounded-full bg-black border-2 border-white/20 mr-6 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] z-20 group-hover:border-primary group-hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300">
                <span className="text-gray-500 group-hover:text-primary font-bold font-display text-2xl transition-colors">3</span>
              </div>
              <div className="flex-1 cyber-feature-card !text-left !p-6 hover:!translate-y-0 hover:!scale-[1.01] transition-all">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl text-gray-300 group-hover:text-primary font-bold font-display mb-1 transition-colors">Round 3 - Web Cloning</h3>
                    <p className="text-gray-400 text-sm font-mono">90 Minutes | GitHub Submission</p>
                  </div>
                   <Link href="/round3">
                    <button className="cyber-button-secondary text-sm py-2 px-6 opacity-50 hover:opacity-100 flex items-center gap-2 rounded-lg font-display tracking-wider uppercase cursor-not-allowed">
                       Locked <Play className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
