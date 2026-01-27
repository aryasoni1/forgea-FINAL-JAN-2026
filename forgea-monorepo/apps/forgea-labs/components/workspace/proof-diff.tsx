"use client";

import React, { useState } from "react";
import { X, ChevronLeft } from "lucide-react";

interface ProofDiffViewerProps {
  onClose: () => void;
}

const buggyCode = `useEffect(() => {
  fetchUser().then(setUser);
  setLoading(false);
});`;

const fixedCode = `useEffect(() => {
  fetchUser().then(setUser);
  setLoading(false);
}, []);`;

export function ProofDiffViewer({ onClose }: ProofDiffViewerProps) {
  const [activeTab, setActiveTab] = useState<"buggy" | "fixed">("buggy");

  return (
    <div className="flex flex-col h-full bg-black/50 border-t border-white/10">
      <div className="px-3 py-2 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
            Proof Diff Viewer
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-300 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      <div className="flex gap-2 px-3 py-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab("buggy")}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            activeTab === "buggy"
              ? "bg-rose-500/30 text-rose-300 border border-rose-500/50"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          Buggy Code
        </button>
        <button
          onClick={() => setActiveTab("fixed")}
          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
            activeTab === "fixed"
              ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
              : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          Fixed Code
        </button>
      </div>

      <div className="flex-1 overflow-auto p-3">
        <div className="font-mono text-xs leading-5">
          {activeTab === "buggy" ? (
            <div>
              <div className="text-gray-400 mb-2">
                ❌ Missing dependency array causes infinite loop:
              </div>
              <pre className="bg-rose-500/10 border border-rose-500/30 rounded p-2 text-rose-300 overflow-x-auto">
                {buggyCode}
              </pre>
            </div>
          ) : (
            <div>
              <div className="text-gray-400 mb-2">
                ✓ Added empty dependency array:
              </div>
              <pre className="bg-emerald-500/10 border border-emerald-500/30 rounded p-2 text-emerald-300 overflow-x-auto">
                {fixedCode}
              </pre>
            </div>
          )}
        </div>
      </div>

      <div className="px-3 py-2 border-t border-white/10 bg-black/30">
        <p className="text-xs text-gray-400">
          <span className="text-emerald-400 font-medium">Key Change:</span>{" "}
          Added empty dependency array to prevent infinite re-renders
        </p>
      </div>
    </div>
  );
}
