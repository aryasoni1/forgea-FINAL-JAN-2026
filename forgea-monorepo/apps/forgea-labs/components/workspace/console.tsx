"use client";

import React, { useEffect, useRef } from "react";
import { Terminal } from "lucide-react";

interface ConsoleLog {
  type: "scanning" | "complete" | "error";
  message: string;
}

interface TruthMachineConsoleProps {
  logs: ConsoleLog[];
}

export function TruthMachineConsole({ logs }: TruthMachineConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogColor = (type: ConsoleLog["type"]) => {
    switch (type) {
      case "scanning":
        return "text-amber-400";
      case "complete":
        return "text-emerald-400";
      case "error":
        return "text-rose-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/50">
      <div className="px-3 py-2 border-b border-white/10 flex items-center gap-2">
        <Terminal size={14} className="text-gray-400" />
        <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
          Verifier Logs
        </h2>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent p-3"
      >
        {logs.length === 0 ? (
          <div className="text-xs text-gray-500">
            Ready for verification. Click "Verify Now" to begin.
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, idx) => (
              <div
                key={idx}
                className={`font-mono text-xs ${getLogColor(log.type)}`}
              >
                {log.message}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
