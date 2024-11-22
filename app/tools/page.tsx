import { SearchTools } from "@/components/search-tools";
import { ToolGrid } from "@/components/tool-grid";

export default function ToolsPage() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-4xl font-bold">All Tools</h1>
      <SearchTools />
      <ToolGrid />
    </div>
  );
}