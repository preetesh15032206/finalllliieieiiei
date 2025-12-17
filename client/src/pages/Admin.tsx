import { Shield, Lock, Unlock, AlertTriangle, Save, CheckCircle, LogIn } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { toast } = useToast();
  const [isProtectorEnabled, setIsProtectorEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  // Load initial state
  useEffect(() => {
    const savedState = localStorage.getItem("protector_mode");
    setIsProtectorEnabled(savedState === "true");
    setLoading(false);
  }, []);

  const handleToggle = (checked: boolean) => {
    setIsProtectorEnabled(checked);
    localStorage.setItem("protector_mode", String(checked));
    
    toast({
      title: checked ? "Protector Mode ENABLED" : "Protector Mode DISABLED",
      description: checked 
        ? "All secure exam restrictions are now active globally." 
        : "Exam restrictions have been lifted.",
      variant: checked ? "default" : "destructive", // Visual cue
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Preetesh@15") {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome to the Admin Control Panel.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Incorrect password.",
        variant: "destructive",
      });
    }
  };

  if (loading) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in duration-700">
        <div className="cyber-card w-full max-w-md backdrop-blur-xl border-red-500/30">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-display tracking-wider">ADMIN ACCESS</h1>
            <p className="text-gray-400 font-mono text-sm mt-2">RESTRICTED AREA</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter Admin Password"
                className="bg-black/50 border-white/10 focus:border-red-500 text-white font-mono text-center"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest font-display"
            >
              <LogIn className="w-4 h-4 mr-2" />
              AUTHENTICATE
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 max-w-4xl mx-auto">
      <div className="text-center mb-10 relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[100%] bg-red-500/10 blur-[100px] rounded-full -z-10"></div>
         <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display uppercase tracking-wider flex items-center justify-center gap-4">
            <Shield className="w-10 h-10 text-red-500" />
            Admin <span className="text-red-500 glitch-text" data-text="Control">Control</span>
         </h1>
         <p className="text-gray-400 font-mono">SYSTEM_ADMIN_ACCESS_LEVEL_5</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Protector Control */}
        <div className="cyber-card backdrop-blur-xl !border-red-500/30">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl text-white font-bold font-display flex items-center gap-3">
              {isProtectorEnabled ? <Lock className="w-6 h-6 text-green-400" /> : <Unlock className="w-6 h-6 text-red-400" />}
              Proctoring System
            </h2>
            <div className={`px-3 py-1 rounded border font-mono text-xs font-bold tracking-widest uppercase ${isProtectorEnabled ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-red-500/20 border-red-500 text-red-400'}`}>
                {isProtectorEnabled ? 'ACTIVE' : 'INACTIVE'}
            </div>
          </div>
          
          <p className="text-gray-400 mb-8 leading-relaxed">
            Global switch for exam security protocols. When enabled, all participant clients will enforce:
          </p>
          
          <ul className="space-y-3 mb-8 text-sm text-gray-300 font-mono">
            <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-red-500" /> Tab Switch Detection</li>
            <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-red-500" /> Copy/Paste Prevention</li>
            <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-red-500" /> Right-Click Block</li>
            <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-3 text-red-500" /> Screenshot Monitoring</li>
          </ul>

          <div className="flex items-center justify-between bg-black/40 p-4 rounded-lg border border-white/5">
            <span className="font-bold text-white tracking-wide">Toggle Protector Mode</span>
            <Switch 
                checked={isProtectorEnabled}
                onCheckedChange={handleToggle}
                className="data-[state=checked]:bg-red-600"
            />
          </div>
        </div>

        {/* System Logs (Mock) */}
        <div className="cyber-card backdrop-blur-xl">
           <h2 className="text-2xl text-secondary mb-6 font-bold font-display flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-secondary" />
              Live Security Logs
           </h2>
           <div className="bg-black/60 rounded-lg p-4 h-[300px] overflow-y-auto font-mono text-xs space-y-2 border border-white/10 shadow-inner">
             <div className="text-gray-500 border-b border-gray-800 pb-2 mb-2">STREAM_ESTABLISHED_SECURE_CHANNEL...</div>
             <div className="text-green-400">[10:00:01] System initialized</div>
             <div className="text-gray-400">[10:05:23] Admin login detected (IP: 192.168.1.1)</div>
             {isProtectorEnabled && (
                <>
                    <div className="text-yellow-500">[10:15:42] WARN: Global Proctoring Enabled</div>
                    <div className="text-red-400 animate-pulse">[10:16:05] ALERT: Participant_004 Tab Switch Violation</div>
                    <div className="text-red-400">[10:18:12] ALERT: Participant_012 Copy Attempt Blocked</div>
                </>
             )}
             <div className="text-gray-500 animate-pulse">_</div>
           </div>
        </div>
      </div>
    </div>
  );
}
