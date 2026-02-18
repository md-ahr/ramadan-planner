"use client";

import { cn } from "@/lib/utils";

interface DayGridProps {
  days: number;
  value: boolean[];
  onChange: (dayIndex: number, checked: boolean) => void;
  label?: string;
  className?: string;
}

export function DayGrid({
  days,
  value,
  onChange,
  label,
  className,
}: DayGridProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label ? (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      ) : null}
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-6 md:grid-cols-10">
        {Array.from({ length: days }, (_, i) => (
          <label
            key={i}
            className="flex cursor-pointer items-center gap-1.5 rounded border border-input px-2 py-1.5 has-[:checked]:border-primary has-[:checked]:bg-primary/10"
          >
            <input
              type="checkbox"
              checked={value[i] ?? false}
              onChange={(e) => onChange(i, e.target.checked)}
              className="size-4 rounded border-input"
              aria-label={`Day ${i + 1}`}
            />
            <span className="text-sm">{i + 1}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
