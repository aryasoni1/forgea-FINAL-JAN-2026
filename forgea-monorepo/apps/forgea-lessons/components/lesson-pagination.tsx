'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LessonPaginationProps {
  previousLabel?: string;
  nextLabel?: string;
  onPrevious?: () => void;
  onNext?: () => void;
  disablePrevious?: boolean;
  disableNext?: boolean;
}

export function LessonPagination({
  previousLabel = 'Previous Lesson',
  nextLabel = 'Next Lesson',
  onPrevious,
  onNext,
  disablePrevious,
  disableNext,
}: LessonPaginationProps) {
  return (
    <div className="border-t border-white/5 bg-black/40 px-8 py-6 flex items-center justify-between">
      <Button
        onClick={onPrevious}
        disabled={disablePrevious}
        variant="outline"
        className="gap-2 h-9 text-sm border-white/10 hover:border-white/20 disabled:opacity-50 bg-transparent"
      >
        <ChevronLeft className="w-4 h-4" />
        {previousLabel}
      </Button>

      <Button
        onClick={onNext}
        disabled={disableNext}
        variant="outline"
        className="gap-2 h-9 text-sm border-white/10 hover:border-white/20 disabled:opacity-50 bg-transparent"
      >
        {nextLabel}
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
