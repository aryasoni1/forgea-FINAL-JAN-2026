'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface CreditEntry {
  id: string
  timestamp: string
  type: 'API_CALL' | 'LAB_RUN' | 'MANUAL_ADJUSTMENT'
  amount: number
  userId: string
  balance: number
}

const mockLedger: CreditEntry[] = [
  {
    id: 'crd_001',
    timestamp: '2024-01-27T14:35:00Z',
    type: 'API_CALL',
    amount: -5,
    userId: 'usr_12345',
    balance: 245,
  },
  {
    id: 'crd_002',
    timestamp: '2024-01-27T14:20:00Z',
    type: 'LAB_RUN',
    amount: -15,
    userId: 'usr_67890',
    balance: 185,
  },
  {
    id: 'crd_003',
    timestamp: '2024-01-27T14:00:00Z',
    type: 'MANUAL_ADJUSTMENT',
    amount: 100,
    userId: 'usr_22222',
    balance: 400,
  },
  {
    id: 'crd_004',
    timestamp: '2024-01-27T13:45:00Z',
    type: 'API_CALL',
    amount: -8,
    userId: 'usr_33333',
    balance: 92,
  },
]

const metrics = {
  totalBurned: 28,
  dailyBurnRate: 15.4,
  activeBudget: 1024,
  projectedRunout: '45 days',
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'API_CALL':
      return 'bg-blue-500/20 text-blue-400'
    case 'LAB_RUN':
      return 'bg-cyan-500/20 text-cyan-400'
    case 'MANUAL_ADJUSTMENT':
      return 'bg-emerald-500/20 text-emerald-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export function CreditLedger() {
  const [entries] = useState(mockLedger)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Credit Ledger</h2>
        <p className="text-xs text-muted-foreground mt-1">A8: API costs and user credit consumption</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="border border-white/5 rounded p-4 bg-card/50">
          <p className="text-xs text-muted-foreground font-semibold uppercase">Total Burned</p>
          <p className="text-2xl font-bold text-foreground mt-2">{metrics.totalBurned}</p>
          <p className="text-xs text-muted-foreground mt-1">this session</p>
        </div>

        <div className="border border-white/5 rounded p-4 bg-card/50">
          <p className="text-xs text-muted-foreground font-semibold uppercase">Burn Rate</p>
          <p className="text-2xl font-bold text-amber-400 mt-2">{metrics.dailyBurnRate}</p>
          <p className="text-xs text-muted-foreground mt-1">credits/day</p>
        </div>

        <div className="border border-white/5 rounded p-4 bg-card/50">
          <p className="text-xs text-muted-foreground font-semibold uppercase">Active Budget</p>
          <p className="text-2xl font-bold text-foreground mt-2">{metrics.activeBudget}</p>
          <p className="text-xs text-muted-foreground mt-1">total credits</p>
        </div>

        <div className="border border-white/5 rounded p-4 bg-card/50">
          <p className="text-xs text-muted-foreground font-semibold uppercase">Projected Runout</p>
          <p className="text-2xl font-bold text-foreground mt-2">{metrics.projectedRunout}</p>
          <p className="text-xs text-muted-foreground mt-1">at current rate</p>
        </div>
      </div>

      {/* Burn Rate Chart */}
      <div className="border border-white/5 rounded p-4 bg-card/50">
        <h3 className="font-semibold text-foreground mb-4">Burn Rate Visualization</h3>
        <div className="flex items-end gap-1 h-32">
          {[65, 45, 72, 38, 52, 41, 58, 35, 71, 48, 62, 55].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-amber-500/60 rounded-t opacity-80 hover:opacity-100 transition-opacity"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-2">Daily burn rate trend (last 12 days)</p>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Recent Transactions</h3>

        <div className="rounded border border-white/5 overflow-hidden bg-card/50">
          <Table>
            <TableHeader>
              <TableRow className="border-white/5 hover:bg-transparent">
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">ID</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Type</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">User ID</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground text-right">Amount</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground text-right">Balance</TableHead>
                <TableHead className="h-8 text-xs font-semibold text-muted-foreground">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map(entry => (
                <TableRow key={entry.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="h-8 text-xs font-mono text-muted-foreground">{entry.id}</TableCell>
                  <TableCell className="h-8 text-xs">
                    <Badge className={`text-xs px-2 py-0.5 ${getTypeColor(entry.type)}`}>
                      {entry.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="h-8 text-xs font-mono text-foreground">{entry.userId}</TableCell>
                  <TableCell className={`h-8 text-xs font-mono text-right ${entry.amount > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {entry.amount > 0 ? '+' : ''}{entry.amount}
                  </TableCell>
                  <TableCell className="h-8 text-xs font-mono text-foreground text-right">{entry.balance}</TableCell>
                  <TableCell className="h-8 text-xs font-mono text-muted-foreground">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
