'use client'

import React from "react"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LabForm {
  title: string
  failureClass: string
  baseRepoUrl: string
  difficulty: 'EASY' | 'MEDIUM' | 'HARD'
  description: string
  successCriteria: string
}

export function LabAuthoringForm() {
  const [form, setForm] = useState<LabForm>({
    title: '',
    failureClass: '',
    baseRepoUrl: '',
    difficulty: 'MEDIUM',
    description: '',
    successCriteria: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDifficultyChange = (value: string) => {
    setForm(prev => ({ ...prev, difficulty: value as any }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
    console.log('Lab created:', form)
    setForm({
      title: '',
      failureClass: '',
      baseRepoUrl: '',
      difficulty: 'MEDIUM',
      description: '',
      successCriteria: '',
    })
  }

  const isValid =
    form.title.length > 0 &&
    form.failureClass.length > 0 &&
    form.baseRepoUrl.length > 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Lab Authoring Form</h2>
        <p className="text-xs text-muted-foreground mt-1">
          A10: Create and configure new technical labs
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Lab Title *</Label>
          <Input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g., React Stale Closure Challenge"
            className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground h-8 text-xs"
          />
          <p className="text-xs text-muted-foreground">
            The title displayed to users completing this lab
          </p>
        </div>

        {/* Failure Class */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Failure Class *</Label>
          <Input
            name="failureClass"
            value={form.failureClass}
            onChange={handleChange}
            placeholder="e.g., STALE_CLOSURE_BUG"
            className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground h-8 text-xs font-mono"
          />
          <p className="text-xs text-muted-foreground">
            Categorize the core failure/concept being tested
          </p>
        </div>

        {/* Base Repo URL */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Base Repository URL *</Label>
          <Input
            name="baseRepoUrl"
            value={form.baseRepoUrl}
            onChange={handleChange}
            placeholder="https://github.com/forgea/lab-template"
            className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground h-8 text-xs font-mono"
          />
          <p className="text-xs text-muted-foreground">
            GitHub repository URL containing the lab template
          </p>
        </div>

        {/* Difficulty */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Difficulty Level *</Label>
          <Select value={form.difficulty} onValueChange={handleDifficultyChange}>
            <SelectTrigger className="bg-card border-white/10 text-foreground h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-white/10">
              <SelectItem value="EASY" className="text-xs">Easy - Beginner friendly</SelectItem>
              <SelectItem value="MEDIUM" className="text-xs">Medium - Intermediate</SelectItem>
              <SelectItem value="HARD" className="text-xs">Hard - Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Description</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Provide context and explanation for the lab..."
            className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground text-xs min-h-20"
          />
        </div>

        {/* Success Criteria */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold text-foreground">Success Criteria</Label>
          <Textarea
            name="successCriteria"
            value={form.successCriteria}
            onChange={handleChange}
            placeholder="Define the success criteria and test requirements..."
            className="bg-card border-white/10 text-foreground placeholder:text-muted-foreground text-xs min-h-20"
          />
        </div>

        {/* Difficulty Badge */}
        <div className="flex items-center gap-2 pt-2">
          <span className="text-xs text-muted-foreground">Selected Difficulty:</span>
          <Badge
            className={`text-xs px-2 py-0.5 ${
              form.difficulty === 'EASY'
                ? 'bg-emerald-500/20 text-emerald-400'
                : form.difficulty === 'MEDIUM'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-red-500/20 text-red-400'
            }`}
          >
            {form.difficulty}
          </Badge>
        </div>

        {/* Form Status */}
        {submitted && (
          <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/20">
            <p className="text-xs text-emerald-400 font-semibold">✓ Lab created successfully</p>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-2 pt-4">
          <Button
            type="submit"
            disabled={!isValid}
            className="h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Create Lab
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-8 text-xs bg-transparent"
            onClick={() =>
              setForm({
                title: '',
                failureClass: '',
                baseRepoUrl: '',
                difficulty: 'MEDIUM',
                description: '',
                successCriteria: '',
              })
            }
          >
            Reset
          </Button>
        </div>
      </form>

      {/* Info Box */}
      <div className="p-4 rounded border border-white/5 bg-card/50">
        <h3 className="text-sm font-semibold text-foreground mb-2">Lab Authoring Tips</h3>
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>• Use clear, descriptive titles that explain the core concept</li>
          <li>• Failure Class should follow SCREAMING_SNAKE_CASE convention</li>
          <li>• Repository should contain working and broken implementations</li>
          <li>• Test thoroughly before publishing to users</li>
        </ul>
      </div>
    </div>
  )
}
