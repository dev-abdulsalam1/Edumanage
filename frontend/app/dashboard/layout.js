import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import SideBar from "./SideBar";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function DashboardLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <SidebarTrigger />
                <SideBar />

                {/* Main content area */}
                <div className="flex-1 flex  flex-col">
                    <main className="flex-1 p-6 mt-0 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}
