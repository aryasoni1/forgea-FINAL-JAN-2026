import { TruthMachineStatus } from '@/components/integrity-hub/truth-machine';
import { SSHAccessManager } from '@/components/integrity-hub/ssh-access-manager';
import { EngineeringSkillTree } from '@/components/integrity-hub/skill-tree';

export default function IntegrityHub() {
  return (
    <div className="min-h-screen bg-black text-gray-200">
      {/* Header */}
      <header className="border-b border-white/5 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-end gap-3 mb-2">
            <h1 className="text-3xl font-bold text-white font-sans">FORGEA</h1>
            <span className="text-xs font-mono text-emerald-500 tracking-widest uppercase">Senior Integrity</span>
          </div>
          <p className="text-sm text-gray-400">System Status • SSH Management • Engineering Growth</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - T1 & S1 */}
          <div className="lg:col-span-1 space-y-8">
            <TruthMachineStatus />
            <SSHAccessManager />
          </div>

          {/* Right Column - R1 */}
          <div className="lg:col-span-2">
            <EngineeringSkillTree />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-mono text-gray-500">
                System Uptime: <span className="text-emerald-500">99.98%</span>
              </p>
              <p className="text-xs font-mono text-gray-500">
                Last Sync: <span className="text-gray-400">2024-01-27 09:41:22 UTC</span>
              </p>
            </div>
            <div className="text-xs text-gray-500 text-right">
              <p>Engineering Excellence</p>
              <p className="text-gray-600">v1.0.0-beta</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
