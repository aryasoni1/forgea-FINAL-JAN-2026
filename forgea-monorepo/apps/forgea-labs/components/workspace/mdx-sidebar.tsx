"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export function MDXLessonSidebar() {
  return (
    <div className="flex flex-col h-full bg-black/30">
      <div className="px-3 py-2 border-b border-white/10">
        <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider flex items-center gap-2">
          <BookOpen size={14} />
          Lab Guide
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs text-gray-400">
        <div>
          <h3 className="font-semibold text-gray-200 mb-1">
            Task: Fix useAuth Hook
          </h3>
          <p className="leading-relaxed">
            Your task is to identify and fix the React Hook violations in the
            useAuth.ts file.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-200 mb-1">Key Concepts</h3>
          <ul className="space-y-1 ml-2">
            <li>• useEffect dependency arrays are required</li>
            <li>• Avoid infinite render cycles</li>
            <li>• State should be immutable</li>
          </ul>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/30 rounded p-2">
          <p className="text-blue-300">
            <strong>Hint:</strong> Check the useEffect hook for missing
            dependencies or logic errors.
          </p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded p-2">
          <p className="text-emerald-300">
            <strong>Success:</strong> Once fixed, the Verifier will detect the
            correct pattern.
          </p>
        </div>

        <div className="text-center mt-4 text-gray-500 text-xs">
          Level: Intermediate | Estimated Time: 5 min
        </div>
      </div>
    </div>
  );
}
