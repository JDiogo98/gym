"use client";

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/modeToggle";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BookmarkCheckIcon } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  return (
    <html suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex flex-1">
              {pathname !== "/" && <AppSidebar />}
              <div className="flex flex-col flex-1 transition-all duration-300">
                <div className="relative flex-1">
                  {pathname !== "/" && <SidebarTrigger />}
                  <div className="absolute top-0 right-0 m-4">
                    <ModeToggle />
                  </div>
                  <div className="absolute top-0 right-12 m-4">
                    {pathname !== "/" && (
                      <Link href="/">
                        <Button variant="outline">
                          <BookmarkCheckIcon className="w-6 h-6 mr-2" />
                          Registar Treino
                        </Button>
                      </Link>
                    )}
                  </div>
                  {children}
                </div>
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
