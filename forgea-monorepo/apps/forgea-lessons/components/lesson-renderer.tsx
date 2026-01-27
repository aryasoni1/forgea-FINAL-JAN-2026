'use client';

import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LessonRendererProps {
  title: string;
  content: string;
  codeBlocks?: Array<{
    id: string;
    language: string;
    code: string;
    line?: number;
  }>;
  onInvestigate?: (blockId: string) => void;
}

export function LessonRenderer({
  title,
  content,
  codeBlocks = [],
  onInvestigate,
}: LessonRendererProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <article className="max-w-3xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-6 tracking-tight">
          {title}
        </h1>

        <div className="prose prose-invert max-w-none mb-8">
          <p className="text-base leading-relaxed text-muted-foreground">
            {content}
          </p>
        </div>

        {codeBlocks.map((block) => (
          <div
            key={block.id}
            className="mb-8 border border-white/5 rounded-sm bg-black/40 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-white/5">
              <code className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {block.language}
                {block.line && ` • Line ${block.line}`}
              </code>
            </div>
            <pre className="p-4 overflow-x-auto">
              <code className="font-mono text-xs leading-relaxed text-muted-foreground">
                {block.code}
              </code>
            </pre>
            <div className="px-4 py-3 border-t border-white/5 bg-black/40">
              <Button
                onClick={() => onInvestigate?.(block.id)}
                variant="outline"
                size="sm"
                className="gap-2 h-8 text-xs border-primary/30 hover:border-primary/50 hover:bg-primary/10"
              >
                <Code className="w-3 h-3" />
                Investigate this Bug in Workspace
              </Button>
            </div>
          </div>
        ))}
      </article>
    </main>
  );
}
