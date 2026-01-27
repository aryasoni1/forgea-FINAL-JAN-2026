'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown } from 'lucide-react'

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: any) => void
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    operations: true,
    health: true,
    analytics: true,
    content: true,
  })

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const sidebarItems = [
    {
      section: 'operations',
      label: 'Operations Monitor',
      items: [
        { id: 'audit-log', label: 'Audit Log', icon: '📋' },
        { id: 'sessions', label: 'Live Sessions', icon: '🔄' },
        { id: 'appeals', label: 'Appeal Inbox', icon: '✋' },
      ],
    },
    {
      section: 'health',
      label: 'System & Billing',
      items: [
        { id: 'kill-switch', label: 'Kill-Switch Panel', icon: '⚠️' },
        { id: 'credits', label: 'Credit Ledger', icon: '💳' },
      ],
    },
    {
      section: 'analytics',
      label: 'User & Lab Analytics',
      items: [
        { id: 'users', label: 'User Console', icon: '👥' },
        { id: 'labs', label: 'Lab Performance', icon: '📊' },
      ],
    },
    {
      section: 'content',
      label: 'Content Engine',
      items: [
        { id: 'authoring', label: 'Lab Authoring', icon: '✏️' },
        { id: 'lessons', label: 'Lesson Manager', icon: '📚' },
      ],
    },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <h1 className="text-lg font-bold text-sidebar-foreground font-sans">Forgea Control</h1>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard v1.0</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {sidebarItems.map((section) => (
          <div key={section.section}>
            <button
              onClick={() => toggleSection(section.section)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-sidebar-foreground hover:bg-white/5 rounded transition-colors"
            >
              <span>{section.label}</span>
              <ChevronDown
                size={14}
                className={`transition-transform ${expandedSections[section.section] ? 'rotate-180' : ''}`}
              />
            </button>

            {expandedSections[section.section] && (
              <div className="ml-2 space-y-1 mt-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded transition-colors ${
                      activeTab === item.id
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-white/5'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-muted-foreground">System Status: Online</p>
        <div className="mt-2 flex gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>
      </div>
    </aside>
  )
}
