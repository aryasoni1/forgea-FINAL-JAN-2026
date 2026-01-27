'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ChevronRight, File, Folder, FolderOpen, Edit2, Trash2 } from 'lucide-react'

interface TreeNode {
  id: string
  name: string
  type: 'folder' | 'file'
  expanded?: boolean
  children?: TreeNode[]
  lastModified?: string
  status?: 'PUBLISHED' | 'DRAFT'
}

const mockFileTree: TreeNode[] = [
  {
    id: 'root_lessons',
    name: 'lessons',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: 'folder_fundamentals',
        name: 'fundamentals',
        type: 'folder',
        expanded: true,
        children: [
          {
            id: 'file_closures',
            name: 'closures.mdx',
            type: 'file',
            lastModified: '2024-01-25',
            status: 'PUBLISHED',
          },
          {
            id: 'file_scope',
            name: 'scope-chain.mdx',
            type: 'file',
            lastModified: '2024-01-24',
            status: 'DRAFT',
          },
        ],
      },
      {
        id: 'folder_async',
        name: 'async-patterns',
        type: 'folder',
        expanded: false,
        children: [
          {
            id: 'file_callbacks',
            name: 'callbacks.mdx',
            type: 'file',
            lastModified: '2024-01-23',
            status: 'PUBLISHED',
          },
          {
            id: 'file_promises',
            name: 'promises.mdx',
            type: 'file',
            lastModified: '2024-01-22',
            status: 'PUBLISHED',
          },
          {
            id: 'file_async_await',
            name: 'async-await.mdx',
            type: 'file',
            lastModified: '2024-01-20',
            status: 'DRAFT',
          },
        ],
      },
      {
        id: 'folder_advanced',
        name: 'advanced',
        type: 'folder',
        expanded: false,
        children: [
          {
            id: 'file_event_loop',
            name: 'event-loop.mdx',
            type: 'file',
            lastModified: '2024-01-19',
            status: 'PUBLISHED',
          },
        ],
      },
    ],
  },
]

export function LessonManager() {
  const [tree, setTree] = useState(mockFileTree)

  const toggleNode = (id: string, nodes = tree): TreeNode[] => {
    return nodes.map(node => {
      if (node.id === id && node.type === 'folder') {
        return { ...node, expanded: !node.expanded }
      }
      if (node.children) {
        return { ...node, children: toggleNode(id, node.children) }
      }
      return node
    })
  }

  const handleToggle = (id: string) => {
    setTree(toggleNode(id))
  }

  const handleDelete = (id: string, nodes = tree): TreeNode[] => {
    return nodes
      .filter(node => node.id !== id)
      .map(node =>
        node.children ? { ...node, children: handleDelete(id, node.children) } : node,
      )
  }

  const TreeItem = ({ node }: { node: TreeNode }) => {
    const level = 0

    const countChildren = (n: TreeNode): number => {
      if (!n.children) return 0
      return n.children.length + n.children.reduce((sum, child) => sum + countChildren(child), 0)
    }

    return (
      <div key={node.id}>
        <div className="flex items-center gap-1 px-2 py-1.5 hover:bg-white/5 rounded transition-colors group">
          {node.type === 'folder' ? (
            <>
              <button
                onClick={() => handleToggle(node.id)}
                className="p-0.5 hover:bg-white/10 rounded transition-colors"
              >
                <ChevronRight
                  size={16}
                  className={`transition-transform ${node.expanded ? 'rotate-90' : ''}`}
                />
              </button>
              {node.expanded ? (
                <FolderOpen size={16} className="text-amber-400" />
              ) : (
                <Folder size={16} className="text-amber-400" />
              )}
            </>
          ) : (
            <>
              <div className="w-4" />
              <File size={16} className="text-blue-400" />
            </>
          )}

          <span className="text-xs text-foreground flex-1 font-mono">{node.name}</span>

          {node.type === 'file' && node.status && (
            <Badge
              className={`text-xs px-1.5 py-0.5 ${
                node.status === 'PUBLISHED'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-amber-500/20 text-amber-400'
              }`}
            >
              {node.status[0]}
            </Badge>
          )}

          {node.lastModified && (
            <span className="text-xs text-muted-foreground hidden group-hover:inline">
              {node.lastModified}
            </span>
          )}

          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-1.5 text-xs text-blue-400 hover:bg-blue-500/20"
              onClick={() => console.log('Edit:', node.id)}
            >
              <Edit2 size={12} />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-6 px-1.5 text-xs text-red-400 hover:bg-red-500/20"
              onClick={() => setTree(handleDelete(node.id))}
            >
              <Trash2 size={12} />
            </Button>
          </div>
        </div>

        {node.type === 'folder' && node.expanded && node.children && (
          <div className="ml-4 space-y-0 border-l border-white/5">
            {node.children.map(child => (
              <div key={child.id} className="pl-2">
                <TreeItem node={child} />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  const countTotal = (nodes: TreeNode[]): number => {
    return nodes.reduce((sum, node) => {
      if (node.type === 'file') return sum + 1
      if (node.children) return sum + countTotal(node.children)
      return sum
    }, 0)
  }

  const countPublished = (nodes: TreeNode[]): number => {
    return nodes.reduce((sum, node) => {
      if (node.type === 'file' && node.status === 'PUBLISHED') return sum + 1
      if (node.children) return sum + countPublished(node.children)
      return sum
    }, 0)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Lesson Manager</h2>
          <p className="text-xs text-muted-foreground mt-1">
            A5/A6: MDX content explorer and file tree management
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="border border-white/5 rounded p-3 bg-card/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Total Files</p>
          <p className="text-2xl font-bold text-foreground mt-1">{countTotal(tree)}</p>
        </div>

        <div className="border border-white/5 rounded p-3 bg-card/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Published</p>
          <p className="text-2xl font-bold text-emerald-400 mt-1">{countPublished(tree)}</p>
        </div>

        <div className="border border-white/5 rounded p-3 bg-card/50">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Drafts</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">
            {countTotal(tree) - countPublished(tree)}
          </p>
        </div>
      </div>

      {/* File Tree */}
      <div className="border border-white/5 rounded p-4 bg-card/50 max-h-96 overflow-y-auto">
        <div className="space-y-1">
          {tree.map(node => (
            <TreeItem key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          + New Lesson
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent">
          Publish All Drafts
        </Button>
        <Button size="sm" variant="outline" className="h-8 text-xs bg-transparent">
          Export Tree
        </Button>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
          <span className="text-muted-foreground">Published</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-3 h-3 rounded bg-amber-500/20 border border-amber-500/40" />
          <span className="text-muted-foreground">Draft</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Folder size={14} className="text-amber-400" />
          <span className="text-muted-foreground">Folder</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <File size={14} className="text-blue-400" />
          <span className="text-muted-foreground">MDX File</span>
        </div>
      </div>
    </div>
  )
}
