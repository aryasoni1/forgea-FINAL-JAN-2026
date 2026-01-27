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

interface LabMetric {
  id: string
  title: string
  passCount: number
  failCount: number
  totalAttempts: number
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  lastUpdated: string
}

const mockLabs: LabMetric[] = [
  {
    id: 'lab_react_closure',
    title: 'React Stale Closure',
    passCount: 15,
    failCount: 130,
    totalAttempts: 145,
    difficulty: 'HARD',
    lastUpdated: '2024-01-27T14:20:00Z',
  },
  {
    id: 'lab_async_await',
    title: 'Async/Await Patterns',
    passCount: 82,
    failCount: 48,
    totalAttempts: 130,
    difficulty: 'MEDIUM',
    lastUpdated: '2024-01-27T13:45:00Z',
  },
  {
    id: 'lab_promises',
    title: 'Promise Chaining',
    passCount: 76,
    failCount: 34,
    totalAttempts: 110,
    difficulty: 'MEDIUM',
    lastUpdated: '2024-01-27T13:20:00Z',
  },
  {
    id: 'lab_event_loop',
    title: 'Event Loop Mechanics',
    passCount: 92,
    failCount: 156,
    totalAttempts: 248,
    difficulty: 'HARD',
    lastUpdated: '2024-01-27T12:00:00Z',
  },
  {
    id: 'lab_closure_basics',
    title: 'Closure Basics',
    passCount: 124,
    failCount: 26,
    totalAttempts: 150,
    difficulty: 'EASY',
    lastUpdated: '2024-01-27T11:30:00Z',
  },
  {
    id: 'lab_module_pattern',
    title: 'Module Pattern',
    passCount: 68,
    failCount: 52,
    totalAttempts: 120,
    difficulty: 'MEDIUM',
    lastUpdated: '2024-01-27T10:15:00Z',
  },
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'EASY':
      return 'bg-emerald-500/20 text-emerald-400'
    case 'MEDIUM':
      return 'bg-amber-500/20 text-amber-400'
    case 'HARD':
      return 'bg-red-500/20 text-red-400'
    default:
      return 'bg-gray-500/20 text-gray-400'
  }
}

export function LabPerformance() {
  const [labs] = useState(mockLabs)

  const getPassRate = (lab: LabMetric) => {
    return Math.round((lab.passCount / lab.totalAttempts) * 100)
  }

  const getPassRateColor = (rate: number) => {
    if (rate >= 70) return 'text-emerald-400'
    if (rate >= 40) return 'text-amber-400'
    return 'text-red-400'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Lab Performance</h2>
          <p className="text-xs text-muted-foreground mt-1">
            A4: Pass/fail ratios and completion metrics for all labs
          </p>
        </div>
      </div>

      <div className="rounded border border-white/5 overflow-x-auto bg-card/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Lab Title
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap text-center">
                Difficulty
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap text-right">
                Pass Rate
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap text-right">
                Passed
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap text-right">
                Failed
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap text-right">
                Total
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Visualization
              </TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">
                Last Updated
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {labs.map(lab => {
              const passRate = getPassRate(lab)
              return (
                <TableRow key={lab.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="h-8 text-xs text-foreground whitespace-nowrap">{lab.title}</TableCell>
                  <TableCell className="h-8 text-xs text-center">
                    <Badge className={`text-xs px-2 py-0.5 ${getDifficultyColor(lab.difficulty)}`}>
                      {lab.difficulty}
                    </Badge>
                  </TableCell>
                  <TableCell className={`h-8 text-xs font-semibold text-right ${getPassRateColor(passRate)}`}>
                    {passRate}%
                  </TableCell>
                  <TableCell className="h-8 text-xs text-emerald-400 text-right font-semibold">
                    {lab.passCount}
                  </TableCell>
                  <TableCell className="h-8 text-xs text-red-400 text-right font-semibold">
                    {lab.failCount}
                  </TableCell>
                  <TableCell className="h-8 text-xs text-foreground text-right">{lab.totalAttempts}</TableCell>
                  <TableCell className="h-8 py-2">
                    <div className="flex h-6 gap-0.5 items-center">
                      {Array.from({ length: 10 }).map((_, i) => {
                        const segmentPass = (lab.passCount / lab.totalAttempts) * 10
                        return (
                          <div
                            key={i}
                            className={`flex-1 h-4 rounded-sm ${
                              i < segmentPass ? 'bg-emerald-500/70' : 'bg-red-500/40'
                            }`}
                          />
                        )
                      })}
                    </div>
                  </TableCell>
                  <TableCell className="h-8 text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(lab.lastUpdated).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="border border-white/5 rounded p-3 bg-card/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Avg Pass Rate</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {Math.round(
              (labs.reduce((sum, lab) => sum + getPassRate(lab), 0) / labs.length),
            )}%
          </p>
        </div>

        <div className="border border-white/5 rounded p-3 bg-card/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Total Attempts</p>
          <p className="text-2xl font-bold text-foreground mt-2">
            {labs.reduce((sum, lab) => sum + lab.totalAttempts, 0)}
          </p>
        </div>

        <div className="border border-white/5 rounded p-3 bg-card/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Hardest Lab</p>
          <p className="text-sm font-semibold text-red-400 mt-2">React Stale Closure</p>
          <p className="text-xs text-muted-foreground mt-1">12% pass rate</p>
        </div>
      </div>
    </div>
  )
}
