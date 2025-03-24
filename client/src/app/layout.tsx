"use client";

import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../Auth";
import { TopButtons } from "@/components/topButtons";

const pagesWithoutSidebar = [
  "/",
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/alternativeRegistration",
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AuthProvider>
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
                {!pagesWithoutSidebar.includes(pathname) && <AppSidebar />}
                <TopButtons pathname={pathname} />
                <div className="flex flex-col flex-1 transition-all duration-600">
                  <div className="relative flex-1">
                    {!pagesWithoutSidebar.includes(pathname) && (
                      <SidebarTrigger />
                    )}
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
    </AuthProvider>
  );
}
