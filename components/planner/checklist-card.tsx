"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

interface ChecklistCardProps {
  title: string;
  description?: string;
  items: ChecklistItem[];
  onToggle: (id: string, done: boolean) => void;
  className?: string;
}

export function ChecklistCard({
  title,
  description,
  items,
  onToggle,
  className,
}: ChecklistCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description ? (
          <p className="text-muted-foreground text-sm">{description}</p>
        ) : null}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-center gap-3 rounded-md p-2 hover:bg-muted/50">
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={(e) => onToggle(item.id, e.target.checked)}
                  className="size-4 rounded border-input"
                  aria-label={item.label}
                />
                <span
                  className={cn(
                    "text-sm",
                    item.done && "text-muted-foreground line-through"
                  )}
                >
                  {item.label}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
