'use client';

import { useState } from 'react';
import { LessonSidebar } from '@/components/lesson-sidebar';
import { LessonRenderer } from '@/components/lesson-renderer';
import { LessonPagination } from '@/components/lesson-pagination';
import { LabSessionButton } from '@/components/lab-session-button';

const LESSON_TREE = [
  {
    id: 'fundamentals',
    title: 'Fundamentals',
    processed: true,
    children: [
      {
        id: 'memory-leaks',
        title: 'Memory Leaks',
        processed: true,
      },
      {
        id: 'race-conditions',
        title: 'Race Conditions',
        processed: false,
      },
      {
        id: 'deadlocks',
        title: 'Deadlocks',
        processed: false,
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced Topics',
    processed: false,
    children: [
      {
        id: 'async-patterns',
        title: 'Async Patterns',
        processed: false,
      },
      {
        id: 'concurrency',
        title: 'Concurrency Models',
        processed: false,
      },
    ],
  },
];

const LESSONS_CONTENT = {
  'memory-leaks': {
    title: 'Understanding Memory Leaks',
    content:
      'Memory leaks occur when a program allocates memory but fails to deallocate it, causing the program to consume more and more memory over time. This is a critical issue in long-running applications and can severely degrade performance.',
    codeBlocks: [
      {
        id: 'example-1',
        language: 'typescript',
        line: 15,
        code: `// Problematic: Event listener never removed
class DataManager {
  private data: any[] = [];

  subscribe(callback: Function) {
    window.addEventListener('resize', () => {
      callback(this.data); // 'this' creates a closure
    });
    // Never removes the listener - MEMORY LEAK!
  }
}`,
      },
    ],
  },
  'race-conditions': {
    title: 'Race Conditions in Async Code',
    content:
      'Race conditions occur when the outcome of operations depends on the relative timing of events. In concurrent systems, this can lead to unpredictable behavior and data corruption.',
    codeBlocks: [
      {
        id: 'example-2',
        language: 'typescript',
        line: 8,
        code: `// Problematic: Race condition between check and use
async function processUser(userId: string) {
  const user = await fetchUser(userId);
  
  // User could be deleted between here
  if (user.active) { // and here
    await updateUserData(user); // May crash if user deleted
  }
}`,
      },
    ],
  },
  'deadlocks': {
    title: 'Detecting and Avoiding Deadlocks',
    content:
      'Deadlocks occur when two or more processes are waiting indefinitely for resources held by each other. Learning to identify and prevent deadlocks is essential for robust system design.',
    codeBlocks: [
      {
        id: 'example-3',
        language: 'typescript',
        line: 12,
        code: `// Problematic: Potential deadlock scenario
function transferMoney(from: Account, to: Account) {
  lockAccount(from);
  // If thread A locks 'from' and B locks 'to'
  // then both could wait forever
  lockAccount(to);
  
  from.balance -= amount;
  to.balance += amount;
  
  unlockAccount(from);
  unlockAccount(to);
}`,
      },
    ],
  },
};

export default function LessonsPage() {
  const [activeId, setActiveId] = useState('memory-leaks');

  const currentLesson =
    LESSONS_CONTENT[activeId as keyof typeof LESSONS_CONTENT];

  return (
    <div className="flex h-screen bg-background">
      <LessonSidebar
        items={LESSON_TREE}
        activeId={activeId}
        onItemClick={setActiveId}
      />

      <div className="flex-1 flex flex-col">
        {currentLesson ? (
          <>
            <LessonRenderer
              title={currentLesson.title}
              content={currentLesson.content}
              codeBlocks={currentLesson.codeBlocks}
              onInvestigate={(blockId) => {
                console.log(`Investigating: ${blockId}`);
              }}
            />
            <LessonPagination
              previousLabel="← Previous Lesson"
              nextLabel="Next Lesson →"
              onPrevious={() => console.log('Previous')}
              onNext={() => console.log('Next')}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Select a lesson to begin
              </p>
              <LabSessionButton
                labId={activeId}
                onInitialize={(id) =>
                  console.log(`Initialize lab: ${id}`)
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
