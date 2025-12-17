import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProctoringOptions {
  enableTabDetection?: boolean;
  enableCopyPasteProtection?: boolean;
  enableRightClickProtection?: boolean;
  enableScreenshotDetection?: boolean;
}

export function useProctoring(options: ProctoringOptions = {}) {
  const { toast } = useToast();
  const [violations, setViolations] = useState<string[]>([]);
  const isProtectorEnabled = localStorage.getItem("protector_mode") === "true";

  useEffect(() => {
    if (!isProtectorEnabled) return;

    // Tab Switching / Visibility Change
    const handleVisibilityChange = () => {
      if (document.hidden && options.enableTabDetection) {
        const msg = `Tab switch detected at ${new Date().toLocaleTimeString()}`;
        setViolations((prev) => [...prev, msg]);
        toast({
          variant: "destructive",
          title: "⚠️ Security Violation",
          description: "Tab switching is prohibited. This incident has been logged.",
        });
      }
    };

    // Window Blur (Alt+Tab, clicking outside)
    const handleBlur = () => {
      if (options.enableTabDetection) {
        const msg = `Window focus lost at ${new Date().toLocaleTimeString()}`;
        setViolations((prev) => [...prev, msg]);
        // Optional: less aggressive toast for blur vs hidden
      }
    };

    // Copy / Cut / Paste
    const handleCopyPaste = (e: ClipboardEvent) => {
      if (options.enableCopyPasteProtection) {
        e.preventDefault();
        toast({
          variant: "destructive",
          title: "🚫 Action Blocked",
          description: "Copy/Paste is disabled in Proctor Mode.",
        });
      }
    };

    // Right Click
    const handleContextMenu = (e: MouseEvent) => {
      if (options.enableRightClickProtection) {
        e.preventDefault();
        toast({
          variant: "destructive",
          title: "🚫 Action Blocked",
          description: "Right-click context menu is disabled.",
        });
      }
    };

    // Screenshot Attempt (PrintScreen key)
    const handleKeyUp = (e: KeyboardEvent) => {
      if (options.enableScreenshotDetection && e.key === "PrintScreen") {
        const msg = `Screenshot attempt detected at ${new Date().toLocaleTimeString()}`;
        setViolations((prev) => [...prev, msg]);
        toast({
          variant: "destructive",
          title: "📸 Screenshot Detected",
          description: "Taking screenshots is a violation of exam rules.",
        });
        
        // Obscure screen temporarily (visual deterrent)
        document.body.style.filter = "blur(20px)";
        setTimeout(() => {
          document.body.style.filter = "none";
        }, 3000);
      }
    };

    // Event Listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("copy", handleCopyPaste);
    document.addEventListener("cut", handleCopyPaste);
    document.addEventListener("paste", handleCopyPaste);
    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("copy", handleCopyPaste);
      document.removeEventListener("cut", handleCopyPaste);
      document.removeEventListener("paste", handleCopyPaste);
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keyup", handleKeyUp);
      document.body.style.filter = "none"; // Cleanup
    };
  }, [isProtectorEnabled, options, toast]);

  return { violations, isProtectorEnabled };
}
