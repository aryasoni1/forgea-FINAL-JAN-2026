'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/admin/sidebar'
import { AuditLog } from '@/components/admin/operations/audit-log'
import { LiveSessions } from '@/components/admin/operations/live-sessions'
import { AppealInbox } from '@/components/admin/operations/appeal-inbox'
import { KillSwitchPanel } from '@/components/admin/health/kill-switch-panel'
import { CreditLedger } from '@/components/admin/health/credit-ledger'
import { UserConsole } from '@/components/admin/analytics/user-console'
import { LabPerformance } from '@/components/admin/analytics/lab-performance'
import { LabAuthoringForm } from '@/components/admin/content/lab-authoring-form'
import { LessonManager } from '@/components/admin/content/lesson-manager'

type TabSection = 'audit-log' | 'sessions' | 'appeals' | 'kill-switch' | 'credits' | 'users' | 'labs' | 'authoring' | 'lessons'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabSection>('audit-log')

  const renderContent = () => {
    switch (activeTab) {
      case 'audit-log':
        return <AuditLog />
      case 'sessions':
        return <LiveSessions />
      case 'appeals':
        return <AppealInbox />
      case 'kill-switch':
        return <KillSwitchPanel />
      case 'credits':
        return <CreditLedger />
      case 'users':
        return <UserConsole />
      case 'labs':
        return <LabPerformance />
      case 'authoring':
        return <LabAuthoringForm />
      case 'lessons':
        return <LessonManager />
      default:
        return <AuditLog />
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto bg-black">
          <div className="p-4 md:p-6">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  )
}
