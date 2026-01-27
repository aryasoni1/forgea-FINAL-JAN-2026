'use client';

import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

interface ProofSearchProps {
  onSearch?: (username: string) => void;
  placeholder?: string;
}

export function ProofSearch({
  onSearch,
  placeholder = 'Enter GitHub username...',
}: ProofSearchProps) {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim()) {
      onSearch?.(input.trim());
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder={placeholder}
          className="h-12 pl-4 pr-12 bg-card border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
        />
        <Button
          onClick={handleSearch}
          size="sm"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 p-0 bg-primary/20 hover:bg-primary/30 border border-primary/30"
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-4 text-center">
        Search for verified engineers and their proof of work
      </p>
    </div>
  );
}
