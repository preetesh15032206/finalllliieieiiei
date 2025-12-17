import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/components/Dashboard";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Round1 from "@/pages/Round1";
import Round2 from "@/pages/Round2";
import Round3 from "@/pages/Round3";
import Admin from "@/pages/Admin";
import Background from "@/components/Background";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden bg-transparent text-white selection:bg-primary/30 font-sans">
      <Background />
      {/* Dashboard on the left - 25% width fixed, or adjust as needed */}
      <Dashboard />
      
      {/* Main Content Area - 75% width */}
      <main className="flex-1 overflow-y-auto p-8 relative z-10 scroll-smooth">
        <div className="max-w-6xl mx-auto pb-20">
          <Switch>
            <Route path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/round1" component={Round1}/>
            <Route path="/round2" component={Round2}/>
            <Route path="/round3" component={Round3}/>
            <Route path="/admin" component={Admin}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
