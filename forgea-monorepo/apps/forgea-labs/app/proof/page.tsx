'use client';

import { useState } from 'react';
import { ProofSearch } from '@/components/proof-search';
import { ProofPage } from '@/components/proof-page';

interface VerificationResult {
  username: string;
  labTitle: string;
  failureClassification: string;
  commitSha: string;
  repositoryUrl: string;
  diffContent: string;
  addedLines: string[];
  removedLines: string[];
  verified: boolean;
  verificationDate: string;
}

const MOCK_PROOFS: Record<string, VerificationResult> = {
  'torvalds': {
    username: 'torvalds',
    labTitle: 'Fix Race Condition in VFS Layer',
    failureClassification: 'Concurrency::RaceCondition',
    commitSha: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    repositoryUrl: 'https://github.com/torvalds/linux/commit/a1b2c3d',
    diffContent: `diff --git a/fs/vfs.c b/fs/vfs.c
index abc123..def456 100644
--- a/fs/vfs.c
+++ b/fs/vfs.c
@@ -234,11 +234,15 @@ int handle_vfs_operation() {
   
   spin_lock(&inode->lock);
-  if (inode->state == DIRTY) { // RACE HERE
+  // Ensure atomic state check
+  if (cmpxchg(&inode->state, DIRTY, PROCESSING)) {
     flush_inode(inode);
-    inode->state = CLEAN;
+    smp_wmb();
+    atomic_set(&inode->state, CLEAN);
   }
   spin_unlock(&inode->lock);
   
+  // Additional synchronization barriers
+  smp_rmb();
   return 0;
 }`,
    addedLines: ['// Ensure atomic state check', 'if (cmpxchg(&inode->state, DIRTY, PROCESSING)) {', 'smp_wmb();', 'atomic_set(&inode->state, CLEAN);', '// Additional synchronization barriers', 'smp_rmb();'],
    removedLines: ['if (inode->state == DIRTY) { // RACE HERE', 'inode->state = CLEAN;'],
    verified: true,
    verificationDate: '2024-01-15',
  },
  'gvanrossum': {
    username: 'gvanrossum',
    labTitle: 'Optimize GIL Contention in Thread Pool',
    failureClassification: 'Performance::LockContention',
    commitSha: 'f7e8d9c0b1a2z3y4x5w6v7u8t9s0r1q2',
    repositoryUrl: 'https://github.com/python/cpython/commit/f7e8d9c',
    diffContent: `diff --git a/Python/threadpool.c b/Python/threadpool.c
index def456..ghi789 100644
--- a/Python/threadpool.c
+++ b/Python/threadpool.c
@@ -189,13 +189,19 @@ static void worker_thread(void *arg) {
   PyGILState_STATE state;
   
   while (!pool->shutdown) {
-    // High contention point
-    Py_LOCK(&pool->queue_lock);
+    // Use lock-free queue
+    task_t *task = queue_pop_lockfree(pool->queue);
     
-    if (pool->queue->count > 0) {
-      task = queue_dequeue(pool->queue);
-      Py_UNLOCK(&pool->queue_lock);
-      execute_task(task);
+    if (task) {
+      state = PyGILState_Ensure();
+      
+      // Execute with reduced lock pressure
+      execute_task(task);
+      
+      PyGILState_Release(state);
     } else {
+      // Backoff strategy
+      pthread_cond_wait(&pool->work_available, NULL);
     }
   }`,
    addedLines: ['// Use lock-free queue', 'task_t *task = queue_pop_lockfree(pool->queue);', 'state = PyGILState_Ensure();', '// Execute with reduced lock pressure', 'PyGILState_Release(state);', '// Backoff strategy', 'pthread_cond_wait(&pool->work_available, NULL);'],
    removedLines: ['// High contention point', 'Py_LOCK(&pool->queue_lock);', 'if (pool->queue->count > 0) {', 'task = queue_dequeue(pool->queue);', 'Py_UNLOCK(&pool->queue_lock);'],
    verified: true,
    verificationDate: '2024-01-10',
  },
};

export default function ProofPortalPage() {
  const [searchResult, setSearchResult] = useState<VerificationResult | null>(
    null
  );
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (username: string) => {
    const result = MOCK_PROOFS[username.toLowerCase()];
    if (result) {
      setSearchResult(result);
      setNotFound(false);
    } else {
      setSearchResult(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {!searchResult ? (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-2xl">
            <div className="mb-12 text-center">
              <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">
                Forgea Public Proof Portal
              </h1>
              <p className="text-muted-foreground text-sm">
                Verify engineering excellence through public proof of work
              </p>
            </div>

            <ProofSearch onSearch={handleSearch} />

            {notFound && (
              <div className="mt-8 p-4 bg-black/40 border border-red-500/20 rounded-sm text-center">
                <p className="text-sm text-red-500/70">
                  No verification index found for that username
                </p>
              </div>
            )}

            <div className="mt-16 text-center text-xs text-muted-foreground">
              <p>Try: <span className="font-mono">torvalds</span> or <span className="font-mono">gvanrossum</span></p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen flex-col">
          <button
            onClick={() => setSearchResult(null)}
            className="fixed top-4 left-4 text-sm text-muted-foreground hover:text-foreground transition-colors z-10"
          >
            ← Back to Search
          </button>
          <ProofPage {...searchResult} />
        </div>
      )}
    </div>
  );
}
