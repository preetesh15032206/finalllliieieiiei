import { Shield, LogIn, UserPlus, Trash2, Key, Users as UsersIcon, Activity, Lock, Unlock } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { User, InsertUser } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function Admin() {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<Partial<InsertUser>>({
    role: "participant",
    round1Access: false,
    round2Access: false,
    round3Access: false,
  });

  const { data: me } = useQuery<User>({ queryKey: ["/api/me"] });
  const { data: users, isLoading: loadingUsers } = useQuery<User[]>({ 
    queryKey: ["/api/admin/users"],
    enabled: me?.role === "admin"
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return res.json();
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["/api/me"], user);
      toast({ title: "Authenticated", description: `Welcome back, ${user.username}` });
    },
    onError: () => toast({ title: "Error", description: "Invalid credentials", variant: "destructive" }),
  });

  const createUserMutation = useMutation({
    mutationFn: async (user: InsertUser) => {
      const res = await apiRequest("POST", "/api/admin/users", user);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      setIsAddingUser(false);
      toast({ title: "User Created", description: "Participant added to system." });
      setNewUser({
        role: "participant",
        round1Access: false,
        round2Access: false,
        round3Access: false,
      });
    },
  });

  const updateAccessMutation = useMutation({
    mutationFn: async ({ id, round, access }: { id: string, round: string, access: boolean }) => {
      await apiRequest("PATCH", `/api/admin/users/${id}/access`, { round, access });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }),
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/users/${id}`);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] }),
  });

  if (!me || me.role !== "admin") {
    return (
      <div className="min-h-[80vh] flex items-center justify-center animate-in fade-in duration-700">
        <div className="w-full max-w-md p-8 border border-red-500/30 rounded-lg bg-black/40 backdrop-blur-xl">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white font-display tracking-wider">ADMIN ACCESS</h1>
            <p className="text-gray-400 font-mono text-sm mt-2">RESTRICTED AREA</p>
          </div>
          <form onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate({ username: "admin", password });
          }} className="space-y-6">
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
              disabled={loginMutation.isPending}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold tracking-widest font-display h-12"
            >
              <LogIn className="w-4 h-4 mr-2" />
              {loginMutation.isPending ? "VERIFYING..." : "AUTHENTICATE"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 max-w-6xl mx-auto space-y-10">
      <div className="text-center relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[100%] bg-red-500/10 blur-[100px] rounded-full -z-10"></div>
         <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-display uppercase tracking-wider flex items-center justify-center gap-4">
            <Shield className="w-10 h-10 text-red-500" />
            Admin Control
         </h1>
         <p className="text-gray-400 font-mono">SYSTEM_ADMIN_ACCESS_LEVEL_5</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg bg-black/40 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 bg-primary/20 rounded border border-primary/30">
            <UsersIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-mono">TOTAL_USERS</div>
            <div className="text-2xl font-bold text-white font-display">{users?.length || 0}</div>
          </div>
        </div>
        <div className="p-6 border rounded-lg bg-black/40 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 bg-secondary/20 rounded border border-secondary/30">
            <Activity className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-mono">ACTIVE_SYSTEMS</div>
            <div className="text-2xl font-bold text-white font-display">ONLINE</div>
          </div>
        </div>
        <div className="p-6 border rounded-lg bg-black/40 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 bg-red-500/20 rounded border border-red-500/30">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="text-xs text-gray-500 font-mono">SECURITY_LEVEL</div>
            <div className="text-2xl font-bold text-white font-display">MAXIMUM</div>
          </div>
        </div>
      </div>

      <div className="p-8 border rounded-lg bg-black/40 backdrop-blur-xl">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl text-white font-bold font-display flex items-center gap-3">
            <UsersIcon className="w-6 h-6 text-primary" />
            User Management
          </h2>
          <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/80 text-black font-bold h-10 px-6">
                <UserPlus className="w-4 h-4 mr-2" />
                CREATE USER
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/95 border border-primary/30 text-white">
              <DialogHeader>
                <DialogTitle className="text-2xl font-display text-primary">NEW PARTICIPANT</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <Input 
                  placeholder="Username" 
                  value={newUser.username || ""} 
                  onChange={e => setNewUser({...newUser, username: e.target.value})}
                  className="bg-black/50 border-white/10"
                />
                <Input 
                  placeholder="Password" 
                  type="password"
                  value={newUser.password || ""} 
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                  className="bg-black/50 border-white/10"
                />
                <Input 
                  placeholder="Team Name" 
                  value={newUser.teamName || ""} 
                  onChange={e => setNewUser({...newUser, teamName: e.target.value})}
                  className="bg-black/50 border-white/10"
                />
                <Input 
                  placeholder="Team ID" 
                  value={newUser.teamId || ""} 
                  onChange={e => setNewUser({...newUser, teamId: e.target.value})}
                  className="bg-black/50 border-white/10"
                />
                <Button 
                  onClick={() => createUserMutation.mutate(newUser as InsertUser)}
                  className="w-full bg-primary hover:bg-primary/80 text-black font-bold"
                  disabled={createUserMutation.isPending}
                >
                  INITIALIZE ACCOUNT
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-lg border border-white/5 overflow-hidden">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="text-gray-400 font-mono uppercase text-xs">User/Team</TableHead>
                <TableHead className="text-gray-400 font-mono uppercase text-xs text-center">Round 1</TableHead>
                <TableHead className="text-gray-400 font-mono uppercase text-xs text-center">Round 2</TableHead>
                <TableHead className="text-gray-400 font-mono uppercase text-xs text-center">Round 3</TableHead>
                <TableHead className="text-gray-400 font-mono uppercase text-xs text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loadingUsers ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10 animate-pulse">SYNCING DATA...</TableCell></TableRow>
              ) : (
                users?.filter(u => u.role !== "admin").map((user) => (
                  <TableRow key={user.id} className="border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell>
                      <div className="font-bold text-white">{user.username}</div>
                      <div className="text-xs text-gray-500 font-mono uppercase">{user.teamName} ({user.teamId})</div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={user.round1Access}
                        onCheckedChange={(checked) => updateAccessMutation.mutate({ id: user.id, round: "round1", access: checked })}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={user.round2Access}
                        onCheckedChange={(checked) => updateAccessMutation.mutate({ id: user.id, round: "round2", access: checked })}
                      />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch 
                        checked={user.round3Access}
                        onCheckedChange={(checked) => updateAccessMutation.mutate({ id: user.id, round: "round3", access: checked })}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-400 hover:bg-red-500/10"
                        onClick={() => deleteUserMutation.mutate(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
