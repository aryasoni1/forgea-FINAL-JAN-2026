'use client';

import { useState } from 'react';
import { Copy, X, Plus } from 'lucide-react';

interface SSHKey {
  id: string;
  name: string;
  fingerprint: string;
  lastUsed: string;
}

const mockKeys: SSHKey[] = [
  {
    id: '1',
    name: 'primary-dev-key',
    fingerprint: 'SHA256:kYA8j9K2xL1pQ5mN3vR7sT9uW2bC4dE6fG8hI0jK1l2',
    lastUsed: '2024-01-27 09:15:22',
  },
  {
    id: '2',
    name: 'ci-deployment-key',
    fingerprint: 'SHA256:aB1cD2eF3gH4iJ5kL6mN7oP8qR9sT0uV1wX2yZ3aB4',
    lastUsed: '2024-01-27 08:43:10',
  },
  {
    id: '3',
    name: 'emergency-access-key',
    fingerprint: 'SHA256:xY9zW8vU7tS6rQ5pO4nM3lK2jI1hG0fE9dC8bA7Z6y',
    lastUsed: '2024-01-26 14:22:55',
  },
];

export function SSHAccessManager() {
  const [keys, setKeys] = useState<SSHKey[]>(mockKeys);
  const [newKeyName, setNewKeyName] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAddKey = () => {
    if (newKeyName.trim()) {
      const newKey: SSHKey = {
        id: `${Date.now()}`,
        name: newKeyName,
        fingerprint: `SHA256:${Math.random().toString(36).substring(2, 50)}`,
        lastUsed: new Date().toISOString().replace('T', ' ').slice(0, 19),
      };
      setKeys([newKey, ...keys]);
      setNewKeyName('');
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRemove = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-emerald-500 uppercase tracking-wider">S1: SSH & Access Manager</h2>
        <p className="text-xs text-gray-400">The Keyring</p>
      </div>

      <div className="border border-white/5 rounded-sm p-4 bg-gradient-to-b from-gray-900/40 to-black/40 space-y-4">
        {/* Add Public Key Section */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-gray-400 block">ADD_PUBLIC_KEY:</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="key-name"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddKey()}
              className="flex-1 bg-black/60 border border-white/5 rounded-sm px-3 py-2 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
            />
            <button
              onClick={handleAddKey}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-sm px-3 py-2 text-xs text-emerald-400 flex items-center gap-1 transition-colors"
            >
              <Plus className="h-3 w-3" />
              ADD
            </button>
          </div>
        </div>

        {/* Active Keys List */}
        <div className="border-t border-white/5 pt-4 space-y-3">
          <p className="text-xs font-mono text-gray-400">ACTIVE_KEYS ({keys.length}):</p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {keys.map((key) => (
              <div key={key.id} className="border border-white/5 rounded-sm p-3 bg-black/40 group hover:bg-black/60 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-mono text-emerald-400 truncate">{key.name}</p>
                  </div>
                  <button
                    onClick={() => handleRemove(key.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors p-1 opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-gray-500 truncate">{key.fingerprint}</p>
                    <button
                      onClick={() => handleCopy(key.fingerprint, key.id)}
                      className="text-gray-500 hover:text-emerald-400 transition-colors p-1"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                  {copiedId === key.id && (
                    <p className="text-xs text-emerald-400">✓ Copied to clipboard</p>
                  )}
                  <div className="flex items-center justify-between text-xs text-gray-600 pt-1 border-t border-white/5">
                    <span className="font-mono">LAST_USED:</span>
                    <span className="font-mono">{key.lastUsed}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
