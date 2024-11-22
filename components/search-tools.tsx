"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTools } from "@/lib/tools-context";
import { Category } from "@/types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export function SearchTools() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    setSelectedCategories,
    categories,
  } = useTools();

  const handleCategorySelect = (category: string) => {
    if (category === "All") {
      setSelectedCategories([]);
      return;
    }
    
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="AIツールを検索..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories
          .filter(category => category !== "All")
          .map((category, index) => (
            <Badge
              key={`category-${index}-${category}`}
              variant={selectedCategories.includes(category) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </Badge>
          ))}
        {selectedCategories.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedCategories([])}
            className="h-6"
          >
            <X className="h-4 w-4 mr-1" />
            クリア
          </Button>
        )}
      </div>
    </div>
  );
}