import { SearchTools } from "@/components/search-tools";
import { ToolGrid } from "@/components/tool-grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Compass, Star, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Sparkles className="h-10 w-10 text-purple-500" />
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
              AI Tools Manager
            </h1>
            <p className="text-sm text-muted-foreground">
              AIツールを効率的に管理・探索
            </p>
          </div>
        </div>
      </div>

      <SearchTools />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">
            <Compass className="mr-2 h-4 w-4" />
            すべてのツール
          </TabsTrigger>
          <TabsTrigger value="favorites">
            <Star className="mr-2 h-4 w-4" />
            お気に入り
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <ToolGrid />
        </TabsContent>
        <TabsContent value="favorites" className="space-y-4">
          <ToolGrid favorites />
        </TabsContent>
      </Tabs>
    </div>
  );
}