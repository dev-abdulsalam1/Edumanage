"use client";

import {
    Home,
    Users,
    GraduationCap,
    BookOpen,
    ClipboardList,
    BarChart3,
    Library,
    Settings,
    CalendarDays,
} from "lucide-react";

import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const managementItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Students", url: "/dashboard/students", icon: Users },
    { title: "Teachers", url: "/dashboard/teachers", icon: GraduationCap },
    { title: "Classes", url: "/dashboard/classes", icon: BookOpen },
    { title: "Attendance", url: "/dashboard/attendance", icon: ClipboardList },
    { title: "Exams & Results", url: "#", icon: BarChart3 },
    { title: "Settings", url: "#", icon: Settings },
];

export function DashboardSideBar() {
    const pathname = usePathname();

    return (
        <ShadcnSidebar className="bg-white border-r shadow-sm w-64">
            <SidebarContent>
                {/* School logo or title */}
                <div className="p-5 border-b text-center">
                    <Link href='/dashboard' >
                        <h1 className="text-xl font-bold flex items-center">
                            <img className="w-10 h-10" src="logo.png" />  EduManage </h1> </Link>
                    {/* <p className="text-sm opacity-90 mt-0">Admin Dashboard</p> */}
                </div>

                <SidebarGroup>
                    <SidebarGroupLabel className="text-gray-700 mt-4 px-4 uppercase text-xs font-semibold tracking-wide">
                        Main Menu
                    </SidebarGroupLabel>

                    <SidebarGroupContent>
                        <SidebarMenu>
                            {managementItems.map((item) => {
                                const isActive = pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                key={item.url}
                                                href={item.url}
                                                className={`px-4 py-2 rounded-lg transition-colors ${isActive ? "bg-green-600 text-white" : "text-gray-700 hover:bg-green-600"
                                                    }`}>

                                                <item.icon size={18} />

                                                <span className="text-sm font-medium">{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Footer (optional) */}
                <div className="mt-auto p-4 border-t text-center text-xs text-gray-500">
                    <p>© 2025 Your School</p>
                </div>
            </SidebarContent>
        </ShadcnSidebar>
    );
}
