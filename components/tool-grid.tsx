"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star } from "lucide-react";
import { useTools } from "@/lib/tools-context";

interface ToolGridProps {
  favorites?: boolean;
}

export function ToolGrid({ favorites = false }: ToolGridProps) {
  const { filteredTools, toggleFavorite } = useTools();
  const displayedTools = favorites ? filteredTools.filter(tool => tool.favorite) : filteredTools;

  if (displayedTools.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">
          {favorites ? "お気に入りのツールはありません" : "該当するツールが見つかりません"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayedTools.map((tool) => (
        <Card key={tool.id} className="flex flex-col border-2 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="truncate">{tool.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(tool.id)}
                title={tool.favorite ? "お気に入りから削除" : "お気に入りに追加"}
              >
                <Star
                  className={tool.favorite ? "fill-yellow-400 text-yellow-400" : ""}
                />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
            <div className="flex flex-wrap gap-2">
              {tool.category.map((cat, index) => (
                <Badge key={`${tool.id}-category-${index}`} variant="secondary" className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border border-purple-300 dark:border-purple-700">
                  {cat}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            {tool.url && (
              <Button className="w-full bg-purple-600 hover:bg-purple-700" onClick={() => window.open(tool.url, "_blank")}>
                <ExternalLink className="mr-2 h-4 w-4" />
                ツールを開く
              </Button>
            )}
            {tool.tutorial && (
              <Button variant="outline" className="w-full border-2 border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/20" onClick={() => window.open(tool.tutorial, "_blank")}>
                チュートリアル
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}