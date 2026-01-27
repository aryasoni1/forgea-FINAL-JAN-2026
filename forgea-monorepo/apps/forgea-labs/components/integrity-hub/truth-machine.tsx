'use client';

import { useState, useEffect } from 'react';

interface VerificationLog {
  timestamp: string;
  status: 'VERIFIED' | 'PENDING' | 'FAILED';
  message: string;
}

const mockLogs: VerificationLog[] = [
  { timestamp: '09:41:22', status: 'VERIFIED', message: 'VERIFIED: lab_stale_closure_04 -> USER_7721' },
  { timestamp: '09:40:18', status: 'VERIFIED', message: 'VERIFIED: memory_integrity_check_02 -> SYSTEM' },
  { timestamp: '09:39:45', status: 'VERIFIED', message: 'VERIFIED: async_logic_validation_08 -> USER_3342' },
  { timestamp: '09:38:12', status: 'PENDING', message: 'PENDING: schema_sync_check_15 -> SYNC_QUEUE' },
  { timestamp: '09:37:33', status: 'VERIFIED', message: 'VERIFIED: react_internals_scan_06 -> USER_8801' },
  { timestamp: '09:36:55', status: 'VERIFIED', message: 'VERIFIED: sql_optimization_audit_11 -> AUDIT_LOG' },
  { timestamp: '09:35:22', status: 'VERIFIED', message: 'VERIFIED: gateway_listener_ok_03 -> HEALTHY' },
];

export function TruthMachineStatus() {
  const [logs, setLogs] = useState<VerificationLog[]>(mockLogs);
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % logs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [logs.length]);

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">T1: Truth Machine Status</h2>
        <p className="text-xs text-gray-400">System Integrity Pulse</p>
      </div>

      <div className="border border-white/5 rounded-sm p-4 bg-gradient-to-b from-gray-900/40 to-black/40 space-y-3">
        {/* Status Indicators */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">GATEWAY_LISTENER</span>
            <div className="flex items-center gap-2">
              <div className="status-pulse bg-emerald-500"></div>
              <span className="text-emerald-400">HEALTHY</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">VERIFICATION_RUNNER_NODE_A</span>
            <div className="flex items-center gap-2">
              <div className="status-pulse bg-emerald-500"></div>
              <span className="text-emerald-400">RUNNING</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-300">SCHEMA_SYNC</span>
            <div className="flex items-center gap-2">
              <div className="status-pulse bg-amber-500"></div>
              <span className="text-amber-400">SYNCING</span>
            </div>
          </div>
        </div>

        {/* Verification Stream */}
        <div className="border-t border-white/5 pt-3 mt-3">
          <p className="text-xs text-gray-400 mb-2 font-mono">VERIFICATION_STREAM:</p>
          <div className="bg-black/60 rounded-sm p-2 h-32 overflow-hidden font-mono text-xs">
            <div className="space-y-1">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`transition-all duration-300 ${
                    idx === logIndex ? 'text-emerald-400 bg-emerald-500/10 px-2 py-0.5' : 'text-gray-500'
                  }`}
                >
                  <span className="text-gray-600">[{log.timestamp}]</span>{' '}
                  <span className="text-emerald-500">{log.status}:</span> {log.message}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
