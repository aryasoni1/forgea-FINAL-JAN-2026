'use client';

import { useState } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';

interface SkillNode {
  id: string;
  name: string;
  category: string;
  completed: boolean;
  locked: boolean;
  progress?: number;
}

const skillNodes: SkillNode[] = [
  { id: '1', name: 'React Internals', category: 'Frontend', completed: true, locked: false, progress: 100 },
  { id: '2', name: 'SQL Optimization', category: 'Database', completed: true, locked: false, progress: 100 },
  { id: '3', name: 'Memory Integrity', category: 'Systems', completed: false, locked: false, progress: 65 },
  { id: '4', name: 'Async Logic', category: 'Architecture', completed: false, locked: false, progress: 42 },
  { id: '5', name: 'TypeScript Advanced', category: 'Frontend', completed: true, locked: false, progress: 100 },
  { id: '6', name: 'Performance Tuning', category: 'Systems', completed: false, locked: false, progress: 78 },
  { id: '7', name: 'Security Hardening', category: 'Systems', completed: false, locked: true, progress: 0 },
  { id: '8', name: 'Distributed Systems', category: 'Architecture', completed: false, locked: true, progress: 0 },
];

export function EngineeringSkillTree() {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  const completedCount = skillNodes.filter((n) => n.completed).length;
  const activeCount = skillNodes.filter((n) => !n.locked && !n.completed).length;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">R1: Engineering Skill Tree</h2>
        <p className="text-xs text-gray-400">The Growth Map — {completedCount} mastered, {activeCount} in progress</p>
      </div>

      <div className="border border-white/5 rounded-sm p-4 bg-gradient-to-b from-gray-900/40 to-black/40">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-white/5">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-500">{completedCount}</p>
            <p className="text-xs text-gray-400">Mastered</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-500">{activeCount}</p>
            <p className="text-xs text-gray-400">In Progress</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-600">{skillNodes.filter((n) => n.locked).length}</p>
            <p className="text-xs text-gray-400">Locked</p>
          </div>
        </div>

        {/* Domain Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skillNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
              className={`relative group rounded-sm p-3 border transition-all duration-300 text-left ${
                node.locked
                  ? 'border-gray-700 bg-gray-950/50 cursor-not-allowed opacity-60'
                  : node.completed
                    ? 'border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 glow-emerald'
                    : 'border-white/5 bg-gray-900/40 hover:border-white/10 hover:bg-gray-900/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-300 group-hover:text-gray-100">{node.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{node.category}</p>
                </div>
                {node.locked ? (
                  <Lock className="h-4 w-4 text-gray-600 flex-shrink-0" />
                ) : node.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                ) : null}
              </div>

              {!node.locked && (
                <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      node.completed ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                    style={{ width: `${node.progress || 0}%` }}
                  ></div>
                </div>
              )}

              {expandedNode === node.id && (
                <div className="mt-3 pt-3 border-t border-white/5 text-xs text-gray-400 space-y-1">
                  <p>
                    <span className="text-gray-500">Status:</span> {node.locked ? 'Locked' : node.completed ? 'Mastered' : 'In Progress'}
                  </p>
                  {!node.locked && <p><span className="text-gray-500">Progress:</span> {node.progress || 0}%</p>}
                  <p className="text-gray-600 mt-2">
                    {node.locked
                      ? 'Complete prerequisites to unlock this domain.'
                      : node.completed
                        ? 'You have achieved mastery in this domain.'
                        : 'Keep building expertise in this area.'}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
