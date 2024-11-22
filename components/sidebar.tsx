"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Home, Info, Moon, Sun, Sparkles } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const routes = [
  {
    label: "ホーム",
    icon: Home,
    href: "/",
  },
  {
    label: "このアプリについて",
    icon: Info,
    href: "/about",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsCollapsed(true);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    router.push(href);
    setIsCollapsed(true);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <div
        className={cn(
          "fixed top-0 left-0 h-full bg-background border-r-2 border-purple-200 dark:border-purple-800 transition-all duration-300 z-40 w-[240px]",
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full pt-16">
          <div className="px-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-6 w-6 text-purple-500" />
              <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-500 to-purple-700 bg-clip-text text-transparent">
                AI Tools Manager
              </h2>
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="space-y-2 p-2">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === route.href && "bg-secondary"
                  )}
                  onClick={() => handleNavigation(route.href)}
                >
                  <route.icon className="h-4 w-4 mr-2" />
                  {route.label}
                </Button>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 mt-auto border-t-2 border-purple-200 dark:border-purple-800">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <>
                  <Moon className="h-4 w-4 mr-2" />
                  ダークモードに切替
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4 mr-2" />
                  ライトモードに切替
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="pl-16">
        <main className="flex-1" />
      </div>
    </div>
  );
}