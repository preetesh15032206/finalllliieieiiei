import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Link as LinkIcon, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  roundNumber: number;
  type: "pdf" | "repo";
}

export function SubmissionModal({ isOpen, onClose, roundNumber, type }: SubmissionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  
  // Mock form state
  const [participantId, setParticipantId] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [repoLink, setRepoLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation (Mock)
    if (!participantId) {
      toast({ variant: "destructive", title: "Error", description: "Participant ID is required" });
      setIsSubmitting(false);
      return;
    }

    if (type === "pdf" && !file) {
        toast({ variant: "destructive", title: "Error", description: "Please upload a PDF file" });
        setIsSubmitting(false);
        return;
    }

    if (type === "repo" && !repoLink.startsWith("http")) {
        toast({ variant: "destructive", title: "Error", description: "Please enter a valid URL" });
        setIsSubmitting(false);
        return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      toast({
        title: "Submission Successful",
        description: `Your ${type === 'pdf' ? 'PDF' : 'Repository'} has been securely submitted.`,
      });
    }, 2000);
  };

  const handleReset = () => {
      setIsSuccess(false);
      setParticipantId("");
      setFile(null);
      setRepoLink("");
      onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="bg-[#0a0c10] border border-white/10 text-white sm:max-w-md backdrop-blur-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-display tracking-wide flex items-center gap-2">
            {type === "pdf" ? <Upload className="w-5 h-5 text-primary" /> : <LinkIcon className="w-5 h-5 text-primary" />}
            Round {roundNumber} Submission
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {type === "pdf" 
              ? "Upload your debugged solution PDF. Max size 5MB." 
              : "Submit your public GitHub repository link."}
          </DialogDescription>
        </DialogHeader>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="pid" className="text-sm font-mono text-gray-400">PARTICIPANT ID</Label>
              <Input 
                id="pid" 
                placeholder="Enter your ID (e.g. D&D-2025-001)" 
                className="bg-black/50 border-white/10 focus:border-primary text-white font-mono"
                value={participantId}
                onChange={(e) => setParticipantId(e.target.value)}
              />
            </div>

            {type === "pdf" ? (
              <div className="space-y-2">
                <Label htmlFor="file" className="text-sm font-mono text-gray-400">SOLUTION PDF</Label>
                <div className="border-2 border-dashed border-white/10 rounded-lg p-6 hover:border-primary/50 transition-colors bg-white/5 text-center cursor-pointer relative">
                    <input 
                        type="file" 
                        id="file" 
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {file ? (
                        <div className="flex items-center justify-center gap-2 text-primary">
                            <FileTextIcon className="w-4 h-4" />
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-gray-500">
                            <Upload className="w-8 h-8 opacity-50" />
                            <span className="text-xs uppercase tracking-widest">Click to Upload PDF</span>
                        </div>
                    )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="repo" className="text-sm font-mono text-gray-400">REPOSITORY URL</Label>
                <Input 
                  id="repo" 
                  placeholder="https://github.com/username/project" 
                  className="bg-black/50 border-white/10 focus:border-primary text-white font-mono"
                  value={repoLink}
                  onChange={(e) => setRepoLink(e.target.value)}
                />
              </div>
            )}

            <DialogFooter>
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onClose}
                className="hover:bg-white/5 text-gray-400 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-black transition-all font-bold tracking-wide"
              >
                {isSubmitting ? (
                    <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    "Confirm Submission"
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="py-10 flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4 border border-green-500/20">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Submission Received!</h3>
            <p className="text-gray-400 max-w-xs mx-auto mb-6">
              Your submission has been securely recorded in our database.
            </p>
            <Button 
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 text-white"
            >
                Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FileTextIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" x2="8" y1="13" y2="13" />
        <line x1="16" x2="8" y1="17" y2="17" />
        <line x1="10" x2="8" y1="9" y2="9" />
      </svg>
    )
  }
