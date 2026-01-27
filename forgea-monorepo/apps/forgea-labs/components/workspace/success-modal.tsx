"use client";

import React from "react";
import { CheckCircle2, Copy, Download, X } from "lucide-react";

interface SuccessModalProps {
  onClose: () => void;
}

export function SuccessModal({ onClose }: SuccessModalProps) {
  const proofHash = "QmX7a9c2k3d5e8f1g4h6i9j2k5l8n1p4r7s0t3u6v9w2x5y8z";

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-emerald-500/30 rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-500" />
            <h2 className="text-base font-semibold text-gray-200">
              Signal Verified
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-black/50 border border-white/10 rounded p-3">
            <p className="text-xs text-gray-400 mb-2">
              Immutable Proof Artifact
            </p>
            <div className="font-mono text-xs text-gray-300 break-all mb-2">
              {proofHash}
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded text-xs bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-500/30">
                <Copy size={12} />
                Copy
              </button>
              <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1 rounded text-xs bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30 transition-colors border border-emerald-500/30">
                <Download size={12} />
                Download
              </button>
            </div>
          </div>

          <div className="text-xs text-gray-400 space-y-1">
            <p>✓ Code integrity verified</p>
            <p>✓ Dependencies analyzed</p>
            <p>✓ Constraints satisfied</p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-3 py-2 rounded text-xs font-medium bg-emerald-600 text-black hover:bg-emerald-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
