"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Tool, Category } from "@/types";
import { getTools, getCategories } from "@/lib/microcms";

interface ToolsContextType {
  tools: Tool[];
  categories: Category[];
  searchQuery: string;
  selectedCategories: Category[];
  filteredTools: Tool[];
  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: Category[]) => void;
  toggleFavorite: (id: string) => void;
}

const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

export function ToolsProvider({ children }: { children: React.ReactNode }) {
  const [tools, setTools] = useState<Tool[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fetchedTools, fetchedCategories] = await Promise.all([
          getTools(),
          getCategories(),
        ]);

        const toolsWithFavorites = fetchedTools.map(tool => ({
          ...tool,
          favorite: favorites.includes(tool.id)
        }));

        setTools(toolsWithFavorites);
        setCategories(["All", ...fetchedCategories]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [favorites]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const filteredTools = tools.filter((tool) => {
    const matchesSearch = 
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = 
      selectedCategories.length === 0 || 
      tool.category.some(cat => selectedCategories.includes(cat));

    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(fid => fid !== id)
        : [...prev, id];
      return newFavorites;
    });

    setTools(prev => prev.map(tool => {
      if (tool.id === id) {
        return { ...tool, favorite: !tool.favorite };
      }
      return tool;
    }));
  };

  return (
    <ToolsContext.Provider value={{
      tools,
      categories,
      searchQuery,
      selectedCategories,
      filteredTools,
      setSearchQuery,
      setSelectedCategories,
      toggleFavorite,
    }}>
      {children}
    </ToolsContext.Provider>
  );
}

export function useTools() {
  const context = useContext(ToolsContext);
  if (context === undefined) {
    throw new Error("useTools must be used within a ToolsProvider");
  }
  return context;
}