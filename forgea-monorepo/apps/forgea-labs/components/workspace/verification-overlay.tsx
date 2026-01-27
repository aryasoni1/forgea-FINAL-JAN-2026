"use client";

import React, { useEffect, useState } from "react";

export function VerificationOverlay() {
  const [dots, setDots] = useState(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "." : prev + "."));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-black border border-white/10 rounded p-6 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        </div>
        <h3 className="text-sm font-semibold text-gray-200 mb-1">
          System Analyzing
        </h3>
        <p className="text-xs text-gray-400">Verifying code integrity{dots}</p>
      </div>
    </div>
  );
}
