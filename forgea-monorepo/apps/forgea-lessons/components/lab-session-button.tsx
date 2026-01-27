'use client';

import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LabSessionButtonProps {
  labId: string;
  onInitialize?: (labId: string) => void;
  disabled?: boolean;
}

export function LabSessionButton({
  labId,
  onInitialize,
  disabled,
}: LabSessionButtonProps) {
  return (
    <Button
      onClick={() => onInitialize?.(labId)}
      disabled={disabled}
      className="gap-2 h-10 px-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
    >
      <Zap className="w-4 h-4" />
      Initialize Lab Session
    </Button>
  );
}
