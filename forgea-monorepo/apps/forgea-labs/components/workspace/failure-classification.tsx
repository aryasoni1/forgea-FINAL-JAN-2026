"use client";

import React from "react";
import { AlertTriangle } from "lucide-react";

export function FailureClassification() {
  return (
    <div className="flex flex-col h-full bg-black/30">
      <div className="px-3 py-2 border-b border-white/10">
        <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle size={14} className="text-rose-500" />
          Failure Analysis
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs">
        <div className="border border-rose-500/30 rounded bg-rose-500/10 p-2">
          <div className="font-semibold text-rose-300 mb-1">
            Category: State Corruption
          </div>
          <div className="text-gray-400">
            Mutable state detected in re-render cycle
          </div>
        </div>

        <div className="border border-amber-500/30 rounded bg-amber-500/10 p-2">
          <div className="font-semibold text-amber-300 mb-1">
            Impact: Seniority Signal Degraded
          </div>
          <div className="text-gray-400">
            Code quality score reduced by 15 points
          </div>
        </div>

        <div className="border border-blue-500/30 rounded bg-blue-500/10 p-2">
          <div className="font-semibold text-blue-300 mb-1">Severity: High</div>
          <div className="text-gray-400">
            Requires immediate correction before merge
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-gray-400">Stack trace:</div>
          <pre className="text-xs font-mono bg-black/50 p-2 rounded border border-white/10 overflow-x-auto">
            {`Error: useEffect dependency array missing
  at useAuth (useAuth.ts:8:15)
  at App (App.tsx:3:12)`}
          </pre>
        </div>
      </div>
    </div>
  );
}
