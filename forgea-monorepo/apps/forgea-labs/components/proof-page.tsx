'use client';

import { Check, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProofPageProps {
  username: string;
  labTitle: string;
  failureClassification: string;
  commitSha: string;
  repositoryUrl: string;
  diffContent: string;
  addedLines: string[];
  removedLines: string[];
  verified: boolean;
  verificationDate?: string;
}

export function ProofPage({
  username,
  labTitle,
  failureClassification,
  commitSha,
  repositoryUrl,
  diffContent,
  addedLines,
  removedLines,
  verified,
  verificationDate,
}: ProofPageProps) {
  const shortSha = commitSha.slice(0, 7);

  return (
    <main className="flex-1 overflow-y-auto bg-background">
      <article className="max-w-4xl mx-auto px-8 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-mono text-muted-foreground mb-2 uppercase tracking-widest">
                {username}
              </p>
              <h1 className="text-4xl font-bold text-foreground tracking-tight">
                {labTitle}
              </h1>
            </div>
            {verified && (
              <div className="flex flex-col items-end gap-2">
                <Badge className="gap-2 bg-primary/20 text-primary border-primary/30 px-3 h-8">
                  <Check className="w-3 h-3" />
                  Verified
                </Badge>
                {verificationDate && (
                  <p className="text-xs text-muted-foreground">
                    {new Date(verificationDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Classification and Commit Info */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-black/40 border border-white/5 rounded-sm p-4">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Failure Classification
              </p>
              <p className="font-mono text-sm text-foreground">
                {failureClassification}
              </p>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-sm p-4">
              <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">
                Verified Commit SHA
              </p>
              <div className="flex items-center gap-2">
                <code className="font-mono text-sm text-foreground">
                  {shortSha}
                </code>
                <button className="p-1 hover:bg-white/5 rounded transition-colors">
                  <Copy className="w-3 h-3 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>

          {/* Repository Link */}
          <Button
            asChild
            variant="outline"
            className="gap-2 border-primary/30 hover:border-primary/50 hover:bg-primary/10 bg-transparent"
          >
            <a href={repositoryUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3" />
              View on GitHub
            </a>
          </Button>
        </div>

        {/* Git Diff Section */}
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-foreground mb-4 tracking-tight">
            Git Diff
          </h2>
          <div className="bg-black/40 border border-white/5 rounded-sm overflow-hidden">
            <div className="bg-black/60 border-b border-white/5 px-4 py-2">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                Changes
              </p>
            </div>
            <div className="font-mono text-xs overflow-x-auto">
              <pre className="p-4 leading-relaxed">
                <code>
                  {diffContent ||
                    `diff --git a/src/bug.ts b/src/bug.ts
index abc123..def456 100644
--- a/src/bug.ts
+++ b/src/bug.ts
@@ -12,8 +12,10 @@ export async function processData() {
-  const result = await fetchWithoutCleanup();
+  const result = await fetchWithCleanup();
   
-  return result; // Memory leak here
+  if (result) {
+    return cleanup(result);
+  }
   
   // Additional fixes...`}
                </code>
              </pre>
            </div>
          </div>

          {/* Statistics */}
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500/30 border border-green-500/50 rounded-sm" />
              <span className="text-xs text-muted-foreground">
                {addedLines.length} additions
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500/30 border border-red-500/50 rounded-sm" />
              <span className="text-xs text-muted-foreground">
                {removedLines.length} deletions
              </span>
            </div>
          </div>
        </div>

        {/* Truth Machine Badge */}
        <div className="bg-black/40 border border-primary/20 rounded-sm p-6 text-center">
          <div className="inline-flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-sm bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Check className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                Truth Machine Certified
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                This proof has been verified against the public blockchain
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
