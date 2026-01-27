"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

interface MonacoEditorProps {
  selectedFile: string | null;
  isLocked: boolean;
}

const codeExamples: Record<string, string> = {
  "src/hooks/useAuth.ts": `import { useState, useEffect } from 'react';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // BUG: useEffect without dependency array
    fetchUser().then(setUser);
    setLoading(false);
  });

  return { user, loading };
}

async function fetchUser() {
  const res = await fetch('/api/user');
  return res.json();}`,

  "src/hooks/useForm.ts": `import { useState } from 'react';

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return { values, handleChange };
}`,

  "src/components/Button.tsx": `export function Button({ children, onClick, variant = 'primary' }) {
  return (
    <button
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
    >
      {children}
    </button>
  );
}`,

  "package.json": `{
  "name": "forgea-lab",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "jest"
  },
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0"
  }
}`,
};

export function MonacoEditor({ selectedFile, isLocked }: MonacoEditorProps) {
  const code = selectedFile
    ? codeExamples[selectedFile] || "// File not found"
    : "// Select a file to view code";

  const lines = code.split("\n");
  const breadcrumbs = selectedFile?.split("/") || ["Select a file"];

  return (
    <div
      className={`flex flex-col flex-1 bg-black ${isLocked ? "opacity-50" : ""}`}
    >
      {/* Breadcrumbs */}
      <div className="px-4 py-2 border-b border-white/10 flex items-center gap-1.5 bg-black/50">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <ChevronRight size={14} className="text-gray-500" />}
            <span className="text-xs text-gray-400 hover:text-gray-300 cursor-pointer">
              {crumb}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Line Numbers */}
        <div className="w-12 bg-black/30 border-r border-white/10 px-2 py-4 text-right font-mono text-xs text-gray-600 overflow-y-auto">
          {lines.map((_, idx) => (
            <div key={idx} className="h-5">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Code */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="font-mono text-xs leading-5 text-gray-300 whitespace-pre-wrap break-words">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded pointer-events-none">
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-200">
              Verification in Progress
            </div>
            <div className="text-xs text-gray-400 mt-1">Editor is locked</div>
          </div>
        </div>
      )}
    </div>
  );
}
