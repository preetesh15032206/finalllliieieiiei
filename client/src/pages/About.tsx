import { Mail, Phone, MapPin, Instagram, Twitter, Linkedin, Github, Users, Trophy, Wallet } from "lucide-react";

export default function About() {
  const team = [
    { name: "ARJUN SHARMA", role: "Event Coordinator", desc: "Leads the technical team and event planning", img: "https://enzostvs-cached-generation.hf.space/generate/tech-team-lead-cyber-themed?format=square" },
    { name: "PRIYA PATEL", role: "Technical Head", desc: "Manages platform development and security", img: "https://enzostvs-cached-generation.hf.space/generate/female-web-developer-cyber-punk?format=square" },
    { name: "RAJIV MEHTA", role: "Security Lead", desc: "Implements anti-cheat measures and monitoring", img: "https://enzostvs-cached-generation.hf.space/generate/cyber-security-expert-with-glasses?format=square" },
    { name: "NEHA GUPTA", role: "Design Lead", desc: "Creates the cyber-themed interface and experience", img: "https://enzostvs-cached-generation.hf.space/generate/ui-ux-designer-cyber-theme?format=square" },
    { name: "AMIT KUMAR", role: "Backend Developer", desc: "Handles server infrastructure and API development", img: "https://enzostvs-cached-generation.hf.space/generate/backend-developer-server-room?format=square" },
    { name: "SANA KHAN", role: "Event Manager", desc: "Coordinates participants and event logistics", img: "https://enzostvs-cached-generation.hf.space/generate/event-organizer-cyber-punk?format=square" },
  ];

  return (
    <div className="animate-in fade-in duration-700">
       <div className="text-center mb-10 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[150%] bg-secondary/5 blur-[80px] rounded-full -z-10"></div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white font-display uppercase tracking-wider">
          Meet The <span className="text-primary glitch-text" data-text="Team">Team</span>
        </h1>
        <div className="h-1 w-24 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto"></div>
      </div>

      <div className="cyber-card mb-8 backdrop-blur-xl">
        <h2 className="text-2xl text-secondary mb-4 font-bold font-display flex items-center">
           <Users className="w-6 h-6 mr-3 text-secondary" />
           About KIITFEST
        </h2>
        <p className="text-lg mb-8 text-gray-300 font-light leading-relaxed">
          KIITFEST is the annual techno-management fest of Kalinga Institute of Industrial Technology,
          one of India's premier universities. Decode & Dominate is our flagship coding competition
          designed to challenge and inspire the next generation of programmers.
        </p>
        <div className="flex flex-wrap items-center justify-around gap-8 border-t border-white/10 pt-8">
          <div className="text-center group">
            <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
               <Users className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl text-white font-bold mb-1 font-display">500+</div>
            <div className="text-gray-400 text-xs uppercase tracking-widest font-mono">Participants</div>
          </div>
          <div className="text-center group">
            <div className="bg-secondary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-secondary/20 transition-colors shadow-[0_0_15px_rgba(112,0,255,0.2)]">
               <Trophy className="w-8 h-8 text-secondary" />
            </div>
            <div className="text-3xl text-white font-bold mb-1 font-display">3</div>
            <div className="text-gray-400 text-xs uppercase tracking-widest font-mono">Intense Rounds</div>
          </div>
          <div className="text-center group">
            <div className="bg-primary/10 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors shadow-[0_0_15px_rgba(0,240,255,0.2)]">
               <Wallet className="w-8 h-8 text-primary" />
            </div>
            <div className="text-3xl text-white font-bold mb-1 font-display">₹50K</div>
            <div className="text-gray-400 text-xs uppercase tracking-widest font-mono">Prize Pool</div>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {team.map((member, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-2xl text-center hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-300 group backdrop-blur-md relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 pointer-events-none"></div>
            
            <div className="mx-auto mb-6 relative z-10">
              <div className="w-32 h-32 rounded-full border-2 border-primary/50 mx-auto overflow-hidden relative z-10 group-hover:border-primary transition-colors shadow-[0_0_20px_rgba(0,240,255,0.2)]">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-110 group-hover:scale-125 transition-transform opacity-0 group-hover:opacity-40"></div>
            </div>
            <div className="relative z-10">
               <h3 className="text-xl text-white font-bold mb-1 font-display tracking-wide group-hover:text-primary transition-colors">{member.name}</h3>
               <p className="text-secondary font-mono text-sm mb-3 uppercase tracking-widest">{member.role}</p>
               <p className="text-sm text-gray-400 font-light">{member.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Information */}
      <div className="cyber-card backdrop-blur-xl">
        <h2 className="text-2xl text-secondary mb-6 font-bold font-display">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg text-white mb-4 font-bold font-display uppercase tracking-wider">Event Details</h3>
            <div className="space-y-4">
              <div className="flex items-center text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <Mail className="w-5 h-5 text-primary mr-3" />
                <span className="font-mono text-sm">codeglitch@kiitfest.org</span>
              </div>
              <div className="flex items-center text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <Phone className="w-5 h-5 text-primary mr-3" />
                <span className="font-mono text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-primary/30 transition-colors">
                <MapPin className="w-5 h-5 text-primary mr-3" />
                <span className="font-mono text-sm">KIIT University, Bhubaneswar</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg text-white mb-4 font-bold font-display uppercase tracking-wider">Follow KIITFEST</h3>
            <div className="flex gap-4">
              {[Instagram, Twitter, Linkedin, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-lg border border-white/10 hover:border-primary hover:text-primary hover:bg-primary/10 text-gray-400 transition-all bg-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
