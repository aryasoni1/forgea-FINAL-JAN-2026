'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Session {
  id: string
  userId: string
  labId: string
  status: 'IN_PROGRESS' | 'STUCK'
  startedAt: string
  duration: string
}

const mockSessions: Session[] = [
  {
    id: 'sess_001',
    userId: 'usr_12345',
    labId: 'lab_react_closure',
    status: 'IN_PROGRESS',
    startedAt: '2024-01-27T14:15:00Z',
    duration: '18 min',
  },
  {
    id: 'sess_002',
    userId: 'usr_67890',
    labId: 'lab_async_await',
    status: 'IN_PROGRESS',
    startedAt: '2024-01-27T13:45:00Z',
    duration: '48 min',
  },
  {
    id: 'sess_003',
    userId: 'usr_22222',
    labId: 'lab_promises',
    status: 'STUCK',
    startedAt: '2024-01-27T12:30:00Z',
    duration: '2 hr 15 min',
  },
  {
    id: 'sess_004',
    userId: 'usr_33333',
    labId: 'lab_event_loop',
    status: 'IN_PROGRESS',
    startedAt: '2024-01-27T14:00:00Z',
    duration: '35 min',
  },
]

export function LiveSessions() {
  const [sessions, setSessions] = useState(mockSessions)

  const killSession = (id: string) => {
    setSessions(sessions.filter(s => s.id !== id))
  }

  const getStatusBadge = (status: string) => {
    return status === 'IN_PROGRESS'
      ? 'bg-emerald-500/20 text-emerald-400'
      : 'bg-amber-500/20 text-amber-400'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Live Session Monitor</h2>
          <p className="text-xs text-muted-foreground mt-1">A7: Active user lab sessions</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-emerald-500/20 text-emerald-400">{sessions.length} Active</Badge>
        </div>
      </div>

      <div className="rounded border border-white/5 overflow-hidden bg-card/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Session ID</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">User ID</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Lab ID</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Status</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Duration</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessions.map(session => (
              <TableRow key={session.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="h-8 text-xs font-mono text-muted-foreground">{session.id}</TableCell>
                <TableCell className="h-8 text-xs font-mono text-foreground">{session.userId}</TableCell>
                <TableCell className="h-8 text-xs font-mono text-foreground">{session.labId}</TableCell>
                <TableCell className="h-8 text-xs">
                  <Badge className={`text-xs px-2 py-0.5 ${getStatusBadge(session.status)}`}>
                    {session.status}
                  </Badge>
                </TableCell>
                <TableCell className="h-8 text-xs text-muted-foreground">{session.duration}</TableCell>
                <TableCell className="h-8">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 px-2 text-xs text-red-400 hover:bg-red-500/20"
                    onClick={() => killSession(session.id)}
                  >
                    Kill
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">Total sessions: {sessions.length}</p>
    </div>
  )
}
