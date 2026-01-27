'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface User {
  id: string
  email: string
  role: 'USER' | 'ADMIN' | 'MODERATOR'
  status: 'ACTIVE' | 'SUSPENDED'
  joinedAt: string
  lastActive: string
}

const mockUsers: User[] = [
  {
    id: 'usr_12345',
    email: 'alice@example.com',
    role: 'USER',
    status: 'ACTIVE',
    joinedAt: '2023-06-15',
    lastActive: '2024-01-27T14:20:00Z',
  },
  {
    id: 'usr_67890',
    email: 'bob@example.com',
    role: 'USER',
    status: 'ACTIVE',
    joinedAt: '2023-08-22',
    lastActive: '2024-01-27T13:45:00Z',
  },
  {
    id: 'usr_11111',
    email: 'admin@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    joinedAt: '2023-01-10',
    lastActive: '2024-01-27T14:35:00Z',
  },
  {
    id: 'usr_22222',
    email: 'charlie@example.com',
    role: 'USER',
    status: 'SUSPENDED',
    joinedAt: '2023-09-05',
    lastActive: '2024-01-20T10:15:00Z',
  },
  {
    id: 'usr_33333',
    email: 'dave@example.com',
    role: 'MODERATOR',
    status: 'ACTIVE',
    joinedAt: '2023-11-12',
    lastActive: '2024-01-27T12:00:00Z',
  },
]

export function UserConsole() {
  const [filter, setFilter] = useState('')
  const [users, setUsers] = useState(mockUsers)

  const filteredUsers = users.filter(
    u =>
      u.email.toLowerCase().includes(filter.toLowerCase()) ||
      u.id.toLowerCase().includes(filter.toLowerCase()),
  )

  const changeRole = (userId: string, newRole: 'USER' | 'ADMIN' | 'MODERATOR') => {
    setUsers(users.map(u => (u.id === userId ? { ...u, role: newRole } : u)))
  }

  const toggleSuspension = (userId: string) => {
    setUsers(
      users.map(u =>
        u.id === userId
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u,
      ),
    )
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-500/20 text-red-400'
      case 'MODERATOR':
        return 'bg-amber-500/20 text-amber-400'
      default:
        return 'bg-emerald-500/20 text-emerald-400'
    }
  }

  const getStatusColor = (status: string) => {
    return status === 'ACTIVE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">User Console</h2>
          <p className="text-xs text-muted-foreground mt-1">A3: User management and role assignment</p>
        </div>
        <Badge className="bg-emerald-500/20 text-emerald-400">{users.length} Users</Badge>
      </div>

      <Input
        placeholder="Search by email or user ID..."
        value={filter}
        onChange={e => setFilter(e.target.value)}
        className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground h-8 text-xs"
      />

      <div className="rounded border border-white/5 overflow-x-auto bg-card/50">
        <Table>
          <TableHeader>
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">User ID</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">Email</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">Role</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">Status</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">Joined</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">Last Active</TableHead>
              <TableHead className="h-8 text-xs font-semibold text-muted-foreground whitespace-nowrap">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id} className="border-white/5 hover:bg-white/5">
                <TableCell className="h-8 text-xs font-mono text-muted-foreground whitespace-nowrap">
                  {user.id}
                </TableCell>
                <TableCell className="h-8 text-xs text-foreground whitespace-nowrap">{user.email}</TableCell>
                <TableCell className="h-8 text-xs">
                  <div className="flex gap-1">
                    {['USER', 'MODERATOR', 'ADMIN'].map(role => (
                      <Button
                        key={role}
                        size="sm"
                        variant="ghost"
                        className={`h-6 px-2 text-xs ${
                          user.role === role
                            ? getRoleColor(role)
                            : 'text-muted-foreground hover:bg-white/5'
                        }`}
                        onClick={() => changeRole(user.id, role as any)}
                      >
                        {role[0]}
                      </Button>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="h-8 text-xs">
                  <Badge className={`text-xs px-2 py-0.5 ${getStatusColor(user.status)}`}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="h-8 text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(user.joinedAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="h-8 text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(user.lastActive).toLocaleTimeString()}
                </TableCell>
                <TableCell className="h-8">
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`h-6 px-2 text-xs ${
                      user.status === 'ACTIVE'
                        ? 'text-red-400 hover:bg-red-500/20'
                        : 'text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                    onClick={() => toggleSuspension(user.id)}
                  >
                    {user.status === 'ACTIVE' ? 'Suspend' : 'Restore'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs text-muted-foreground">
        Showing {filteredUsers.length} of {users.length} users
      </p>
    </div>
  )
}
