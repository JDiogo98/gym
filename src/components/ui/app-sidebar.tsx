import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  UserCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

// Items do Menu
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Clientes",
    url: "/clients",
    icon: UsersRound,
  },
  {
    title: "Marcações",
    url: "/table",
    icon: Calendar,
  },
  {
    title: "Treinadores",
    url: "/date",
    icon: UserCheck,
  },
  {
    title: "Definições",
    url: "/",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel className="sm:text-base lg:text-l text-slate-900 mb-3">Navegação</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon className="text-slate-950"/>
                    <p className="sm:text-base mx-3 lg:text-l">{item.title}</p>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
