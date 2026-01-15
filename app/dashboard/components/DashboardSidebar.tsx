"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar"
import { useAuth } from "@/contexts/AuthContext"

import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from "@/components/ui/collapsible"

import {
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"

import { ChevronRight } from "lucide-react"

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    LogOut,
    Menu,
    FileStack,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

export function DashboardSidebar() {

    const { logout } = useAuth();
    const pathname = usePathname()
    const isActive = pathname === "/dashboard"
    const isTemplatesRoute = pathname.startsWith("/dashboard/templates")



    return (
        <Sidebar collapsible="offcanvas" variant="inset">
            {/* Header */}

            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:p-1.5!"
                        >
                            <Link href="#" className="flex items-center gap-2">
                                {/* Contenedor fijo para el icono */}
                                <span className="flex w-6 items-center justify-center">
                                    <Menu className="h-5 w-5" />
                                </span>

                                {/* Texto (solo cuando el sidebar está expandido) */}
                                <span className="text-base font-semibold group-data-[collapsible=icon]:hidden">
                                    InventoryCL
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>



            {/* Content */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>General</SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={isActive}>
                                    <Link href="/dashboard">
                                        <LayoutDashboard />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <Collapsible
                                defaultOpen={isTemplatesRoute}
                                className="group/collapsible"
                            >
                                <SidebarMenuItem>
                                    {/* Trigger */}
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuButton isActive={isTemplatesRoute}>
                                            <FileStack />
                                            <span>Plantillas</span>

                                            {/* Flecha */}
                                            <ChevronRight
                                                className="
            ml-auto h-4 w-4 transition-transform
            group-data-[state=open]/collapsible:rotate-90
          "
                                            />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>

                                    {/* Contenido */}
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            <SidebarMenuSubItem>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={pathname === "/dashboard/templates"}
                                                >
                                                    <Link href="/dashboard/templates">
                                                        <span>Ver plantillas</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>

                                            <SidebarMenuSubItem>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={pathname === "/dashboard/templates/create"}
                                                >
                                                    <Link href="/dashboard/templates/create">
                                                        <span>Crear plantilla</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>


                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <ShoppingCart />
                                    <span>Órdenes</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Users />
                                    <span>Clientes</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={() => logout()}>
                            <LogOut className="h-4 w-4" />
                            <span>Cerrar sesión</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

        </Sidebar>
    )
}
