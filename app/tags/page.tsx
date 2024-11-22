"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useTools } from "@/lib/tools-context";

export default function TagsPage() {
  const { tools } = useTools();
  
  // Get unique tags from all tools
  const allTags = Array.from(new Set(tools.flatMap(tool => tool.tags)));

  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-4xl font-bold">タグ一覧</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">人気のタグ</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}