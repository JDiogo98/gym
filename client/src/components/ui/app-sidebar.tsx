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
  BicepsFlexedIcon,
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
    title: "Treinos",
    url: "/workouts",
    icon: BicepsFlexedIcon,
  },
  {
    title: "Treinadores",
    url: "/trainers",
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
        <SidebarGroupLabel className="sm:text-base lg:text-l mb-3 ml-4">
          Navegação
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon className="h-6 w-7 ml-4 " />
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
