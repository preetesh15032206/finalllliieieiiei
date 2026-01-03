import { useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";

export function useAntiCheat() {
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.hidden) {
        await apiRequest("POST", "/api/violations", { type: "tab_switch" });
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = async (e: KeyboardEvent) => {
      // Prevent PrintScreen, F12, Ctrl+C, Ctrl+V
      if (
        e.key === "PrintScreen" ||
        e.keyCode === 44 ||
        (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "i" || e.key === "j"))
      ) {
        e.preventDefault();
        await apiRequest("POST", "/api/violations", { type: "shortcut_attempt" });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
