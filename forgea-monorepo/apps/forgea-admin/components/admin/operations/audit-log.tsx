'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

interface AuditEntry {
  id: string
  actorId: string
  action: string
  timestamp: string
  details: string
}

const mockAuditLogs: AuditEntry[] = [
  {
    id: 'A001',
    actorId: 'usr_12345',
    action: 'USER_SUSPENDED',
    timestamp: '2024-01-27T14:32:00Z',
    details: 'Suspended due to policy violation',
  },
  {
    id: 'A002',
    actorId: 'usr_67890',
    action: 'LAB_PUBLISHED',
    timestamp: '2024-01-27T14:15:00Z',
    details: 'Published React Closures lab',
  },
  {
    id: 'A003',
    actorId: 'adm_11111',
    action: 'WEBHOOK_TRIGGERED',
    timestamp: '2024-01-27T13:50:00Z',
    details: 'GitHub sync completed',
  },
  {
    id: 'A004',
    actorId: 'usr_22222',
    action: 'VERIFICATION_FAILED',
    timestamp: '2024-01-27T13:20:00Z',
    details: 'Email verification expired',
  },
  {
    id: 'A005',
    actorId: 'adm_33333',
    action: 'CREDIT_TRANSFERRED',
    timestamp: '2024-01-27T12:45:00Z',
    details: 'Transferred 100 credits to usr_12345',
  },
]

const actionColors: Record<string, string> = {
  USER_SUSPENDED: 'bg-red-500/20 text-red-400',
  LAB_PUBLISHED: 'bg-emerald-500/20 text-emerald-400',
  WEBHOOK_TRIGGERED: 'bg-blue-500/20 text-blue-400',
  VERIFICATION_FAILED: 'bg-amber-500/20 text-amber-400',
  CREDIT_TRANSFERRED: 'bg-cyan-500/20 text-cyan-400',
}

export function AuditLog() {
  const [filter, setFilter] = useState('')
  const [logs, setLogs] = useState(mockAuditLogs)

  const filteredLogs = logs.filter(
    log =>
      log.actorId.toLowerCase().includes(filter.toLowerCase()) ||
      log.action.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Audit Log</h2>
          <p className="text-xs text-muted-foreground mt-1">A1: System event tracking</p>
        </div>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Filter by actor ID or action..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground h-8 text-xs"
        />
      </div>

      <div className="rounded border border-white/5 overflow-hidden bg-card/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">ID</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Actor ID</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Action</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Details</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map(log => (
              <TableRow key={log.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="h-8 text-xs font-mono text-muted-foreground">{log.id}</TableCell>
                <TableCell className="h-8 text-xs font-mono text-foreground">{log.actorId}</TableCell>
                <TableCell className="h-8 text-xs">
                  <Badge className={`text-xs px-2 py-0.5 ${actionColors[log.action] || 'bg-gray-500/20 text-gray-400'}`}>
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell className="h-8 text-xs text-muted-foreground">{log.details}</TableCell>
                <TableCell className="h-8 text-xs font-mono text-muted-foreground">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">Showing {filteredLogs.length} of {logs.length} entries</p>
    </div>
  )
}
