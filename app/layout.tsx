import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { ToolsProvider } from "@/lib/tools-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Tools Manager",
  description: "Efficiently manage and discover AI tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ToolsProvider>
            <div className="flex">
              <Sidebar />
              <div className="flex-1">
                {children}
              </div>
            </div>
          </ToolsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}