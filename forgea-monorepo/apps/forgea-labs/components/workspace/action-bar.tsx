"use client";

import React from "react";
import { Play, RotateCcw, CheckCircle2 } from "lucide-react";

interface WorkspaceActionBarProps {
  onVerify: () => void;
  onReset: () => void;
  onSubmitProof: () => void;
  isVerifying: boolean;
}

export function WorkspaceActionBar({
  onVerify,
  onReset,
  onSubmitProof,
  isVerifying,
}: WorkspaceActionBarProps) {
  return (
    <div className="h-13 border-b border-white/10 bg-black flex items-center justify-between px-4 gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-sm font-semibold text-gray-200">Forgea Lab</h1>
        <span className="text-xs text-gray-500">Cockpit v1.0</span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onVerify}
          disabled={isVerifying}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium bg-emerald-600 text-black hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Play size={14} />
          Verify Now
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
        >
          <RotateCcw size={14} />
          Reset Instance
        </button>

        <button
          onClick={onSubmitProof}
          className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
        >
          <CheckCircle2 size={14} />
          Submit Proof
        </button>
      </div>
    </div>
  );
}
