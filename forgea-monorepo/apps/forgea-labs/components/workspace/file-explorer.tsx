"use client";

import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FileText,
  Code2,
} from "lucide-react";

interface FileExplorerProps {
  selectedFile: string | null;
  onSelectFile: (file: string) => void;
}

interface FileNode {
  name: string;
  type: "folder" | "file";
  path: string;
  children?: FileNode[];
}

const fileStructure: FileNode[] = [
  {
    name: "src",
    type: "folder",
    path: "src",
    children: [
      {
        name: "hooks",
        type: "folder",
        path: "src/hooks",
        children: [
          { name: "useAuth.ts", type: "file", path: "src/hooks/useAuth.ts" },
          { name: "useForm.ts", type: "file", path: "src/hooks/useForm.ts" },
          { name: "useApi.ts", type: "file", path: "src/hooks/useApi.ts" },
        ],
      },
      {
        name: "components",
        type: "folder",
        path: "src/components",
        children: [
          {
            name: "Button.tsx",
            type: "file",
            path: "src/components/Button.tsx",
          },
          { name: "Modal.tsx", type: "file", path: "src/components/Modal.tsx" },
        ],
      },
      {
        name: "utils",
        type: "folder",
        path: "src/utils",
        children: [
          { name: "helpers.ts", type: "file", path: "src/utils/helpers.ts" },
        ],
      },
    ],
  },
  {
    name: "package.json",
    type: "file",
    path: "package.json",
  },
];

function FileItem({
  node,
  level,
  selectedFile,
  onSelectFile,
}: {
  node: FileNode;
  level: number;
  selectedFile: string | null;
  onSelectFile: (file: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const isSelected = selectedFile === node.path;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1 text-xs cursor-pointer group transition-colors ${
          isSelected
            ? "bg-white/10 text-emerald-400"
            : "text-gray-400 hover:bg-white/5"
        }`}
        onClick={() => {
          if (node.type === "folder") {
            setIsExpanded(!isExpanded);
          } else {
            onSelectFile(node.path);
          }
        }}
        style={{ paddingLeft: `${12 + level * 12}px` }}
      >
        {node.type === "folder" ? (
          <>
            {isExpanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
            <Folder size={14} className="text-amber-500/70" />
          </>
        ) : (
          <>
            <div className="w-3.5" />
            <Code2 size={14} className="text-blue-400/70" />
          </>
        )}
        <span className="truncate">{node.name}</span>
      </div>

      {node.type === "folder" && isExpanded && node.children && (
        <div>
          {node.children.map((child) => (
            <FileItem
              key={child.path}
              node={child}
              level={level + 1}
              selectedFile={selectedFile}
              onSelectFile={onSelectFile}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function FileExplorer({
  selectedFile,
  onSelectFile,
}: FileExplorerProps) {
  return (
    <div className="flex flex-col h-1/2 border-b border-white/10 bg-black">
      <div className="px-3 py-2 border-b border-white/10">
        <h2 className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
          Explorer
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {fileStructure.map((node) => (
          <FileItem
            key={node.path}
            node={node}
            level={0}
            selectedFile={selectedFile}
            onSelectFile={onSelectFile}
          />
        ))}
      </div>
    </div>
  );
}
