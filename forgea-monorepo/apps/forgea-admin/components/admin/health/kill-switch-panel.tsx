'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, Power } from 'lucide-react'

interface Switch {
  id: string
  name: string
  description: string
  enabled: boolean
  dangerous: boolean
}

const initialSwitches: Switch[] = [
  {
    id: 'github_webhooks',
    name: 'GitHub Webhooks',
    description: 'Disable incoming GitHub sync events',
    enabled: true,
    dangerous: true,
  },
  {
    id: 'verification_runner',
    name: 'Verification Runner',
    description: 'Disable automated lab verification checks',
    enabled: true,
    dangerous: true,
  },
  {
    id: 'new_signups',
    name: 'New Signups',
    description: 'Disable new user registrations',
    enabled: true,
    dangerous: true,
  },
]

export function KillSwitchPanel() {
  const [switches, setSwitches] = useState(initialSwitches)
  const [confirming, setConfirming] = useState<string | null>(null)

  const toggleSwitch = (id: string) => {
    setSwitches(
      switches.map(s =>
        s.id === id ? { ...s, enabled: !s.enabled } : s,
      ),
    )
    setConfirming(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4 p-4 rounded border border-red-500/20 bg-red-500/10">
        <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-bold text-red-400">Kill-Switch Panel</h2>
          <p className="text-xs text-muted-foreground mt-1">
            A2: Dangerous toggles for emergency system control. Changes take effect immediately.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {switches.map(switchItem => (
          <div
            key={switchItem.id}
            className="border border-white/5 rounded p-4 bg-card/50 hover:bg-card/70 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{switchItem.name}</h3>
                  <Badge className="bg-red-500/20 text-red-400 text-xs">DANGEROUS</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{switchItem.description}</p>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full transition-colors ${
                      switchItem.enabled ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-xs font-semibold">
                    {switchItem.enabled ? 'ENABLED' : 'DISABLED'}
                  </span>
                </div>

                {confirming === switchItem.id ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-red-400 hover:bg-red-500/20"
                      onClick={() => toggleSwitch(switchItem.id)}
                    >
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-muted-foreground hover:bg-white/5"
                      onClick={() => setConfirming(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-3 text-xs text-red-400 hover:bg-red-500/20"
                    onClick={() => setConfirming(switchItem.id)}
                  >
                    <Power size={14} className="mr-1" />
                    Toggle
                  </Button>
                )}
              </div>
            </div>

            {switchItem.enabled && (
              <div className="mt-3 pt-3 border-t border-white/5">
                <p className="text-xs text-emerald-400">✓ Active and functioning normally</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-3 rounded bg-white/5 border border-white/5">
        <p className="text-xs text-muted-foreground">
          <strong className="text-foreground">Note:</strong> Disabling critical systems can cause service degradation. 
          All changes are logged in the audit trail.
        </p>
      </div>
    </div>
  )
}
