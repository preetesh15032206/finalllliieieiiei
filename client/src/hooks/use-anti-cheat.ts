import { useEffect, useRef } from "react";
import { apiRequest } from "@/lib/queryClient";

export function useAntiCheat() {
  // simple throttling map to avoid spamming events
  const lastEventRef = useRef<Record<string, number>>({});
  const THROTTLE_MS = 2000;

  useEffect(() => {
    const shouldThrottle = (key: string) => {
      const now = Date.now();
      const last = lastEventRef.current[key] || 0;
      if (now - last < THROTTLE_MS) return true;
      lastEventRef.current[key] = now;
      return false;
    };

    // Batching queue to reduce network chatter
    const queueRef = { current: [] as Array<any> };
    const FLUSH_MS = 3000;
    const MAX_BATCH = 10;

    const severityFor = (type: string, details: Record<string, any>) => {
      switch (type) {
        case "paste":
          if ((details.length || 0) > 100) return "high";
          if ((details.length || 0) > 20) return "warning";
          return "info";
        case "copy":
          if ((details.length || 0) > 200) return "warning";
          return "info";
        case "cut":
          return "warning";
        case "tab_switch":
          return "warning";
        case "window_blur":
          return "info";
        case "shortcut_attempt":
          {
            const k = (details.key || "").toString().toLowerCase();
            if (k.includes("printscreen") || k === "printscreen") return "high";
            return "warning";
          }
        default:
          return "info";
      }
    };

    const flushQueue = async () => {
      const q = queueRef.current;
      if (!q.length) return;
      try {
        await apiRequest("POST", "/api/violations", q.slice());
        queueRef.current = [];
      } catch (e) {
        // keep events in queue for next flush attempt
      }
    };

    const enqueueEvent = (event: any) => {
      queueRef.current.push(event);
      if (queueRef.current.length >= MAX_BATCH) {
        void flushQueue();
      }
    };

    const flushInterval = setInterval(flushQueue, FLUSH_MS);

    const safePost = async (type: string, details: Record<string, any> = {}) => {
      if (shouldThrottle(type + JSON.stringify(details))) return;
      const severity = severityFor(type, details);
      enqueueEvent({ type, details, severity });
    };

    const handleVisibilityChange = async () => {
      if (document.hidden) {
        await safePost("tab_switch");
      }
    };

    const handleContextMenu = async (e: MouseEvent) => {
      e.preventDefault();
      await safePost("right_click");
    };

    const handleKeyDown = async (e: KeyboardEvent) => {
      // Prevent PrintScreen, F12, Ctrl+C, Ctrl+V
      if (
        e.key === "PrintScreen" ||
        e.keyCode === 44 ||
        (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "i" || e.key === "j"))
      ) {
        e.preventDefault();
        await safePost("shortcut_attempt", { key: e.key });
      }
    };

    const handleCopy = async () => {
      const selected = (window.getSelection && window.getSelection()?.toString()) || "";
      await safePost("copy", { length: selected.length });
    };

    const handleCut = async () => {
      const selected = (window.getSelection && window.getSelection()?.toString()) || "";
      await safePost("cut", { length: selected.length });
    };

    const handlePaste = async (e: ClipboardEvent) => {
      const pasted = e.clipboardData?.getData("text") || "";
      await safePost("paste", { length: pasted.length });
    };

    const handleBlur = async () => {
      await safePost("window_blur");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("copy", handleCopy);
    document.addEventListener("cut", handleCut);
    document.addEventListener("paste", handlePaste);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("copy", handleCopy);
      document.removeEventListener("cut", handleCut);
      document.removeEventListener("paste", handlePaste);
      window.removeEventListener("blur", handleBlur);

      clearInterval(flushInterval);
      // try to flush any remaining events
      void flushQueue();
    };
  }, []);
}
