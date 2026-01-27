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

interface Appeal {
  id: string
  userId: string
  reason: string
  submittedAt: string
  status: 'PENDING' | 'APPROVED' | 'DENIED'
}

const mockAppeals: Appeal[] = [
  {
    id: 'app_001',
    userId: 'usr_12345',
    reason: 'Account suspended in error - no policy violations',
    submittedAt: '2024-01-27T14:20:00Z',
    status: 'PENDING',
  },
  {
    id: 'app_002',
    userId: 'usr_88888',
    reason: 'Lost access to email, need account recovery',
    submittedAt: '2024-01-27T13:30:00Z',
    status: 'PENDING',
  },
  {
    id: 'app_003',
    userId: 'usr_99999',
    reason: 'Lab completion not recorded - already completed',
    submittedAt: '2024-01-27T12:00:00Z',
    status: 'PENDING',
  },
]

export function AppealInbox() {
  const [appeals, setAppeals] = useState(mockAppeals)

  const handleAppeal = (id: string, action: 'approve' | 'deny') => {
    setAppeals(
      appeals.map(a =>
        a.id === id
          ? { ...a, status: action === 'approve' ? 'APPROVED' : 'DENIED' }
          : a,
      ),
    )
  }

  const pendingAppeals = appeals.filter(a => a.status === 'PENDING')
  const processedAppeals = appeals.filter(a => a.status !== 'PENDING')

  return (
    <div className="space-y-6">
      {/* Pending Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">Appeal Inbox</h2>
            <p className="text-xs text-muted-foreground mt-1">A9: User disputes and appeals</p>
          </div>
          <Badge className="bg-amber-500/20 text-amber-400">{pendingAppeals.length} Pending</Badge>
        </div>

        <div className="rounded border border-white/5 overflow-hidden bg-card/50">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Appeal ID</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">User ID</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Reason</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Submitted</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingAppeals.map(appeal => (
                <TableRow key={appeal.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="h-8 text-xs font-mono text-muted-foreground">{appeal.id}</TableCell>
                  <TableCell className="h-8 text-xs font-mono text-foreground">{appeal.userId}</TableCell>
                  <TableCell className="h-8 text-xs text-muted-foreground">{appeal.reason}</TableCell>
                  <TableCell className="h-8 text-xs text-muted-foreground">
                    {new Date(appeal.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="h-8 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-emerald-400 hover:bg-emerald-500/20"
                      onClick={() => handleAppeal(appeal.id, 'approve')}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-6 px-2 text-xs text-red-400 hover:bg-red-500/20"
                      onClick={() => handleAppeal(appeal.id, 'deny')}
                    >
                      Deny
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Processed Section */}
      {processedAppeals.length > 0 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-foreground">Processed Appeals</h3>
            <p className="text-xs text-muted-foreground mt-1">{processedAppeals.length} resolved</p>
          </div>

          <div className="rounded border border-white/5 overflow-hidden bg-card/50">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Appeal ID</TableHead>
                  <TableHead className="h-8 text-xs font-semibold text-muted-foreground">User ID</TableHead>
                  <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Decision</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedAppeals.map(appeal => (
                  <TableRow key={appeal.id} className="border-white/5 hover:bg-white/5">
                    <TableCell className="h-8 text-xs font-mono text-muted-foreground">{appeal.id}</TableCell>
                    <TableCell className="h-8 text-xs font-mono text-foreground">{appeal.userId}</TableCell>
                    <TableCell className="h-8 text-xs">
                      <Badge
                        className={`text-xs px-2 py-0.5 ${
                          appeal.status === 'APPROVED'
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {appeal.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}
