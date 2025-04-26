"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/chat/app-sidebar";
import UserIcon from "@/components/UserIcon";
import ThemeToggle from "@/components/ThemeToggle";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="overflow-x-hidden">
        <nav className="h-16 px-6 flex items-center justify-between border-b border-border">
          <SidebarTrigger size={"icon"} />
          <div className="flex items-center justify-center gap-4">
            <ThemeToggle/>
            <UserIcon />
          </div>
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
