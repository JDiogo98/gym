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
  Home,
  Settings,
  UserCheck,
  UsersRound,
  DumbbellIcon,
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
    url: "/trainings",
    icon: BicepsFlexedIcon,
  },
  {
    title: "Treinadores",
    url: "/trainers",
    icon: UserCheck,
  },
  {
    title: "Aulas",
    url: "/classes",
    icon: DumbbellIcon,
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
        <SidebarGroupLabel className="text-sm sm:text-base md:text-lg lg:text-xl mb-3 ml-2 sm:ml-4">
          Navegação
        </SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="flex items-center space-x-3 p-2"
                    aria-label={item.title} // Melhorando a acessibilidade
                  >
                    <item.icon className="h-5 w-5 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-12 lg:w-12 ml-2 sm:ml-4" />
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl">
                      {item.title}
                    </p>
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
