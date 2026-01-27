"use client";

import React from "react";
import { AlertCircle, ChevronDown } from "lucide-react";

interface IncidentTicketDrawerProps {
  onShowDiff: () => void;
}

export function IncidentTicketDrawer({
  onShowDiff,
}: IncidentTicketDrawerProps) {
  return (
    <div className="flex flex-col h-1/2 border-b border-white/10 bg-black/30 overflow-hidden">
      <div className="px-3 py-2 border-b border-white/10">
        <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
          Incident Ticket
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <AlertCircle size={14} className="text-rose-500" />
            <h3 className="text-xs font-semibold text-gray-200">Severity</h3>
          </div>
          <div className="text-xs bg-rose-500/20 text-rose-300 px-2 py-1 rounded w-fit">
            Critical
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-200 mb-1">
            Detected Symptoms
          </h3>
          <ul className="text-xs text-gray-400 space-y-1 ml-2">
            <li>• Missing dependency array in useEffect</li>
            <li>• Potential infinite loop detected</li>
            <li>• State mutation in re-render</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-200 mb-1">
            Constraints
          </h3>
          <div className="text-xs bg-amber-500/20 text-amber-300 p-2 rounded space-y-1">
            <div>✗ Do not use useEffect without dependencies</div>
            <div>✗ Avoid direct state mutations</div>
            <div>✓ Use React best practices</div>
          </div>
        </div>

        <button
          onClick={onShowDiff}
          className="w-full mt-3 px-3 py-1.5 rounded text-xs font-medium bg-blue-600/20 text-blue-300 hover:bg-blue-600/30 transition-colors border border-blue-500/30"
        >
          View Proof Diff
        </button>
      </div>
    </div>
  );
}
